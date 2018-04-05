<template>
	<div>
  		<h1 class="header">Enter the name of the quiz, the question, the options for that question, and select which option is the correct one!</h1>
  		<div id="quiz-headers">
  			<span class="title"><strong>Name:</strong> </span><input type="text" placeholder="Name" v-model="name">
  			<span class="title"><strong>Subject:</strong> </span><input type="text" placeholder="Optional: Subject" v-model="subject">
  			<span class="title"><strong>Public:</strong></span><span id="public"> (Do you want your quiz to be used by other people?) <input type="checkbox" v-model="public"></span>
  		</div>
  		
  		<hr/>
  		<div id="make-quiz-inputs">
       		<span class="title">Question: </span><input type="text" placeholder="Question" v-model="question"><div></div>
     		<span class="title">Choice 1: </span><input type="text" placeholder="Choice 1" v-model="choice1"><div class="correct-grid"><span style="margin-left: 0; margin-right: 0;">Correct</span><input name="correct" id="one" type="radio" value="one" v-model="correct"></div>
     		<span class="title">Choice 2: </span><input type="text" placeholder="Choice 2" v-model="choice2"><div class="correct-grid"><span style="margin-left: 0; margin-right: 0;">Correct</span><input name="correct" id="two" type="radio" value="two" v-model="correct"></div>
     		<span class="title">Choice 3: </span><input type="text" placeholder="Choice 3" v-model="choice3"><div class="correct-grid"><span style="margin-left: 0; margin-right: 0;">Correct</span><input name="correct" id="three" type="radio" value="three" v-model="correct"></div>
     		<div></div>
     		<button class="start-button" style="margin: auto; margin-bottom: 10px;" v-on:click="addQuestion()">Add Question</button><div></div><div></div>
     		<button class="start-button" type="submit" style="margin: auto;" v-on:click="createQuiz()">Finish</button>
     	</div>
     	<h5 class="error">{{ message }}</h5>
    </div>
</template>

<script>

	export default {
		name: 'MakeQuiz',
		data () {
			return {
				userQuiz: [],
				id: 0,
				name: '',
				subject: '',
				question: '',
				choice1: '',
				choice2: '',
				choice3: '',
				correct: '',
				public: false,
			}
		},
		created: function() {
			this.$store.dispatch('getPublicQuizList');
			this.$store.commit('setMakeQuizMessage', '');
		},
		computed: {
			quizList: function() {
				return this.$store.getters.publicQuizList;
			},
			message: function() {
				return this.$store.getters.makeQuizMessage;
			}
		},
		methods: {
			initQuestion: function() {
				if (this.question==='' || this.choice1==='' || this.choice2==='' || this.choice3==='' || this.correct==='')
					alert("Please choose a question, create choices, and select which choice is correct.");
				else {
					var correct1 = false;
					var correct2 = false;
					var correct3 = false;
					if (this.correct === "one")
						correct1 = true;
					else if (this.correct === "two")
						correct2 = true;
					else if (this.correct === "three")
						correct3 = true;
					this.userQuiz.push({id:this.id++,question:this.question,choices:[{choice:this.choice1,correct:correct1,num:0},
						{choice:this.choice2,correct:correct2,num:1},{choice:this.choice3,correct:correct3,num:2}],correct:0});

					this.clearFields();
				}
			},
			addQuestion: function() {
				this.initQuestion();
			},
			createQuiz: function() {
				if (this.name === '') {
					alert("Please choose a name for your quiz.")
				}
				else if (this.question !== '' || this.choice1 !== '' || this.choice2 !== '' || this.choice3 !== '' || this.correct !== '') {
					if (confirm("There is information in the text boxes! If you continue, this question will not be added. Continue anyway?")) {
						this.createHelper();
					}
				}
				else {
					if (this.userQuiz.length > 0)
						this.createHelper();
					else {
						alert("This quiz has no information. It will not be created.");
					}
				}
			},
			clearFields: function() {
				this.question = '';
				this.choice1 = '';
				this.choice2 = '';
				this.choice3 = '';
				this.correct = '';
			},
			createHelper: function() {
				if (this.userQuiz.length === 0)
					alert("This quiz has no information. It will not be created.");
				else {
					var quiz = {name:this.name, subject:this.subject, quiz:this.userQuiz, public: this.public};
						this.$store.dispatch('makeQuiz', {
							quiz: quiz
						}).then(response => {
							this.name = '';
							this.subject = '';
							this.public = false;
							this.clearFields();
							this.$store.commit('setMakeQuizMessage', '');
							return true;
						}).catch(err => {
							console.log("Error while creating user quiz.");
						});
					}
				}
			}
		}

</script>

<style scoped>

	h5 {
		margin: 2%;
	}

	.title {
		text-align: center;
		margin: auto;
		margin-right: 10px;
	}

	#quiz-headers {
	    display: grid;
	    grid-template-columns: 25% 75%;
	    grid-template-rows: 33% 33% 33%;
	    margin: 2%;
	    text-align: center;
	    width: 80%;
	  }

	#make-quiz-inputs {
	   	margin: 1%;
	    text-align: center;
	    width: 100%;
	    display: grid;
	    grid-template-columns: 20% 60% 10%;
	    grid-template-rows: 25% 25% 25% 25%;
	  }

	input[type=text] {
    	font-size: 1em;
    	margin-bottom: 10px;
    	padding: 20px;
    	padding-right: 100px;
    	margin-right: 10px;
	}

	input[type=radio] {
		margin: auto;
		display: block;
	}

	.correct-grid {
		display: grid;
		grid-template-rows: 50% 50%;
	}

	#public {
		text-align: left;
		font-weight: bold;
	}

	  @media (min-width: 1200px) {
	  	#quiz-headers {
      		width: 55%;
    	}

    	#make-quiz-inputs {
      		width: 70%;
    	}
	  }

</style>