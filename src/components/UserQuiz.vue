<template>
	<div>
		<text-quiz/>
	</div>
</template>

<script>
	import TextQuiz from './TextQuiz';
	export default {
		name: 'UserQuiz',
		components: { TextQuiz },
		created: function() {
			this.$store.commit('setQuizType', 'user');
		}
	}
</script>