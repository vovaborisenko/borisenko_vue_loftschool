<template lang="pug">
  .tag(
    :class="{interactive: interactive}"
  )
    span {{title}}
    button(
      v-if="interactive"
      class="remove"
      type="button"
      v-on="$listeners"
    )
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    interactive: Boolean,
  },
}
</script>

<style lang="postcss" src="./tag.pcss"></style>
