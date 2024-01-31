<template>
<div>
  <MainHeader />

  <BaseHeader title="Skontaktuj się z nami" />
  <LoadingWrapper :loading="loading">
    <form @submit.prevent="send">
      <VForm class="form--wrapper" style="align-items: center;"  as="div" ref="emailForm">
        <div class="row  contact_card">
          <BaseInput
            :input-styles="{
              backgroundColor: '#3e3939',
              color: '#FFF',
              fontSize: '1.5rem',
            }"
            id="Imię" input-styles="background: green;"  v-model="model.name" class="col-12" label="Imię" name="name" rules="required" />
          <BaseInput
            :input-styles="{
              backgroundColor: '#3e3939',
              color: '#FFF',
              fontSize: '1.5rem',

            }"
            id="email" v-model="model.email" class="col-12" label="Email" name="email" rules="required|email" />
          <BaseTextarea
            :input-styles="{
              backgroundColor: '#3e3939',
              color: '#FFF',
              fontSize: '1.5rem',
            }"
            id="message" type="textarea" class="col-12" v-model="model.message" label="Wiadomość" name="message" rules="required" />

          <BaseButton v-if="!isSend"  class="col-2  margin-top" >Wyślij</BaseButton>
          <div v-if="isSend" class="margin-left" style="font-size: 1.4rem;">
            Wiadomość została wysłana
          </div>
        </div>
      </VForm>
    </form>
  </LoadingWrapper>
</div>
</template>

<script setup>
import MainHeader from "../../components/layout/MainHeader";
import BaseInput from "~/components/shared/form/BaseInput.vue";
import BaseTextarea from "~/components/shared/form/BaseTextarea.vue";
import LoadingWrapper from "~/components/Wrappers/LoadingWrapper.vue";
import {useToast} from "vue-toastification";
import emailjs from 'emailjs-com';
import BaseButton from "~/components/shared/BaseButton.vue";
import BaseHeader from "~/components/shared/BaseHeader.vue";

const toast = useToast();
const runtimeConfig = useRuntimeConfig()

const model = ref({
  name: '',
  email: '',
  message: ''
})

const emailForm = ref()
const loading = ref(false)
const isSend = ref(false)

async function send(e) {
  const {valid} = await emailForm.value.validate()
  if (valid) {
    try {
      loading.value = true;

      await emailjs.sendForm(runtimeConfig.public.EMAIL_SERVICE_ID, runtimeConfig.public.EMAIL_TEMPLATE_ID, e.target, runtimeConfig.public.EMAIL_USER_ID);

      toast.success('Wysłano wiadomość e-mail, dziękujemy')
      isSend.value = true
    } catch (e) {
      console.log(e)
      toast.error('Wystąpił błąd podczas wysyłania wiadomości')
    } finally {
      loading.value = false;
    }

  }
}
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

.contact_card {
  background-color: transparentize($color-grey, 0.7);
  padding: 2rem;
  border-radius: 20px;
  width: 400px;

  @include tabletAndUp() {
    width: 600px;
  }

  @include desktop() {
    width: 800px;
  }
}

</style>
