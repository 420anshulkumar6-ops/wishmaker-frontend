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
    photoInput: document.getElementById("photoInput"),
    cropEditor: document.getElementById("cropEditor"),
    cropStage: document.getElementById("cropStage"),
    cropImg: document.getElementById("cropImg"),
    cropZoom: document.getElementById("cropZoom"),
    changePhotoBtn: document.getElementById("changePhotoBtn"),
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

  // ---- photo selection + circular crop/zoom/reposition ----
  // The crop stage is a fixed-size circle (240px, matches .crop-stage CSS).
  // The image is drawn larger than the circle and can be dragged/zoomed;
  // on submit, a canvas renders exactly what's visible inside the circle
  // as a new square image, which is what actually gets uploaded — so what
  // the user sees here is exactly what ends up in the video.
  const STAGE_SIZE = 240;
  let selectedFile = null;
  let naturalImg = null;      // the loaded <img> element, for canvas drawing later
  let imgState = { scale: 1, minScale: 1, x: 0, y: 0 };
  let dragging = false;
  let dragStart = { x: 0, y: 0, imgX: 0, imgY: 0 };

  function applyImgTransform() {
    els.cropImg.style.transform =
      `translate(-50%, -50%) translate(${imgState.x}px, ${imgState.y}px) scale(${imgState.scale})`;
  }

  function clampPosition() {
    // Prevents dragging the image far enough that empty space shows inside the circle.
    const displayedW = naturalImg.naturalWidth * (STAGE_SIZE / Math.min(naturalImg.naturalWidth, naturalImg.naturalHeight)) * imgState.scale;
    const displayedH = naturalImg.naturalHeight * (STAGE_SIZE / Math.min(naturalImg.naturalWidth, naturalImg.naturalHeight)) * imgState.scale;
    const maxX = Math.max(0, (displayedW - STAGE_SIZE) / 2);
    const maxY = Math.max(0, (displayedH - STAGE_SIZE) / 2);
    imgState.x = Math.min(maxX, Math.max(-maxX, imgState.x));
    imgState.y = Math.min(maxY, Math.max(-maxY, imgState.y));
  }

  els.dropzone.addEventListener("click", () => els.photoInput.click());
  els.changePhotoBtn.addEventListener("click", () => els.photoInput.click());

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
      const img = new Image();
      img.onload = () => {
        naturalImg = img;
        els.cropImg.src = e.target.result;

        // fill the circle completely regardless of the photo's own aspect ratio
        const fillScale = STAGE_SIZE / Math.min(img.naturalWidth, img.naturalHeight);
        els.cropImg.style.width = (img.naturalWidth * fillScale) + "px";
        els.cropImg.style.height = (img.naturalHeight * fillScale) + "px";

        imgState = { scale: 1, minScale: 1, x: 0, y: 0 };
        els.cropZoom.value = 100;
        applyImgTransform();

        els.dropzone.hidden = true;
        els.cropEditor.hidden = false;
        checkFormReady();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  // ---- drag to reposition ----
  els.cropStage.addEventListener("pointerdown", (e) => {
    dragging = true;
    dragStart = { x: e.clientX, y: e.clientY, imgX: imgState.x, imgY: imgState.y };
    els.cropStage.setPointerCapture(e.pointerId);
  });
  els.cropStage.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    imgState.x = dragStart.imgX + (e.clientX - dragStart.x);
    imgState.y = dragStart.imgY + (e.clientY - dragStart.y);
    clampPosition();
    applyImgTransform();
  });
  els.cropStage.addEventListener("pointerup", () => { dragging = false; });
  els.cropStage.addEventListener("pointercancel", () => { dragging = false; });

  // ---- zoom slider (100 = fills the circle exactly, 300 = 3x zoomed in) ----
  els.cropZoom.addEventListener("input", () => {
    imgState.scale = els.cropZoom.value / 100;
    clampPosition();
    applyImgTransform();
  });

  /**
   * Renders exactly what's visible inside the crop circle to a new square
   * canvas, and returns it as a File ready for upload. This is what makes
   * "what you see is what you get" true — the backend still applies its
   * own circular mask on render, but the framing/zoom the user chose here
   * is baked into the image it receives.
   */
  function getCroppedPhotoFile() {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const outputSize = 600; // upload resolution, independent of the on-screen 240px stage
      canvas.width = outputSize;
      canvas.height = outputSize;
      const ctx = canvas.getContext("2d");

      const fillScale = STAGE_SIZE / Math.min(naturalImg.naturalWidth, naturalImg.naturalHeight);
      const displayedW = naturalImg.naturalWidth * fillScale * imgState.scale;
      const displayedH = naturalImg.naturalHeight * fillScale * imgState.scale;

      // Convert the on-screen stage position/scale into source-image coordinates.
      const outputScale = outputSize / STAGE_SIZE;
      const drawW = displayedW * outputScale;
      const drawH = displayedH * outputScale;
      const drawX = (outputSize / 2) + (imgState.x * outputScale) - (drawW / 2);
      const drawY = (outputSize / 2) + (imgState.y * outputScale) - (drawH / 2);

      ctx.drawImage(naturalImg, drawX, drawY, drawW, drawH);
      canvas.toBlob((blob) => {
        resolve(new File([blob], "cropped-photo.jpg", { type: "image/jpeg" }));
      }, "image/jpeg", 0.92);
    });
  }

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
      const croppedFile = await getCroppedPhotoFile();
      const photoUrl = await uploadToImgBB(croppedFile);

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
