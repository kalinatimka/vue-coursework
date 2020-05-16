<template>
  <article>
    <img src="" alt="">
    <div class="hotel-info">
      <h3>{{tour.hotel}}</h3>
      <p>{{tour.country}}/{{tour.city}}</p>
      <p>{{tour.hotelDescription}}</p>
      <p>
        <span v-for="facility in getFacilities()" :key="facility">
          {{facility}}
        </span>
      </p>
      <p>{{tour.rating ? tour.rating : 'Нет рейтинга'}}</p>
      <router-link :to="{ name: 'tourInfo', params: {id: tour.id} }">Подробнее</router-link>
    </div>
  </article>
</template>

<script>

import {facilities} from '../constants/index';

export default {
  name: 'tour-card',
  props: {
    tour: {
      type: Object,
      required: true,
    }
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
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  background-color: #ffffff;
  border-radius: 10px;
}
</style>