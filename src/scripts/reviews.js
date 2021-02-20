import Vue from 'vue';
import axios from 'axios';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import config from './../../env.paths.json';
import 'swiper/swiper-bundle.css';

const ReviewsItemAuthor = {
  props: ['name', 'desc', 'avatar'],
  template: '#reviews-item-author',
};

const ReviewsItem = {
  props: ['review'],
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
    isDisabledPrevButton: true,
    isDisabledNextButton: false,
  }),
  computed: {
    swiper() {
      return this.$refs.swiper.$swiper;
    },
  },
  methods: {
    async getReviews() {
      try {
        const { data } = await axios.get(`${config.BASE_URL}/reviews/431`);

        this.reviews = data.map((item) => {
          const avatarURL = `${config.BASE_URL}/${item.photo}`;

          return { ...item, avatarURL };
        });
      } catch (e) {
        const incomeReviews = require('./../data/reviews.json');

        this.reviews = incomeReviews.map((item) => {
          const avatarURL = require(`images/content/${item.photo}`).default;

          return { ...item, avatarURL };
        });
      }

    },
    prevSlide() {
      this.swiper.slidePrev();
    },
    nextSlide() {
      this.swiper.slideNext();
    },
    initSwiper() {
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
    this.getReviews();
  },
  mounted() {
    this.initSwiper();
  },
  beforeDestroy() {
    this.destroySwiper();
  }
});
