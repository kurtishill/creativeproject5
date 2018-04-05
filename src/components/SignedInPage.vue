<template>
	<div>
		<h1>Welcome {{ getUsername }}!</h1>
		<img id="home-pic" src="../../static/images/lets_quiz.gif" alt="Let's Quiz!">
	</div>
</template>

<script>

	export default {
		name: 'SignedInPage',
		data () {
			return {
				user: {},
			}
		},
		computed: {
			getUsername: function() {
				this.user = this.$store.getters.user;
				return this.user.username;
			}
		}
	}

</script>

<style scoped>

	h1 {
		text-align: center;
	}

	img {
		margin-left: auto;
		margin-right: auto;
		display: block;
		width: 90%;
		margin-top: 3%;
		margin-bottom: 3%;
	}

	@media (min-width: 1200px) {
		img {
			width: 50%;
		}
	}

</style>