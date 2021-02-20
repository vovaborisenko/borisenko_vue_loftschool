<template lang="pug">
  .app-navigation
    .container
      nav
        ul.app-navigation__list
          li.app-navigation__item(
            v-for="item in items"
            :key="item.id"
          )
            router-link.app-navigation__link(
              exact-active-class="app-navigation__link--active"
              :to="{name: item.alias}"
            ) {{ item.title }}
</template>

<script>
const items = [
  {id: 2, title: "Обо мне", alias: "about"},
  {id: 5, title: "Работы", alias: "projects"},
  {id: 12, title: "Отзывы", alias: "reviews"},
];

export default {
  name: 'app-navigation',
  data: () => ({
    items,
  }),
}
</script>

<style lang="postcss" src="./app-navigation.pcss"></style>
