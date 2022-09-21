<template>
  <div class="circuit">
    <div class="circuit__header">
      {{ track }}
    </div>
    <div v-if="tracks[track]?.svg" id="motionPath">
      <div class="motion-path">
        <!-- Car -->
        <div class="car car1">
          <svg width="15" height="35">
            <image x="3" width="14" height="39" xlink:href="data:img/png;base64,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"/>
          </svg>
        </div>

        <div class="circuit" v-html="tracks[track].svg"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import anime from "animejs";
import {onMounted, watch, ref} from "vue";
import { tracks } from "../../data/tracks";

const props = defineProps({
  track: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: null
  }
});

const animation = ref();

watch(() => props.track, (val) => {
  if (tracks[val]?.svg) {
    setTimeout(() => {
      if (anime.running.length === 0) {
        startAnimation();
      } else {
        const path = anime.path('#motionPath .circuit path');
        animation.value.pause();
        startAnimation();
      }
    }, 1000)
  }
})

onMounted(() => {
  if (tracks[props.track]?.svg) {
    startAnimation();
  }
})

function startAnimation() {
  const path = anime.path('#motionPath .circuit path');
  animation.value = anime({
    targets: '#motionPath .car1',
    translateX: path('x'),
    translateY: path('y'),
    rotate: path('angle'),
    easing: 'linear',
    duration: 20000,
    loop: true
  });
}

</script>

<style scoped lang="scss">
.circuit {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  width: 100%;
  color: black;

  &__header {
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: bold;
  }
}
</style>

<style  lang="scss">
#motionPath {
}

.motion-path {
  position: relative;
}

.car {
  position: absolute;
  display: block;
  width: 20px;
  height: 50px;
  top: -9px;
  left: -9px;
  z-index: 30;
}

.car svg {
  transform: rotate(90deg);
  height: 100%;
}
</style>
