<template>
  <div>
    <MainHeader />

    <BaseSponsor  v-for="(sponsor, index) in sponsorList"
                  :key="index"
                  :id="index"
                  :description="sponsor.description"
                  :img-src="sponsor.imgSrc"/>
  </div>
</template>

<script setup>
import MainHeader from "../../components/layout/MainHeader";
import BaseSponsor from "../../components/shared/BaseSponsor";

const sponsorList = [
  {
    imgSrc: '/partners/exerion_logo.png',
    description: 'Wszystko czego potrzebujesz do Simracingu. https://exerion.pl/'
  },
  {
    imgSrc: '/partners/drive_squad.png',
    description: 'Budowa, wynajem oraz obsługa samochodów do Motorsportu. Organizator markowego pucharu mini Super S Cup w ramach wyścigowych samochodowych mistrzostw polski. https://drivesquad.pl/'
  },
  {
    imgSrc: '/partners/racetracks_biale.png',
    description: 'Modele torów 3D,nitki torów wyścigowych w formie neonów na ścianę. https://racetracks.pl/'
  },
  {
    imgSrc: '/partners/frontszymon_fioletowe.png',
    description: 'Tworzenie stron interneteowych dla Ciebie, tak jak lubisz. https://frontszymon.pl/'
  },
  {
    imgSrc: '/partners/trackirBig.png',
    description: 'Systemy do śledzenia ruchów głowy, a także dodatki do simracingu. https://www.irtrack.pl/ '
  },
  {
    imgSrc: '/partners/kiwi.png',
    description: 'Kiwi Auto Centrum - Kompleksowe usługi z zakresu mechaniki pojazdów, likwidacja szkód, samochody zastępcze oraz car detailing. https://www.kiwiautocentrum.pl/'
  }
]
</script>

<style scoped lang="scss">

</style>
