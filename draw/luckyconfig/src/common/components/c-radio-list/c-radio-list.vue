<template>
	<view>
		<view class="flex-column align-center" v-if="loading">
			<c-loading color="#666" size="100" />
		</view>
		<block v-else>
			<block v-if="list.length">
				<c-radio-group  v-model="selectValue" @change="handleRadioGroup" wrap>
					<c-radio :name="item[idKey]" class="flex-space-between ptb24" :class="{'c-underline': index !== list.length - 1}" v-for="(item, index) in list" :key="item.value">
						<view slot="before">
							<view class="flex">
								<c-image v-if="item.icon" :src="item.icon" size="44"></c-image>
								<text class="pl24 flex-1">{{item[labelKey]}}</text>
							</view>
						</view>
					</c-radio>
				</c-radio-group>
			</block>
			<block v-else>
				<c-no-data :text="lodingText" showImg :icon="lodingIcon"></c-no-data>
			</block>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: [ Number, String ],
				default: () => {
					return ''
				}
			},
			// 加载中文字样式
			loadingStyle: {
                type: Object,
                default: () => {
                    return {}
                }
            },
			// 没有数据
            noData: {
                type: Boolean,
                default: false
            },
			lodingIcon: {
                type: String,
                default: 'common/no-order.png'
			},
			// 加载文字
            lodingText: {
                type: String,
                default: '暂无可用支付方式'
            },
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			// 数据加载中
			loading: {
				type: Boolean,
				default: false
			},
			// 页面显示的值
			labelKey: {
			    type: String,
			    default: 'label'
			},
			// 勾选中的值
			idKey: {
			    type: String,
			    default: 'value'
			},
		},
		computed: {
			selectValue: {
				get(val) {
					return val.value;
				},
				set(val) {
					this.$emit('input', val);
				}
			}
		},
		methods: {
			handleRadioGroup(e) {
				this.selectValue = e.detail.value;
				this.$emit('change', e);
			}
		}
	}
</script>

<style>
</style>
