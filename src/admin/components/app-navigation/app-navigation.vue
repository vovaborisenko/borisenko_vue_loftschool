<template lang="pug">
  .app-navigation
    .container
      nav
        ul.app-navigation__list
          li.app-navigation__item(
            v-for="item in items"
            :key="item.id"
          )
            a.app-navigation__link(
              :class="{ 'app-navigation__link--active': item.isActive }"
              :href="item.alias"
            ) {{ item.title }}
</template>

<script>
const items = [
  {id: 2, title: "Обо мне", alias: "about", isActive: false},
  {id: 5, title: "Работы", alias: "projects", isActive: true},
  {id: 12, title: "Отзывы", alias: "reviews", isActive: false},
];
export default {
  name: 'app-navigation',
  data: () => ({
    items,
  }),
}
</script>

<style lang="postcss" src="./app-navigation.pcss"></style>
