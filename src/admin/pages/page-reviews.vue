<template lang="pug">
  view-admin-page
    view-content(title="Блок «Отзывы»")

      // page content
      app-review-form(
        v-if="showForm"
        :review="editedReview"
        :saving="reviewSaving"
        @cancel="closeForm"
        @save="applyReview"
      )

      h2.loading(v-if="loading") Загрузка...
      ul.projects(v-else)
        li.projects__item
          square-btn(
            type="square"
            title="Добавить отзыв"
            @click="onNewReview"
          )
        li.projects__item(
          v-for="review in reviews"
          :key="review.id"
        )
          app-review(
            :author="review.author"
            :text="review.text"
            :occ="review.occ"
            :photo="review.photo"
            :blocked="review.id === editedReview.id"
            @delete="onDelete(review)"
            @edit="onEdit(review)"
          )
</template>

<script>
import IconedBtn from 'components/button/types/iconedBtn/iconedBtn';
import AppCategory from 'components/app-category';
import ViewContent from './../views/view-content.vue';
import ViewAdminPage from './../views/view-admin-page.vue';
import { mapGetters, mapActions } from 'vuex';
import SquareBtn from 'components/button/types/squareBtn/squareBtn';
import AppReviewForm from 'components/app-review-form/app-review-form';
import AppProject from "components/app-project/app-project";
import AppReview from "components/app-review/app-review";

const defaultReview = {
  id: 0,
  author: '',
  occ: '',
  text: '',
  photo: null,
};

export default {
  name: 'page-reviews',
  components: {
    AppReview,
    AppProject,
    AppReviewForm,
    SquareBtn,
    ViewAdminPage,
    ViewContent,
    AppCategory,
    IconedBtn,
  },
  data() {
    return {
      loading: false,
      showForm: false,
      reviewSaving: false,
      editedReview: defaultReview,
    };
  },
  computed: {
    ...mapGetters({
      reviews: 'reviews/reviews',
    }),
  },
  methods: {
    ...mapActions({
      createReviewAction: 'reviews/create',
      editReviewAction: 'reviews/edit',
      deleteReviewAction: 'reviews/delete',
      fetchReviewsAction: 'reviews/fetch',
      showNotification: 'notification/show',
    }),
    closeForm() {
      this.showForm = false;
      this.editedReview = defaultReview;
    },
    async applyReview(review) {
      const formData = new FormData();

      for (let key of Object.keys(review)) {
        formData.append(key, review[key]);
      }

      this.reviewSaving = true;

      try {
        if (review.id) {
          await this.editReviewAction({ formData, id: review.id });
          this.showNotification({type: 'success', text: 'Отзыв изменен'});
        } else {
          await this.createReviewAction(formData);
          this.showNotification({type: 'success', text: 'Отзыв добавлен'});
        }
        this.showForm = false;
      } catch (e) {
        this.showNotification({type: 'error', text: e.message});
      } finally {
        this.reviewSaving = false;
        this.editedReview = defaultReview;
      }
    },
    async onDelete(review) {
      if (confirm(`Вы уверены, что хотите удалить отзыв автор которого: "${review.author}"?`)) {
        this.editedReview = review;

        try {
          await this.deleteReviewAction(review.id);
          this.showNotification({type: 'success', text: 'Отзыв удален'});
        } catch (e) {
          this.showNotification({type: 'error', text: e.message});
        } finally {
          this.editedReview = defaultReview;
        }
      }
    },
    onEdit(review) {
      if (!this.showForm) {
        this.editedReview = review;
        this.showForm = true;
      } else {
        const text = this.editedReview.id ? 'Завершите редактирование отзыва' : 'Завершите создание отзыва';
        this.showNotification({type: 'warning', text});
      }
    },
    onNewReview() {
      if (!this.showForm) {
        this.editedReview = defaultReview;
        this.showForm = true;
      } else {
        const text = this.editedReview.id ? 'Завершите редактирование отзыва' : 'Завершите создание отзыва';
        this.showNotification({type: 'warning', text});
      }
    },
  },
  async created() {
    this.loading = true;

    try {
      await this.fetchReviewsAction();
    } catch (e) {
      this.showNotification({type: 'error', text: e.message});
    } finally {
      this.loading = false;
    }
  },
}
</script>

<style lang="postcss">
@import "./../../styles/mixins.pcss";

.projects {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  margin-top: 25px;

  @include tablets {
    grid-template-columns: 1fr 1fr;
    grid-gap: 25px;
  }

  @include desktop {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vmin;
  padding: 40px;
  text-align: center;
  opacity: 0.7;
}
</style>

