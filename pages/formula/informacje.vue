<template>
<div>
  <MainHeader />

  <div class="information">
    <img class="image_information" src="/wojol_ex-biale.png" alt="Logo Wojol F1"/>

    <BaseInformationList title="Wyścigi" :list="[
        'Split F1 - Poniedziałek 19:30',
        'Split F2 - Czwartek 19:30',
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
        '1 Miejsce: PLAYSEAT Challenge + Puchar',
        '2 Miejsce: Zestaw IRTrack + Puchar',
        '3 Miejsce: Steam Link + Puchar',
    ]"/>

    <BaseInformationList title="Split F1" :list="[
        '1 Miejsce: Zestaw IRTrack + Puchar + Statuetka',
        '2 Miejsce: Puchar + Statuetka',
        '3 Miejsce: Puchar + Statuetka',
    ]"/>

    <BaseInformationList title="Zapisy" :list="[
        'Aby zapisać się do sezonu, trzeba dołączyć na naszego discorda, wybrać rangę F1, wtedy pojawią się wszystkie kanały związane z ligą wraz z formularzem zapisów.\n'+
'    Do zgłoszenia się potrzebujecie swojego czasu z próby czasowej: Meksyk(sucho)',
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
