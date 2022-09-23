<template>
  <div class="login">
    <Html lang="pl-PL">
    <Head>
      <Title>WojolRacing | Logowanie</Title>
      <Meta name="description" content="Logowanie do zarzadzania stroną" />
    </Head>
    </Html>

    <h1>Logowanie</h1>
    <VForm @submit="login" ref="loginForm">
      <BaseInput
          v-model="user.name"
          label="Nazwa"
          name="username"
          rules="required"
      />

      <BaseInput
          v-model="user.password"
          label="Hasło"
          name="password"
          rules="required"
          type="password"
      />
      <button class="button button--outline ripple">ZALOGUJ</button>
    </VForm>
<!--    <form @submit.prevent="login(user.name, user.password)">-->
<!--      <input required v-model="user.name" placeholder="Username">-->
<!--      <input type="password" required v-model="user.password" placeholder="Password">-->
<!--    </form>-->
  </div>
</template>

<script setup>
import {useAuthComposable} from "../../composables/auth-composable";
import {reactive} from "vue";
import BaseInput from "../../components/shared/form/BaseInput";

const {login, showToast} = useAuthComposable();
const user = reactive({
  name: '',
  password: ''
})
</script>

<style scoped lang="scss">
@import "styles/variables";
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
  gap: 2rem;
}

</style>
