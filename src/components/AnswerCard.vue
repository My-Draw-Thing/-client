<template>
  <div class="btn flex items-center justify-center py-1">
    <button class="inner-btn h-40 my-1 flex justify-center items-center focus:outline-none" :class="color">
      <p class="text-white font-bold text-2xl antialiased">Answer</p>
    </button>
  </div>
</template>

<script>
export default {
  props: ['color']
}
</script>

<style scoped>
.red {
  background-color: #E4443C;
}

.blue {
  background-color: #44a3e3;
}

.yellow {
  background-color: #f9be32;
}

.green {
  background-color: #66bf39;
}

.btn {
  width: 50%;
}

.inner-btn {
  width: 98%;
}
</style>
