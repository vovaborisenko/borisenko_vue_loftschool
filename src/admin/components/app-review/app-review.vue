<template lang="pug">
  card.review(
    :class="{'review--blocked': blocked}"
  )
    template(slot="title")
      app-user(
        :src="avatarUrl"
        size="3.38"
      )
        div {{ author }}
        .review__occ {{ occ }}

    template(slot="content")
      .review__content
        p.review__desc {{ text }}
        .review__footer
          app-icon.review__button(
            title="править"
            @click="$emit('edit')"
          )
          app-icon.review__button(
            title="удалить"
            symbol="cross"
            @click="$emit('delete')"
          )
</template>

<script>
import Card from 'components/card/card';
import Tag from 'components/tag/tag';
import AppIcon from 'components/icon/icon';
import AppUser from "components/app-user/app-user";

export default {
  name: 'app-review',
  components: {AppUser, AppIcon, Tag, Card},
  props: {
    author: String,
    text: String,
    occ: String,
    photo: String,
    blocked: Boolean,
  },
  computed: {
    avatarUrl() {
      return `${this.$root.baseURL}/${this.photo}`
    },
  },
};
</script>

<style lang="postcss">
.review {
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

  &__occ {
    font-size: 16px;
    color: rgba($color-text-admin, 0.5);
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__desc {
    font-size: 16px;
    line-height: 30px;
    font-weight: 600;
    color: rgba($color-text-admin, 0.7);
    margin-bottom: auto;
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
