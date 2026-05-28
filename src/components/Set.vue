<template>
  <div class="setting">
    <el-collapse class="collapse" v-model="activeName" accordion>
      <el-collapse-item title="个性壁纸" name="1">
        <div class="bg-set">
          <el-radio-group v-model="coverType" text-color="#ffffff" @change="radioChange">
            <el-radio label="0" size="large" border>樱花壁纸</el-radio>
            <el-radio label="1" size="large" border>每日一图</el-radio>
            <el-radio label="2" size="large" border>随机风景</el-radio>
            <el-radio label="3" size="large" border>随机动漫</el-radio>
          </el-radio-group>
        </div>
      </el-collapse-item>
      <el-collapse-item title="个性化调整" name="2">
        <div class="item">
          <span class="text">樱花飘落特效</span>
          <el-switch
            v-model="petalsEnabled"
            inline-prompt
            :active-icon="CheckSmall"
            :inactive-icon="CloseSmall"
          />
        </div>
        <div class="item">
          <span class="text">建站日期显示</span>
          <el-switch
            v-model="siteStartShow"
            inline-prompt
            :active-icon="CheckSmall"
            :inactive-icon="CloseSmall"
          />
        </div>
        <div class="item">
          <span class="text">音乐点击是否打开面板</span>
          <el-switch
            v-model="musicClick"
            inline-prompt
            :active-icon="CheckSmall"
            :inactive-icon="CloseSmall"
          />
        </div>
        <div class="item">
          <span class="text">底栏背景模糊</span>
          <el-switch
            v-model="footerBlur"
            inline-prompt
            :active-icon="CheckSmall"
            :inactive-icon="CloseSmall"
          />
        </div>
      </el-collapse-item>
      <el-collapse-item title="播放器配置" name="3">
        <div class="muted">设置内容待增加</div>
      </el-collapse-item>
      <el-collapse-item title="其他设置" name="4">
        <div class="muted">设置内容待增加</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { CheckSmall, CloseSmall, SuccessPicture } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import { storeToRefs } from "pinia";

const store = mainStore();
const { coverType, siteStartShow, musicClick, footerBlur, petalsEnabled } = storeToRefs(store);

// 默认选中项
const activeName = ref("1");

// 壁纸切换
const radioChange = () => {
  ElMessage({
    message: "壁纸设置成功，刷新后生效",
    icon: h(SuccessPicture, {
      theme: "filled",
      fill: "#ffb3d0",
    }),
  });
};
</script>

<style lang="scss" scoped>
.setting {
  .collapse {
    border-radius: var(--r-md);
    --el-collapse-content-bg-color: rgba(255, 255, 255, 0.06);
    border-color: transparent;
    overflow: hidden;
    border: 1px solid var(--glass-border);

    :deep(.el-collapse-item__header) {
      background-color: rgba(255, 255, 255, 0.18);
      color: var(--text-normal);
      font-size: 15px;
      padding-left: 18px;
      border-color: transparent;
      transition: background-color 0.25s ease;

      &:hover {
        background-color: rgba(255, 179, 208, 0.22);
      }
    }

    :deep(.el-collapse-item__wrap) {
      border-color: transparent;

      .el-collapse-item__content {
        padding: 18px 20px;

        .muted {
          color: var(--text-mute);
          font-size: 0.92rem;
          padding: 6px 4px;
        }

        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          padding: 6px 4px;

          & + .item {
            border-top: 1px dashed rgba(255, 255, 255, 0.12);
            margin-top: 6px;
            padding-top: 12px;
          }

          .el-switch__core {
            border-color: transparent;
            background-color: rgba(255, 255, 255, 0.22);
          }
          .el-switch.is-checked .el-switch__core {
            background-color: var(--sakura-500) !important;
          }
        }

        .bg-set {
          .el-radio-group {
            justify-content: space-between;

            .el-radio {
              margin: 8px 12px 8px 0;
              background: rgba(255, 255, 255, 0.14);
              border: 1.5px solid transparent;
              border-radius: var(--r-sm);
              transition: all 0.25s ease;

              .el-radio__label { color: var(--text-normal); }

              .el-radio__inner {
                background: rgba(255, 255, 255, 0.04) !important;
                border: 2px solid #ffe0ee !important;
              }

              &:hover {
                background: rgba(255, 179, 208, 0.18);
                border-color: rgba(255, 179, 208, 0.45);
              }

              &.is-checked {
                background: rgba(255, 143, 184, 0.22) !important;
                border: 1.5px solid var(--sakura-300) !important;
                box-shadow: 0 0 0 3px rgba(255, 143, 184, 0.18);
              }

              &.is-checked .el-radio__inner {
                background-color: var(--sakura-400) !important;
                border-color: #fff !important;
              }

              &.is-checked .el-radio__label {
                color: #fff !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
