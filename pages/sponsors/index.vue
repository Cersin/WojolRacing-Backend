<template>
  <div>
    <MainHeader />

    <BaseSponsor  v-for="(sponsor, index) in sponsorList"
                  :key="index"
                  :id="index"
                  :description="sponsor.description"
                  :img-link="sponsor.link"
                  :img-src="sponsor.imgSrc"/>
  </div>
</template>

<script setup>
import MainHeader from "../../components/layout/MainHeader";
import BaseSponsor from "../../components/shared/BaseSponsor";

const sponsorList = [
  {
    imgSrc: '/partners/plakatartlab.png',
    link: 'https://www.plakartlab.pl/',
    description: 'Plakart Lab to miejsce, gdzie sztuka i wyrażenie osobiste spotykają się w postaci pięknych plakatów. Nasz sklep oferuje wybór unikalnych i artystycznych plakatów, które dodają charakteru i wyjątkowego stylu każdemu pomieszczeniu. https://www.plakartlab.pl/'
  },
  {
    imgSrc: '/partners/drive_squad.png',
    link: 'https://drivesquad.pl/',
    description: 'Budowa, wynajem oraz obsługa samochodów do Motorsportu. Organizator markowego pucharu mini Super S Cup w ramach wyścigowych samochodowych mistrzostw polski. https://drivesquad.pl/'
  },
  {
    imgSrc: '/partners/racetracks_biale.png',
    link: 'https://racetracks.pl/',
    description: 'Modele torów 3D,nitki torów wyścigowych w formie neonów na ścianę. https://racetracks.pl/'
  },
  {
    imgSrc: '/partners/frontszymon_fioletowe.png',
    link: 'https://frontszymon.pl/',
    description: 'Tworzenie stron interneteowych dla Ciebie, tak jak lubisz. https://frontszymon.pl/'
  },
  {
    imgSrc: '/partners/trackirBig.png',
    link: 'https://www.irtrack.pl/',
    description: 'Systemy do śledzenia ruchów głowy, a także dodatki do simracingu. https://www.irtrack.pl/ '
  },
  {
    imgSrc: '/partners/difficult_big.png',
    link: 'https://www.instagram.com/difficult_js/',
    description: 'Jan "DiffiCult" Stróżecki - Dziennikarz oraz komentator sportowy'
  },
  {
    imgSrc: '/partners/simracing_centre.png',
    link: 'https://simracing-centre.com/',
    description: 'Explore the world of sim racing with Simracing Centre. Immerse yourself in our expertly crafted F1, WRC, and ACC programs.'
  },
  {
    imgSrc: '/partners/p1_logo_white.png',
    link: 'https://p1racingmodels.pl/',
    description: 'Sklep internetowy z modelami samochodów w skali, stworzonym z myślą o każdym pasjonacie motorsportu.'
  },
  {
    imgSrc: '/partners/sim_masters.png',
    link: 'https://www.simmasters.pl/',
    description: 'Sklep z sprzętem simracingowym!\n' +
      'Z kodem #WRL 5% zniżki!'
  },
  {
    imgSrc: '/partners/simfun_biale_transparent.png',
    link: 'https://simfun.pl/',
    description: 'Oferujemy najwyższej jakości symulatory, które daja uczucie pełnego wcielenia w świat wirtualnyuch wyścigów. Poczuj się jak prawdziwy kierowca!'
  }
]
</script>

<style scoped lang="scss">

</style>
