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
    imgSrc: '/partners/truesim.png',
    link: 'https://www.truesim.pl/',
    description: 'Wysokiej jakości sprzęt simracingowy w dobrej cenie. Shiftery, Button Boxy oraz inne akcesoria specjalnie dla Ciebie. https://www.truesim.pl/'
  },
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
    imgSrc: '/partners/kiwi.png',
    link: 'https://kiwiautocentrum.pl/',
    description: 'Kiwi Auto Centrum - Kompleksowe usługi z zakresu mechaniki pojazdów, likwidacja szkód, samochody zastępcze oraz car detailing. https://www.kiwiautocentrum.pl/'
  },
  {
    imgSrc: '/partners/difficult_big.png',
    link: 'https://www.instagram.com/difficult_js/',
    description: 'Jan "DiffiCult" Stróżecki - Dziennikarz oraz komentator sportowy'
  }
]
</script>

<style scoped lang="scss">

</style>
