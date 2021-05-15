<template>
  <div class="mm_modal" v-bind:class="'from_' + display + (show ? '' : ' hide-x' )">
    <div class="modal_main">
      <slot></slot>
    </div>
    <div class="mask" v-if="mask && mask !='false' " @click="close()"></div>
  </div>
</template>

<script>
  export default {
    props: {
      display: {
        type: String,
        default: "default"
      },
      show: {
        type: Boolean,
        default: false
      },
      mask: {
        type: String,
        default: ""
      }
    },
    model: {
      prop: "show",
      event: "input"
    },
    methods: {
      close: function close() {
        this.$emit("input", false);
      }
    }
  };
</script>

<style>
</style>
