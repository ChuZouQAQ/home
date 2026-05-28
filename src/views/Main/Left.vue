<template>
  <div :class="store.mobileOpenState ? 'left hidden' : 'left'">
    <Message />
    <SocialLinks />
  </div>
</template>

<script setup>
import { mainStore } from "@/store";
import Message from "@/components/Message.vue";
import SocialLinks from "@/components/SocialLinks.vue";
const store = mainStore();
</script>

<style lang="scss" scoped>
.left {
  width: min(46%, 500px);
  transform: translateY(12px);
  &.hidden {
    display: none;
  }
  @media (max-width: 720px) {
    width: 100%;
    transform: none;
  }
}
</style>
