<template>
  <footer id="footer" :class="store.footerBlur ? 'blur' : null">
    <div class="power">
      <span class="petal" aria-hidden="true">🌸</span>
      <span>
        Copyright&nbsp;&copy;
        <span v-if="siteStartDate?.length >= 4" class="site-start">
          {{ siteStartDate.substring(0, 4) }} -
        </span>
        {{ fullYear }}
        <a :href="siteUrl">{{ siteAnthor }}</a>
      </span>
      <!-- 以下信息请不要修改哦 -->
      <span class="hidden">
        &nbsp;·&nbsp;Made&nbsp;by
        <a :href="config.github" target="_blank">{{ config.author }}</a>
      </span>
    </div>
  </footer>
</template>

<script setup>
import { mainStore } from "@/store";
import config from "@/../package.json";

const store = mainStore();
const fullYear = new Date().getFullYear();

// 加载配置数据
const siteStartDate = ref(import.meta.env.VITE_SITE_START);
const siteAnthor = ref(import.meta.env.VITE_SITE_ANTHOR);
const siteUrl = computed(() => {
  const url = import.meta.env.VITE_SITE_URL;
  if (!url) return "https://Azusa.uk";
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "//" + url;
  }
  return url;
});
</script>

<style lang="scss" scoped>
#footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 46px;
  line-height: 46px;
  text-align: center;
  z-index: 0;
  font-size: 14px;
  color: var(--text-soft);

  .power {
    animation: fade 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    .petal {
      animation: sakura-pulse 3s ease-in-out infinite;
    }

    a {
      color: var(--sakura-100);
      transition: color 0.2s;
      &:hover { color: var(--sakura-300); }
    }
  }

  &.blur {
    backdrop-filter: blur(12px);
    background: linear-gradient(
      180deg,
      rgba(40, 20, 50, 0) 0%,
      rgba(40, 20, 50, 0.45) 100%
    );
    border-top: 1px solid rgba(255, 232, 244, 0.12);
    font-size: 15px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s ease-in-out;
  }

  @media (max-width: 720px) {
    font-size: 0.85rem;
    &.blur {
      font-size: 0.85rem;
    }
  }
  @media (max-width: 480px) {
    .hidden { display: none; }
  }
}
</style>
