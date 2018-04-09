<template>
	<div>
		<div v-if="quizList.length === 0">
	  		<h1 class="header">There are no quizzes available!</h1>
	  	</div>
	  	<div v-else>
	  		<form v-on:submit.prevent="getUserQuizList">
	  			<input v-model="subject" type="text" placeholder="Search by subject">
	  			<button type="submit">Search</button>
	  		</form>
	  		<ul>
	  			<li class="quiz-list" v-for="quiz in quizList">
	  				<h5>{{ quiz.name }}</h5>&nbsp|&nbsp<h5 style="color: #FF6F0D;">{{ quiz.subject }}</h5>&nbsp|&nbsp<h5>{{ quiz.quiz.length }} Question(s)</h5>
	  				<router-link to="/UserQuiz" style="text-decoration: none; margin-left: auto;"><button v-on:click="takeQuiz(quiz)" class="takequiz">Take Quiz</button></router-link>
	  				<button v-on:click="deleteQuiz(quiz)" class="delete">X</button>
	  			</li>
	  		</ul>
	  	</div>
	  	<h3 class="header" >Select the "Make Quiz" option in the menu to make one!</h3>
	  </div>
</template>

<script>
	import PublicQuizzes from './PublicQuizzes';
	export default {
		name: 'YourQuizzes',
		components: { PublicQuizzes },
		data () {
			return {
				subject: '',
			}
		},
		created: function() {
			this.$store.dispatch('getUserQuizList');
		},
		computed: {
			quizList: function() {
				return this.$store.getters.userQuizList;
			}
		},
		methods: {
			getUserQuizList: function() {
				this.$store.dispatch('getUserQuizList', {
					subject: this.subject
				}).then(response => {
					this.subject = '';
					return true;
				}).catch(err => {
					console.log("Error while getting userQuizList.");
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
			deleteQuiz: function(quiz) {
				this.$store.dispatch('deleteUserQuiz', {
					name: quiz.name
				}).then(response => {
	        		this.getUserQuizList();
	        		return true;
	      		}).catch(err => {
	      			console.log("Error while deleting user quiz.");
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

  button.delete {
  	background: red;
  	min-width: 30px;
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

    .delete {
      display: none;
    }

     .takequiz {
      display: none;
    }
  }

</style>