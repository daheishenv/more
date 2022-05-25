export default {
	props: {
		list: {
			type: Object,
			default: () => {
				return {}
			}
		},
		// 是否显示标题
		showTitle: {
			type: Boolean,
			default: true
		},
		// 是否不是品牌数据
		isSub: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		dataList_() {
			return this.isSub ? this.list.sub : this.list.goods_branch.data
		}
	},
	methods: {
		jumpSearch(item) {
			this.$jump('searchList', { [this.isSub ? 'cat_id' : 'brand_id']: this.isSub ? item.cat_id : item.id})
		}
	}
}