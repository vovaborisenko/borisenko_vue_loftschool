<template lang="pug">
  .skill(:class="{ 'skill--blocked': skill.blocked}")
    .skill__title
      app-input(
        v-model="skill.title"
        ref="title"
        noSidePaddings
        :error-message="validation.firstError('skill.title')"
        placeholder="Введите имя навыка"
        :disabled="!skill.editMode"
      )
    .skill__percent
      app-input(
        v-model="skill.percent"
        ref="percent"
        inner-after="%"
        :error-message="validation.firstError('skill.percent')"
        type="number"
        min="0"
        max="100"
        :disabled="!skill.editMode"
      )
    .skill__actions
      template(v-if="skill.editMode")
        icon.skill__action(
          key="tick"
          symbol="tick"
          @click="save"
        )
        icon.skill__action(
          key="cross"
          symbol="cross"
          @click="cancel"
        )
      template(v-else)
        icon.skill__action(
          key="pencil"
          symbol="pencil"
          grayscale
          @click="edit"
        )
        icon.skill__action(
          key="trash"
          symbol="trash"
          grayscale
          @click="remove"
        )
</template>

<script>
import Icon from 'components/icon';
import AppInput from 'components/input';
import { Validator } from 'simple-vue-validator';

export default {
  name: 'app-skill',
  components: {AppInput, Icon},
  props: {
    /**
     * Имя навыка
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * Владение навыком в процентах
     */
    percent: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      skill: {
        title: this.title,
        percent: this.percent,
        editMode: false,
        blocked: false,
      },
    };
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
    async edit() {
      this.skill.editMode = true;

      await this.$nextTick();
      this.$refs.title.$el.focus();
    },
    cancel() {
      this.skill.editMode = false;
      this.skill.title = this.title;
      this.skill.percent = this.percent;
    },
    async save() {
      if (await this.$validate() === false) return;

      if (this.skill.title === this.title && this.skill.percent == this.percent) {
        this.skill.editMode = false;
      } else {
        this.$emit('save', this.skill);
      }
    },
    remove() {
      this.$emit('delete', this.skill);
    },
  },
}
</script>

<style lang="postcss" src="./app-skill.pcss"></style>
