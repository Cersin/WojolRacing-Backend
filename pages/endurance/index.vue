<template>
<div>
  <MainHeader />

  <div class="information">

    <BaseInformationList style="list-style: none"  title="Endurance" :list="[
        'Bierzemy udział w największej Polskiej lidze Endurance w której wystawiamy samochody w każdej klasie. \n'+
'W poprzednim sezonie zdobyliśmy mistrzostwo klasy hypercar oraz bierzemy udział w eventach w wyścigach zagranicznych.',
    ]"/>

    <BaseInformationList  title="Nasz zespół"/>

      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px; margin-bottom: 2rem;">
        <img style="width: 400px; height: auto;"  src="/endurance/wojol666.png"/>
        <img style="width: 400px; height: auto;"  src="/endurance/wojol665.png"/>
        <img style="width: 400px; height: auto;"  src="/endurance/wojol664.png"/>
        <img style="width: 400px; height: auto;"  src="/endurance/wojol663.png"/>
      </div>
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
