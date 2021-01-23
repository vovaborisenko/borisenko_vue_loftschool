import Vue from 'vue';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

const ReviewsItemAuthor = {
  props: ['name', 'desc', 'avatar'],
  template: '#reviews-item-author',
};

const ReviewsItem = {
  props: ['content', 'author'],
  template: '#reviews-item',
  components: { ReviewsItemAuthor },
};

new Vue({
  el: '#reviews-block',
  template: '#reviews-widget',
  components: { ReviewsItem, Swiper, SwiperSlide },
  data: () => ({
    reviews: [],
    swiperOptions: {
      slidesPerView: 1,
      spaceBetween: 50,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 23,
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 60,
        }
      }
    },
    isDisabledPrevButton: false,
    isDisabledNextButton: false,
  }),
  computed: {
    swiper() {
      return this.$refs.swiper.$swiper;
    },
  },
  methods: {
    getReviews() {
      const incomeReviews = require('./../data/reviews.json');

      return incomeReviews.map((item) => {
        const avatarPath = require(`images/content/${item.author.avatar}`).default;

        item.author.avatarPath = avatarPath;

        return item;
      });
    },
    prevSlide() {
      this.swiper.slidePrev();
    },
    nextSlide() {
      this.swiper.slideNext();
    },
    initSwiper() {
      this.checkDisabledButtons();
      this.swiper.on('slideChange', this.checkDisabledButtons);
    },
    destroySwiper() {
      this.swiper.off('slideChange', this.checkDisabledButtons);
    },
    checkDisabledButtons() {
      this.isDisabledPrevButton = this.swiper.isBeginning;
      this.isDisabledNextButton = this.swiper.isEnd;
    }
  },
  created() {
    this.reviews = this.getReviews();
  },
  mounted() {
    this.initSwiper();
  },
  beforeDestroy() {
    this.destroySwiper();
  }
});
