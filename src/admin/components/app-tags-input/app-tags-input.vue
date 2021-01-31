<template lang="pug">
  .tags-input
    app-input(
      title="Добавление тега"
      v-model="currentTags"
      @input="$emit('change', currentTags)"
    )
    ul.tags-input__list
      li.tags-input__item(
        v-if="tag.trim()"
        v-for="(tag, index) in tagsArray"
        :key="`${tag}${index}`"
      )
        tag(
          :title="tag"
          interactive
          @click="removeTag(tag)"
        )
</template>

<script>
import AppInput from "components/input";
import Tag from "components/tag";

export default {
  name: 'app-tags-input',
  components: {Tag, AppInput },
  props: {
    tags: {
      type: String,
      default: '',
    },
  },
  model: {
    prop: 'tags',
    event: 'change',
  },
  data() {
    return {
      currentTags: this.tags
    };
  },
  computed: {
    tagsArray() {
      return this.currentTags
        .split(',')
        .map(item => item.trim());
    }
  },
  methods: {
    removeTag(tagName) {
      const tags = [...this.tagsArray];
      const tagIndex = tags.indexOf(tagName);

      if (tagIndex < 0) {
        return;
      }

      this.currentTags = tags
        .filter((item, index) => index !== tagIndex)
        .join(', ');

      this.$emit('change', this.currentTags);
    },
  },
}
</script>

<style>
.tags-input {
  &__list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    margin-left: -10px;
  }

  &__item {
    margin-left: 10px;
  }
}
</style>
