<template>
	<div class="mm_side" :class="{'hide-x': hide, fold: fold}" :id="side_id">
		<slot></slot>
		<div class="line"></div>
		<div class="mask" @click="set_hide()"></div>
	</div>
</template>

<script>
	export default {
		model: {
			prop: "hide",
			event: "change"
		},
		props: {
			id: {
				type: String,
				default: ""
			},
			hide: {
				type: Boolean,
				default: false
			},
			fold: {
				type: Boolean,
				default: false
			},
			func: {
				type: Function,
				default: function _default(width) {}
			}
		},
		data: function data() {
			var id = this.id;

			if (!id) {
				id = "mm_side" + parseInt(Math.random() * 1000 + 1, 10);
			}

			return {
				side_id: id
			};
		},
		methods: {
			set_hide: function set_hide() {
				this.$emit('change', true);
			}
		},
		mounted: function mounted() {
			var target = "#" + this.side_id;
			bindResize(target + " .line", target, this.func);
		}
	};
</script>

<style>
</style>
