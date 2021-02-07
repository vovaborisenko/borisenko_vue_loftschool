<template>
  <div class="inner-tooltip-container" :class="type">
    <div class="tooltip__text">{{text}}</div>
    <button v-on="$listeners" class="tooltip__close"></button>
  </div>
</template>

<script>
const types = ['success', 'warning', 'error'];

export default {
  props: {
    type: {
      type: String,
      default: "success",
      validator: value => types.indexOf(value) !== -1,
    },
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="postcss" scoped src="./notification.pcss"></style>
