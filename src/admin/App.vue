<template lang="pug">
  div
    router-view
    ul.notification(:class="{ 'notification--active': notifications.length }")
      li.notification__item(
        v-for="message in notifications"
        :key="message.id"
      )
        notification(
          :text="message.text"
          :type="message.type"
          @click="notificationHide(message.id)"
      )
</template>

<script>
import Notification from 'components/notification';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { Notification },
  computed: {
    ...mapGetters({
      notifications: 'notification/notifications',
    }),
  },
  methods: {
    ...mapActions({
      notificationHide: 'notification/hide',
    }),
  }
}
</script>

<style>
@import "normalize.css";
@import "./../styles/mixins.pcss";
@import "./../styles/layout/base.pcss";
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");

html {
  color: $color-text-admin;
}

.notification {
  position: fixed;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  z-index: 10;

  @include tablets {
    max-width: 50%;
  }

  &--active {
    transform: translate(-50%, calc(-100% - 20px));
  }

  &__item {
    margin-top: 20px;
  }
}
</style>
