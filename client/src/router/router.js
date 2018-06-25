import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const root = Vue.component('root', {
	template : '<router-view name="view"></router-view>'
});

export default new Router({
	routes : [ {
		path : '/',
		redirect : '/main'
    },
     // 首页
	{
		name : 'main',
		path : '/main',
		components : {
			mainWindow : resolve => { return require([ '@/pages/index' ], resolve) }
        },
    },
     // 登入页
	{
		name : 'login',
		path : '/login',
		components : {
			mainWindow : resolve => { return require([ '@/pages/login' ], resolve) }
        },
	},
	 //注册页
	{
		name : 'signIn',
		path : '/signIn',
		components : {
			mainWindow : resolve => { return require([ '@/pages/signIn' ], resolve) }
        },
	},
	 //添加数据
	 {
		name : 'add',
		path : '/add',
		components : {
			mainWindow : resolve => { return require([ '@/pages/add' ], resolve) }
        },
    }
    // 404页面
	// {
	// 	name : '404',
	// 	path : '/404',
	// 	components : {
	// 		mainWindow : resolve => { return require([ '@/pages/page404/page404' ], resolve) }
	// 	}
	// }
]
})
