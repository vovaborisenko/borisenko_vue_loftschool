<template lang="pug">
  .headline-component
    .container.headline-component__continer
      .headline-component__slot
        slot
      .headline-component__title {{ title }}
      .headline-component__actions
        button.headline-component__action(type="button") Выйти
</template>

<script>
export default {
  name: 'headline',
  props: {
    title: {
      type: String,
      default: 'Панель администрирования',
    },
  },
}
</script>

<style lang="postcss" src="./headline.pcss"></style>
