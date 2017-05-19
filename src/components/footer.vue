<template name='footer' >
	<footer>
		<div class="container-fluid">
			<div class="avater-box pull-left">
				<div class="avater"></div>
			</div>
			<div class="control">
				<div class="slider-box">
	                <div class="slider-bg">
	                    <div class="slider-been"></div>
	                    <div class="slider-hander"></div>
	                </div>
	            </div>
	            <div class="information-box">
	            	<h5>我做我的王</h5>
	            	<p>兄弟链</p>
	            </div>
	            <div class="operation-box">
	            	<span class="iconfont icon-ttpodicon"></span>
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
	data() {
		return{

		}
	}
	

}
</script>

<style lang='scss'>
@keyframs{
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