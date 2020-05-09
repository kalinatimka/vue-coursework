<template>
  <nav>
    <h1>Leave Country</h1>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/tours">Tours</router-link>
      </li>
      <li>
        <router-link to="/about">About Us</router-link>
      </li>
    </ul>
    <ul class="authorization">
      <li>Log In</li>
      <li>Sign Up</li>
    </ul>
  </nav>
</template>

<style scoped>
h1 {
  margin: 0;
  margin-right: 10%;
  color: #ffffff;
}

nav {
  padding: 20px;
  display: flex;
  align-items: center;
  background-color: #42b983;
}

ul {
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
}

ul li {
  padding: 0px 5px;
}

a {
  text-decoration: none;
  color: #ffffff;
}

.authorization {
  margin-left: auto;
}
</style>