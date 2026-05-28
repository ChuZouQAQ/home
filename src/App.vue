<template>
  <!-- 加载 -->
  <Loading />
  <!-- 壁纸 -->
  <Background @loadComplete="loadComplete" />
  <!-- 🌸 樱花飘落层 -->
  <SakuraPetals v-if="store.imgLoadStatus && store.petalsEnabled" :count="petalCount" />
  <!-- 主界面 -->
  <Transition name="fade" mode="out-in">
    <main id="main" v-if="store.imgLoadStatus">
      <div class="container" v-show="!store.backgroundShow">
        <section class="all" v-show="!store.setOpenState">
          <MainLeft />
          <MainRight v-show="!store.boxOpenState" />
          <Box v-show="store.boxOpenState" />
        </section>
        <section class="more" v-show="store.setOpenState" @click="store.setOpenState = false">
          <MoreSet />
        </section>
      </div>
      <!-- 移动端菜单按钮 -->
      <button
        type="button"
        class="menu"
        v-show="!store.backgroundShow"
        :aria-label="store.mobileOpenState ? '关闭菜单' : '打开菜单'"
        :aria-expanded="store.mobileOpenState"
        @click="store.mobileOpenState = !store.mobileOpenState"
      >
        <Icon size="22">
          <component :is="store.mobileOpenState ? CloseSmall : HamburgerButton" />
        </Icon>
      </button>
      <!-- 页脚 -->
      <Transition name="fade" mode="out-in">
        <Footer v-show="!store.backgroundShow && !store.setOpenState" />
      </Transition>
    </main>
  </Transition>
</template>
<script setup>
import { helloInit } from "@/utils/getTime.js";
import { HamburgerButton, CloseSmall } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import { Icon } from "@vicons/utils";
import Loading from "@/components/Loading.vue";
import MainLeft from "@/views/Main/Left.vue";
import MainRight from "@/views/Main/Right.vue";
import Background from "@/components/Background.vue";
import Footer from "@/components/Footer.vue";
import Box from "@/views/Box/index.vue";
import MoreSet from "@/views/MoreSet/index.vue";
import SakuraPetals from "@/components/SakuraPetals.vue";
import cursorInit from "@/utils/cursor.js";
import config from "@/../package.json";

const store = mainStore();

// 页面宽度
const getWidth = () => {
  store.setInnerWidth(window.innerWidth);
};

// 樱花花瓣数量随屏幕宽度自适应
const petalCount = computed(() => {
  if (!store.innerWidth) return 18;
  if (store.innerWidth < 480) return 8;
  if (store.innerWidth < 768) return 12;
  if (store.innerWidth < 1280) return 18;
  return 24;
});

// 加载完成事件
const loadComplete = () => {
  nextTick(() => {
    // 欢迎提示
    helloInit();
  });
};

// 监听宽度变化
watch(
  () => store.innerWidth,
  (value) => {
    if (value < 990) {
      store.boxOpenState = false;
    }
  },
);

onMounted(() => {
  // 自定义鼠标
  cursorInit();

  // 屏蔽右键
  document.oncontextmenu = () => {
    ElMessage({
      message: "为了浏览体验，本站禁用右键",
      grouping: true,
      duration: 2000,
    });
    return false;
  };

  // 鼠标中键事件
  window.addEventListener("mousedown", (event) => {
    if (event.button == 1) {
      store.backgroundShow = !store.backgroundShow;
      ElMessage({
        message: `已${store.backgroundShow ? "开启" : "退出"}壁纸展示状态`,
        grouping: true,
      });
    }
  });

  // 监听当前页面宽度
  getWidth();
  window.addEventListener("resize", getWidth);

  // 控制台输出
  const styleTitle1 = "font-size: 20px;font-weight: 600;color: #ff8fb8;";
  const styleTitle2 = "font-size:12px;color: #ffb3d0;";
  const styleContent = "color: #f76aa1;";
  const title1 = "🌸 梓の主页";
  const title2 = `
 _____ __  __  _______     ____     __
|_   _|  \\/  |/ ____\\ \\   / /\\ \\   / /
  | | | \\  / | (___  \\ \\_/ /  \\ \\_/ /
  | | | |\\/| |\\___ \\  \\   /    \\   /
 _| |_| |  | |____) |  | |      | |
|_____|_|  |_|_____/   |_|      |_|`;
  const content = `\n\n版本: ${config.version}\n主页: ${config.home}\nGithub: ${config.github}`;
  console.info(`%c${title1} %c${title2} %c${content}`, styleTitle1, styleTitle2, styleContent);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", getWidth);
});
</script>

<style lang="scss" scoped>
#main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(1.2);
  transition: transform 0.3s;
  animation: fade-blur-main-in 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.5s;
  z-index: 1;
  .container {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    max-width: 1180px;
    .all {
      width: 100%;
      height: 100%;
      padding: clamp(18px, 4vw, 48px);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: clamp(18px, 3vw, 34px);
    }
    .more {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
          80% 60% at 50% 30%,
          rgba(247, 106, 161, 0.18) 0%,
          rgba(0, 0, 0, 0) 60%
        ),
        rgba(20, 10, 30, 0.55);
      backdrop-filter: blur(20px);
      z-index: 2;
      animation: fade 0.5s;
    }
    @media (max-width: 1200px) {
      padding: 0 1.5vw;
    }
    @media (max-width: 720px) {
      .all {
        padding: 84px 18px 72px;
        align-items: flex-start;
      }
    }
  }
  .menu {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 18px;
    left: calc(50% - 30px);
    width: 60px;
    height: 38px;
    border: 1px solid var(--glass-border);
    background: var(--glass-medium);
    backdrop-filter: blur(12px) saturate(140%);
    color: var(--text-normal);
    border-radius: 999px;
    cursor: pointer;
    box-shadow: var(--shadow-petal);
    transition:
      transform 0.25s ease,
      background-color 0.25s ease;
    animation: fade 0.5s;
    &:hover {
      background: var(--glass-strong);
    }
    &:active {
      transform: scale(0.94);
    }
    .i-icon {
      transform: translateY(1px);
    }
    @media (min-width: 721px) {
      display: none;
    }
  }
}
</style>
