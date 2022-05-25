export default {
    data() {
        return {
            page: 1,
            limit: 10,
            busy: false, //请求拦截，防止多次加载
            finish: false, //是否请求完成，用于页面展示效果
            pageList: [], //页面数据
            reqParams: {}, //页面请求参数，可被改变的
            defaultParams: {}, //页面请求参数，下拉刷新不会被重置的改变
            routeName: '', //特殊情况，页面需要复用别人的list的时候
            autoReq: true, //onload是否自己去请求
            lodingText: '', //请求中底部显示的文案
            noDataText: '暂无数据', //自定义无数据文案
			lastText: '- 我是有底线的 -',
            noData: false ,//页面无数据
            reqName: ''
        }
    },
    created() {
        this.autoReq && this.initPage(false, true);
    },
    onPullDownRefresh() {
        this.pullDownRefreshFn();
    },
    onReachBottom() {
        this.reachBottomFn();
    },
    methods: {
		// 重置初始化数据
        initPage(saveParams = true, refresh = false) {
            //初始化所有变量
            this.page = 1;
            this.busy = false;
            this.finish = false;
            this.noData = false;
            this.lodingText = '数据加载中';
            !saveParams && (this.reqParams = {});
            this.getCommonList(refresh);
        },
		// 下拉刷新函数
        pullDownRefreshFn() {
            this.initData();
            this.initPage(false, true);
        },
		// 上啦加载函数
        reachBottomFn() {
            this.getCommonList();
        },
		// 重置数据,方便调用（一般在外面自定义清空一些数据）
        initData() {//重置data里面的变量，方便外面引用这个mixin的时候，下拉刷新重置变量

        },
		// 列表获取数据接口
        async getCommonList(refresh) {
			if(!this.reqName) return ;
            if (this.busy) return;
            this.busy = true;
            this.finish = false;
            let httpFn = this.$http || getApp().globalData.$http;//兼容nvue
            try{
            	let { data } = await httpFn(this.reqName, {
            	    page: this.page,
            	    limit: this.limit,
            	    ...this.defaultParams,
            	    ...this.reqParams
            	});
            	if (this.page === 1) this.pageList = [];
            	/**
            	 * [Node.JS中用concat和push连接两个或多个数组的性能比较](http://ourjs.com/detail/5cb3fe1c44b4031138b4a1e2)
            	 * 那么两者在node.js的性能如何？ 我们做了一组测试数据，两种分别测试100万次。
            	 * push比concat方法快3倍左右。因为push只是在原数组的基础上进行修改，所以会快一点。
            	 * push返回的是数组的长度，所以没重新定义变量再判断了
            	 * [Array.prototype.push.apply(arr1, arr2)无法自动触发DOM更新](https://www.imooc.com/wenda/detail/494323)
            	 * 因为 this.pageList.push !== Array.prototype.push,，this.pageList.push指向的是vue重写过的方法
            	 */
            	this.finish = true;
            	let resLen = data.list ? data.list.length : 0;
            	if(resLen === 0){
            		this.resSuccess(data, refresh);
            		return ;
            	}
            	let listLen = this.pageList.push.apply(this.pageList, data.list);
            	if (listLen < data.count && this.limit <= resLen) { //说明还有数据
            	    this.busy = false;
            	    this.page = Math.ceil(listLen / this.limit) + 1;
            	}
            	this.resSuccess(data, refresh);
            }catch(e){
            	//防止接口报错锁死
				this.busy = false;
            	this.finish = true;
            }
        },
		resSuccess(data, refresh) {
			if(this.finish && this.busy){
			    if(this.pageList.length > 0){
			        this.$nextTick(() => {
						setTimeout(() => {
							this.lodingText = this.lastText;
						}, 100)
					})
			    }else{
			        this.lodingText = this.noDataText;
			        this.noData = true;
			    }
			}
			refresh && uni.stopPullDownRefresh();
			this.finishInit(data);
		},
		// 请求完成做点什么（方便外面导入的文件自己引用）
        finishInit(data) {//请求完成做点什么
			// console.log('列表请求完成');
        }
    }

}
