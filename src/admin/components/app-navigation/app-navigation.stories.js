import AppNavigation from "./app-navigation.vue";

export default {
  title: 'app-navigation',
  components: { AppNavigation },
}

export const defaultView = () => ({
  components: { AppNavigation },
  template: `
  <app-navigation/>
  `,
});
