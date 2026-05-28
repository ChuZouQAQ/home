<template>
  <div :class="store.mobileOpenState ? 'right' : 'right hidden'">
    <!-- 移动端 Logo -->
    <div class="logo text-hidden" @click="store.mobileFuncState = !store.mobileFuncState">
      <span class="bg">{{ siteUrl[0] }}</span>
      <span class="sm">.{{ siteUrl[1] }}</span>
    </div>
    <!-- 功能区 -->
    <Func />
    <!-- 网站链接 -->
    <Link />
  </div>
</template>

<script setup>
import { mainStore } from "@/store";
import Func from "@/views/Func/index.vue";
import Link from "@/components/Links.vue";
const store = mainStore();

// 站点链接
const siteUrl = computed(() => {
  const url = import.meta.env.VITE_SITE_URL;
  if (!url) return "Azusa.uk".split(".");
  // 判断协议前缀
  if (url.startsWith("http://") || url.startsWith("https://")) {
    const urlFormat = url.replace(/^(https?:\/\/)/, "");
    return urlFormat.split(".");
  }
  return url.split(".");
});
</script>

<style lang="scss" scoped>
.right {
  width: min(54%, 560px);
  .logo {
    width: 100%;
    font-family: "Pacifico-Regular";
    font-size: 1.75rem;
    letter-spacing: 0;
    color: #fff;
    -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.25);
    text-shadow:
      0 2px 0 rgba(255, 255, 255, 0.18),
      0 8px 18px rgba(24, 13, 56, 0.36),
      0 0 24px rgba(255, 176, 205, 0.24);
    position: fixed;
    top: 6%;
    left: 0;
    text-align: center;
    transition: transform 0.3s;
    animation: fade 0.5s;
    &:active {
      transform: scale(0.95);
    }
    @media (min-width: 720px) {
      display: none;
    }
  }
  @media (max-width: 720px) {
    width: 100%;
    &.hidden {
      display: none;
    }
  }
}
</style>
