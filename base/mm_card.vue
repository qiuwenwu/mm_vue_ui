<template>
	<div class="mm_card">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			fun: {
				type: Function,
				default: function _default() {}
			}
		}
	};
</script>

<style>
</style>
