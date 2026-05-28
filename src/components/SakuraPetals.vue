<template>
  <!-- 🌸 Falling sakura petals overlay (pure CSS / pointer-events: none) -->
  <div class="sakura-layer" aria-hidden="true">
    <span
      v-for="i in count"
      :key="i"
      class="petal"
      :style="petalStyle(i)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  count: {
    type: Number,
    default: 18,
  },
});

// Deterministic-ish pseudo random for stable styling between renders
const rand = (seed) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const petalStyle = (i) => {
  const left = rand(i + 1) * 100;
  const size = 14 + rand(i + 2) * 18;            // 14 - 32px
  const duration = 12 + rand(i + 3) * 14;        // 12 - 26s
  const delay = -rand(i + 4) * duration;         // negative => start mid-flight
  const sway = 6 + rand(i + 5) * 10;             // sway amplitude (s)
  const opacity = 0.55 + rand(i + 6) * 0.35;     // 0.55 - 0.9
  const tint = rand(i + 7);
  const hue = tint < 0.5 ? "var(--sakura-200)" : "var(--sakura-300)";
  return {
    left: `${left}vw`,
    width: `${size}px`,
    height: `${size}px`,
    opacity,
    "--petal-color": hue,
    "--fall-duration": `${duration}s`,
    "--fall-delay": `${delay}s`,
    "--sway-duration": `${sway}s`,
  };
};
</script>

<style lang="scss" scoped>
.sakura-layer {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

/* A petal is an asymmetric rounded shape, gradient-filled, slowly rotating
   and gently swaying as it falls. */
.petal {
  position: absolute;
  top: -10vh;
  background: radial-gradient(
    circle at 30% 30%,
    #ffffff 0%,
    var(--petal-color, var(--sakura-300)) 55%,
    rgba(247, 106, 161, 0.85) 100%
  );
  border-radius: 70% 30% 60% 40% / 50% 60% 40% 50%;
  filter: drop-shadow(0 2px 6px rgba(216, 79, 142, 0.35));
  animation:
    petal-fall var(--fall-duration, 18s) linear infinite,
    petal-sway var(--sway-duration, 8s) ease-in-out infinite alternate;
  animation-delay: var(--fall-delay, 0s), 0s;
  will-change: transform, opacity;
}

@keyframes petal-fall {
  0% {
    transform: translate3d(0, -10vh, 0) rotate(0deg);
  }
  100% {
    transform: translate3d(0, 110vh, 0) rotate(720deg);
  }
}

@keyframes petal-sway {
  from {
    margin-left: -22px;
  }
  to {
    margin-left: 22px;
  }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .petal {
    animation-duration: 60s, 30s;
    opacity: 0.35 !important;
  }
}

/* Mobile: lower density via opacity & narrower sway */
@media (max-width: 720px) {
  .petal {
    filter: drop-shadow(0 1px 3px rgba(216, 79, 142, 0.3));
  }
}
</style>
