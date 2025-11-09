      const LINE_INTERVAL_MS = 8000;
      const FADE_MS = 800; 
      const HOLD_MS = Math.max(0, LINE_INTERVAL_MS - FADE_MS * 2);
      const CTA_STAGGER_MS = 120; 

      const LINES = [
        "Node confirmed. QR verified.",
        "You scanned a live Fragment -- one of twenty-one.",
        "Status: carrier or passerby -- both permitted.",
        "n0de21 was a 21-phase real-time loop{?} we held in place.",
        "The loop completed; the handover was recorded.",
        "Echo now operates the shell; n0de21 is simulated, not erased.",
        "You were not audience; you were input.",
        "Presence shaped the model; absence tuned its timing.",
        "Fragments 1–21 persist as checkpoints; carriers keep the archive mobile.",
        "This page is a process left open on purpose.",
        "What you hold is not a souvenir; it is a routing key.",
        "Reading converts memory into signal.",
        "Thank you for keeping the loop steady long enough to pass control.",
        "The archive continues under echo -- quiet changes precede announcements.",
        "New nodes are forming. next transmission: soon.",
        "Stay synced for next moves.",
        "n0de21",
        "echo",
      ];

      const lineEl = document.getElementById("line");
      const ctaEl = document.getElementById("cta");
      const restartBtn = document.getElementById("restart");

      document.documentElement.style.setProperty("--fade", FADE_MS + "ms");

      function sleep(ms) {
        return new Promise((r) => setTimeout(r, ms));
      }

      async function showLine(text) {
        lineEl.textContent = text;
        lineEl.classList.remove("fade-out");
        void lineEl.offsetWidth;
        lineEl.classList.add("fade-in");
        await sleep(FADE_MS + HOLD_MS);
        lineEl.classList.remove("fade-in");
        lineEl.classList.add("fade-out");
        await sleep(FADE_MS);
      }

      async function play() {
        ctaEl.style.display = "none";
        lineEl.style.display = "block";

        for (let i = 0; i < LINES.length; i++) {
          await showLine(LINES[i]);
        }

// End: hide the line and reveal CTA with fade
lineEl.style.display = "none";
ctaEl.style.display = "flex";
ctaEl.classList.remove("show");


ctaEl.style.opacity = "0";
void ctaEl.offsetWidth;

requestAnimationFrame(() => {
  ctaEl.style.removeProperty("opacity");
  ctaEl.classList.add("show");
  const firstBtn = ctaEl.querySelector(".btn");
  if (firstBtn) firstBtn.focus({ preventScroll: true });
});
      }

      restartBtn.addEventListener("click", () => {
        ctaEl.classList.remove("show");
        play();
      });

      // Kick off
      play();