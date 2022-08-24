<template>
  <button class="selector" :class="{ 'selector--dark': dark}">
      Wybierz wyścig
    <img class="arrow" src="/ui/arrow-right.svg" alt="arrow" width="25px" height="25px">
      <div class="arrow_wrapper"><i class="arrow arrow--down"></i></div>

    <div class="selector__options">
      <div class="selector__options-value">
        test
      </div>

      <div class="selector__options-value">
        test
      </div>

      <div class="selector__options-value">
        test
      </div>

      <div class="selector__options-value">
        test
      </div>
    </div>
  </button>


</template>

<script>
export default {
  name: "BaseSelects",
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.selector {
  display: flex;
  align-items: center;
  border-radius: 10px;
  position: relative;
  background-color: $color-primary;
  color: black;
  border: none;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25));
  padding: 1rem 1.2rem;

  &:hover > &__options {
    visibility: visible;
    opacity: 95;
  }

  &--dark {
    background-color: black !important;
    color: $color-primary !important;
  }

  &__options {
    visibility: hidden;
    position: absolute;
    width: 100%;
    top: 90%;
    left: 0;
    right: 0;
    background-color: $color-grey-dark;
    color: white;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 999;
    opacity: 0;
    transition: all .5s;

    &-value {
      padding: .7rem;
      cursor: pointer;

      &:hover {
        background-color: lighten($color-grey-dark, 15%);
      }
    }
  }
}


.arrow {
}

</style>
