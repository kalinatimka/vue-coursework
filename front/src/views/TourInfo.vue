<template>
  <section v-if="tourInfo">
    <h2>{{tourInfo.name}}</h2>
    <div class="container">
      <div class="info">
        <div class="images">
          <img :src="require('../assets/'+ tourInfo.mainImage)" alt="">
        </div>
        <div class="room-info">
          <h3>Цена номера</h3>
          <p>{{tourInfo.totalPrice}}$</p>
          <h3>Тип</h3>
          <p>{{tourInfo.type}}</p>
          <h3>Взрослых</h3>
          <p>{{tourInfo.adults}}</p>
          <h3>Детей</h3>
          <p>{{tourInfo.childs}}</p>
          <h3>Удобства</h3>
          <features-picker :facilitiesObj="facilitiesObj"/>
        </div>
      </div>
      <div class="description">
        <h3>Описание номера</h3>
        <p>{{tourInfo.description}}</p>
        <h3>Описание отеля</h3>
        <p>{{tourInfo.hotelDescription}}</p>
      </div>
    </div>
    <!-- {{tourInfo}} -->
  </section>
</template>

<script>

import {facilities} from '../constants/index';
import FeaturesPicker from '../components/FeaturesPicker';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      facilitiesObj: {},
    }
  },
  components: {
    FeaturesPicker,
  },

  computed: {
    ...mapState({
      tourInfo: state => state.tourInfo[0],
    }),
  },

  created() {
    this.$store.dispatch('getTourInfo', this.$route.params.id).then(() => {
      this.facilitiesObj = this.getFacilities();
    });
  },
  methods: {
    getFacilities() {
      const obj = {};
      Object.keys(facilities).forEach(key => {
        if (this.tourInfo[key]) {
          obj[key] = facilities[key];
        }
      });
      return obj;
    }
  }
}
</script>

<style scoped>
section {
  padding: 20px;
  background-color: #ebebeb;
}

h2 {
  text-align: center;
}

.container {
  overflow: hidden;
  border-radius: 15px;
  background-color: #fff;
}

img {
  width: 800px;
}

.info {
  display: flex;
}

.room-info {
  padding: 20px;
}

.room-info h3 {
  margin: 0;
}

.description {
  padding: 20px;
}

.description h3 {
  margin: 0;
}
</style>