// ===== create.js =====
// Reads ?theme= and ?design= from the URL, loads that specific design from
// category-config.js, shows only the fields that design needs (photo is
// always required; name and quote show conditionally per design.fields),
// and handles photo preview, music selection, and submission.

import { categorySettings } from "./category-config.js";
import { saveWish } from "./firebase-config.js";

const IMGBB_API_KEY = "2a413ba4b33f42ebf45017fc17be5df5";

// Live Render.com backend
const VIDEO_RENDER_ENDPOINT = "https://wishmaker-fkqw.onrender.com/render";

(function () {

  const params = new URLSearchParams(window.location.search);
  const themeKey = params.get("theme");
  const designId = params.get("design");

  const category = categorySettings[themeKey];
  const design = category?.designs.find(d => d.id === designId);

  const els = {
    backLink: document.getElementById("backLink"),
    eyebrow: document.getElementById("themeEyebrow"),
    title: document.getElementById("themeTitle"),
    sub: document.getElementById("themeSub"),
    photoField: document.getElementById("photoField"),
    dropzone: document.getElementById("dropzone"),
    dzIcon: document.getElementById("dzIcon"),
    dzText: document.getElementById("dzText"),
    previewImg: document.getElementById("previewImg"),
    photoInput: document.getElementById("photoInput"),
    uploadStatus: document.getElementById("uploadStatus"),
    nameField: document.getElementById("nameField"),
    nameInput: document.getElementById("nameInput"),
    quoteField: document.getElementById("quoteField"),
    quoteInput: document.getElementById("quoteInput"),
    musicList: document.getElementById("musicList"),
    submitBtn: document.getElementById("submitBtn"),
    formError: document.getElementById("formError"),
    form: document.getElementById("wishForm"),
    renderState: document.getElementById("renderState"),
    renderMessage: document.getElementById("renderMessage"),
    errorState: document.getElementById("errorState")
  };

  // ---- guard: unknown theme/design combination in the URL ----
  if (!category || !design) {
    els.form.hidden = true;
    els.eyebrow.hidden = true;
    els.title.hidden = true;
    els.sub.hidden = true;
    els.backLink.hidden = true;
    els.errorState.hidden = false;
    return;
  }

  // ---- back link goes to this design's category page ----
  els.backLink.href = `category.html?theme=${themeKey}`;

  // ---- apply design text ----
  els.eyebrow.textContent = category.label.toLowerCase();
  els.title.textContent = `Make it theirs — ${design.name}`;
  els.sub.textContent = "Fill in the details below — we'll do the rest.";
  document.title = `${design.name} — WishMaker`;

  // ---- show only the fields this design actually needs ----
  const fields = design.fields || { photo: true, name: false, quote: false };
  if (fields.name) els.nameField.hidden = false;
  if (fields.quote) els.quoteField.hidden = false;

  // ---- build music options from this design's own music list ----
  let selectedMusicId = null;
  let currentAudio = null;

  design.music.forEach((track, i) => {
    const row = document.createElement("label");
    row.className = "music-option";
    row.innerHTML = `
      <input type="radio" name="music" value="${track.id}" ${i === 0 ? "checked" : ""}>
      <span class="track-name">${track.name}</span>
      <button type="button" class="preview-btn" data-file="${track.file}">Preview</button>
    `;
    els.musicList.appendChild(row);
  });
  selectedMusicId = design.music[0]?.id || null;

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
    const nameOk = !fields.name || els.nameInput.value.trim().length > 0;
    const photoOk = !!selectedFile;
    els.submitBtn.disabled = !(nameOk && photoOk);
  }

  els.nameInput?.addEventListener("input", checkFormReady);

  // ---- rotating loading messages while the backend renders ----
  let loadingInterval = null;
  function startLoadingMessages() {
    const stages = [
      { at: 0,  text: "Waking things up… ✨" },
      { at: 8,  text: "Almost there, hang tight…" },
      { at: 18, text: "Setting the scene…" },
      { at: 30, text: "Still working — free hosting can be slow to start, thanks for waiting…" },
      { at: 45, text: "Lighting the candles… 🕯️" },
      { at: 60, text: "Nearly done, this is the last stretch…" }
    ];
    let elapsed = 0;
    loadingInterval = setInterval(() => {
      elapsed += 1;
      const stage = [...stages].reverse().find(s => elapsed >= s.at);
      if (stage) els.renderMessage.textContent = stage.text;
    }, 1000);
  }
  function stopLoadingMessages() {
    if (loadingInterval) clearInterval(loadingInterval);
    loadingInterval = null;
  }

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
      const photoUrl = await uploadToImgBB(selectedFile);

      startLoadingMessages();

      const renderResponse = await fetch(VIDEO_RENDER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme: themeKey,
          designId: design.id,
          name: fields.name ? els.nameInput.value.trim() : null,
          quote: fields.quote ? els.quoteInput.value.trim() : null,
          musicId: selectedMusicId,
          photoUrl
        })
      });

      if (!renderResponse.ok) throw new Error("Video rendering failed");
      const { videoUrl } = await renderResponse.json();
      stopLoadingMessages();
      els.renderMessage.textContent = "Almost ready…";

      const wishId = await saveWish({
        theme: themeKey,
        designId: design.id,
        name: fields.name ? els.nameInput.value.trim() : null,
        quote: fields.quote ? els.quoteInput.value.trim() : null,
        musicId: selectedMusicId,
        photoUrl,
        videoUrl
      });

      window.location.href = `wish.html?id=${wishId}`;

    } catch (err) {
      stopLoadingMessages();
      els.form.hidden = false;
      els.renderState.hidden = true;
      els.formError.textContent = "Something went wrong — please try again.";
      console.error(err);
    }
  });

})();
