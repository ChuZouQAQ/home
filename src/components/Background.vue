<template>
  <div :class="store.backgroundShow ? 'cover show' : 'cover'">
    <img
      v-show="store.imgLoadStatus"
      class="bg"
      alt="cover"
      :src="bgUrl"
      @load="imgLoadComplete"
      @error.once="imgLoadError"
      @animationend="imgAnimationEnd"
    />
    <!-- 樱花色调蒙版 -->
    <div :class="store.backgroundShow ? 'gray hidden' : 'gray'" />
    <Transition name="fade" mode="out-in">
      <a
        v-if="store.backgroundShow && store.coverType != '0'"
        class="down"
        :href="bgUrl"
        target="_blank"
      >
        🌸 下载壁纸
      </a>
    </Transition>
  </div>
</template>

<script setup>
import { mainStore } from "@/store";
import { Error } from "@icon-park/vue-next";

const store = mainStore();
const bgUrl = ref(null);
const imgTimeout = ref(null);
const emit = defineEmits(["loadComplete"]);

// 更换壁纸链接
const changeBg = (type) => {
  if (type == 0) {
    bgUrl.value = "/images/Sakura2.png";
  } else if (type == 1) {
    bgUrl.value = "https://api.dujin.org/bing/1920.php";
  } else if (type == 2) {
    bgUrl.value = "https://api.aixiaowai.cn/gqapi/gqapi.php";
  } else if (type == 3) {
    bgUrl.value = "https://api.aixiaowai.cn/api/api.php";
  }
};

// 图片加载完成
const imgLoadComplete = () => {
  imgTimeout.value = setTimeout(
    () => {
      store.setImgLoadStatus(true);
    },
    Math.floor(Math.random() * (600 - 300 + 1)) + 300,
  );
};

// 图片动画完成
const imgAnimationEnd = () => {
  console.log("壁纸加载且动画完成");
  // 加载完成事件
  emit("loadComplete");
};

// 图片显示失败
const imgLoadError = () => {
  console.error("壁纸加载失败：", bgUrl.value);
  ElMessage({
    message: "壁纸加载失败，已临时切换回默认樱花",
    icon: h(Error, {
      theme: "filled",
      fill: "#ffb3d0",
    }),
  });
  bgUrl.value = "/images/Sakura2.png";
};

onMounted(() => {
  // 加载壁纸
  changeBg(store.coverType);
});

onBeforeUnmount(() => {
  clearTimeout(imgTimeout.value);
});
</script>

<style lang="scss" scoped>
.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.25s;
  z-index: -1;

  &.show {
    z-index: 1;
  }

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    backface-visibility: hidden;
    filter: blur(20px) brightness(0.3);
    transition:
      filter 0.3s,
      transform 0.3s;
    animation: fade-blur-in 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    animation-delay: 0.45s;
  }

  /* 樱花色调蒙版：上明下暗，中央偏粉，便于阅读 */
  .gray {
    opacity: 1;
    position: absolute;
    inset: 0;
    background:
      radial-gradient(120% 80% at 20% 0%, rgba(255, 200, 224, 0.18) 0%, rgba(0, 0, 0, 0) 60%),
      radial-gradient(100% 80% at 80% 100%, rgba(120, 50, 110, 0.45) 0%, rgba(0, 0, 0, 0) 65%),
      linear-gradient(180deg, rgba(20, 10, 30, 0.05) 0%, rgba(20, 10, 30, 0.55) 100%);
    transition: 1.5s;

    &.hidden {
      opacity: 0;
      transition: 1.5s;
    }
  }

  .down {
    font-size: 15px;
    color: #fff;
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 22px;
    border-radius: 999px;
    background: var(--glass-medium);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(12px);
    box-shadow: var(--shadow-petal);
    width: max-content;
    height: auto;

    &:hover {
      transform: scale(1.04);
      background: var(--glass-strong);
      color: #fff;
    }
    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
