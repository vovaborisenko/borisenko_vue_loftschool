<template lang="pug">
  card(title="Редактирование работы")
    template(slot="content")
      form.project-form(@submit.prevent="onSubmit")
        .project-form__box
          label.project-form__preview(
            :class="{'project-form__preview--hovered-over': hoveredOver}"
            :style="{backgroundImage: `url(${preview})`}"
            @dragleave="hoveredOver = false"
            @dragover.prevent="hoveredOver = true"
            @drop.prevent="loadPreview"
          )
            .project-form__preview-overlay
              p.project-form__notice(
                v-html="(hoveredOver ? 'Отпускайте' : 'Перетащите или загрузите') + '<br>для загрузки изображения'"
              )
              app-button.project-form__upload(
                typeAttr="file"
                title="ЗАГРУЗИТЬ"
                @change="loadPreview"
              )
        .project-form__box
          app-input.project-form__field(
            v-model="title"
            title="Название"
            :error-message="validation.firstError('title')"
          )
          app-input.project-form__field(
            v-model="link"
            title="Ссылка"
            :error-message="validation.firstError('link')"
          )
          app-input.project-form__field(
            v-model="description"
            title="Описание"
            fieldType="textarea"
            :error-message="validation.firstError('description')"
          )
          app-tags-input.project-form__field(
            v-model="techs"
            title="Добавление тега"
            :error-message="validation.firstError('techs')"
          )
          .project-form__footer
            app-button.project-form__button(
              plain
              title="Отмена"
              typeAttr="reset"
              @click="onCancel"
            )
            app-button.project-form__button(
              title="Сохранить"
              typeAttr="submit"
              @click="onSubmit"
            )

</template>

<script>
import { Validator } from 'simple-vue-validator';
import Card from 'components/card/card';
import AppButton from "components/button/button";
import AppInput from "components/input/input";
import AppTagsInput from "components/app-tags-input/app-tags-input";

export default {
  name: 'app-project-form',
  components: { AppTagsInput, AppInput, AppButton, Card },
  validators: {
    title: function(value) {
      return Validator.value(value).required('Название не может быть пустым');
    },
    link: function(value) {
      return Validator.value(value)
        .required('Ссылка не может быть пустой')
        .url('Это не похоже на URL');
    },
    description: function(value) {
      return Validator.value(value).required('Описание не может быть пустым');
    },
    techs: function(value) {
      return Validator.value(value).required('Напишите пару используемых технологий через запятую');
    },
  },
  data() {
    return {
      hoveredOver: false,
      preview: null,
      title: '',
      techs: '',
      photo: '',
      link: '',
      description: '',
    };
  },
  methods: {
    loadPreview(event) {
      const file = event.dataTransfer
        ? event.dataTransfer.files[0]
        : event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => this.preview = reader.result;
      this.photo = file;
      this.hoveredOver = false;
    },
    async onSubmit(event) {
      if (await this.$validate() === false) return;
      console.log(event);
    },
    onCancel(event) {
      this.$emit('cancel');
    },
  },
}
</script>

<style lang="postcss">
.project-form {
  $block: &;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 35px;
  width: 100%;

  &__preview {
    position: relative;
    display: block;
    width: 100%;
    padding-top: 60%;
    background-color: #DEE4ED;
    background-position: center;
    background-size: cover;
    border: 2px dashed #A1A1A1;

    &--hovered-over {
      border-color: $color-accent-admin;
      transition: 0.2s;

      .project-form {
        &__preview-overlay {
          background-image: radial-gradient(#444cf7 1px, #e5e5f7 1px);
          background-size: 20px 20px;
        }

        &__notice {
          color: $color-accent-admin;
          background-color: transparent;
        }
      }
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
  }

  &__notice {
    margin-bottom: 35px;
    padding: 5px;
    font-size: 16px;
    line-height: 20px;
    color: rgba(#373E42, 0.6);
    text-align: center;
    background-color: rgba(#DEE4ED, 0.6);
    transition: .2s;
  }

  &__field {
    display: block;

    &:not(:first-child) {
      margin-top: 25px;
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
  }

  &__button {
    &:not(:first-child) {
      margin-left: 20px;
    }
  }
}
</style>
