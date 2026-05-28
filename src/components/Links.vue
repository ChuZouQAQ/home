<template>
  <div v-if="siteLinks[0]" class="links">
    <div class="line">
      <Icon size="20">
        <Link />
      </Icon>
      <span class="title">网站直达</span>
      <span class="title-deco" aria-hidden="true">🌸</span>
      <span class="line-rule" aria-hidden="true" />
    </div>
    <!-- 网站列表 -->
    <div class="link-list">
      <div
        v-for="item in siteLinks"
        :key="item.name"
        class="item cards"
        @click="jumpLink(item)"
        :title="item.link"
      >
        <span class="petal-bg" aria-hidden="true" />
        <Icon size="26" class="link-icon">
          <component :is="siteIcon[item.icon]" />
        </Icon>
        <span class="name text-hidden">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@vicons/utils";
// 可前往 https://www.xicons.org 自行挑选并在此处引入
import { Link, CompactDisc, Compass, Book, Fire, LaptopCode } from "@vicons/fa";
import { mainStore } from "@/store";
import siteLinks from "@/assets/siteLinks.json";

const store = mainStore();

// 网站链接图标
const siteIcon = {
  CompactDisc,
  Compass,
  Book,
  Fire,
  LaptopCode,
};

// 链接跳转
const jumpLink = (data) => {
  if (data.name === "音乐" && store.musicClick) {
    if (typeof $openList === "function") $openList();
  } else {
    window.open(data.link, "_blank");
  }
};
</script>

<style lang="scss" scoped>
.links {
  margin-top: 0.5rem;

  .line {
    margin: 1.45rem 0.25rem 0.9rem;
    display: flex;
    align-items: center;
    animation: fade 0.5s;

    .xicon {
      color: var(--sakura-200);
      filter: drop-shadow(0 0 6px rgba(255, 179, 208, 0.4));
    }

    .title {
      margin-left: 8px;
      font-size: 1.08rem;
      font-weight: 600;
      letter-spacing: 0;
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    }
    .title-deco {
      margin-left: 8px;
      font-size: 1rem;
      animation: sakura-pulse 3s ease-in-out infinite;
    }
    .line-rule {
      flex: 1;
      height: 1px;
      margin-left: 14px;
      background: linear-gradient(
        90deg,
        rgba(255, 232, 244, 0.45),
        rgba(255, 232, 244, 0)
      );
    }
  }

  .link-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;

    .item {
      position: relative;
      min-height: 98px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      padding: 0 12px;
      cursor: pointer;
      overflow: hidden;
      animation: fade 0.5s;

      .petal-bg {
        position: absolute;
        top: -28px;
        right: -28px;
        width: 110px;
        height: 110px;
        background: radial-gradient(
          circle,
          rgba(255, 179, 208, 0.35) 0%,
          rgba(255, 179, 208, 0) 65%
        );
        opacity: 0.7;
        transition: opacity 0.3s, transform 0.4s ease;
        pointer-events: none;
      }

      .link-icon {
        color: var(--sakura-200);
        filter: drop-shadow(0 4px 10px rgba(35, 18, 54, 0.22));
        transition: color 0.25s, transform 0.3s ease;
      }

      .name {
        font-size: 1rem;
        margin-left: 10px;
        letter-spacing: 0;
        font-weight: 500;
      }

      &:hover {
        .link-icon {
          color: #fff;
          transform: scale(1.12) rotate(-6deg);
        }
        .petal-bg {
          opacity: 1;
          transform: scale(1.1);
        }
        .name {
          color: #fff;
        }
      }

      @media (min-width: 720px) and (max-width: 820px) {
        padding: 0 8px;
        .name {
          font-size: 0.95rem;
          margin-left: 8px;
        }
      }

      @media (max-width: 720px) {
        min-height: 88px;
      }

      @media (max-width: 460px) {
        min-height: 90px;
        flex-direction: column;
        padding: 0 6px;
        .name {
          font-size: 0.95rem;
          margin-left: 0;
          margin-top: 8px;
        }
      }
    }

    @media (max-width: 720px) {
      gap: 12px;
    }
  }
}
</style>
