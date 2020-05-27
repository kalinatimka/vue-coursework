<template>
  <article>
    <img :src="require('../assets/' + tour.mainImage)" alt="">
    <div class="hotel-info">
      <h3>{{tour.hotel}}</h3>
      <p class="destination">{{tour.country}}/{{tour.city}}</p>
      <div class="features">
        <features-picker :facilitiesObj="facilitiesObj"/>
        <p>Рейтинг: {{tour.rating ? tour.rating : 'Нет'}}</p>
      </div>
      <p>Описание номера:</p>
      <p>{{tour.hotelDescription}}</p>
      <router-link :to="{ name: 'tourInfo', params: {id: tour.id} }">Подробнее</router-link>
    </div>
  </article>
</template>

<script>

import {facilities} from '../constants/index';
import FeaturesPicker from './FeaturesPicker';

export default {
  name: 'tour-card',
  components: {
    FeaturesPicker,
  },
  data() {
    return {
      facilitiesObj: {},
    }
  },
  props: {
    tour: {
      type: Object,
      required: true,
    }
  },
  created() {
    this.facilitiesObj = this.getFacilities();
  },
  methods: {
    getFacilities() {
      const obj = {};
      Object.keys(facilities).forEach(key => {
        if (this.tour[key]) {
          obj[key] = facilities[key];
        }
      });
      return obj;
    }
  }
}
</script>

<style scoped>
article {
  display: flex;
  margin-bottom: 20px;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 10px;
}

article:hover {
  box-shadow: 0 0 10px 0 #737272; 
  /* ababab */
}

img {
  width: 400px;
}

.hotel-info {
  width: 100%;
  padding: 20px;
}

.hotel-info h3 {
  margin: 0;
}

.features {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.destination {
  margin: 0;
}
</style>