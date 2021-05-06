<template>
	<div class="mm_icon" v-if="src && src.indexOf('<') !==-1" v-html="src"></div>
	<div class="mm_icon" v-else-if="src" :style="'background-image: url(' + src + ');' "><img class="img" :src="src"
		 :alt="alt" :onerror="onerror" />
		<figcaption v-if="$slots.default">
			<slot></slot>
		</figcaption>
	</div>
	<div class="mm_icon" v-else></div>

</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: ""
			},
			src_default: {
				type: String,
				default: "/img/default.png"
			},
			height: {
				type: String,
				default: ""
			},
			alt: {
				type: String,
				default: "图片"
			}
		},
		computed: {
			onerror: function() {
				return "javascript:this.src='" + this.src_default + "'";
			}
		}
	};
</script>

<style>
</style>
