<template>
  <div
    class="edit-line-component"
    :class="{'blocked' : blocked}"
  >
    <div
      v-if="editMode === false"
      key="view"
      class="title"
    >
      <div class="text">{{ currentTitle }}</div>
      <div class="buttons">
        <div class="button-icon">
          <icon
            symbol="pencil"
            grayscale
            @click="onEdit"
          />
        </div>
        <div class="button-icon">
          <icon
            symbol="trash"
            grayscale
            @click="$emit('delete')"
          />
        </div>
      </div>
    </div>
    <div
      v-else
      key="edit"
      class="title"
    >
      <div class="title-input">
        <app-input
          placeholder="Название новой группы"
          v-model="currentTitle"
          :errorMessage="errorText"
          @input="$emit('change', currentTitle)"
          @keydown.native.enter="onApprove"
          autofocus
          no-side-paddings
          ref="input"
        />
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon
            symbol="tick"
            @click="onApprove"
          />
        </div>
        <div class="button-icon">
          <icon
            symbol="cross"
            @click="onCancel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    errorText: {
      type: String,
      default: ""
    },
    blocked: Boolean,
    editMode: Boolean,
  },
  model: {
    prop: 'title',
    event: 'change',
  },
  data() {
    return {
      currentTitle: this.title,
      initTitle: this.title,
    };
  },
  methods: {
    onEdit() {
      this.$emit('edit');
    },
    onApprove() {
      if (this.initTitle.trim() === "")
        return this.$emit('approve', this.currentTitle);

      if (this.currentTitle.trim() === this.initTitle.trim()) {
        this.$emit('cancel');
      } else {
        this.$emit('approve', this.currentTitle);
      }
    },
    onCancel() {
      if (this.initTitle.trim() === "") {
        this.$emit('remove');
      } else {
        this.currentTitle = this.initTitle;
        this.$emit('cancel');
      }
    },
  },
  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input")
  }
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>
