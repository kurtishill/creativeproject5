<template>
	<div>
		<div v-if="loggedIn">
			<signed-in-page/>
		</div>
		<div v-else>
			<welcome-page/>
		</div>
	</div>
</template>

<script>
	import WelcomePage from './WelcomePage';
	import SignedInPage from './SignedInPage';
	export default {
		name: 'HomePage',
		components: { SignedInPage,WelcomePage },
		computed: {
			loggedIn: function() {
				return this.$store.getters.loggedIn;
			},
		},
	}
</script>

<style scoped>
</style>