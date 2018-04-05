<template>
	<div>
		<image-quiz/>
	</div>
</template>

<script>
	import ImageQuiz from './ImageQuiz';
	export default {
		name: 'ColorQuiz',
		components: { ImageQuiz },
		created: function() {
			this.$store.commit('setQuizType', 'color');
		}
	}
</script>