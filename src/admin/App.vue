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
              @click="newCategory = true"
            )
          .content__main
            ul.categories
              li.categories__item(
                v-if="newCategory"
              )
                app-category(
                  empty
                )
              li.categories__item(
                v-for="category in skillsList"
                :key="category.id"
              )
                app-category(
                  :title="category.title"
                  :skills="category.skills"
                )
</template>

<script>
import Headline from "components/headline";
import AppUser from "components/app-user";
import AppNavigation from "components/app-navigation";
import IconedBtn from "components/button/types/iconedBtn/iconedBtn";
import AppCategory from "components/app-category";

export default {
  components: {
    AppCategory,
    IconedBtn,
    AppNavigation,
    AppUser,
    Headline,
  },
  data() {
    return {
      skillsList: [],
      newCategory: false,
    };
  },
  computed: {
    avatarPath() {
      return require('images/content/user.jpg').default;
    }
  },
  created() {
    this.skillsList = require('./../data/skills.json');
  }
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

.content {
  &__header {
    display: flex;
  }

  &__title {
    margin-right: 54px;
    font-size: 21px;
    line-height: 29px;
    font-weight: 700;
  }

  &__main {
    margin-top: 54px;
  }
}

.categories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 25px;
}
</style>
