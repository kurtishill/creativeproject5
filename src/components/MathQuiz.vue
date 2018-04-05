<template>
	<div>
		<text-quiz/>
	</div>
</template>

<script>
	import TextQuiz from './TextQuiz';
	export default {
		name: 'MathQuiz',
		components: { TextQuiz },
		created: function() {
			this.$store.commit('setQuizType', 'math');
		}
	}
</script>

