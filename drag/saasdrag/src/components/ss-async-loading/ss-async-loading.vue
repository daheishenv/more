<template>
	<view>
		<view class="shape-container animation-2">
		  <view class="shape shape1"></view>
		  <view class="shape shape2"></view>
		  <view class="shape shape3"></view>
		  <view class="shape shape4"></view>
		</view>
		<view class="shape-text"></view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.shape-container {
	  width: 30px;
	  height: 30px;
	  position: fixed;
	  left: 50%;
	  margin-left: -15px;
	  top: 30%;
	  z-index: 999;
		.shape {
		  position: absolute;
		  width: 10px;
		  height: 10px;
		  border-radius: 1px;
		}
		.shape.shape1 {
		  left: 0;
		  background-color: #5C6BC0;
		}
		.shape.shape2 {
		  right: 0;
		  background-color: #8BC34A;
		}
		.shape.shape3 {
		  bottom: 0;
		  background-color: #FFB74D;
		}
		.shape.shape4 {
		  bottom: 0;
		  right: 0;
		  background-color: #F44336;
		}
		&.animation-2, &.animation-4 {
		  -webkit-transform: rotate(10deg);
				  transform: rotate(10deg);
		}
		&.animation-2 .shape, &.animation-4 .shape {
		  border-radius: 5px;
		}
		&.animation-2, &.animation-3, &.animation-4 {
		  -webkit-animation: rotation 1s infinite;
				  animation: rotation 1s infinite;
		}
	}
	@keyframes rotation {
	  from {
	    -webkit-transform: rotate(0deg);
	            transform: rotate(0deg);
	  }
	  to {
	    -webkit-transform: rotate(360deg);
	            transform: rotate(360deg);
	  }
	}
</style>
