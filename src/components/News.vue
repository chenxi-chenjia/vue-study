<template name='news'>
	
</template>

<script>
$.ajax({
	type:'post',
	dataType:'jsonp',
	url:'http://news-at.zhihu.com/api/4/story/8997528/long-comments',
	jsonp:'',
	success:function(e){
		var m=JSON.parse(e);
		console.log(e)
	},
	error:function(e){

	}
})
	export default{
		name:'news',
		data(){
			return{

			}
		},
		computed:{

		}
	}
</script>