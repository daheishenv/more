export default {
    data() {
        return {
            commentList: [],
            commentTotal: 0
        }
    },
    methods: {
        // 请求评论数据
        async getGoodsCommentLists() {
            const { data } = await this.$http('getGoodsCommentLists', {
                goods_id: this.$Route.query.detailId
            })
            this.commentList = data.list
            this.commentTotal = data.count
        }
    },
    onLoad() {
        this.getGoodsCommentLists()
    }
}
