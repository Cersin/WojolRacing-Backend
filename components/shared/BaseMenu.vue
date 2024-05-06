<template>
  <div @click="active = !active" class="menu" :class="{'menu--active': active, 'menu--black': aside && !active}">
    <div class="menu-button"/>
  </div>

  <Transition>
    <div v-if="active" class="menu_overlay">
      <div class="navigation">
        <div style="display: flex; flex-direction: column; align-items: flex-end;">
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/">Strona Główna</NuxtLink>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/o-nas">O nas</NuxtLink>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/kontakt">Kontakt</NuxtLink>
        </div>

        <div class="navigation__block">
          <h2>Formuła 1</h2>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/formula/informacje">Informacje</NuxtLink>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/formula/karty-gracza">Karty kierowców</NuxtLink>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/formula">Klasyfikacja zawodników</NuxtLink>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/formula/teams">Klasyfikacja konstruktorów</NuxtLink>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/formula/wyniki">Wyniki</NuxtLink>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/formula/wyniki-zbiorcze">Wyniki zbiorcze</NuxtLink>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/formula/statystyki">Statystyki</NuxtLink>
          <a @click="navigateToSocial('https://docs.google.com/document/d/144Cz2NoK3jNjq9yb7R7lS2hv1ZqUG3JMJW2QMuRy7Mw/edit?usp=sharing')">
            Regulamin
          </a>
        </div>

        <div class="navigation__block">
          <h2>Endurance</h2>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/endurance">Informacje</NuxtLink>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/endurance/osiagniecia">Osiągnięcia</NuxtLink>
        </div>

        <div class="navigation__block">
          <h2>Assetto Corsa</h2>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/assetto/informacje">Informacje</NuxtLink>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/assetto">Klasyfikacja zawodników</NuxtLink>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/assetto/wyniki">Wyniki</NuxtLink>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/assetto/wyniki-zbiorcze">Wyniki zbiorcze</NuxtLink>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/assetto/statystyki">Statystyki</NuxtLink>
          <a @click="navigateToSocial('https://docs.google.com/document/d/1yxKQGI7HsjYWDIANEx3WnD6RExaN5ZJXhTtU7M9JWEs/edit?usp=sharing')">
            Regulamin
          </a>
        </div>

        <div class="navigation__block">
          <h2>Powtórki</h2>
          <a @click="navigateToSocial('https://www.youtube.com/playlist?list=PLNmZj_25aJk05jyiSXirJ2zop8806fP1z')">
            F1 - S4
          </a>

          <a @click="navigateToSocial('https://www.youtube.com/playlist?list=PLNmZj_25aJk0EI6Musr3ChVFoeLOnbXOP')">
            F1 - S3
          </a>

          <a @click="navigateToSocial('https://www.youtube.com/playlist?list=PLNmZj_25aJk3r7cpbhUiOD5R6obpDaZ2_')">
            F1 - S2
          </a>

          <a @click="navigateToSocial('https://www.youtube.com/playlist?list=PLNmZj_25aJk3aDoBEds_pXhoOv2is2-e-')">
            F1 - S1
          </a>

          <a @click="navigateToSocial('https://www.youtube.com/playlist?list=PLNmZj_25aJk2jtU9OzNFkP8CIpeTaJxRs')">
            AC - Drive Squad
          </a>

          <a @click="navigateToSocial('https://www.youtube.com/playlist?list=PLNmZj_25aJk1WInxJXx_LIPKObRNaylih')">
            AC - S1 Cup
          </a>
        </div>

        <div v-if="authState.logged && authState.role === 'admin'" class="navigation__block">
          <h2>Admin F1</h2>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/admin/players">Zawodnicy</NuxtLink>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/admin/players-hidden">Ukryci Zawodnicy</NuxtLink>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/admin/races">Wyniki</NuxtLink>
        </div>

        <div v-if="authState.logged && authState.role === 'admin-assetto'" class="navigation__block">
          <h2>Admin Assetto</h2>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/admin/assetto/players">Zawodnicy</NuxtLink>
          <NuxtLink @click="active = false" exact-active-class="active-route" to="/admin/assetto/races">Wyniki</NuxtLink>
        </div>
      </div>
    </div>
  </Transition>


</template>

<script setup>
import { IconLogin } from "@iconify-prerendered/vue-mdi"
import {useRoute} from "nuxt/app";
import {useAuthComposable} from "../../composables/auth-composable";

const route = useRoute();
const {authState} = useAuthComposable();

function navigateToSocial(link) {
  window.open(link);
}

defineProps({
  active: {
    type: Boolean,
    default: false
  },
  aside: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  position: relative;
  height: 4rem;
  transition: transform 700ms cubic-bezier(0.23, 1, 0.32, 1);
  z-index: $index-menu;
}
.menu--active {
  transform: rotate(270deg);
}

.menu-button,
.menu-button::before,
.menu-button::after {
  display: block;
  background-color: $color-primary;
  position: absolute;
  height: 2px;
  width: 100%;
  transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;
}

.menu-button::before {
  content: '';
  background-color: white;
  margin-top: -8px;
  height: 2px;
  width: 50%;
  right: 0;
}

.menu-button::after {
  content: '';
  background-color: white;
  margin-top: 8px;
  width: 80%;
  right: 0;
}

.menu--black {
  .menu-button {
    background-color: $color-grey;
  }

  .menu-button::before, .menu-button::after {
    background-color: black;
  }
}

.menu_overlay {
  position: fixed;
  left: 0;
  top: 0;
  overflow-x: hidden;
  background-color: transparentize(black, .06);
  height: 100%;
  width: 100%;
  z-index: $index-menu-overlay;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 2rem;
  color: #818181;

  a {
    text-decoration: none;
    font-size: 1.5;
    display: block;
    transition: 0.3s;
    color: #818181;

    &:hover {
      color: $color-primary;
    }
  }
}

.navigation {
  display: flex;
  gap: 3rem;
  margin-top: 8rem;
  margin-right: 2rem;
  flex-direction: column;
  align-items: flex-end;

  &__block {
    display: flex;
    flex-direction: column;
    gap: .8rem;
    align-items: flex-end;
  }
}

.active-route {
  color: $color-primary !important;
}
a.nuxt-link-active {
  color: $color-primary !important;
}

</style>
