<template>
	<div :class="'mm_list' + cl">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			col: {
			  type: Number,
			  default: 0
			}
		},
		computed: {
			cl: function cl() {
				var cl = this.col;

				if (cl) {
					return " list-" + cl;
				}

				return "";
			}
		}
	};
</script>

<style>
</style>
