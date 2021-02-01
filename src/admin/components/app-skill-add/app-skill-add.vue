<template lang="pug">
  .skill-add
    .skill-add__title
      app-input(
        v-model="title"
        :errorMessage="errorTitle"
        placeholder="Новый навык"
      )
    .skill-add__percent
      app-input(
        v-model="percent"
        inner-after="%"
        :errorMessage="errorPercent"
        type="number"
        min="0"
        max="100"
      )
    .skill-add__actions
      app-button(
        type="round"
        title="+"
        @click="addSkill"
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
      validmode: false,
    }
  },
  computed: {
    errorTitle() {
      return !this.validmode || this.title.trim() ? '' : 'Введите имя навыка';
    },
    errorPercent() {
      return !this.validmode || this.percent.trim() ? '' : 'Не может быть пустым';
    },
  },
  methods: {
    addSkill() {
      if (this.title.trim() && this.percent.trim()) {
        this.$emit('add-skill', {
          title: this.title,
          percent: this.percent
        });
      } else {
        this.validmode = true;
      }
    }
  },
}
</script>

<style lang="postcss" src="./app-skill-add.pcss"></style>
