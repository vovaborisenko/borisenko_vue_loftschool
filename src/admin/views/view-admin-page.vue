<template lang="pug">
  .admin-page
    header.admin-page__header
      headline
        app-user(
          size="2.94"
          :src="avatarPath"
        ) Владимир Астаханов
    .admin-page__navigation
      app-navigation
    main.admin-page__content
      slot
</template>

<script>
import Headline from "components/headline";
import AppUser from "components/app-user";
import AppNavigation from "components/app-navigation";

export default {
  name: 'view-admin-page',
  components: {
    Headline,
    AppUser,
    AppNavigation,
  },
  computed: {
    avatarPath() {
      return require('images/content/user.jpg').default;
    }
  },
}
</script>

<style lang="postcss">
.admin-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__content {
    flex: 1;
    padding: 50px 0 30px;
    background: url("~images/content/bg-admin.jpg") no-repeat fixed center / cover;
  }
}
</style>
