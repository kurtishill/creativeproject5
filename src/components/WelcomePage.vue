<template>
	<div id="welcome-page">
		<h1>Welcome to the quiz maker!</h1>
		<h3>Here, you can make your own quizzes and even share them with other people!</h3>
		<h5>Register here or select an option in the menu to begin.</h5>
		<form v-on:submit.prevent="register">
			<p>1. Choose a name you would like to be known as on the site.</p>
			<input v-model="username" placeholder="Username"><br/>
			<p>2. Please enter your email address and password.</p>
			<input v-model="email" placeholder="Email Address">
			<input v-model="password" type="password" placeholder="Password">
			<button class="blue-button" type="submit">Register</button>
		</form>
		<p v-if="registerError" class="error">{{ registerError }}</p>
	</div>
</template>

<script>
	export default {
		name: 'WelcomePage',
		data () {
			return {
				username: '',
				email: '',
				password: '',
			}
		},
		computed: {
     		registerError: function() {
       			return this.$store.getters.registerError;
     		},
   		},
   		methods: {
     		register: function() {
       			this.$store.dispatch('register', {
            		username: this.username,
            		email: this.email,
            		password: this.password,
       			}).then(user => {
       				this.username = '';
       				this.email = '';
       				this.password = '';
       			});
     		}
   		}
	}

</script>

<style scoped>

	#welcome-page {
		margin-left: 3%;
	}

</style>





