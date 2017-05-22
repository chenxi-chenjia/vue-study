<template name='playPage'>
	<div class="playpage" >
		<div class="content">
			<header>
				<i class="iconfont icon-fanhui"
				@touchend='closeplaypage'
				></i>
			</header>
			<div class="lyrics">
				<div class="p-box">
					{{lrc}}
				</div>
			</div>
			<footer></footer>
		</div>
			
		<div class="bg" :style='{backgroundImage:bg_url}' >{{bg}} </div>
	</div>
</template>


<script>
import	{lrc} from '../assets/lyrics.js'
export default{
	name:'Playpage',
	props:['musicNow'],
	data:function(){
		return{
			bg_url:'url(./static/photo/'+this.musicNow.autor+'1.jpg)'
		}
	},
	computed:{
		bg:function(){
			var bg=this.musicNow.background;
			var n=1;
			var bg_url;
			var self=this;
			var t=setInterval(function(){
				n++;
				if(n>=bg.length+1){
					n=1;
				}
				bg_url='url(./static/photo/'+self.musicNow.autor+n+'.jpg)';
				self.bg_url=bg_url;
			},10000)
		},
		lrc:function(){
			lrc(this.musicNow.lrc)
		}
	},
	methods:{
		closeplaypage:function(){
			this.$emit('showPlayPage',false);
		}
	}
}
</script>

<style lang='scss' scoped>
.playpage{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #fff;
	transition: all .5s linear;
    transform-origin: center bottom;
}
.content{
	position: relative;
	z-index: 1;
}
header{
	width: 100%;
	height: 40px;
	background: #0b7cd8;
	padding: 0 15px;
	line-height: 40px;
	.iconfont{
		color: #fff;
	}
}
.bg{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center;
	z-index: 0;
	animation:  op 10s linear infinite;
	opacity: 0;
}
@keyframes op{
	0%{
		opacity: 0;
	}
	10%{
		opacity: 1;
	}
	90%{
		opacity: 1;
	}
	100%{
		opacity: 0;
	}
}
</style>