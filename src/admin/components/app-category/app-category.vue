<template lang="pug">
  card.category(
    :class="{'category--deleting': category.deleting}"
  )
    app-category-name(
      slot="title"
      :title="title"
      :edit-mode-by-default="empty"
      @delete="$emit('delete', category)"
      @save="$emit('save', $event)"
      @cancel="$emit('cancel')"
    )
    template(slot="content")
      ul.skills.category__skills(
        v-if="skills.length"
      )
        li.skills__item(
          v-for="skill in skills"
          :key="skill.id"
        )
          app-skill(
            :title="skill.title"
            :percent="skill.percent"
            @delete="$emit('delete-skill', { skill: $event, id: skill.id })"
            @save="$emit('save-skill', { skill: $event, id: skill.id })"
          )
      .category__footer(
        :class="{ 'category__footer--disabled': empty }"
      )
        app-skill-add(
          @add="$emit('add-skill', $event)"
        )
</template>

<script>
import Card from 'components/card';
import EditLine from 'components/editLine';
import AppInput from 'components/input';
import AppSkillAdd from 'components/app-skill-add';
import AppSkill from 'components/app-skill/app-skill';
import AppCategoryName from 'components/app-category-name';

export default {
  name: 'app-category',
  components: {
    AppCategoryName,
    AppSkill,
    AppSkillAdd,
    AppInput,
    EditLine,
    Card
  },
  props: {
    /**
     * Название категории
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * Список навыков
     */
    skills: {
      type: Array,
      default: () => [],
    },
    /**
     * Пустая, еще не созданная категория
     */
    empty: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      category: {
        title: this.title,
        deleting: false,
      },
    };
  },
}
</script>

<style lang="postcss" src="./app-category.pcss"></style>
