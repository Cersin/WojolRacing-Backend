<template>
  <div class="header margin-bottom--sm margin-top--sm">
    <span>{{ splitTitle[0] }}</span> {{ splitTitle[1] }}
  </div>
</template>

<script>
export default {
  name: "BaseHeader",
  props: {
    title: {
      type: String,
      required: true
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

  @include mobileAndUp() {
    font-size: 4rem;
  }

  span {
    color: $color-primary;
  }
}

</style>
