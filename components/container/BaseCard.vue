<template>
  <div class="card" @click="redirect">
    <div class="card_title">

      {{ title }}
      <span></span>
    </div>

    <div class="card_image">
      <img :src="imagePath" :alt="title">
    </div>
  </div>
</template>

<script setup>
import {navigateTo} from "nuxt/app";

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  routePath: {
    type: String,
    required: true
  }
})

function redirect() {
  navigateTo({
    path: props.routePath
  });

}

</script>

<style scoped lang="scss">
.card {
  display: block;
  position: relative;

  width: 100%;
  height: 300px;
  cursor: pointer;

  &:hover > &_image > img {
    filter: saturate(100%);

    &:after {
      background-color: $color-primary;
    }
  }

  &:hover > &_title > span {
    flex: 1;
  }

  &_title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform-origin: 0 0;
    transform: rotate(90deg);
    font: bold 12px Sans-Serif;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: $color-primary;
    padding: 5px 10px;
    margin: 0 0 10px 0;
    line-height: 24px;

    span {
      transition: .7s;
      margin-left: 1rem;
      width: 50px;
      height: 5px;
      background-color: $color-primary;
    }
  }

  &_image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    position: relative;
    transition: 0.3s;

    img {
      transition: 2s;
      height: 100%;
      width: 100%;
      object-fit: cover;
      position: relative;
      z-index: 11;
      filter: saturate(15%);
    }

    &:after {
      transition: .5s;
      position: absolute;
      top: -30px;
      right: -40px;
      content: '';
      height: 100%;
      width: 100%;
      z-index: 10;
      border: 2px solid $color-primary;
      border-radius: 30px;
    }
  }
}

</style>