<template lang="pug">
  .login-page
    .login-page__base
      .login-page__popup
        .popup
          h1.popup__head Авторизация
          .popup__content
            form.login-form(
              @submit.prevent="handlerSubmit"
            )
              .login-form__row
                app-input(
                  v-model="user.name"
                  icon="user"
                  title="Логин"
                  :errorMessage="validation.firstError('user.name')"
                  ref="login"
                )
              .login-form__row
                app-input(
                  v-model="user.password"
                  icon="key"
                  title="Пароль"
                  :errorMessage="validation.firstError('user.password')"
                  type="password"
                )
              .login-form__actions
                app-button(
                  title="Отправить"
                  typeAttr="submit"
                  :disabled="isPendingRequest"
                )
</template>

<script>
import AppInput from 'components/input';
import AppButton from 'components/button';
import { Validator } from 'simple-vue-validator';
import { mapActions } from 'vuex';
import $axios from './../requests';

export default {
  name: 'page-login',
  components: { AppButton, AppInput },
  data: () => ({
    user: {
      name: '',
      password: '',
    },
    isPendingRequest: false,
  }),
  validators: {
    'user.name': (value) => {
      return Validator.value(value).required('Введите имя пользователя');
    },
    'user.password': (value) => {
      return Validator.value(value).required('Введите пароль');
    }
  },
  methods: {
    ...mapActions({
      showNotification: 'notification/show',
    }),
    async handlerSubmit() {
      if (await this.$validate() === false) return;

      this.isPendingRequest = true;

      try {
        const { data } = await $axios.post('/login', this.user);
        const token = data.token;

        localStorage.setItem('token', token);
        $axios.defaults.headers['Authorization'] = `Bearer ${token}`;

        await this.$router.replace('/');
      } catch (error) {
        this.showNotification({type: 'error', text: error.response.data.error});
      } finally {
        this.isPendingRequest = false;
      }
    },
  },
  mounted() {
    this.$refs.login && this.$refs.login.$el.focus();
  }
}
</script>

<style lang="postcss">
@import "./../../styles/mixins.pcss";

.login-page {
  position: relative;
  display: flex;
  justify-content: center;
  background: url("~images/content/bg-login.jpg") center / cover;

  &__base {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    background-color: $color-background-inverse;

    @include tablets {
      background-color: rgba(45, 60, 78, 0.9)
    }
  }

  &__popup {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 565px;
    background-color: $color-background-inverse;
  }
}

.login-form {
  &__row:not(:first-child) {
    margin-top: 37px;
  }

  &__actions {
    max-width: 350px;
    margin: 48px auto 0;
    font-size: 18px;

    button {
      width: 100%;
    }
  }
}

.popup {
  padding: 30px;

  @include tablets {
    padding: 47px 77px 72px;
  }

  &__head {
    margin-bottom: 30px;
    font-size: 30px;
    font-weight: 600;
    text-align: center;

    @include tablets {
      font-size: 36px;
    }
  }
}
</style>
