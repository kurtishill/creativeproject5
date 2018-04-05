<template>
	<div>
		<image-quiz/>
	</div>
</template>

<script>
	import ImageQuiz from './ImageQuiz';
	export default {
		name: 'AnimalQuiz',
		components: { ImageQuiz },
		created: function() {
			this.$store.commit('setQuizType', 'animal');
		}
	}
</script>