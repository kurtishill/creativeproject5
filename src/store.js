import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	user: {},
  	token: '',
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
  	getToken: state => state.token,
    getAuthHeader: state => {
      return { headers: {'Authorization': localStorage.getItem('token')}};
    },
    loggedIn: state => {
      if (state.token === '')
        return false;
      return true;
    },
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
  	setToken (state, token) {
      state.token = token;
      if (token === '')
        localStorage.removeItem('token');
      else
        localStorage.setItem('token', token);
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
    // Initialize //
    initialize(context) {
      let token = localStorage.getItem('token');
      if(token) {
       // see if we can use the token to get my user account
       axios.get("/api/me",context.getters.getAuthHeader).then(response => {
         context.commit('setToken',token);
         context.commit('setUser',response.data.user);
       }).catch(err => {
         // remove token and user from state
         localStorage.removeItem('token');
         context.commit('setUser',{}); 
         context.commit('setToken','');
       });
      }
    },

  	 // Registration, Login //
    register(context,user) {
      axios.post("/api/users",user).then(response => {
		context.commit('setUser', response.data.user);
		context.commit('setToken',response.data.token);;
		context.commit('setRegisterError',"");
		context.commit('setLoginError',"");
      }).catch(error => {
		context.commit('setLoginError',"");
		context.commit('setUser',{});
    context.commit('setToken','');
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
		context.commit('setToken',response.data.token);;
		context.commit('setRegisterError',"");
		context.commit('setLoginError',"");
      }).catch(error => {
		context.commit('setRegisterError',"");
    context.commit('setUser',{});
    context.commit('setToken','');
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
      context.commit('setToken','');
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
    	axios.post("/api/quiz/userquizzes/" + context.state.user.id,subject,context.getters.getAuthHeader).then(response => {
    		context.commit('setUserQuizList', response.data);
    	}).catch(error => {
    		console.log("Error while fetching user quiz list");
    	});
    },

    makeQuiz(context,quiz) {
    	axios.post("/api/quiz/makequiz/" + context.state.user.id,quiz,context.getters.getAuthHeader).then(response => {
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
    	axios.delete("/api/quiz/" + name.name + "/user/" + context.state.user.id,context.getters.getAuthHeader).then(response => {
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






