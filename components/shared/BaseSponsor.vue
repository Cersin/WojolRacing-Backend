<template>
  <div class="sponsor">
    <a :href="imgLink" :class="{order: imageOrder}">
      <img :src="imgSrc" alt="logo_sponsor">
    </a>
    <div class="description">
      {{ description }}
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  imgSrc: {
    type: String,
    required: true,
  },
  imgLink: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    default: 0,
  }
})

const imageOrder = computed(() => {
  return props.id % 2 === 0
})
</script>

<style scoped lang="scss">
.sponsor {
  display: flex;
  padding: 3rem 1rem;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  text-align: left;
  border: .2px solid $color-primary;
  border-radius: 25px;
  margin: 1rem;

  @include tabletAndUp() {
    padding: 2rem 4rem;
    flex-direction: row;
  }

  .order {
    @include tabletAndUp() {
      order: 2;
    }
  }

  img {
    width: 200px;
    display: flex;
    height: auto

  }

  .description {
    font-size: 1.5rem;
  }
}

</style>
