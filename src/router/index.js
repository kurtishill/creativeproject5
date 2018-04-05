import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import MathQuiz from '@/components/MathQuiz'
import ColorQuiz from '@/components/ColorQuiz'
import AnimalQuiz from '@/components/AnimalQuiz'
import PublicQuizzes from '@/components/PublicQuizzes'
import YourQuizzes from '@/components/YourQuizzes'
import MakeQuiz from '@/components/MakeQuiz'
import UserQuiz from '@/components/UserQuiz'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
    	path: '/MathQuiz',
    	name: 'MathQuiz',
    	component: MathQuiz
    },
    {
    	path: '/ColorQuiz',
    	name: 'ColorQuiz',
    	component: ColorQuiz
    },
    {
    	path: '/AnimalQuiz',
    	name: 'AnimalQuiz',
    	component: AnimalQuiz
    },
    {
    	path: '/PublicQuizzes',
    	name: 'PublicQuizzes',
    	component: PublicQuizzes
    },
    {
    	path: '/YourQuizzes',
    	name: 'YourQuizzes',
    	component: YourQuizzes
    },
    {
        path: '/MakeQuiz',
        name: 'MakeQuiz',
        component: MakeQuiz
    },
    {
        path: '/UserQuiz',
        name: 'UserQuiz',
        component: UserQuiz
    }
  ]
})
