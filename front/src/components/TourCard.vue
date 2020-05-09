<template>
  <article>
    <img src="" alt="">
    <div class="hotel-info">
      <h3>{{tour.hotel}}</h3>
      <p>{{tour.country}}/{{tour.city}}</p>
      <p>{{tour.hotelDescription}}</p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'tour-card',
  props: {
    tour: {
      type: Object,
      required: true,
    }
  },
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