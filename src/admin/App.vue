<template lang="pug">
  .admin-page
    header.admin-page__header
      headline
        app-user(
          size="2.94"
          :src="avatarPath"
        ) Владимир Астаханов
    .admin-page__navigation
      app-navigation
    main.admin-page__content
      section.content
        .container
          .content__header
            h1.content__title Блок «Обо мне»
            iconed-btn(
              type="iconed"
              title="Добавить группу"
            )
          .content__main
</template>

<script>
import Headline from "components/headline";
import AppUser from "components/app-user";
import AppNavigation from "components/app-navigation";
import IconedBtn from "components/button/types/iconedBtn/iconedBtn";

export default {
  components: {
    IconedBtn,
    AppNavigation,
    AppUser,
    Headline,
  },
  computed: {
    avatarPath() {
      return require('images/content/user.jpg').default;
    }
  },
}
</script>

<style>
@import "normalize.css";
@import "./../styles/mixins.pcss";
@import "./../styles/layout/base.pcss";
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");

html {
  color: $color-text-admin;
}

.admin-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__content {
    flex: 1;
    padding: 50px 0 30px;
    background: url("~images/content/bg-admin.jpg") no-repeat fixed center / cover;
  }
}
</style>
