<template lang="pug">
  .app-user
    avatar.app-user__avatar(
      :size="size"
      :src="src"
    )
    .app-user__name
      slot
</template>

<script>
import Avatar from "components/avatar";

export default {
  name: 'app-user',
  components: { Avatar },
  props: {
    size: {
      type: String,
      default: '3',
    },
    src: {
      type: String,
    }
  },
}
</script>

<style lang="postcss" src="./app-user.pcss"></style>
