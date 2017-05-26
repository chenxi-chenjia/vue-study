// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import {music} from '@/assets/music_list.js'

Vue.config.productionTip = false;
Vue.use(Vuex);


const store = new Vuex.Store({
	state:{
		music_list:music,
		music_num:0
	},
	mutations:{
		cut:function(state,type){
			var index=state.music_num;
			switch(type){
				case 'next':
				index++;
				break;
				case 'prev':
				index--;
				break;
				case 'random':
				index=Math.floor(Math.random()*state.music_list.length);
				break;
				case 'cycle':
				index=index;
				break;
			}
			index=index>=state.music_list.length?0:index;
			index=index<0?state.music_list.length:index;
			state.music_num=index;
		},
		del:function(state,index){
			if(state.music_list.length>1){
				state.music_list.splice(index,1);
			}
		},
		choose:function(state,index){
			state.music_num=index;
		}
	}
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
