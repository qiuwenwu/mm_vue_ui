<template>
	<div :class="'mm_table table-' + type">
		<table>
			<slot></slot>
		</table>
	</div>
</template>

<script>
	export default {
		props: {
			type: {
				type: String,
				default: "1"
			}
		}
	};
</script>

<style>
</style>
