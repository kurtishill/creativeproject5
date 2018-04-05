<template>
	<div class="quiz" v-if="quizStarted">
	  		<div v-for="answer in currQuiz[id].choices">
	  			<button class="choice-button"  v-on:click="clickAnswer(currQuiz[id].choices[answer.num])">{{ answer.choice }}</button>
	  		</div>
	  		<button class="nav-button" v-on:click="prev()">Prev</button>
	  		<button class="nav-button" v-on:click="submitAnswer()">{{ nextButtonText }}</button>
	  		<div>
	  			<h3>Question: {{ id + 1 }} / {{ quizLength }}</h3>
	  		</div>
	</div>
	<div class="start-div" v-else>
	  		<div v-if="quizFinished">
	  			<h1> You got {{ numRight }} / {{ quizLength }} correct! {{ encouragementText }}</h1>
	  			<button class="start-button" v-on:click="startNewQuiz()">Retry?</button>
	  		</div>
	  		<div v-else>
	  			<h1>Ready?</h1>
	  			<button class="blue-button" v-on:click="startQuiz()">Start</button>
	  		</div>
	</div>
</template>

<script>
	export default {
		name: 'Quiz',
		data () {
			return {
				currQuiz: [],
				id: 0,
				correct: 0,
				answer: {},
				complete: false,
				numRight: 0,
				nextButtonText: 'Next',
				encouragementText: '',
				quizLength: 0,
			}
		},
		computed: {
			quizStarted: function() {
				var fresh = true;
				for (var i = 0; i < this.$store.getters.currQuiz.length; i++) {
					if (this.$store.getters.currQuiz[i].correct === 1) {
						fresh = false;
						break;
					}
				}
				if (fresh)
					this.currQuiz = this.$store.getters.currQuiz;
				return this.currQuiz.length > 0 && !this.complete && fresh;
			},
			quizFinished: function() {
				if (this.complete) {
					this.currQuiz = this.$store.getters.currQuiz;
					for (var i = 0; i < this.currQuiz.length; i++) {
						this.numRight += this.currQuiz[i].correct;
					}
					if (this.numRight > 5)
						this.encouragementText = 'Good job!';
					else
						this.encouragementText = 'Let\'s practice some more.';

					this.$store.commit('setCurrQuiz', []);
					return true;
				}
				return false;
			}
		},
		methods: {
			getQuiz: function() {
				this.$store.dispatch('getQuiz', {
					type: this.$store.getters.quizType,
				});
				if (this.$store.getters.quizType === 'math')
					this.quizLength = 10;
				else if (this.$store.getters.quizType === 'color')
					this.quizLength = 8;
				else if (this.$store.getters.quizType === 'animal')
					this.quizLength = 10;
			},
			startNewQuiz: function() {
				this.$store.dispatch('getFreshQuiz', {
					type: this.$store.getters.quizType
				}).then(response => {
					this.id = 0;
					this.correct = 0;
					this.numRight = 0;
					this.answer = {};
					this.nextButtonText = 'Next';
					this.complete = false;
					return true;
				}).catch(err => {
					console.log("Error while restarting math quiz.");
				});
			},
			startQuiz: function() {
				this.getQuiz();
			},
			clickAnswer: function(answer) {
				this.answer = answer;
			},
			submitAnswer: function() {
				if (this.answer.correct === true)
					this.correct = 1;
				else
					this.correct = 0;
				this.$store.dispatch('answerSelected', {
					type: this.$store.getters.quizType,
					id: this.id,
					correct: this.correct,
				}).then(response => {
					if (this.id + 1 === this.currQuiz.length) {
						this.$store.dispatch('getQuiz', {
							type: 'math',
						}).then(response => {
							this.complete = true;
							return;
						}).catch(err => {

						});
					} else {
						this.id++;
						if (this.id + 1 === this.currQuiz.length)
							this.nextButtonText = 'Finish';
						return true;
					}
				}).catch(err => {
					console.log("Error while submitting answer for math quiz.");
				});
			},
			prev: function() {
				if (this.id > 0)
					this.id--;
				this.nextButtonText = 'Next';
			},
		},
	}

</script>

