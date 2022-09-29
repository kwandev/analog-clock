<template>
  <div ref="refTooltip" class="resource tooltip" :style="tooltipPosition">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

interface Position {
  mouseX: number;
  mouseY: number;
  marginX: number;
  marginY: number;
}

const $props = defineProps<{
  message: string;
  position: Position;
}>();

const refTooltip = ref<HTMLImageElement | null>(null);
const tooltipElementRect = ref({ height: 0 });
const tooltipPosition = computed(
  () => `
    top: ${$props.position.mouseY - $props.position.marginY - tooltipElementRect.value.height}px;
    left: ${$props.position.mouseX - $props.position.marginX}px;
  `
);

onMounted(() => {
  if (refTooltip.value) {
    tooltipElementRect.value = refTooltip.value.getBoundingClientRect();
  }
});
</script>

<style lang="scss" scoped>
.resource.tooltip {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: px(80);
  height: px(28);
  background-color: #fff;
  border-radius: px(4);
}
</style>
