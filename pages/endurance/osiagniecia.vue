<template>
<div>
  <MainHeader />

  <div class="information">

    <BaseInformationList title="Hypercar" :list="[
        'Mistrzostwo klasy Hypercar drugiego sezonu Project Endurance',
        'P2 #666 - 6 Hours of Interlagos ProjectEndurance (Glickenhouse 007) - 2 Października 2022',
        'P1 #666 - 6 Hours of Road America ProjectEndurance (Glickenhouse 007) - 16 Października 2022',
        'P1 #666 - 10 Hours of Road Atlanta ProjectEndurance (Glickenhouse 007) - 11 Grudnia 2022',
        'P2 #666 - 24 Hours of Daytona ProjectEndurance (Glickenhouse 007) - 7 Stycznia 2023',
        'P1 #666 - 8 Hours of Bahrain ProjectEndurance (Glickenhouse 007) - 26 Luty 2023',
        'P2 #666 - 6 Hours of Silverstone ProjectEndurance (Glickenhouse 007) - 14 Maj 2023'
    ]"/>

    <BaseInformationList title="LMP2" :list="[
        'P4 #665 - 12 Heures du Mans ProjectEndurance (Oreca 07 Gibson) - 17 Lipca 2022',
        'P3 #665 - 24 Hours of Daytona ProjectEndurance (Oreca 07) - 7 Stycznia 2023',
    ]"/>

    <BaseInformationList title="GTE" :list="[
        'P2 #666 w kwalifikacjach 24h La Sarthe - SOL Endurance',
        'P3 #664 - 6 Hours of Interlagos ProjectEndurance (Aston Martin GTE AMR) - 2 Października 2022',
        'P3 #664 - 6 Hours of Road America ProjectEndurance (Aston Martin GTE AMR) - 16 Października 2022',
        'P2 #664 - 10 Hours of Road Atlanta ProjectEndurance (Aston Martin GTE AMR) - 11 Grudnia 2022'
    ]"/>

    <BaseInformationList title="GT3" :list="[
        'Vice Mistrz pierwszego sezonu Project Endurance',
        'P2 #666 - 4 Hours of Bahrain ProjectEndurance (Porsche 911 GT3 R) - 27 Marca 2022',
        'P2 #666 - 500 Miles of Sebring ProjectEndurance (Porsche 911 GT3 R) - 10 Kwietnia 2022',
        'P2 #666 - 4 Hours of Barcelona ProjectEndurance (Porsche 911 GT3 R) - 14 Maj 2022',
        'P1 #666 - 4 Hours of Monza ProjectEndurance (Porsche 911 GT3 R) - 5 Czerwca 2022',
        'P2 #666 - 6 Hours of Spa ProjectEndurance (Porsche 911 GT3 R) - 26 Czerwca 2022',
        'P2 #666 - 12 Heures du Mans ProjectEndurance (Porsche 911 GT3 R) - 17 Lipca 2022'
    ]"/>
  </div>
</div>
</template>

<script setup>
import MainHeader from "../../components/layout/MainHeader";
import BaseInformationList from "../../components/shared/BaseInformationList";

</script>

<style lang="scss">
.information {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image_information {
  display: flex;
  margin-top: 1rem;
  width: auto;
  height: 200px;
}

.header_information {
  font-weight: bold;
  font-size: 2rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  word-wrap: break-word;

  @include mobileAndUp() {
    font-size: 4rem;
  }
}


</style>
