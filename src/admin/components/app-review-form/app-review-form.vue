<template lang="pug">
  card(:title="cardTitle")
    template(slot="content")
      form.review-form(@submit.prevent="onSubmit")
        label.review-form__photo
          .review-form__preview(
            :class="previewClassNames"
            :style="previewStyles"
            @dragleave="hoveredOver = false"
            @dragover.prevent="hoveredOver = true"
            @drop.prevent="loadPreview"
          )
            .review-form__preview-overlay(
              v-html="'Отпускайте<br>для загрузки изображения'"
            )
          app-button.review-form__upload(
            plain
            typeAttr="file"
            title="Добавить фото"
            accept="image/*"
            @change="loadPreview"
          )
        app-input.review-form__field(
          v-model="author"
          title="Имя автора"
          :error-message="validation.firstError('author')"
        )
        app-input.review-form__field(
          v-model="occ"
          title="Титул автора"
          :error-message="validation.firstError('occ')"
        )
        app-input.review-form__field.review-form__field--textarea(
          v-model="text"
          title="Отзыв"
          fieldType="textarea"
          :error-message="validation.firstError('text')"
        )
        .review-form__footer
          app-button.review-form__button(
            plain
            title="Отмена"
            typeAttr="reset"
            @click="onCancel"
          )
          app-button.review-form__button(
            title="Сохранить"
            typeAttr="submit"
            :disabled="saving"
          )

</template>

<script>
import { Validator } from 'simple-vue-validator';
import { mapActions } from 'vuex';
import Card from 'components/card/card';
import AppButton from 'components/button/button';
import AppInput from 'components/input/input';
import AppTagsInput from 'components/app-tags-input/app-tags-input';
import Icon from "components/icon/icon";

export default {
  name: 'app-review-form',
  components: {Icon, AppTagsInput, AppInput, AppButton, Card },
  props: {
    review: {
      type: Object,
    },
    saving: Boolean,
  },
  validators: {
    author: function(value) {
      return Validator.value(value).required('Имя не может быть пустым');
    },
    occ: function(value) {
      return Validator.value(value).required('Титул не можнт быть пустым');
    },
    text: function(value) {
      return Validator.value(value).required('Отзыв не может быть пустым');
    },
    photo: function(value) {
      return Validator.value(value || this.preview).required('Добавьте фото');
    },
  },
  data() {
    return {
      hoveredOver: false,
      id: this.review.id,
      preview: this.review.photo && `${this.$root.baseURL}/${this.review.photo}`,
      author: this.review.author,
      photo: null,
      occ: this.review.occ,
      text: this.review.text,
    };
  },
  computed: {
    cardTitle() {
      return this.review.id ? 'Редактирование отзыва' : 'Новый отзыв';
    },
    previewClassNames() {
      return {
        'review-form__preview--hovered-over': this.hoveredOver,
        'review-form__preview--error': this.validation.hasError('photo'),
      };
    },
    previewStyles() {
      return {
        backgroundImage: this.preview && `url(${this.preview})`,
        backgroundSize: this.preview && 'cover',
      };
    }
  },
  methods: {
    ...mapActions({
      showNotification: 'notification/show',
    }),
    loadPreview(event) {
      const file = event.dataTransfer
        ? event.dataTransfer.files[0]
        : event.target.files[0];

      if (file.type.indexOf('image/') === 0) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => this.preview = reader.result;
        this.photo = file;
      } else {
        this.showNotification({type: 'warning', text: 'Загружать можно только файлы изображений'});
      }
      this.hoveredOver = false;
    },
    async onSubmit(event) {
      if (await this.$validate() === false) return;

      this.$emit('save', {
        id: this.id,
        author: this.author,
        occ: this.occ,
        photo: this.photo,
        text: this.text,
      });
    },
    onCancel(event) {
      this.$emit('cancel');
    },
  },
}
</script>

<style lang="postcss">
@import "./../../../styles/mixins.pcss";

.review-form {
  $block: &;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  width: 100%;

  @include tablets {
    grid-template-columns: 200px 1fr;
    grid-gap: 35px;
  }

  @include desktop {
    grid-template-columns: 200px 1fr 1fr;
  }

  &__photo {
    width: 200px;
    margin: 0 auto;
    text-align: center;

    @include tablets {
      grid-row: 1/5;
    }

    @include desktop {
      grid-row: 1/4;
    }
  }

  &__preview {
    position: relative;
    display: block;
    width: 100%;
    padding-top: 100%;
    background-color: #DEE4ED;
    background-image: svg-load("user.svg", fill=#fff);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 50%;
    border: 2px dashed #A1A1A1;
    border-radius: 50%;

    &--hovered-over {
      border-color: $color-accent-admin;
      transition: 0.2s;

      .review-form {
        &__preview-overlay {
          background-image: radial-gradient(#444cf7 1px, #e5e5f7 1px);
          background-size: 20px 20px;
          opacity: 1;
        }
      }
    }

    &--error {
      border-color: $color-error;
    }
  }

  &__preview-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $color-accent-admin;
    border-radius: 50%;
    opacity: 0;
    transition: .2s;
  }

  &__upload {
    .btn-decorator.plain {
      padding-left: 0;
      padding-right: 0;
    }
  }

  &__field {
    display: block;

    &--textarea {
      @include desktop {
        grid-column: 2/-1;
      }
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;

    @include desktop {
      grid-column: 2/-1;
    }
  }

  &__button {
    &:not(:first-child) {
      margin-left: 20px;
    }
  }
}
</style>
