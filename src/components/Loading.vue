<template>
  <div id="loader-wrapper" :class="store.imgLoadStatus ? 'loaded' : null">
    <div class="loader">
      <!-- 🌸 5-petal sakura blossom -->
      <div class="blossom" aria-hidden="true">
        <span v-for="i in 5" :key="i" class="petal" :style="{ transform: `rotate(${(i - 1) * 72}deg)` }">
          <span class="petal-inner" />
        </span>
        <span class="core" />
      </div>
      <div class="loader-text">
        <span class="name">{{ siteName }}</span>
        <span class="tip">轻轻摇落一片樱花，请稍候…</span>
      </div>
    </div>
    <div class="loader-section section-left" />
    <div class="loader-section section-right" />
  </div>
</template>

<script setup>
import { mainStore } from "@/store";

const store = mainStore();
const siteName = import.meta.env.VITE_SITE_NAME;
</script>

<style lang="scss" scoped>
#loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  overflow: hidden;

  .loader {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;

    .blossom {
      position: relative;
      width: 140px;
      height: 140px;
      animation: blossom-spin 6s linear infinite;
      filter: drop-shadow(0 8px 24px rgba(247, 106, 161, 0.45));

      .petal {
        position: absolute;
        top: 0;
        left: 50%;
        width: 60px;
        height: 90px;
        margin-left: -30px;
        transform-origin: 50% 100%;

        .petal-inner {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 25%,
            #ffffff 0%,
            var(--sakura-200) 50%,
            var(--sakura-400) 100%
          );
          border-radius: 50% 50% 45% 45% / 95% 95% 30% 30%;
          animation: petal-bloom 1.6s ease-in-out infinite alternate;
        }
        .petal-inner::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 70%;
          width: 6px;
          height: 18px;
          margin-left: -3px;
          background: rgba(255, 255, 255, 0.55);
          border-radius: 999px;
          filter: blur(1px);
        }
      }

      .core {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 22px;
        height: 22px;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: radial-gradient(circle, #fffadf 0%, #ffd25a 60%, #f78b3a 100%);
        box-shadow: 0 0 16px rgba(255, 210, 90, 0.7);
      }
    }

    .loader-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: var(--text-normal);
      margin-top: 36px;
      .name {
        font-size: 26px;
        letter-spacing: 1px;
        font-weight: 600;
        text-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
      }
      .tip {
        margin-top: 8px;
        font-size: 14px;
        color: var(--text-soft);
        animation: sakura-pulse 2.4s ease-in-out infinite;
      }
    }
  }

  .loader-section {
    position: fixed;
    top: 0;
    width: 51%;
    height: 100%;
    background: linear-gradient(180deg, var(--night-1) 0%, var(--night-2) 60%, var(--night-3) 100%);
    z-index: 1;

    &.section-left {
      left: 0;
    }
    &.section-right {
      right: 0;
    }
  }

  &.loaded {
    visibility: hidden;
    transform: translateY(-100%);
    transition:
      transform 0.3s 1s ease-out,
      visibility 0.3s 1s ease-out;
    .loader {
      .blossom,
      .loader-text {
        opacity: 0;
        transition: opacity 0.3s ease-out;
      }
    }
    .loader-section {
      &.section-left {
        transform: translateX(-100%);
        transition: transform 0.5s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      &.section-right {
        transform: translateX(100%);
        transition: transform 0.5s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }
  }
}

@keyframes blossom-spin {
  0%   { transform: rotate(0deg) scale(1); }
  50%  { transform: rotate(180deg) scale(1.05); }
  100% { transform: rotate(360deg) scale(1); }
}

@keyframes petal-bloom {
  from {
    transform: scale(0.92);
    filter: hue-rotate(0deg);
  }
  to {
    transform: scale(1.02);
    filter: hue-rotate(-8deg);
  }
}
</style>
