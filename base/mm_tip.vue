<template>
  <div class="mm_tip">
    <button class="btn">
      <slot></slot>
    </button>
    <div class="box">
      <slot name="tip">{{ tip }}</slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tip: {
        type: String,
        default: ""
      }
    }
  }
</script>

<style>
</style>
