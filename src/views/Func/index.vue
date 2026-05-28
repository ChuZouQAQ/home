<template>
  <!-- 功能区域 -->
  <div :class="store.mobileFuncState ? 'function mobile' : 'function'">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="left">
          <Hitokoto />
          <Music v-if="playerHasId" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="right cards">
          <span class="petal-deco" aria-hidden="true">🌸</span>
          <div class="time">
            <div class="date">
              <span>{{ currentTime.year }}&nbsp;·&nbsp;</span>
              <span>{{ currentTime.month }}&nbsp;·&nbsp;</span>
              <span>{{ currentTime.day }}&nbsp;</span>
              <span class="sm-hidden weekday">{{ currentTime.weekday }}</span>
            </div>
            <div class="text">
              <span>{{ currentTime.hour }}</span
              ><span class="colon">:</span><span>{{ currentTime.minute }}</span
              ><span class="colon">:</span><span>{{ currentTime.second }}</span>
            </div>
          </div>
          <span class="divider" aria-hidden="true" />
          <Weather />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { getCurrentTime } from "@/utils/getTime";
import { mainStore } from "@/store";
import Music from "@/components/Music.vue";
import Hitokoto from "@/components/Hitokoto.vue";
import Weather from "@/components/Weather.vue";

const store = mainStore();

// 当前时间
const currentTime = ref({});
const timeInterval = ref(null);

// 播放器嵌入 URL（为空则隐藏音乐入口）
const playerHasId = import.meta.env.VITE_APPLE_MUSIC_EMBED;

// 更新时间
const updateTimeData = () => {
  currentTime.value = getCurrentTime();
};

onMounted(() => {
  updateTimeData();
  timeInterval.value = setInterval(updateTimeData, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timeInterval.value);
});
</script>

<style lang="scss" scoped>
.function {
  height: 158px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &.mobile {
    .el-row {
      .el-col {
        &:nth-of-type(1) {
          display: contents;
        }
        &:nth-of-type(2) {
          display: none;
        }
      }
    }
  }
  .el-row {
    height: 100%;
    width: 100%;
    margin: 0 !important;
    .el-col {
      &:nth-of-type(1) {
        padding-left: 0 !important;
      }
      &:nth-of-type(2) {
        padding-right: 0 !important;
      }
      @media (max-width: 910px) {
        &:nth-of-type(1) {
          display: none;
        }
        &:nth-of-type(2) {
          padding: 0 !important;
          flex: none;
          max-width: none;
          width: 100%;
        }
      }
    }
    .left,
    .right {
      width: 100%;
      height: 100%;
    }
    .right {
      padding: 16px 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      animation: fade 0.5s;
      position: relative;
      overflow: hidden;

      .petal-deco {
        position: absolute;
        top: 8px;
        right: 12px;
        font-size: 0.95rem;
        opacity: 0.55;
        animation: sakura-pulse 3.5s ease-in-out infinite;
        pointer-events: none;
      }

      .divider {
        width: 58%;
        height: 1px;
        background: linear-gradient(
          90deg,
          rgba(255, 232, 244, 0),
          rgba(255, 232, 244, 0.35),
          rgba(255, 232, 244, 0)
        );
        margin: 6px 0 4px;
      }

      .time {
        font-size: 1rem;
        text-align: center;
        width: 100%;
        .date {
          color: var(--text-soft);
          font-size: 0.9rem;
          letter-spacing: 0.5px;
          text-overflow: ellipsis;
          overflow-x: hidden;
          white-space: nowrap;
          .weekday {
            color: var(--sakura-200);
            margin-left: 4px;
          }
        }
        .text {
          margin-top: 6px;
          font-size: clamp(2.35rem, 4vw, 2.85rem);
          letter-spacing: 0;
          font-family: "UnidreamLED";
          background: linear-gradient(180deg, #ffffff 0%, #ffd0e3 80%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 4px 18px rgba(247, 106, 161, 0.35);
          line-height: 1.05;
          .colon {
            opacity: 0.85;
            animation: colon-blink 1.2s steps(2, end) infinite;
            display: inline-block;
            transform: translateY(-2px);
            margin: 0 2px;
            -webkit-text-fill-color: #ffd0e3;
          }
        }
      }
      .weather {
        text-align: center;
        width: 100%;
        text-overflow: ellipsis;
        overflow-x: hidden;
        white-space: nowrap;
        color: var(--text-soft);
        font-size: 0.9rem;
      }
    }
  }
  @media (max-width: 720px) {
    height: 150px;
  }
}

@keyframes colon-blink {
  0%, 60%   { opacity: 1; }
  60.01%, 100% { opacity: 0.25; }
}
</style>
