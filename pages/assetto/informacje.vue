<template>
<div>
  <MainHeader />

  <div class="information">
    <img class="image_information" src="/wojol_x_drivesquad_logo.png" alt="Logo Assetto"/>

    <BaseInformationList title="Terminy" :list="[
        'W celu wyłonienia stawki kierowców będą decydować prekwalifikacje do każdej rundy',
        'Dostaje się 25 najlepszych kierowców',
        'Podczas pierwszej rundy prekwalifikacje startują 20.04 i trwają do 4.05 22:00',
        'Prekwalifikacje do każdej kolejnej rundy rozpoczynają się od środy do niedzieli 22:00',
    ]"/>

    <BaseInformationList title="Tory" :list="[
        'Sebring 07.05',
        'Poznań 14.05',
        'Norisring 21.05',
        'Semanggi 28.05',
        'Road Atlanta 4.06',
        'Brazylia 11.06',
    ]"/>

    <BaseInformationList title="Samochody" :list="[
        'Subaru WRX STi Gr.3 CT3',
        'Mazda RX7 GT300 CT3',
        'Peugeot RCZ Gr.3 CT3',
    ]"/>

    <BaseInformationList title="Nagrody" :list="[
        '1 Miejsce : Puchar + Lego Porsche 963 + Zestaw Irtrack + Voucher 3h SimFun',
        '2 Miejsce: Puchar +  Lego Porsche 963 + Hamulec Ręczny 3d V2 Simmasters + Voucher 2h SimFun',
        '3 Miejsce: Puchar + Lego Porsche 963 + Kubek P1RacingModels',
    ]"/>

    <BaseInformationList title="Osiągi" :list="[
        'Samochody zostały zmodyfikowane fizycznie aby były równe wraz z zużyciem opon oraz paliwa',
        'Więcej info na naszym dc:  https://discord.com/invite/6MSNv53ekR'
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
