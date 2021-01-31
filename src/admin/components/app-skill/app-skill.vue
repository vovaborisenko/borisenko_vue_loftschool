<template lang="pug">
  .skill
    .skill__title
      app-input(
        v-model="editedSkill.title"
        ref="title"
        noSidePaddings
        :error-message="errorsTitle"
        placeholder="Введите имя навыка"
        :disabled="!editmode"
      )
    .skill__percent
      app-input(
        v-model="editedSkill.percent"
        ref="percent"
        inner-after="%"
        :error-message="errorsPercent"
        type="number"
        min="0"
        max="100"
        :disabled="!editmode"
      )
    .skill__actions
      template(v-if="editmode")
        icon.skill__action(
          key="tick"
          symbol="tick"
          @click="applySkill"
          :disabled="!!errorsTitle || !!errorsPercent"
        )
        icon.skill__action(
          key="cross"
          symbol="cross"
          @click="cancelChanges"
        )
      template(v-else)
        icon.skill__action(
          key="pencil"
          symbol="pencil"
          grayscale
          @click="editSkill"
        )
        icon.skill__action(
          key="trash"
          symbol="trash"
          grayscale
          @click="$emit('delete-skill')"
        )
</template>

<script>
import Icon from "components/icon";
import AppInput from "components/input";

export default {
  name: 'app-skill',
  components: {AppInput, Icon},
  props: {
    title: {
      type: String,
      default: '',
    },
    percent: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      editedSkill: {
        title: this.title,
        percent: this.percent,
      },
      editmode: false,
    };
  },
  computed: {
    errorsTitle() {
      return !this.editedSkill.title
        ? 'Введите имя навыка'
        : '';
    },
    errorsPercent() {
      return !this.editedSkill.percent
        ? 'Поле не может быть пустым'
        : '';
    },
  },
  methods: {
    editSkill() {
      this.editmode = true;
      this.$nextTick(() => this.$refs.title.$el.focus());
    },
    cancelChanges() {
      this.editedSkill = {
        title: this.title,
        percent: this.percent,
      };
      this.editmode = false;
    },
    applySkill() {
      this.$emit('apply-skill', this.editedSkill);
    }
  },
}
</script>

<style lang="postcss" src="./app-skill.pcss"></style>
