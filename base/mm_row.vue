<template>
	<div :class="'mm_row' + cl">
		<slot></slot>
	</div>
</template>

<script>
	export default {

		props: {
			col: {
			  type: Number,
			  default: 0
			},
		},
		computed: {
			cl: function cl() {
				var cl = this.col;

				if (cl && cl.indexOf("-") == -1) {
					cl = " row-" + cl;
				}

				return cl;
			}
		}
	};
</script>

<style>
</style>
