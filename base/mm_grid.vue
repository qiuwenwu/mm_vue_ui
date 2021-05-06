<template>
	<div :class="'mm_grid' + cl">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			col: {
				type: String,
				default: ""
			}
		},
		computed: {
			cl: function cl() {
				var cl = this.col;

				if (cl && cl.indexOf("-") == -1) {
					cl = " grid-" + cl;
				}

				return cl;
			}
		}
	};
</script>

<style>
</style>
