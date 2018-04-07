import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	user: {},
  	loggedIn: false,
  	loginError: '',
  	registerError: '',
  	currQuiz: [],
  	quizType: '',
  	publicQuizList: [],
  	userQuizList: [],
  	makeQuizMessage: '',
  },
  getters: {
  	user: state => state.user,
  	loggedIn: state => state.loggedIn,
  	loginError: state => state.loginError,
  	registerError: state => state.registerError,
  	currQuiz: state => state.currQuiz,
  	quizType: state => state.quizType,
  	publicQuizList: state => state.publicQuizList,
  	userQuizList: state => state.userQuizList,
  	makeQuizMessage: state => state.makeQuizMessage,
  },
  mutations: {
  	setUser (state, user) {
  		state.user = user;
  	},
  	setLogin (state, loggedIn) {
  		state.loggedIn = loggedIn;
  	},
  	setLoginError (state, message) {
  		state.loginError = message;
  	},
  	setRegisterError (state, message) {
  		state.registerError = message;
  	},
  	setCurrQuiz (state, quiz) {
  		state.currQuiz = quiz;
  	},
  	setQuizType (state, type) {
  		state.quizType = type;
  	},
  	setPublicQuizList (state, list) {
  		state.publicQuizList = list;
  	},
  	setUserQuizList (state, list) {
  		state.userQuizList = list;
  	},
  	setMakeQuizMessage (state, message) {
  		state.makeQuizMessage = message;
  	}
  },
  actions: {
  	 // Registration, Login //
    register(context,user) {
      axios.post("/api/users",user).then(response => {
		context.commit('setUser', response.data.user);
		context.commit('setLogin',true);
		context.commit('setRegisterError',"");
		context.commit('setLoginError',"");
      }).catch(error => {
		context.commit('setLoginError',"");
		context.commit('setLogin',false);
		if (error.response) {
	  		if (error.response.status === 403)
	    		context.commit('setRegisterError',"That email address already has an account.");
	  		else if (error.response.status === 409)
	    		context.commit('setRegisterError',"That user name is already taken.");
	  		return;
		}
		context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
      });
    },

    login(context,user) {
      axios.post("/api/login",user).then(response => {
		context.commit('setUser', response.data.user);
		context.commit('setLogin',true);
		context.commit('setRegisterError',"");
		context.commit('setLoginError',"");
      }).catch(error => {
		context.commit('setRegisterError',"");
		if (error.response) {
	  		if (error.response.status === 403 || error.response.status === 400)
	    		context.commit('setLoginError',"Invalid login.");
	  		context.commit('setRegisterError',"");
	  		return;
		}
		context.commit('setLoginError',"Sorry, your request failed. We will look into it.");
      });
    },

    logout(context,user) {
      context.commit('setUser', {});
      context.commit('setLogin',false);
    },

    getQuiz(context,type) {
    	axios.post("/api/quiz",type).then(response => {
    		context.commit('setCurrQuiz', response.data);
    		console.log(response.data);
    	}).catch(error => {
    		console.log(error.response);
    	});
    },

    getFreshQuiz(context,type) {
    	axios.post("/api/newquiz",type).then(response => {
    		context.commit('setCurrQuiz', response.data);
    	}).catch(error => {
    		console.log(error.response);
    	});
    },

    answerSelected(context,info) {
    	axios.put("/api/quiz/" + info.id,info).then(response => {
    		return;
    	});
    },

    getPublicQuizList(context,subject) {
    	axios.post("/api/quiz/publicquizzes/",subject).then(response => {
    		context.commit('setPublicQuizList', response.data);
    	}).catch(error => {
    		console.log("Error while fetching public quiz list");
    	});
    },

    getUserQuizList(context,subject) {
    	axios.post("/api/quiz/userquizzes/" + context.state.user.id,subject).then(response => {
    		context.commit('setUserQuizList', response.data);
    	}).catch(error => {
    		console.log("Error while fetching user quiz list");
    	});
    },

    makeQuiz(context,quiz) {
    	axios.post("/api/quiz/makequiz/" + context.state.user.id,quiz).then(response => {
    		context.commit('setMakeQuizMessage', "You made a quiz!");
    	}).catch(error => {
    		if (error.response) {
    			if (error.response.status) {
    				context.commit('setMakeQuizMessage', "You or another person has already used that name for a quiz. Please choose another.");
    			}
    		}
    	});
    },

    deleteUserQuiz(context,name) {
    	axios.delete("/api/quiz/" + name.name + "/user/" + context.state.user.id).then(response => {
    		return context.dispatch('getUserQuizList');
    	}).catch(error => {
    		console.log("Error while deleting user quiz");
    	});
    },

    takeQuiz(context,quiz) {
    	console.log(quiz);
    	axios.post("/api/quiz/takequiz/",quiz).then(response => {
    		return;
    	}).catch(error => {
    		console.log("Error while fetching user quiz");
    	});
    }
  }
});






