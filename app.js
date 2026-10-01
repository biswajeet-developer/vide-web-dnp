/**
 * FULLSCREEN IMAGE VIEWER ENGINE
 * Immediate zero-click display + mobile double-tap zoom
 */

document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("main-image");
  
  // URL query parameter support: ?img=https://...
  const params = new URLSearchParams(window.location.search);
  const customImg = params.get("img") || params.get("src") || params.get("url");

  if (customImg) {
    img.src = customImg;
  }

  // Fallback check
  img.onerror = () => {
    // If picture.png isn't found, try image.png or photo.png
    if (img.src.endsWith("picture.png")) {
      img.src = "image.png";
    }
  };

  // Double-tap to zoom feature on mobile
  let lastTap = 0;
  let isZoomed = false;

  img.addEventListener("touchend", (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
      // Double tap detected
      e.preventDefault();
      if (!isZoomed) {
        img.style.transform = "scale(2)";
        img.style.transition = "transform 0.25s ease";
        isZoomed = true;
      } else {
        img.style.transform = "scale(1)";
        img.style.transition = "transform 0.25s ease";
        isZoomed = false;
      }
    }
    lastTap = currentTime;
  });
});
