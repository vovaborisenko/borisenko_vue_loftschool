<template lang="pug">
  .skill-add
    .skill-add__title
      app-input(
        v-model="skill.title"
        :errorMessage="validation.firstError('skill.title')"
        placeholder="Новый навык"
      )
    .skill-add__percent
      app-input(
        v-model="skill.percent"
        inner-after="%"
        :errorMessage="validation.firstError('skill.percent')"
        type="number"
        min="0"
        max="100"
      )
    .skill-add__actions
      app-button(
        type="round"
        title="+"
        @click="addSkill"
        :disabled="skill.blocked"
      )
</template>

<script>
import AppButton from 'components/button';
import AppInput from 'components/input';
import { Validator } from 'simple-vue-validator';

export default {
  name: 'app-skill-add',
  components: {AppInput, AppButton},
  data() {
    return {
      skill: {
        title: '',
        percent: '0',
        blocked: false,
      }
    }
  },
  validators: {
    'skill.title': (value) => {
      return Validator.value(value).required('Поле не может быть пустым');
    },
    'skill.percent': (value) => {
      return Validator.value(value)
        .required('Поле не может быть пустым')
        .float('Должно быть числом')
        .between(0, 100, 'Значение должно быть от 0 до 100');
    },
  },
  methods: {
    async addSkill() {
      if (await this.$validate() === false) return;

      const { skill, validation } = this;

      /**
       * Отправляет заполненные данные нового навыка
       */
      this.$emit('add', { skill, validation });
    }
  },
}
</script>

<style lang="postcss" src="./app-skill-add.pcss"></style>
