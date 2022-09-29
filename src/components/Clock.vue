<template>
  <div
    ref="refClock"
    class="resource clock"
    @mouseenter="onMoouseEnter"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <ClockHands class="hours" :deg="degHours" />
    <ClockHands class="minutes" :deg="degMinutes" />
    <ClockHands class="seconds" :deg="degSeconds" />

    <Tooltip v-if="tooltip && showTooltip" :message="tooltipMessage" :position="tooltipPosition" />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import ClockHands from '@/components/ClockHands.vue';
import Tooltip from '@/components/Tooltip.vue';

import { useClockStore } from '@/store/clock';

const $props = defineProps<{
  tooltip?: boolean;
}>();

const clockStore = useClockStore();

let clockInterval: number | null = null;

const DEG = 6;
const degSeconds = computed(() => clockStore.getTimeSeconds * DEG);
const degMinutes = computed(() => clockStore.getTimeMinutes * DEG);
const degHours = computed(() => clockStore.getTimeHours * 30 + degMinutes.value / 12);

const showTooltip = ref(false);
const tooltipMessage = computed(() => clockStore.getTimeMessage);
const tooltipPosition = ref({
  mouseX: 0,
  mouseY: 0,
  marginX: 0,
  marginY: 0,
});
const refClock = ref<HTMLImageElement | null>(null);
const clockElementRect = ref({ x: 0, y: 0 });
const setTooltipPosition = (e: MouseEvent) => {
  tooltipPosition.value.mouseX = e.pageX;
  tooltipPosition.value.mouseY = e.pageY;
  tooltipPosition.value.marginX = clockElementRect.value.x;
  tooltipPosition.value.marginY = clockElementRect.value.y;
};
const onMoouseEnter = (e: MouseEvent) => {
  if (!$props.tooltip) {
    return;
  }

  setTooltipPosition(e);
  showTooltip.value = true;
};
const onMouseMove = (e: MouseEvent) => {
  if (!$props.tooltip) {
    return;
  }

  setTooltipPosition(e);
};
const onMouseLeave = () => {
  if (!$props.tooltip) {
    return;
  }
  showTooltip.value = false;
};

onMounted(() => {
  clockInterval = setInterval(() => {
    clockStore.setTime(new Date());
  }, 1000);

  if ($props.tooltip && refClock.value) {
    clockElementRect.value = refClock.value.getBoundingClientRect();
  }
});

onBeforeUnmount(() => {
  if (clockInterval !== null) {
    clearInterval(clockInterval);
  }
});
</script>

<style lang="scss" scoped>
.resource.clock {
  position: relative;
  width: px(400);
  height: px(400);
  background-color: rgba(0, 0, 10, 0.7);
  border-radius: 50%;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: px(16);
    height: px(16);
    background-color: rgba(0, 0, 0, 1);
    border-radius: 50%;
  }
}
</style>
