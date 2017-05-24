<template name='footer' >
	<footer>
		<div class="container-fluid">
			<div class="avater-box pull-left">
				<div class="avater" :style='{backgroundImage:photo} '
				@touchend.prevent='play_page_flag'
				></div>
			</div>
			<div class="control">
				<div class="slider-box">
	                <div class="slider-bg">
	                    <div class="slider-been"
	                    :style='{width:width_length+"px"}'></div>
	                    <div class="slider-hander"
	                    :style='{transform:"translateX("+width_length+"px)"}'></div>
	                </div>
	            </div>
	            <div class="information-box">
	            	<h5>{{name}}</h5>
	            	<p>{{autor}}</p>
	            </div>
	            <div class="operation-box">
	            	<span class="iconfont" :class='btn_play_cl'
					@touchend='play_pause'
	            	></span>
	            	<span class="iconfont icon-xiayishou"></span>
	            	<span class="iconfont icon-bofangliebiao"></span>
	            </div>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
  	name: 'footer',
  	props:['musicNow','playPause'],
	data() {
		return{
			music_now:this.musicNow,
			wl:0
		}
	},
	computed:{
		name:function(){
			var n=this.music_now.name;
			return n;
		},
		autor:function(){
			var a=this.music_now.autor;
			return a;
		},
		photo:function(){
			var p ="url(./static/photo/"+this.music_now.autor+"1.jpg)";
			return p;
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
		}
	},
	methods:{
		play_page_flag:function(){
			this.$emit('showPlayPage',true);
		},
		play_pause:function(){
			this.$emit('play_pause',!this.playPause)
		}
	},
	updated:function(){
		console.log(this.playPause)
	},
	mounted:function(){
		var slide_wl=document.querySelector('.slider-box').clientWidth;
		this.wl=slide_wl;
	}


}
</script>

<style lang='scss' scoped>
@keyframes avater{
	0%{
		transform: rotate(0);
	}
	100%{
		transform: rotate(360deg);
	}
}
footer{
	position: fixed;
	bottom: 0;
	left: 0;
	background-color: #fff;
	box-shadow: 0 10px 30px rgba(0,0,0,0.7);
	width: 100%;
	height: 65px;
	transition: all .5s ease-in-out;
	.container-fluid{
		height: 100%;
	}
	.avater-box{
		width: 1.5rem;
		height: 100%;
		position: relative;

	}
	.avater{
		width: 1.2rem;
		height: 1.2rem;
		box-shadow:  0 0 20px rgba(0,0,0,0.2);
		background: #fff;
		border-radius: 50%;
		position: absolute;
		top: -.1rem;
		background-size: cover;
		background-position: center;
		animation: avater 20s linear infinite;
	}
	.control{
		height: 100%;
		margin-left: 1.5rem;
		position: relative;
	}
	.slider-box{
		width: 100%;
		height: 22px;
		padding: 10px 0;
	}
	.slider-bg{
		background: #b5b5b5;
		width: 100%;
		height: 100%;
		position: relative;
	}
	.slider-been{
		width: 10px;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: #51ccff;
	}
	.slider-hander{
		width: 10px;
		height: 10px;
		position: absolute;
		background: #51ccff;
		border-radius: 50%;
		left: -5px;
		top: 50%;
		margin-top: -5px;
	}
	.information-box{
		position: absolute;
		top: 22px;
		left: 0;
		h5{
			margin-top: 0;
			margin-bottom: 5px;
			line-height: 1em;
		}
		p{
			margin-top: 0;
			line-height: 1em;
			margin-bottom: 0;
			color: #999;
		}
	}
	.operation-box{
		position: absolute;
		top: 22px;
		bottom: 0;
		right: 0;
		.iconfont+.iconfont{
			margin-left: .3rem;
		}
		.iconfont{
			font-size: 20px;
		}
		.iconfont:first-child{
			font-size: 24px;
		}
	}

}

</style>