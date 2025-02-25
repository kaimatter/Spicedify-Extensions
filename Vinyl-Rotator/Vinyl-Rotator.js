(async function() {
        while (!Spicetify.React || !Spicetify.ReactDOM) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        var myDapp = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/app.tsx
  var require_app = __commonJS({
    "src/app.tsx"() {
      "use strict";
      if (window.vinylRotationListener) {
        Spicetify.Player.removeEventListener("onplaypause", window.vinylRotationListener);
      }
      console.log("\u2705 Removed old play/pause listener (if any).");
      var currentRotation = 0;
      var lastUpdateTime = null;
      var animationFrameId = null;
      function updateRotation() {
        if (!Spicetify.Player.isPlaying())
          return;
        const now = performance.now();
        if (lastUpdateTime !== null) {
          const elapsed = (now - lastUpdateTime) / 1e3;
          currentRotation += 360 / 10 * elapsed;
        }
        lastUpdateTime = now;
        document.querySelectorAll(".main-image-image.cover-art-image").forEach((cover) => {
          cover.style.transform = `rotate(${currentRotation % 360}deg)`;
        });
        animationFrameId = requestAnimationFrame(updateRotation);
      }
      function handlePlaybackChange() {
        const covers = document.querySelectorAll(".main-image-image.cover-art-image");
        if (Spicetify.Player.isPlaying()) {
          lastUpdateTime = performance.now();
          animationFrameId = requestAnimationFrame(updateRotation);
          console.log("\u{1F3B5} Music is playing - rotation continues.");
        } else {
          cancelAnimationFrame(animationFrameId);
          console.log("\u23F8 Music is paused - rotation frozen at", currentRotation % 360, "degrees.");
        }
      }
      function injectVinylStyles() {
        let style = document.querySelector("#vinyl-rotation-style");
        if (style)
          style.remove();
        style = document.createElement("style");
        style.id = "vinyl-rotation-style";
        style.innerHTML = `
        .cover-art-image {
            transform-origin: center !important;
        }
    `;
        document.head.appendChild(style);
        console.log("\u2705 Vinyl rotation styles injected.");
      }
      function startObserver() {
        const targetNode = document.querySelector(".main-nowPlayingView-coverArtContainer");
        if (!targetNode) {
          console.warn("\u26A0 Cover art container not found! Retrying...");
          setTimeout(startObserver, 1e3);
          return;
        }
        const observer = new MutationObserver(() => {
          console.log("\u{1F504} Album cover changed - reapplying rotation.");
          handlePlaybackChange();
        });
        observer.observe(targetNode, { childList: true, subtree: true });
        console.log("\u{1F440} MutationObserver started!");
      }
      injectVinylStyles();
      handlePlaybackChange();
      startObserver();
      window.vinylRotationListener = handlePlaybackChange;
      Spicetify.Player.addEventListener("onplaypause", window.vinylRotationListener);
      console.log("\u2705 Play/Pause event listener attached.");
    }
  });

  // ../../../AppData/Local/Temp/spicetify-creator/index.jsx
  var import_app = __toESM(require_app());
  (async () => {
    await (0, import_app.default)();
  })();
})();

      })();