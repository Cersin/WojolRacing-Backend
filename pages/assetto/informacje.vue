<template>
<div>
  <MainHeader />

  <div class="information">
    <img class="image_information" src="/wojol_x_drivesquad_logo.png" alt="Logo Assetto"/>

    <BaseInformationList title="Koncepcja" :list="[
        'Celem organizacji Wirtualnego Pucharu Drive Squad Super S Cup by Wojol Racing jest chęć odwzorowania rywalizacji oraz sportowych emocji, które towarzyszą kierowcom wyścigowym zmagającym się w pucharze Drive Squad Super S Cup',
        'Będzie on tworzony przez naszą administrację, mając na celu przybliżenie naszym odbiorcom emocji rodem z najsłynniejszych światowych torów',
        'Wszystkie wyścigi będą transmitowane na żywo.'
    ]"/>

    <BaseInformationList title="Przebieg zawodów" :list="[
        'Kwalifikacje oraz wyścigi będą odbywać się jednego dnia (niedziele 20:00)',
        'Dzień wyścigowy rozpoczynamy 18 minutowymi kwalifikacjami',
        'Następnie przechodzimy do startu pierwszego 25 minutowego wyścigu (ustawienie na starcie według kwalifikacji)',
        'Po zakończeniu pierwszego wyścigu przechodzimy do wyścigu nr 2. Jego długość jest taka sama (pozycje startowe według wyników z wyścigu nr 1 + odwrócenie top 15)',
        'Sezon składa się z 24 rund',
        'Do każdego wyścigu wchodzi najlepszych 30 osób, które ustanowią najszybszy czas na serwerze pre-kwalifikacyjnym'
    ]"/>

    <BaseInformationList title="Nagrody" :list="[
        'Nagrodą dla najlepszej 3 w klasyfikacji generalnej będą testy wyścigowego Mini Coopera na Torze w Poznaniu!',
        'Natomiast 6 najlepszych osób z generalki zostanie zaproszone na “Wyścigowy dzień” podczas jednej z rund Samochodowych Mistrzostw Polski',
        'Będzie to okazja, oraz możliwość zobaczenia weekendu wyścigowego od zaplecza i nie tylko!',
        'Planowana jest również wycieczka do fabryki Drive Squad, po której uczestnicy zostaną oprowadzeni i zobaczą proces budowy samochodów wyścigowych',
        'Na koniec dnia odbędzie się “After Party”'
    ]"/>

    <BaseInformationList title="Zapisy" :list="[
        'Aby zapisać się do sezonu, trzeba dołączyć na naszego discorda, wybrać rangę AC, wtedy pojawią się wszystkie kanały związane z ligą wraz z formularzem zapisów'
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
