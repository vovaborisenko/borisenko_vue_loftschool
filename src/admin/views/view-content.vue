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
@import "./../../styles/mixins.pcss";

.content {
  &__header {
    @include tablets {
      display: flex;
    }
  }

  &__title {
    margin-bottom: 24px;
    font-size: 21px;
    line-height: 29px;
    font-weight: 700;

    @include tablets {
      margin-bottom: 0;
      margin-right: 54px;
    }
  }

  &__main {
    margin: 34px -30px 0;

    @include tablets {
      margin: 54px 0 0;
    }
  }
}
</style>
