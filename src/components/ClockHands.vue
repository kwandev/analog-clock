<template>
  <div class="resource clock_hands">
    <div class="hands" :style="handsStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const $props = defineProps<{
  deg: number;
}>();

const handsStyle = computed(() => `transform: rotateZ(${$props.deg}deg)`);
</script>

<style lang="scss" scoped>
.resource.clock_hands {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  display: flex;
  justify-content: center;

  .hands {
    height: 50%;
    background-color: #fff;
    border-radius: 4px;
    transform-origin: 50% 100%;
  }

  &.hours {
    width: 50%;
    height: 50%;

    .hands {
      width: px(6);
    }
  }
  &.minutes {
    width: 70%;
    height: 70%;

    .hands {
      width: px(4);
    }
  }
  &.seconds {
    width: 85%;
    height: 85%;

    .hands {
      width: px(1);
      background-color: deeppink;
    }
  }
}
</style>
