<template>
  <div class="sponsors">
    <div class="image__wrapper"  v-for="(image, key) in images" :key="key">
      <a :href="image.link">
        <img :alt="image.name" :src="`/partners/${image.src}`">
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
    name: 'Drive Squad',
    src: 'drive_squad.png',
    link: 'https://drivesquad.pl/'
  },
  {
    name: 'Auto-KIWI',
    src: 'kiwi.png',
    link: 'https://kiwiautocentrum.pl/'
  },
  {
    name: 'TrueSim',
    src: 'truesim.png',
    link: 'https://www.truesim.pl/'
  },
  {
    name: 'Difficult',
    src: 'difficult_small.png',
    link: 'https://www.instagram.com/difficult_js/'
  },
  {
    name: 'Plakart Lab',
    src: 'plakatartlab.png',
    link: 'https://www.plakartlab.pl/'
  },
]
</script>

<style scoped lang="scss">
.sponsors {
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  padding: 0 3rem;
  justify-self: flex-end;

  display: flex;
  align-items:center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4rem;

  img {
    width: 125px;
    height: auto;
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
  }

  50% {
  }

  100% {
  }

}
</style>
