<template>
	<header>
		<div class="container-fluid">
			<h5>我的音乐</h5>
		</div>
	</header>
</template>

<script>

export default {
	name:'head',
	data(){
		return{
			this_location:'list'
		}
	}
}
	
</script>

<style lang='scss' scoped>
	header{
		background: #0b7cd8;
		color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1;
	}
	.row{
		margin: 0 -15px;
	}
	h5{
		margin: 0;
		line-height: 1em;
		text-align: center;
		padding: 10px 0;
	}
	span{
		position: relative;
		color: #fff;
	}
	i{
		content: '';
		position: absolute;
		height: 2px;
		background: #fff;
		left: 0;
		bottom: -5px;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		transition: width .25s ease-in-out;
	}
	.show{
		i{
			width: 100%;
		}
	}	
</style>