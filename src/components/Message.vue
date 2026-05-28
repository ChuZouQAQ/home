<template>
  <!-- 基本信息 -->
  <div class="message">
    <!-- Logo -->
    <div class="logo">
      <div class="logo-img-wrap">
        <img class="logo-img" :src="siteLogo" alt="logo" />
        <span class="halo" aria-hidden="true" />
      </div>
      <div :class="{ name: true, 'text-hidden': true, long: siteUrl[0].length >= 6 }">
        <span class="bg">{{ siteUrl[0] }}</span>
        <span class="sm">.{{ siteUrl[1] }}</span>
      </div>
    </div>
    <!-- 简介 -->
    <div class="description cards" @click="changeBox" :title="boxOpenable ? '点击展开 / 收起 时光胶囊' : ''">
      <div class="content">
        <Icon size="16">
          <QuoteLeft />
        </Icon>
        <div class="text">
          <p>{{ descriptionText.hello }}</p>
          <p>{{ descriptionText.text }}</p>
        </div>
        <Icon size="16">
          <QuoteRight />
        </Icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@vicons/utils";
import { QuoteLeft, QuoteRight } from "@vicons/fa";
import { Error } from "@icon-park/vue-next";
import { mainStore } from "@/store";
const store = mainStore();

// 主页站点logo
const siteLogo = import.meta.env.VITE_SITE_MAIN_LOGO;
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

// 是否能开启盒子
const boxOpenable = computed(() => store.getInnerWidth >= 990);

// 简介区域文字
const descriptionText = reactive({
  hello: import.meta.env.VITE_DESC_HELLO,
  text: import.meta.env.VITE_DESC_TEXT,
});

// 切换右侧功能区
const changeBox = () => {
  if (boxOpenable.value) {
    store.boxOpenState = !store.boxOpenState;
  } else {
    ElMessage({
      message: "当前页面宽度不足以开启盒子",
      grouping: true,
      icon: h(Error, {
        theme: "filled",
        fill: "#ffb3d0",
      }),
    });
  }
};

// 监听状态变化
watch(
  () => store.boxOpenState,
  (value) => {
    if (value) {
      descriptionText.hello = import.meta.env.VITE_DESC_HELLO_OTHER;
      descriptionText.text = import.meta.env.VITE_DESC_TEXT_OTHER;
    } else {
      descriptionText.hello = import.meta.env.VITE_DESC_HELLO;
      descriptionText.text = import.meta.env.VITE_DESC_TEXT;
    }
  },
);
</script>

<style lang="scss" scoped>
.message {
  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    animation: fade 0.5s;
    max-width: 460px;

    .logo-img-wrap {
      position: relative;
      width: 120px;
      height: 120px;
      flex-shrink: 0;

      .logo-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(255, 232, 244, 0.55);
        box-shadow: 0 8px 24px rgba(216, 79, 142, 0.35);
        position: relative;
        z-index: 1;
        transition: transform 0.4s ease;

        &:hover {
          transform: rotate(-6deg) scale(1.04);
        }
      }
      .halo {
        position: absolute;
        inset: -8px;
        border-radius: 50%;
        background: conic-gradient(
          from 90deg,
          rgba(255, 143, 184, 0.0),
          rgba(255, 143, 184, 0.55),
          rgba(255, 232, 244, 0.0),
          rgba(255, 143, 184, 0.55),
          rgba(255, 143, 184, 0.0)
        );
        filter: blur(8px);
        animation: blossom-spin 9s linear infinite;
        z-index: 0;
      }
    }

    .name {
      width: 100%;
      padding-left: 22px;
      transform: translateY(-8px);
      font-family: "Pacifico-Regular";
      color: #fff;
      letter-spacing: 0;
      filter: drop-shadow(0 10px 18px rgba(20, 12, 45, 0.35));
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.28);
      text-shadow:
        0 2px 0 rgba(255, 255, 255, 0.2),
        0 8px 18px rgba(24, 13, 56, 0.36),
        0 0 26px rgba(255, 176, 205, 0.32);

      .bg {
        font-size: 4.7rem;
        line-height: 1;
        background: linear-gradient(180deg, #ffffff 8%, #ffeaf3 48%, #f8b8d6 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .sm {
        margin-left: 6px;
        font-size: 1.95rem;
        line-height: 1;
        color: #fff8fc;
        -webkit-text-fill-color: #fff8fc;
        text-shadow:
          0 1px 0 rgba(255, 255, 255, 0.25),
          0 6px 14px rgba(24, 13, 56, 0.32);
        @media (min-width: 720px) and (max-width: 789px) {
          display: none;
        }
      }
    }
    @media (max-width: 768px) {
      .logo-img-wrap {
        width: 100px;
        height: 100px;
      }
      .name {
        height: 128px;
        .bg {
          font-size: 4rem;
        }
      }
    }

    @media (max-width: 720px) {
      max-width: 100%;
    }
  }

  .description {
    padding: 1.15rem 1.25rem;
    margin-top: 2.5rem;
    max-width: 460px;
    animation: fade 0.5s;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: -30px;
      right: -30px;
      width: 120px;
      height: 120px;
      background: radial-gradient(
        circle,
        rgba(255, 179, 208, 0.32) 0%,
        rgba(255, 179, 208, 0) 65%
      );
      pointer-events: none;
    }

    .content {
      display: flex;
      justify-content: space-between;
      position: relative;
      z-index: 1;

      .text {
        margin: 0.65rem 1rem;
        line-height: 1.85rem;
        margin-right: auto;

        p {
          &:nth-of-type(1) {
            font-family: "Pacifico-Regular";
            font-size: 1.55rem;
            background: linear-gradient(180deg, #ffffff 0%, #ffd0e3 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.4;
            margin-bottom: 4px;
          }
          &:nth-of-type(2) {
            color: var(--text-soft);
            font-size: 0.95rem;
          }
        }
      }

      .xicon { color: var(--sakura-200); }
      .xicon:nth-of-type(2) {
        align-self: flex-end;
      }
    }
    @media (max-width: 720px) {
      max-width: 100%;
      pointer-events: none;
    }
  }
  @media (max-width: 390px) {
    .logo {
      flex-direction: column;
      .logo-img-wrap { display: none; }
      .name {
        margin-left: 0;
        height: auto;
        transform: none;
        text-align: center;
        padding-left: 0;
        .bg { font-size: 3.2rem; }
        .sm { font-size: 1.25rem; }
      }
    }
    .description {
      margin-top: 2.5rem;
    }
  }
}
</style>
