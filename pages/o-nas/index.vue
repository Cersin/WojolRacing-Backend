<template>
  <div>
    <MainHeader />


    <div class="about--page">
      <div v-for="(about, index) in aboutList" :key="index">
        <div class="about_person--header">
          {{ about.header }}
        </div>

        <div class="about_person--list">
          <div v-for="(person, ind) in about.persons" :key="ind" class="about_person">
            <img :src="person.image" alt="Zdjęcie osoby" />
            <div class="about_person--description">
              {{ person.name }}
            </div>
          </div>
        </div>
      </div>
    </div>




  </div>

</template>

<script setup>
import MainHeader from "../../components/layout/MainHeader";
import BaseSponsor from "../../components/shared/BaseSponsor";

const aboutList = [
  {
    header: 'Koordynatorzy ligi',
    persons: [
      {
        name: 'Krzysiek Wójcik',
        image: '/ekipa/wojcik k.png',
      },
      {
        name: 'Szymon Wójcik',
        image: '/ekipa/wojcik s.png',
      },
      {
        name: 'Rafał Bandura',
        image: '/ekipa/bandura.png',
      },
      {
        name: 'Piotr Kacperski',
        image: '/ekipa/kacperski.png',
      }
    ]
  },
  {
    header: 'Administratorzy, Opiekunowie, Sędziowie F1',
    persons: [
      {
        name: 'Szymon Praczyk',
        image: '/ekipa/praczyk.png',
      },
      {
        name: 'Wojciech Kroks',
        image: '/ekipa/kroks.png',
      },
      {
        name: 'Robert Radaj',
        image: '/ekipa/radaj.png',
      },
      {
        name: 'Antoni Olejniczak',
        image: '/ekipa/olejniczak.png',
      },
      {
        name: 'Kacper Szafrański',
        image: '/ekipa/szafranski.png',
      },
      {
        name: 'Miłosz Sieńko',
        image: '/ekipa/default.png',
      },
      {
        name: 'Jakub Stanek',
        image: '/ekipa/stanek.png',
      }
    ]
  },
  {
    header: 'Administratorzy Assetto',
    persons: [
      {
        name: 'Miłosz Matuszyk',
        image: '/ekipa/matuszyk.png',
      },
      {
        name: 'Fabian Kiwak',
        image: '/ekipa/default.png',
      },
      {
        name: 'Karol Sasim',
        image: '/ekipa/default.png',
      },
    ]
  },
  {
    header: 'Grafika i montaż',
    persons: [
      {
        name: 'Kuba Janiczek',
        image: '/ekipa/janiczek.png',
      },
      {
        name: 'Antoni Stańczak',
        image: '/ekipa/default.png',
      },
      {
        name: 'Mateusz Stalmirski',
        image: '/ekipa/stalmirski.png',
      },
    ]
  },
  {
    header: 'Komentatorzy',
    persons: [
      {
        name: 'Jan Stróżecki',
        image: '/ekipa/strozecki.png',
      },
      {
        name: 'Bartosz Kowalczyk',
        image: '/ekipa/kowalczyk.png',
      },
      {
        name: 'Bartek Laszkiewicz',
        image: '/ekipa/laszkiewicz.png',
      },
      {
        name: 'Szymon Puchyrski',
        image: '/ekipa/puchyrski.png',
      },
      {
        name: 'Adam Kurzak',
        image: '/ekipa/kurzak.png',
      },
      {
        name: 'Jakub Pakuła',
        image: '/ekipa/pakula.png',
      },
    ]
  },
  {
    header: 'Social Manager',
    persons: [
      {
        name: 'Michał Skrzypczak',
        image: '/ekipa/skrzypczak.png',
      },
    ]
  },
]

</script>

<style scoped lang="scss">
.about--page {
  display: flex;
  padding: 2rem;
  text-align: center;
  flex-direction: column;
  gap: 3rem;

}

.about_person--list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;

}

.about_person {
  display: flex;
  gap: .5rem;
  flex-direction: column;
  align-items: center;

  &--header {
    font-size: 4rem;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

  &--description {
    font-size: 2rem;
    color: white;
  }

  img {
    width: 400px;
    height: auto;

    &:hover {
        filter: brightness(1.5);
    }

  }

}

</style>
