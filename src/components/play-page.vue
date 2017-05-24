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
					<div class="p-box" :style='{transform:lry_top}'>
						<p v-for='(item,i) in lrc' :id='item.t' :class='i==lrc_num?"lrc-now":""'>{{item.l}} </p>
					</div>
				</div>
			</div>
			<footer>
				<div class="time-box ">
					<span>{{currentTime}} </span>
					<div class="slide-box"
					@touchstart='timeChange'
					@touchmove='timeChange'
					>
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
						<span class="iconfont cut-type"
						:class='[cutList[cutType].value]'
	            		@touchend='cut_type_choose'
						></span>
					</div>
					<div class="caozuo-box">
						<span class="iconfont icon-shangyishou"
						@touchend='cut_prev'></span>
						<span class="iconfont"
						 :class='btn_play_cl'
						 @touchend='play_pause' ></span>
						<span class="iconfont icon-xiayishou"
						@touchend='cut_next'></span>
					</div>
					<div class="voice-box">
						<div class="voice-slide_parent">
							<transition name='voice'>
								<div class="voice-slide" v-if='voice_flag'>
									<span class="iconfont icon-iconfontzengjia"></span>
									<div class="voice-slide_box"
									@touchstart='voice_start'
									@touchmove='voice_move'
									>
										<div class="voice-slide_bg"></div>
										<div class="voice-slide_over"
										:style='{height:voice_height+"px"}'
										></div>
										<div class="voice-slide_handle"
										:style='{transform:"translateY(-"+voice_height+"px)"}'
										></div>
									</div>
									<span class="iconfont icon-jianshao"></span>
								</div>
							</transition>	
						</div>
						<span class="iconfont icon-yinliang"
						@touchend='voice_flag=!voice_flag'
						></span>
					</div>
				</div>
			</footer>
		</div>
		<div class="bg">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for='item in this.musicNow.background'
					:style='{backgroundImage:"url(./static/photo/"+musicNow.autor+item+".jpg)"}'
					></div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import	{lrc} from '../assets/lyrics.js'
import {ct} from '../assets/tm.js';
export default{
	name:'Playpage',
	props:['musicNow','playPause','cutList','cutType','voice'],
	data:function(){
		return{
			wl:0,
			lrc_num:0,
			voice_flag:false,
			hl:90,
			time_move:0
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
			var n=0;
			this.lrc.forEach((v,i)=>{
				if(this.musicNow.currentTime>v.t){
					n=i;
				}
			})
			this.lrc_num=n;
			if(this.lrc_num>=this.lrc.length){
				this.lrc_num=this.lrc.length;
			}
			return 'translateY(-'+this.lrc_num*30+'px)'
		},
        voice_height:function(){
			return this.voice*this.hl
        }
	},
	methods:{
		closeplaypage:function(){
			this.$emit('showPlayPage',false);
		},
		play_pause:function(){
			this.$emit('play_pause',!this.playPause);
		},
		timeChange:function(e){
			var x=e.changedTouches[0].clientX-$(e.currentTarget).offset().left;
			var m=x/this.wl;
			m=m>=1?0.95:m;
			m=m<0?0:m;
			var t=m*this.musicNow.duration;
			this.$emit('play_time',t);
		},
		cut_type_choose:function(){
			this.$emit('cut_type_choose')
		},
		cut_prev:function(){
			this.$emit('cut_music','prev');
		},
		cut_next:function(){
			this.$emit('cut_music','next');
		},
		voice_start:function(e){
			var pt=$(e.currentTarget).offset().top;
			var m=e.changedTouches[0].clientY-pt;
			var c=(90-m)/90;
			c=c>1?1:c;
			c=c<0?0:c;
			this.$emit('voice_change',c)
		},
		voice_move:function(e){
			var pt=$(e.currentTarget).offset().top;
			var m=e.changedTouches[0].clientY-pt;
			var c=(90-m)/90;
			c=c>1?1:c;
			c=c<0?0:c;
			this.$emit('voice_change',c)
		}
	},
	updated:function(){
		this.currentTime=this.musicNow.currentTime;

	},
	mounted:function(){
		var slide_wl=document.querySelector('.slide-box').clientWidth;
		this.wl=slide_wl;
		var mySwiper = new Swiper('.swiper-container', {
			autoplay: 10000,
			effect:'fade',
			simulateTouch : true,
			loop:true
		})
	}
}
</script>

<style lang='scss' scoped>
@import '../assets/swiper.min.css';

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
.bg{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
	.swiper-container{
		width: 100%;
		height: 100%;
	}
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
	height: 300px;
	margin-top: 50px;
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
	top: 40%;
	width: 100%;
	transition: all .25s linear;
	font-weight: 100;
}
p.lrc-now{
	color:#fffc27 ;
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
		width: 0;
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
		.iconfont.cut-type{
			font-size: 20px;
			display: inline-block;
			width: 23px;
		}
		.iconfont.icon-yinliang{
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
.voice-box{
	position: relative;

}
.voice-slide_parent{
	position: absolute;
	bottom: 150%;
	z-index: 10;
	height: 150px;
	width: 20px;
	overflow: hidden;
}
.voice-slide{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.7);
	transition: all .5s ease-in-out;
	display: flex;
	flex-direction: column;
	justify-content:space-between;
	align-items: center;
	border-radius: 4px;
	.iconfont{
		font-size: 18px;
	}
	.voice-slide_box{
		height: 60%;
		width: 3px;
		border-radius: 3px;
		position: relative;
	}
	.voice-slide_bg{
		height: 100%;
		width: 100%;
		position: absolute;
		z-index: 0;
		background: rgba(255,255,255,.4);
	}
	.voice-slide_handle{
		position: absolute;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		bottom: -5px;
		background: #fff;
		left: 50%;
		margin-left: -5px;
		box-shadow: 0 0 15px rgba(255,255,255,.7);
		z-index: 2;
	}
	.voice-slide_over{
		position: absolute;
		z-index: 1;
		width: 100%;
		height:0;
		background: #0b7cd8;
		bottom: 0;
		left: 0;
	}
}
.voice-enter-active{
	transform: translateY(100%);
}
.voice-enter-to{
	transform: translateY(0);
}
.voice-leave-active{
	transform: translateY(0);
}
.voice-leave-to{
	transform: translateY(100%);
}
</style>