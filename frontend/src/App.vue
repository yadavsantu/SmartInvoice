<template>
  <div id="app">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import API from "./services/api";

export default {
  data() {
    return {
      message: "",
    };
  },
  async created() {
    const response = await API.get("/api/data");
    this.message = response.data.message;
  },
};
</script>
