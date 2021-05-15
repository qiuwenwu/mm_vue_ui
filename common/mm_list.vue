<template>
  <div class="mm_list">
    <div :class="'item ' + css + (col ? ' col-' + col : '')" v-for="(o, i) in list" :key="i">
      <solt>
        <mm_item :obj="o" :display="" :viewmodel="viewmodel"></mm_item>
      </solt>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      css: {
        type: String,
        default: ""
      },
      col: {
        type: Number,
        default: 0
      },
      viewmodel: {
        type: String,
        default: function() {
          return {}
        }
      }
    }
  }
</script>

<style>
</style>
