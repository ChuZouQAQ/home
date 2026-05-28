<template>
  <!-- 音乐入口面板 -->
  <div class="music" v-show="store.musicOpenState">
    <div class="btns">
      <span @click="openMusicList()">音乐列表</span>
      <span @click="store.musicOpenState = false">回到一言</span>
    </div>
    <div class="cover" @click="openMusicList()">
      <music-one theme="filled" size="56" fill="#efefef" />
    </div>
    <div class="menu">
      <span class="name">Apple Music</span>
    </div>
  </div>

  <!-- Apple Music 弹窗 -->
  <Transition name="fade" mode="out-in">
    <div class="music-list" v-show="musicListShow" @click="musicListShow = false">
      <Transition name="zoom">
        <div class="list" v-show="musicListShow" @click.stop>
          <close-one
            class="close"
            theme="filled"
            size="28"
            fill="#ffffff60"
            @click="musicListShow = false"
          />
          <iframe
            v-if="iframeMounted"
            class="apple-music"
            allow="autoplay *; encrypted-media *; fullscreen *;"
            frameborder="0"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            :src="embedUrl"
          />
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { MusicOne, CloseOne } from "@icon-park/vue-next";
import { mainStore } from "@/store";
const store = mainStore();

// Apple Music 嵌入地址（在 .env 配置）
const embedUrl = import.meta.env.VITE_APPLE_MUSIC_EMBED;

// 弹窗状态
const musicListShow = ref(false);
// iframe 懒挂载，避免一进站就加载 Apple Music
const iframeMounted = ref(false);

// 开启播放列表
const openMusicList = () => {
  iframeMounted.value = true;
  musicListShow.value = true;
};

onMounted(() => {
  // 标记音乐功能可用，Hitokoto 上的小图标即显示
  store.musicIsOk = true;
  // 挂载方法至 window，兼容旧的快捷调用
  window.$openList = openMusicList;
});
</script>

<style lang="scss" scoped>
.music {
  width: 100%;
  height: 100%;
  background: #00000040;
  backdrop-filter: blur(10px);
  border-radius: 6px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  animation: fade 0.5s;
  .btns {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    span {
      background: #ffffff26;
      padding: 2px 8px;
      border-radius: 6px;
      margin: 0px 6px;
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        background: #ffffff4d;
      }
    }
  }
  .cover {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #ffffff1a;
    cursor: pointer;
    transition: transform 0.3s;
    &:hover {
      background: #ffffff33;
      transform: scale(1.05);
    }
    &:active {
      transform: scale(0.95);
    }
  }
  .menu {
    height: 26px;
    width: 100%;
    line-height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    .name {
      text-align: center;
      font-size: 0.95rem;
      letter-spacing: 0.5px;
    }
  }
}
.music-list {
  position: fixed;
  top: 0;
  left: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  backdrop-filter: blur(20px);
  z-index: 1;
  .list {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: calc(50% - 300px);
    left: calc(50% - 320px);
    width: 640px;
    height: 600px;
    background-color: transparent;
    border-radius: 12px;
    z-index: 999;
    overflow: hidden;
    @media (max-width: 720px) {
      left: calc(50% - 45%);
      width: 90%;
    }
    .close {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 28px;
      height: 28px;
      display: block;
      z-index: 2;
      cursor: pointer;
      &:hover {
        transform: scale(1.2);
      }
      &:active {
        transform: scale(0.95);
      }
    }
    .apple-music {
      width: 100%;
      height: 100%;
      border: 0;
      border-radius: 12px;
      background: transparent;
      overflow: hidden;
    }
  }
}

// 弹窗动画
.zoom-enter-active {
  animation: zoom 0.4s ease-in-out;
}
.zoom-leave-active {
  animation: zoom 0.3s ease-in-out reverse;
}
@keyframes zoom {
  0% {
    opacity: 0;
    transform: scale(0) translateY(-600px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
