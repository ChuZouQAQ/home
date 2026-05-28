<template>
  <div
    class="hitokoto cards"
    v-show="!store.musicOpenState"
    @mouseenter="openMusicShow = true"
    @mouseleave="openMusicShow = false"
    @click.stop
  >
    <!-- 打开音乐面板 -->
    <Transition name="el-fade-in-linear">
      <div
        class="open-music"
        v-show="openMusicShow && store.musicIsOk"
        @click="store.musicOpenState = true"
      >
        <music-menu theme="filled" size="18" fill="#ffe9f3" />
        <span>打开音乐播放器</span>
      </div>
    </Transition>
    <!-- 一言内容 -->
    <Transition name="el-fade-in-linear" mode="out-in">
      <div
        :key="hitokotoData.text"
        class="content"
        title="点击换一句"
        @click="updateHitokoto"
      >
        <span class="petal-mark" aria-hidden="true">🌸</span>
        <span class="text">{{ hitokotoData.text }}</span>
        <span class="from">— {{ hitokotoData.from }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { MusicMenu, Error } from "@icon-park/vue-next";
import { getHitokoto } from "@/api";
import { mainStore } from "@/store";
import debounce from "@/utils/debounce.js";

const store = mainStore();

// 开启音乐面板按钮显隐
const openMusicShow = ref(false);

// 一言数据
const hitokotoData = reactive({
  text: "等风来，不如追风去。",
  from: "梓",
});

// 获取一言数据
const getHitokotoData = () => {
  getHitokoto()
    .then((res) => {
      hitokotoData.text = res.hitokoto;
      hitokotoData.from = res.from;
    })
    .catch(() => {
      ElMessage({
        message: "一言获取失败",
        icon: h(Error, {
          theme: "filled",
          fill: "#ffb3d0",
        }),
      });
      hitokotoData.text = "等风来，不如追风去。";
      hitokotoData.from = "梓";
    });
};

// 更新一言数据
const updateHitokoto = () => {
  // 防抖
  debounce(() => {
    getHitokotoData();
  }, 500);
};

onMounted(() => {
  getHitokotoData();
});
</script>

<style lang="scss" scoped>
.hitokoto {
  width: 100%;
  height: 100%;
  padding: 22px;
  cursor: pointer;
  animation: fade 0.5s;

  .open-music {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(90deg, rgba(247, 106, 161, 0.55), rgba(216, 79, 142, 0.55));
    padding: 6px 0;
    border-radius: var(--r-md) var(--r-md) 0 0;
    cursor: pointer;
    transition: filter 0.2s;

    &:hover { filter: brightness(1.08); }

    .i-icon {
      width: 18px;
      height: 18px;
      display: block;
      margin-right: 8px;
    }
    span {
      font-size: 0.95rem;
      letter-spacing: 0.5px;
    }
  }

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;

    .petal-mark {
      position: absolute;
      top: -4px;
      left: -4px;
      font-size: 1rem;
      opacity: 0.9;
      animation: sakura-pulse 3s ease-in-out infinite;
    }

    .text {
      font-size: 1.08rem;
      line-height: 1.65;
      word-break: break-word;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      padding-left: 22px;
    }
    .from {
      margin-top: 10px;
      font-weight: 600;
      align-self: flex-end;
      font-size: 1rem;
      color: var(--sakura-100);
    }
  }
}
</style>
