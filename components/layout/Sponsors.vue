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
    name: 'Cammus',
    src: 'cammus.png',
    link: 'https://cammusracing.com/'
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
  {
    name: 'Simracing Centre',
    src: 'simracing_centre.png',
    link: 'https://simracing-centre.com/',
  },
  {
    name: 'P1 Racing Models',
    src: 'p1_logo_white.png',
    link: 'https://p1racingmodels.pl/',
  },
  {
    name: 'Sim Masters',
    src: 'sim_masters.png',
    link: 'https://www.simmasters.pl/',
  },
  {
    name: 'Simfun',
    src: 'simfun_biale_transparent.png',
    link: 'https://simfun.pl/',
  }
]
</script>

<style scoped lang="scss">
.sponsors {
  overflow: hidden;
  padding: 0 3rem;
  justify-self: flex-end;
  display: flex;
  align-items:center;
  justify-content: center;
  gap: 4rem;
  width: 600px;


  img {
    width: 125px;
    height: auto;
  }
}

.image__wrapper {
  animation-name: move;
  animation-duration: 15s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: linear;
}

@keyframes move {
  0%   {
    transform: translate(-1000px);
  }



  100% {
    transform: translate(1000px);
  }

}
</style>
