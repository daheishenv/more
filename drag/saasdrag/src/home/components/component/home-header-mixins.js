export default {
    props: {
		config: {
			type: Object,
			default: () => {
				return {}
			}
		},
        // 分类选中值
        value: {
            type: Number,
            default: 0
        }
    },
	computed: {
		shopName_() {
			return this.config.shop ? this.config.shop.shop_name : '';
		}
	}
}