<template>
<div>
  <MainHeader />

  <div class="information">
    <img class="image_information" src="/logo_wojol.png" alt="Logo Wojol F1"/>

    <BaseInformationList title="Wyścigi" :list="[
        'Split F1 - Czwartek 19:30',
        'Split F2 - Środa 19:30',
        'Platforma: Steam'
    ]"/>

    <BaseInformationList title="Asysty" :list="[
        'Linia wyścigowa: Dobrowolnie',
        'Skrzynia biegów: Dobrowolnie',
        'ABS: Dobrowolnie',
        'Kontrola trakcji: Średnia',
        'Wspomaganie w boksach: Wyłączone',
        'Automatyczny DRS i ERS: Wyłączone'
    ]"/>

    <BaseInformationList style="font-size: 2rem; margin: 0" title="Nagrody"/>

    <BaseInformationList title="Split F1" :list="[
        'Miejsce 1: Puchar +  Button Box Pro + Shaketrack',
        'Miejsce 2: Puchar + IRTrack + Gear Indicator',
        'Miejsce 3: Puchar + IRTrack + Podkładka pod mysz AUKEY KM-P4 120x60',
    ]"/>

    <BaseInformationList title="Split F1" :list="[
        'Miejsce 1: Puchar + Statuetka + IRTrack',
        'Miejsce 2: Puchar + Statuetka + Podkładka pod mysz AUKEY KM-P4 120x60',
        'Miejsce 3: Puchar + Statuetka',
    ]"/>

    <BaseInformationList title="Zapisy" :list="[
        'Aby zapisać się do sezonu, trzeba dołączyć na naszego discorda, wybrać rangę F1, wtedy pojawią się wszystkie kanały związane z ligą wraz z formularzem zapisów.',
        'https://discord.com/invite/6MSNv53ekR',
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
  height: 300px;
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
