// ===== create.js =====
// Reads ?theme= from the URL, loads that category from categorySettings,
// lets the user pick a design (if there's more than one), then handles
// name input, photo preview, music selection, and submission.

import { categorySettings } from "./category-config.js";
import { saveWish } from "./firebase-config.js";

const IMGBB_API_KEY = "2a413ba4b33f42ebf45017fc17be5df5";

// Live Render.com backend
const VIDEO_RENDER_ENDPOINT = "https://wishmaker-fkqw.onrender.com/render";

(function () {

  const params = new URLSearchParams(window.location.search);
  const themeKey = params.get("theme") || "birthday";
  const category = categorySettings[themeKey];

  const els = {
    eyebrow: document.getElementById("themeEyebrow"),
    title: document.getElementById("themeTitle"),
    sub: document.getElementById("themeSub"),
    designField: document.getElementById("designField"),
    designList: document.getElementById("designList"),
    nameField: document.getElementById("nameField"),
    nameInput: document.getElementById("nameInput"),
    dropzone: document.getElementById("dropzone"),
    dzIcon: document.getElementById("dzIcon"),
    dzText: document.getElementById("dzText"),
    previewImg: document.getElementById("previewImg"),
    photoInput: document.getElementById("photoInput"),
    uploadStatus: document.getElementById("uploadStatus"),
    musicList: document.getElementById("musicList"),
    submitBtn: document.getElementById("submitBtn"),
    formError: document.getElementById("formError"),
    form: document.getElementById("wishForm"),
    renderState: document.getElementById("renderState"),
    renderMessage: document.getElementById("renderMessage")
  };

  // ---- guard: unknown category ----
  if (!category || !category.designs || category.designs.length === 0) {
    els.title.textContent = "This card isn't ready yet";
    els.sub.textContent = "Head back and pick one of the live occasions.";
    els.form.hidden = true;
    return;
  }

  // ---- apply category text ----
  els.eyebrow.textContent = category.label;
  els.title.textContent = category.title;
  els.sub.textContent = category.subtitle;
  document.title = category.title + " — WishCraft";

  if (!category.showNameField) {
    els.nameField.hidden = true;
  }

  // ---- design selection (only shown if 2+ designs exist) ----
  let selectedDesign = category.designs[0];

  if (category.designs.length > 1) {
    els.designField.hidden = false;
    category.designs.forEach((design, i) => {
      const row = document.createElement("label");
      row.className = "design-option";
      row.innerHTML = `
        <input type="radio" name="design" value="${design.id}" ${i === 0 ? "checked" : ""}>
        <span class="design-name">${design.name}</span>
      `;
      els.designList.appendChild(row);
    });

    els.designList.addEventListener("change", (e) => {
      if (e.target.name !== "design") return;
      selectedDesign = category.designs.find(d => d.id === e.target.value);
      buildMusicList(); // a design can override the category's music list
    });
  }

  // ---- build music options (design-level music wins, else category-level) ----
  let selectedMusicId = null;
  let currentAudio = null;

  function buildMusicList() {
    els.musicList.innerHTML = "";
    const tracks = selectedDesign.music || category.music;

    tracks.forEach((track, i) => {
      const row = document.createElement("label");
      row.className = "music-option";
      row.innerHTML = `
        <input type="radio" name="music" value="${track.id}" ${i === 0 ? "checked" : ""}>
        <span class="track-name">${track.name}</span>
        <button type="button" class="preview-btn" data-file="${track.file}">Preview</button>
      `;
      els.musicList.appendChild(row);
    });
    selectedMusicId = tracks[0]?.id || null;
  }
  buildMusicList();

  els.musicList.addEventListener("change", (e) => {
    if (e.target.name === "music") selectedMusicId = e.target.value;
  });

  els.musicList.addEventListener("click", (e) => {
    if (!e.target.classList.contains("preview-btn")) return;
    const file = e.target.dataset.file;
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    currentAudio = new Audio(file);
    currentAudio.play().catch(() => {
      els.formError.textContent = "Couldn't preview that track — the music file isn't added yet.";
    });
    e.target.textContent = "Playing…";
    currentAudio.onended = () => { e.target.textContent = "Preview"; };
  });

  // ---- photo selection + local preview ----
  let selectedFile = null;

  els.dropzone.addEventListener("click", (e) => {
    if (e.target === els.previewImg) els.photoInput.click();
  });

  els.photoInput.addEventListener("change", () => {
    const file = els.photoInput.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      els.formError.textContent = "Please choose an image file.";
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      els.formError.textContent = "That photo is larger than 8MB — try a smaller one.";
      return;
    }

    els.formError.textContent = "";
    selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      els.previewImg.src = e.target.result;
      els.previewImg.hidden = false;
      els.dzIcon.hidden = true;
      els.dzText.textContent = "Tap to change photo";
    };
    reader.readAsDataURL(file);

    checkFormReady();
  });

  // ---- form readiness ----
  function checkFormReady() {
    const nameOk = !category.showNameField || els.nameInput.value.trim().length > 0;
    const photoOk = !!selectedFile;
    els.submitBtn.disabled = !(nameOk && photoOk);
  }

  els.nameInput?.addEventListener("input", checkFormReady);

  // ---- upload photo to ImgBB, returns the hosted image URL ----
  async function uploadToImgBB(file) {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) throw new Error("ImgBB upload failed");
    const result = await response.json();
    return result.data.url;
  }

  // ---- submit ----
  els.form.addEventListener("submit", async (e) => {
    e.preventDefault();
    els.formError.textContent = "";

    if (!selectedFile) {
      els.formError.textContent = "Please add a photo first.";
      return;
    }

    els.form.hidden = true;
    els.renderState.hidden = false;
    els.renderMessage.textContent = "Uploading photo…";

    try {
      // 1. Upload the photo to ImgBB — we only store the URL, not the file itself
      const photoUrl = await uploadToImgBB(selectedFile);

      // 2. Ask the backend to render the video (background + photo + name + music)
      els.renderMessage.textContent = "Lighting the candles… ✨";

      const renderResponse = await fetch(VIDEO_RENDER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme: themeKey,
          designId: selectedDesign.id,
          name: category.showNameField ? els.nameInput.value.trim() : null,
          musicId: selectedMusicId,
          photoUrl
        })
      });

      if (!renderResponse.ok) throw new Error("Video rendering failed");
      const { videoUrl } = await renderResponse.json();

      // 3. Save the wish record in Firestore — wish.html reads this by id
      const wishId = await saveWish({
        theme: themeKey,
        designId: selectedDesign.id,
        name: category.showNameField ? els.nameInput.value.trim() : null,
        musicId: selectedMusicId,
        photoUrl,
        videoUrl
      });

      // 4. Send the user to their shareable link
      window.location.href = `wish.html?id=${wishId}`;

    } catch (err) {
      els.form.hidden = false;
      els.renderState.hidden = true;
      els.formError.textContent = "Something went wrong — please try again.";
      console.error(err);
    }
  });

})();
