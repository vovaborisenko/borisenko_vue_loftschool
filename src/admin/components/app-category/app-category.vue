<template lang="pug">
  card.category
    edit-line(
      slot="title"
      v-model="currentTitle"
      :errorText="!currentTitle ? errorTitle : ''"
      :edit-mode-by-default="empty"
      @approve="approveTitle"
    )
    template(slot="content")
      ul.skills(v-show="skills.length")
        li.skills__item(
          v-for="skill in skills"
          :key="skill.id"
        )
          app-skill(
            :title="skill.title"
            :percent="skill.percent"
            @apply-skill="$emit('apply-skill', {...$event, id: skill.id})"
            @delete-skill="$emit('delete-skill', skill.id)"
          )
      .category__footer(
        :class="{'category__footer--disabled': empty}"
      )
        app-skill-add(
          @add-skill="$emit('add-skill', $event)"
        )
</template>

<script>
import Card from "components/card";
import EditLine from "components/editLine";
import AppInput from "components/input";
import AppSkillAdd from "components/app-skill-add/app-skill-add";
import AppSkill from "components/app-skill/app-skill";

export default {
  name: 'app-category',
  components: {
    AppSkill,
    AppSkillAdd,
    AppInput,
    EditLine,
    Card
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    skills: {
      type: Array,
      default: () => [],
    },
    empty: Boolean,
  },
  data() {
    return {
      currentTitle: this.title,
      errorTitle: '',
    };
  },
  methods: {
    approveTitle(title) {
      if (!title) {
        this.errorTitle = 'Введите имя категории';
      } else {
        this.currentTitle = title;
      }
    }
  },
}
</script>

<style lang="postcss" src="./app-category.pcss"></style>
