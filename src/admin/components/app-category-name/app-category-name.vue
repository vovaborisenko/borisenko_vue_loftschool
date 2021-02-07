<template lang="pug">
  .skill(:class="{ 'skill--blocked': category.blocked }")
    .skill__title
      app-input(
        v-model="category.title"
        ref="title"
        noSidePaddings
        :error-message="validation.firstError('category.title')"
        placeholder="Введите имя навыка"
        :disabled="!category.editMode"
        @keydown.native.enter="save"
      )
    .skill__actions
      template(v-if="category.editMode")
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
          @click="$emit('delete')"
        )
</template>

<script>
import Icon from 'components/icon';
import AppInput from 'components/input';
import { Validator } from 'simple-vue-validator';

export default {
  name: 'app-category-name',
  components: {AppInput, Icon},
  props: {
    /**
     * Значение поля ввода
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * Включен ли режим редактирования изначально
     */
    editModeByDefault: {
      type: Boolean,
      default: false,
    },
    /**
     * Блокировка для взаимодействия
     */
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      category: {
        title: this.title,
        editMode: this.editModeByDefault,
        blocked: false,
      },
    };
  },
  validators: {
    'category.title': (value) => {
      return Validator.value(value).required('Поле не может быть пустым');
    },
  },
  methods: {
    async edit() {
      this.category.editMode = true;

      await this.$nextTick();
      this.$refs.title.$el.focus();
    },
    delete() {
      this.$emit('delete');
    },
    cancel() {
      if (this.title == '') {
        this.$emit('cancel');
      } else {
        this.category.editMode = false;
        this.category.title = this.title;
      }
    },
    async save() {
      if (await this.$validate() === false) return;

      if (this.category.title === this.title) {
        this.category.editMode = false;
      } else {
        this.$emit('save', this.category);
      }
    }
  },
  mounted() {
    this.editModeByDefault && this.$refs.title.$el.focus();
  }
}
</script>

<style lang="postcss" src="./app-category-name.pcss"></style>
