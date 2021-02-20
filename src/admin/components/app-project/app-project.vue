<template lang="pug">
  card(simple)
    .project(
      :class="{'project--blocked': blocked}"
    )
      .project__preview(
        :style="{ backgroundImage: `url(${previewUrl})` }"
      )
        .project__tags
          tag.project__tag(
            v-for="(tag, index) in tagsList"
            :key="index"
            :title="tag"
          )

      .project__content
        h2.project__title {{ title }}
        p.project__desc {{ description }}
        a.project__link(:href="link") {{ link }}
        .project__footer
          app-icon.project__button(
            title="править"
            @click="$emit('edit')"
          )
          app-icon.project__button(
            title="удалить"
            symbol="cross"
            @click="$emit('delete')"
          )
</template>

<script>
import Card from 'components/card/card';
import Tag from 'components/tag/tag';
import AppIcon from 'components/icon/icon';

export default {
  name: 'app-project',
  components: {AppIcon, Tag, Card},
  props: {
    title: String,
    description: String,
    link: String,
    tags: String,
    photo: String,
    blocked: Boolean,
  },
  computed: {
    tagsList() {
      return this.tags.split(',');
    },
    previewUrl() {
      return `${this.$root.baseURL}/${this.photo}`
    },
  },
};
</script>

<style lang="postcss">
.project {
  display: flex;
  flex-direction: column;
  height: 100%;

  &--blocked {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background-color: rgba($color-background-inverse, 0.6);
    }
  }
  &__preview {
    position: relative;
    width: 100%;
    padding-top: 60%;
    background-position: center;
    background-size: cover;
    background-color: $color-background-headline;
  }

  &__tags {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    padding: 0 16px 14px;
  }

  &__tag.tag {
    padding: 8px 18px;
    margin-left: 10px;
    font-size: 15px;
    line-height: 20px;
    font-weight: 600;
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 34px 25px 44px;
    font-size: 16px;
    line-height: 30px;
    font-weight: 600;
    color: rgba($color-text-admin, 0.5);
  }

  &__title {
    margin-bottom: 6px;
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;
    color: $color-text-admin;
  }

  &__desc {
    margin-bottom: auto;
  }

  &__link {
    display: inline-block;
    margin-top: 26px;
    color: $color-accent-admin;
    word-break: break-all;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
  }

  &__button {
    padding: 5px !important;
  }

}

</style>
