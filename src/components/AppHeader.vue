<template>
	<div class="menu" id="topnav">
		<nav class="navbar">
	    	<div class="container">
	       		<ul class="navbar-list">
	       			<li class="navbar-item"><router-link to="/" class="navbar-link">Home</router-link></li>
	       			<li class="navbar-item">
		       			<div class="dropdown">
		   					<li class="dropbtn"><router-link to="#" class="navbar-link" style="cursor: default;">Sample Quizzes</router-link></li>
		   					<div class="dropdown-content">
		       					<span v-on:click="quizSelect('math')"><router-link to="/MathQuiz">Math Quiz</router-link></span>
		       					<span v-on:click="quizSelect('color')"><router-link to="/ColorQuiz">Color Quiz</router-link></span>
		       					<span v-on:click="quizSelect('animal')"><router-link to="/AnimalQuiz">Animal Quiz</router-link></span>
		       				</div>
			       		</div>
			       	</li>
	       			<li class="navbar-item"><router-link to="/PublicQuizzes" class="navbar-link">Public Quizzes</router-link></li>
	       			<li class="navbar-item" v-if="loggedIn"><router-link to="/YourQuizzes" class="navbar-link">Your Quizzes</router-link></li>
	       			<li class="navbar-item" v-if="loggedIn"><router-link to="/MakeQuiz" class="navbar-link">Make Quiz</router-link></li>
	       			<li class="right login" style="margin: 5px;" v-if="loggedIn" v-on:click="logout"><router-link to="/">Logout</router-link></li>
	       			<li class="right login" style="margin: 5px;" v-if="loggedIn"><router-link to="/YourQuizzes">{{user.username}}</router-link></li>
	       			<form v-else class="right" v-on:submit.prevent="login">
	       				<input v-model="email" placeholder="Email Address">
	       				<input v-model="password" type="password" placeholder="Password">
	       				<button class="blue-button" type="submit">Login</button>
	       			</form>
	       			<li class="right login" style="margin: 5px;" v-if="loggedIn"><i class="far fa-user fa-2x blue"></i></li>
	       			<div class="dropdown drop-mobile">
	       				<button class="dropbtn">&#9776
	       					<i class="fa fa-caret-down"></i>
	       				</button>
	       				<div class="dropdown-content">
	       					<router-link to="/">Home</router-link>
	       					<span v-on:click="quizSelect('math')"<router-link to="/MathQuiz">Math Quiz</router-link></span>
	       					<span v-on:click="quizSelect('color')"><router-link to="/ColorQuiz">Color Quiz</router-link></span>
	       					<span v-on:click="quizSelect('animal')"><router-link to="/AnimalQuiz">Animal Quiz</router-link></span>
	       					<router-link to="/PublicQuizzes">Public Quizzes</router-link>
	       					<router-link to="/YourQuizzes" v-if="loggedIn">Your Quizzes</router-link>
	       					<router-link to="/MakeQuiz" v-if="loggedIn">Make Quiz</router-link>
	       				</div>
		    		</div>
				</ul>
				<div class="flexWrapper errorPlace">
					<p v-if="loginError" class="flexRight error">{{ loginError }}</p>
				</div>
		  	</div>
		</nav>
	</div>
</template>

<script>
 export default {
     name: 'AppHeader',
     data () {
     	return {
     		email: '',
     		password: '',
     	}
     },
     computed: {
     	user: function() {
     		return this.$store.getters.user;
     	},
     	loggedIn: function() {
     		return this.$store.getters.loggedIn;
     	},
     	loginError: function() {
     		return this.$store.getters.loginError;
     	},
     },
     methods: {
     	login: function() {
     		this.$store.dispatch('login', {
     			email: this.email,
     			password: this.password,
     		}).then(user => {
     			this.email = '';
     			this.password = '';
     		});
     	},
     	logout: function() {
     		this.$store.dispatch('logout');
     	},
     	quizSelect: function(type) {
     		this.$store.commit('setCurrQuiz',[]);
     	}
     }
 }
</script>

<style scoped>

	.menu {
		margin-left: 2%;
		margin-right: 2%;
	}

	.navbar {
		display: block;
		width: 100%;
		height: 6.5rem;
		background: #fff;
	}

	.navbar-list {
		list-style: none;
		margin-bottom: 0;
	}

	.navbar-item {
		position: relative;
		float: left;
		margin-bottom: 0;
	}

	.blue {
		color: rgb(66, 184, 221);
	}

	.navbar-link {
		text-transform: uppercase;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: .2rem;
		margin-right: 35px;
		text-decoration: none;
		line-height: 6.5rem;
		color: #222;
	}

	.navbar-link:hover {
		color: #FF6F0D;
	}

	.active {
		color: #26E807;
	}

	.menu li {
		display: none;
	}

	.menu .login {
		display: block;
	}

	.dropdown {
		float: left;
		overflow: hidden;
	}

	.dropdown .dropbtn {
	    font-size: 30px; 
	    border: none;
	    outline: none;
	    color: black;
	    background-color: inherit;
	    font-family: inherit;
	}

	.dropdown-content {
	    display: none;
	    position: absolute;
	    background-color: #f9f9f9;
	    min-width: 160px;
	    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	    z-index: 1;
	}

	.dropdown-content a {
	    float: none;
	    color: black;
	    padding: 12px 16px;
	    text-decoration: none;
	    display: block;
	    text-align: left;
	}

	.menu a:hover, .dropdown:hover .dropbtn {
	    color: #FF6F0D;
	}

	.dropdown:hover .dropdown-content {
	    display: block;
	}

	.right {
     	float: right;
 	}

	.errorPlace {
     	height: 20px;
 	}

 	form {
		display: grid;
		grid-template-rows: 50% 50%;
	}

	a {
		text-decoration: none;
		color: rgb(66, 184, 221);
	}

	a:hover {
		color: rgb(66, 184, 221);
	}

	@media (min-width: 1200px) {
		.menu li {
			display: block;
		}

		form {
			display: block;
		}

		.navbar {
			border-bottom: 1px solid #eee;
		}

		.drop-mobile {
			display: none;
		}
	}

</style>



