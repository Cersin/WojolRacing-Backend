<template>
<div>
  <MainHeader />

  <div class="information">

    <BaseInformationList style="list-style: none" title="Adres E-mail" :list="[
        'wojolracing@gmail.com',
    ]"/>
    <BaseInformationList style="list-style: none"  :list="[
        'Na ten adres mogą być kierowane pytania, zgłoszenia i propozycję dotyczące naszej organizacji.\n'+
'\n'+
'Zapraszamy do kontaktu również przez nasz discord oraz facebook.'
    ]"/>

    <BaseInformationList style="list-style: none" :list="[
        'facebook.com/wojolracing',
        'discord.com/invite/6MSNv53ekR'
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
