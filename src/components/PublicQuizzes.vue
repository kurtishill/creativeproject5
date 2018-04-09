<template>
	<div>
		<div v-if="quizList.length === 0">
	  		<h1 class="header">There are no quizzes available!</h1>
	  	</div>
	  	<div v-else>
	  		<form v-on:submit.prevent="getPublicQuizList">
	  			<input v-model="subject" type="text" placeholder="Search by subject">
	  			<button type="submit">Search</button>
	  		</form>
	  		<ul>
	  			<li class="quiz-list" v-for="quiz in quizList">
	  				<h5>{{ quiz.name }}</h5>&nbsp|&nbsp<h5 style="color: #FF6F0D;">{{ quiz.subject }}</h5>&nbsp|&nbsp<h5>{{ quiz.quiz.length }} Question(s)</h5>
	  				<router-link to="/UserQuiz" style="text-decoration: none; margin-left: auto;"><button v-on:click="takeQuiz(quiz)" class="takequiz">Take Quiz</button></router-link>
	  			</li>
	  		</ul>
	  	</div>
	  	<h3 class="header" v-if="loggedIn">Select the "Make Quiz" option in the menu to make one!</h3>
	  	<h3 class="header" v-else>Please sign in or register to make a quiz.</h3>
	  </div>
</template>

<script>
	export default {
		name: 'PublicQuizzes',
		data () {
			return {
				subject: '',
			}
		},
		created: function() {
			this.$store.dispatch('getPublicQuizList');
		},
		computed: {
			quizList: function() {
				console.log(this.$store.getters.publicQuizList);
				return this.$store.getters.publicQuizList;
			},

			loggedIn: function() {
				return this.$store.getters.loggedIn;
			}
		},
		methods: {
			getPublicQuizList: function() {
				this.$store.dispatch('getPublicQuizList', {
					subject: this.subject
				}).then(response => {
					this.subject = '';
					return true;
				}).catch(err => {
					console.log("Error while getting publicQuizList.");
				})
			},
			takeQuiz: function(quiz) {
				this.$store.commit('setCurrQuiz', []);
				this.$store.dispatch('takeQuiz', {
					quiz: quiz
				}).then(response => {
					return true;
				}).catch(err => {
					console.log("Error while initializing user's quiz.");
				});
			},
		},
	}
</script>

<style scoped>

  .quiz-list {
    background: #f9f9f9;
    width: 80%;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
    font-size: 1em;
    display: flex;
    align-items: center;
    border-radius: 4px;
  }

  

  button.takequiz {
  	background: #26E807;
  }

  input[type=text] {
  	margin-top: 1%;
  	margin-left: 2%;
  	border: 1px solid rgb(66, 184, 221);
  }

  button[type=submit] {
  	background: #26E807;
  }

  @media (min-width: 1200px) {
  	.quiz-list:hover .delete {
      display: block;
    }

     .quiz-list {
      width: 600px;
    }

    .quiz-list:hover .takequiz {
      display: block;
    }

     .takequiz {
      display: none;
    }
  }

</style>