<template lang="pug">
  .skill-add
    .skill-add__title
      app-input(
        v-model="title"
        placeholder="Новый навык"
      )
    .skill-add__percent
      app-input(
        v-model="percent"
        inner-after="%"
        type="number"
        min="0"
        max="100"
      )
    .skill-add__actions
      app-button(
        type="round"
        title="+"
        @click="$emit('add-skill', {title, percent})"
        :disabled="!title || !percent"
      )
</template>

<script>
import AppButton from "components/button";
import AppInput from "components/input";

export default {
  name: 'app-skill-add',
  components: {AppInput, AppButton},
  data() {
    return {
      title: '',
      percent: '100',
    }
  },
}
</script>

<style lang="postcss" src="./app-skill-add.pcss"></style>
