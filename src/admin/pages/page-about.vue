<template lang="pug">
  view-admin-page
    view-content(:title="`Блок \"Обо мне\"`")
      template(v-slot:header)
        iconed-btn(
          type="iconed"
          title="Добавить группу"
          @click="newCategory = true"
        )

      // page content
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
import IconedBtn from "components/button/types/iconedBtn/iconedBtn";
import AppCategory from "components/app-category";
import ViewContent from "./../views/view-content.vue";
import ViewAdminPage from "./../views/view-admin-page.vue";

export default {
  name: 'page-about',
  components: {
    ViewAdminPage,
    ViewContent,
    AppCategory,
    IconedBtn,
  },
  data() {
    return {
      skillsList: [],
      newCategory: false,
    };
  },
  created() {
    this.skillsList = require('./../../data/skills.json');
  }
}
</script>

<style lang="postcss">
.categories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 25px;
}
</style>
