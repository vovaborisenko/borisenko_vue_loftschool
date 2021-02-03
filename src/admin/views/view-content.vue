<template lang="pug">
  section.content
    .container
      .content__header
        h1.content__title {{ title }}
        slot(name="header")
      .content__main
        slot
</template>

<script>
export default {
  name: 'view-content',
  props: {
    title: {
      type: String,
      default: '',
    }
  },
}
</script>

<style lang="postcss">
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
</style>
