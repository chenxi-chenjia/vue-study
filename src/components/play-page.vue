<template name='playPage'>
	<div class="playpage" >
		<div class="content">
			<div class="mask"></div>
			<header>
				<i class="iconfont icon-fanhui"
				@touchend='closeplaypage'
				></i>
			</header>
			<h3>{{musicNow.name}} </h3>
			<h4> {{musicNow.autor}}</h4>
			<div class="lyrics">
				<div class="lyc-box">
					<div class="p-box">
						<p v-for='item in lrc' :id='item.t'>{{item.l}} </p>
					</div>
				</div>
			</div>
			<footer>
				<div class="time-box ">
					<span>{{currentTime}} </span>
					<div class="slide-box">
						<div class="slide-bg"></div>
						<div class="slide-over"
						:style='{width:width_length+"px"}'
						></div>
						<div class="slide-handle"
						:style='{transform:"translateX("+width_length+"px)"}'
						></div>
					</div>
					<span>{{duration}}</span>
				</div>
				<div class="handle-box">
					<div class="sx-box">
						<span class="iconfont icon-shunxubofang"></span>
					</div>
					<div class="caozuo-box">
						<span class="iconfont icon-shangyishou"></span>
						<span class="iconfont"
						 :class='btn_play_cl'
						 @touchend='play_pause' ></span>
						<span class="iconfont icon-xiayishou"></span>
					</div>
					<div class="list-box">
						<span class="iconfont icon-bofangliebiao"></span>
					</div>
				</div>
			</footer>
		</div>
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for='item in this.musicNow.background'
				:style='{backgroundImage:"url(./static/photo/"+musicNow.autor+item+".jpg)"}'
				></div>
			</div>
		</div>
	</div>
</template>


<script>
import	{lrc} from '../assets/lyrics.js'
import {ct} from '../assets/tm.js';

export default{
	name:'Playpage',
	props:['musicNow','playPause'],
	data:function(){
		return{
			wl:0
		}
	},
	computed:{
		lrc:function(){
			return lrc(this.musicNow.lrc);
		},
		duration:function(){
			var a=this.musicNow.duration;
			a=ct.m(a);
			return a;
		},
		currentTime:function(){
			var a=this.musicNow.currentTime;
			a=ct.m(a);
			return a;
		},
		btn_play_cl:function(){
			//播放暂停
			if(this.playPause){
				return 'icon-iconfont67'
			}else {
				return 'icon-ttpodicon' 
			}
		},
		width_length:function(){
			var w=this.musicNow.currentTime/this.musicNow.duration*this.wl;
			return w;
		},
		lry_top:function(){

		}
	},
	methods:{
		closeplaypage:function(){
			this.$emit('showPlayPage',false);
		},
		play_pause:function(){
			this.$emit('play_pause',!this.playPause);
		}
	},
	updated:function(){
		this.currentTime=this.musicNow.currentTime;
	},
	mounted:function(){
		var slide_wl=document.querySelector('.slide-box').clientWidth;
		this.wl=slide_wl;
		// var mySwiper = new Swiper('.swiper-container', {
		// 	autoplay: 1000,
		// 	effect:'fade',
		// 	simulateTouch : false,
		// 	loop:true
		// })
	}
}
</script>

<style lang='scss' scoped>
@import '../assets/swiper-3.4.2.min.css';

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
	width: 100%;
	height: 100%;
}
header{
	width: 100%;
	height: 40px;
	background: #0b7cd8;
	padding: 0 15px;
	line-height: 40px;
	position: relative;
	z-index: 1;
	.iconfont{
		color: #fff;
	}
}
.mask{
	width: 100%;
	height: 100%;
	z-index: 0;
	position: absolute;
	background: rgba(0,0,0,0.5);
}
.swiper-container{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
	.swiper-slide{
		background-size: cover;
		background-position: center;
	}
}

h3,h4{
	text-align: center;
	color: #fff;
	position: relative;
	z-index: 1;
	opacity: .8;
}
.lyrics{
	position: relative;
	z-index: 1;
	width:100%;
	height: 50%;
	color: #fff;
	p{
		margin-top: 0;
		font-size: 16px;
		margin-bottom: 5px;
	}
}
.lyc-box{
	position: relative;
	overflow: hidden;
	padding: 0 15px;
	width: 100%;
	height: 100%;
}
.p-box{
	text-align: center;
	position: absolute;
	left: 0;
	top: 50%;
	width: 100%;
	
}
footer{
	width: 100%;
	position:  absolute;
	z-index: 1;
	background: transparent;
	height: 2rem;
	left: 0;
	bottom: 0;
	padding: 0 15px;
	color: #fff;
	.time-box{
		display: flex ;
		justify-content: space-between;
		align-items: center;
		height: .5rem;
	}
	.slide-box{
		width: 75%;
		height: 3px;
		position: relative;
	}
	.slide-bg{
		width: 100%;
		height: 100%;
		background: #fff;
		opacity: 0.3;
		position: absolute;
		z-index: 0;
		left: 0;
		top: 0;
	}
	.slide-over{
		position: absolute;
		width: 100px;
		height: 100%;
		left: 0;
		top: 0;
		background: #0b7cd8;
	}
	.slide-handle{
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #fff;
		position: absolute;
		left: -5px;
		top: 50%;
		margin-top: -5px;
		box-shadow: 0 0 15px rgba(255,255,255,0.7);
	}
	.handle-box{
		display: flex ;
		justify-content: space-between;
		align-items: center;
		padding-left: 15px;
		padding-right: 15px;
		height: 1.5rem;
		.iconfont.icon-shunxubofang{
			font-size: 20px;
		}
		.iconfont.icon-bofangliebiao{
			font-size: 20px;
		}
	}
	.caozuo-box{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		width: 50%;
	}
	.iconfont.icon-shangyishou{
		display: block;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		background: #3EC4FC;
		font-size: 18px;
		text-align: center;
		line-height: 35px;
	}
	.iconfont.icon-xiayishou{
		display: block;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		background: #3EC4FC;
		font-size: 18px;
		text-align: center;
		line-height: 35px;
	}
	.iconfont.icon-ttpodicon{
		display: block;
		width: 45px;
		height: 45px;
		border-radius: 50%;
		background: #3EC4FC;
		font-size: 30px;
		padding-left: 12px;
		padding-top: 8px;
	}
	.iconfont.icon-iconfont67{
		display: block;
		width: 45px;
		height: 45px;
		border-radius: 50%;
		background: #3EC4FC;
		font-size: 30px;
		text-align: center;
		padding-top: 8px;
	}
}

</style>