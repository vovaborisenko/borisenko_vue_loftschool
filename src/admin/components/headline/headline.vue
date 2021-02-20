<template lang="pug">
  .headline-component
    .container.headline-component__continer
      .headline-component__slot
        slot
      .headline-component__title {{ title }}
      .headline-component__actions
        button.headline-component__action(
          type="button"
          @click="logout"
        ) Выйти
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'headline',
  props: {
    title: {
      type: String,
      default: 'Панель администрирования',
    },
  },
  methods: {
    ...mapActions({logoutAction: 'user/logout'}),
    logout() {
      this.logoutAction();
      localStorage.removeItem('token');
      this.$router.replace('login');
    },
  },
}
</script>

<style lang="postcss" src="./headline.pcss"></style>
