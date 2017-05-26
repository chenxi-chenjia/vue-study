var a1=new Vue({
	el:'#a1',
	data:function(){
		return{
			msg:'hello，world',
			bg:'red',
			btn_class:'btn-success',
			h2_show:true,
			list:[1,2,3,4,55,66,,7,8,9],
			todo_list:[]
		}
	},
	computed:{
		abc:function(){
			return this.msg.split('').reverse().join('')
		},
		someDynamicCondition:function(e){
			return this.bg;
		}

	},
	methods:{
		bandelhand:function(e){
			
		},
		change:function(e){
			this.bg='blue';
			this.h2_show=!this.h2_show;
		},
		add:function(e){
			this.todo_list.push(e.target.value);
			e.target.value='';
		}
	}
})



var animate=new Vue({
	el:'#animate',
	data:function(){
		return{
			fadeIn:'',
			fade_flag:true
		}
	},
	methods:{
		animate:function(){
			
			this.fade_flag=!this.fade_flag;
		}
	}
})