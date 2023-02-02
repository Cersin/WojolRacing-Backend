<template>
  <div class="sponsors">
    <div class="image__wrapper" v-for="(image, key) in images" :key="key">
      <a :href="image.link">
        <img  :alt="image.name" :src="`/partners/${image.src}`">
      </a>
    </div>
  </div>
</template>

<script setup>

const images = [
  {
    name: 'Irtrack',
    src: 'irtrack.png',
    link: 'https://www.irtrack.pl/'
  },
  {
    name: 'Frontszymon',
    src: 'frontszymon_fioletowe.png',
    link: 'https://frontszymon.pl/'
  },
  {
    name: 'Kja',
    src: 'kja.png',
    link: 'https://linktr.ee/kjadsgn'
  },
  {
    name: 'Project Endurance',
    src: 'pe_biale.png',
    link: 'https://projectendurance.pl/'
  },
  {
    name: 'RaceTracks',
    src: 'racetracks_biale.png',
    link: 'https://racetracks.pl/'
  },
  {
    name: 'SimShop',
    src: 'simshop_logo.png',
    link: 'https://simshop.pl/'
  },
  {
    name: 'Exerion',
    src: 'exerion_logo.png',
    link: 'https://exerion.pl/'
  },
]
</script>

<style scoped lang="scss">
.sponsors {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 3rem 2rem;
  overflow: hidden;
  padding: 0 3rem;

  display: flex;
  gap: 4rem;

  img {
    height: 3rem;
    width: auto;
  }
}

.image__wrapper {
  animation-name: move;
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: linear;
}

@keyframes move {
  0%   {
    transform: translate(0);
  }

  50% {
    transform: translate(-200px);
  }

  100% {
    transform: translate(200px);
  }

}
</style>