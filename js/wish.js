// ===== wish.js =====
// Reads ?id= from the URL, fetches the wish from Firestore, and displays
// the rendered video with download + WhatsApp share options.

import { getWish } from "./firebase-config.js";

(async function () {

  const els = {
    loadingState: document.getElementById("loadingState"),
    errorState: document.getElementById("errorState"),
    wishDisplay: document.getElementById("wishDisplay"),
    video: document.getElementById("wishVideo"),
    tapToPlay: document.getElementById("tapToPlay"),
    downloadBtn: document.getElementById("downloadBtn"),
    whatsappBtn: document.getElementById("whatsappBtn"),
    actionHint: document.getElementById("actionHint")
  };

  const params = new URLSearchParams(window.location.search);
  const wishId = params.get("id");

  function showError() {
    els.loadingState.hidden = true;
    els.errorState.hidden = false;
  }

  if (!wishId) {
    showError();
    return;
  }

  let wish;
  try {
    wish = await getWish(wishId);
  } catch (err) {
    console.error("Failed to fetch wish:", err);
    showError();
    return;
  }

  if (!wish || !wish.videoUrl) {
    showError();
    return;
  }

  // ---- show the video ----
  els.video.src = wish.videoUrl;
  document.title = (wish.name ? `A wish for ${wish.name}` : "A wish") + " — WishCraft";

  els.loadingState.hidden = true;
  els.wishDisplay.hidden = false;

  // Tap-to-play overlay: video stays paused/muted until the user taps,
  // which also lets us unmute (browsers block autoplay-with-sound).
  els.tapToPlay.addEventListener("click", () => {
    els.video.muted = false;
    els.video.loop = true;
    els.video.play();
    els.tapToPlay.classList.add("is-hidden");
  });

  // ---- download ----
  els.downloadBtn.addEventListener("click", async () => {
    els.downloadBtn.disabled = true;
    els.downloadBtn.textContent = "Preparing download…";
    try {
      const response = await fetch(wish.videoUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `wishcraft-${wish.name ? wish.name.replace(/\s+/g, "-") : "video"}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      els.actionHint.textContent = "Download failed — try again, or long-press the video to save it.";
    } finally {
      els.downloadBtn.disabled = false;
      els.downloadBtn.textContent = "Download video";
    }
  });

  // ---- share to WhatsApp ----
  // Uses the Web Share API where available (works well on mobile Chrome/Safari,
  // and can share the actual video file, not just a link). Falls back to
  // opening a WhatsApp share link with the page URL if the API or file-sharing
  // isn't supported.
  els.whatsappBtn.addEventListener("click", async () => {
    const shareText = wish.name
      ? `A birthday wish for ${wish.name} 🎂`
      : "A birthday wish, just for you 🎂";

    try {
      if (navigator.canShare) {
        const response = await fetch(wish.videoUrl);
        const blob = await response.blob();
        const file = new File([blob], "wishcraft-video.mp4", { type: "video/mp4" });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], text: shareText });
          return;
        }
      }
      throw new Error("File sharing not supported on this browser");
    } catch (err) {
      // Fallback: share the page link via WhatsApp's own share URL
      const pageUrl = window.location.href;
      const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText + " " + pageUrl)}`;
      window.open(waUrl, "_blank");
    }
  });

})();
