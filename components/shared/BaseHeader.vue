<template>
  <div class="header margin-bottom--sm margin-top--sm" :class="{'header--black': black}">
    <span v-for="(el, index) in splitTitle" :key="index">{{ el + ' ' }}</span>

    <!--    <span>{{ splitTitle[0] }}</span> {{ splitTitle[1] }}-->
  </div>
</template>

<script>
export default {
  name: "BaseHeader",
  props: {
    title: {
      type: String,
      required: true
    },
    black: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    splitTitle() {
      return this.title.split(' ');
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  font-weight: bold;
  font-size: 2rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  word-wrap: break-word;
  text-align: center;

  @include mobileAndUp() {
    font-size: 4rem;
  }

  span {
    &:first-child {
      color: $color-primary;
    }
  }
}

.header--black {
  span {
    &:first-child {
      color: black;
    }
  }
}

</style>
