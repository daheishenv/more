<template>
    <view class="c-send-sms-code" @tap="getSmsCode" :style="[ parentStyle_ ]">
        <c-colors :pro="pro_" :theme="theme_" :radius="radius">
        	<block v-if="mode === 'button'">
				<c-button :width="wudth" :height="height" :plain="plain_" @click="getSmsCode">
					<view :style="[ textStyle_ ]" @tap="getSmsCode">{{ btnText_ }}</view>
				</c-button>
			</block>
			<block v-else>
				<view :style="[ textStyle_ ]">{{ btnText_ }}</view>
			</block>
			<slot></slot>
        </c-colors>
    </view>
</template>
<script>
// 定时器
let smsTime = null;
// 总秒数
const baseCout = 60;
export default {
	/**
	 * 发送短信验证码组件
	 * */
	name: 'c-send-sms-code',
	data() {
	    return {
	        busy: false,// 请求拦截
			count: 0,// 发送短信倒计时
			smsNum: 0,// 短信发送次数
	    }
	},
    props: {
		/**
		 * 是否是按钮形式
		 * 可选值：text  button  static
		 * static	表示没有任何请求状态只做倒计时
		 * */
		mode: {
			type: String,
			default: 'text'
		},
		// 按钮镂空，仅在mode 为 button 才生效
		plain: {
			type: [ String, Boolean ],
			default: true
		},
		// 按钮圆角，仅在mode 为 button 才生效
		radius: {
			type: [ String, Number ],
			default: 8
		},
		// 默认文字提示
        text: {
            type: String,
            default: '获取验证码'
        },
		// 再次获取验证码提示
		againText: {
            type: String,
            default: '重新获取'
		},
		// 再次获取验证码提示
		loadText: {
            type: String,
            default: '正在发送'
		},
		width: {
            type: [ String, Number ],
            default: ''
		},
		height: {
            type: [ String, Number ],
            default: ''
		},
		fontSize: {
            type: [ String, Number ],
            default: 28
		},
		// 接口请求名称
		ajaxName: {
            type: String,
            default: 'sendSmsCode'
		},
		// 接口请求的额外参数
		ajaxParams: {
            type: Object,
            default: () => {
				return {}
			}
		},
		// 获取验证码的手机号字段key值，也会被用于校验发送前的空值
		phoneKey: {
            type: String,
            default: 'mobile'
		}
    },
	computed: {
		// 是否镂空
		plain_() {
			return String(this.plain) === 'false' ? false : true;
		},
		theme_() {
			// 如果是按钮,并且是非镂空的,字体一定是白色的
			let textColor = !this.plain_ && this.mode === 'button' ? '#fff' : 't';
			if (this.busy || this.count < baseCout && this.count > 0) {
				return [ 't|0.5', `${textColor}|0.5` ]
			}
			return [ 't', textColor ]
		},
		pro_() {
			if(this.mode === 'text') return ['c'];
			if(String(this.plain) === 'false') return ['c', 'bgc'];
			return ['c', 'bdc'];
		},
		// 文字内容
		btnText_() {
			if(this.busy) return this.loadText;
			if (this.count < baseCout && this.count > 0) return `${this.againText}(${this.count}S)`;
			return this.smsNum === 0 ? this.text : this.againText;
		},
		// 文字区域大小
		parentStyle_() {
			let parentStyle = {};
			this.width ? (parentStyle.width = this.width + 'rpx') : '';
			this.height ? (parentStyle.height = this.height + 'rpx') : '';
			return parentStyle;
		},
		// 文字样式
		textStyle_() {
			return {
				fontSize: this.fontSize + 'rpx'
			}
		}
	},
    methods: {
		// 发送短信接口
		async getSmsCode(abort = true) {
			if(abort && this.mode === 'static') return  ;
			const tel = this.ajaxParams[this.phoneKey];
			if (!tel) return this.$toast('手机号码不能为空');
			if (!this.$c.validate('moblie', tel)) return this.$toast('手机号码格式不正确');
			if(this.busyMsg()) return ;
			// 发送短信验证码
			if(this.busy) return ;
			this.busy = true;
			try{
				let { data } = await this.$http(this.ajaxName, this.ajaxParams);
				this.busy = false;
				// 发送短信验证码次数+1
				this.smsNum++;
				this.staticCountDown();
				// 发送成功之后回调
				this.$emit('success', {
					type: 'click',
					detail: {
						tel,
						smsNum: this.smsNum,
						count: this.count,
						...data
					}
				})
			}catch(err){
				this.busy = false;
				//TODO handle the exception
				this.$emit('error', {
					type: 'click',
					detail: err
				})
			}
		},
		staticCountDown() {
			this.count = baseCout;
			this.countdown();
		},
		// 倒计时
		countdown() {
			this.count--;
			smsTime = setTimeout(() => {
				if (this.count > 0) {
					this.countdown();
				} else {
					this.clearTime();
				}
			}, 1000);
		},
		// 清空定时器
		clearTime() {
			clearTimeout(smsTime);
			smsTime = null;
		},
		busyMsg() {
			if (this.count > 0) {
				// this.$c.throttle(() => {
				// 	this.$toast(`${this.count}秒后重新获取`);
				// }, 150)
				return true;
			}
			return false;
		}
    },
	destroyed() {
		this.clearTime();
	}
}
</script>

<style lang="scss" scoped>
	.c-send-sms-code{
		position: relative;
	}
</style>
