<template>
	<div class="mm_nav_top" :class="{show: show}"><button class="btn_link" @click="$emit('change', !show)"><i class="fa fa-bars"></i></button>
		<div class="nav_warp">
			<div class="nav">
				<slot></slot>
			</div>
			<div class="mask" @click="$emit('change', false)"></div>
		</div>
	</div>
</template>

<script>
	export default {
		model: {
			prop: 'show',
			event: 'change'
		},
		props: {
			show: {
				type: Boolean,
				show: false
			}
		},
		data: function() {
			return {}
		}
	};
</script>

<style>
</style>
