/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-11-19 17:20:05
 */
export default {
    data() {
        return {
            ruleType: 0, // 积分规则类型
            relateType: 99,
            autoLoadState: true, // 是否自动请求开启积分接口
            explainData: {}, // 积分规则内容
            isOpenIntegral: false// 是否开启积分
        }
    },
    mounted() {
        console.log('mounted')
        this.ruleType = this.$Route.meta && this.$Route.meta.integral_type ? this.$Route.meta.integral_type : 0
        this.relateType = this.$Route.meta && this.$Route.meta.relate_type ? this.$Route.meta.relate_type : 99
        this.ruleType && this.autoLoadState ? this.getCreditState() : ''
    },
    methods: {
        // 获取积分规则
        async getExplainByType(rule_type) {
            rule_type = rule_type || this.ruleType
            const { data } = await this.$http('creditConfig', { rule_type })
            this.explainData = data
            return data
        },
        // 获取积分状态(是否开启)
        async getCreditState(rule_type, relate_type) {
            console.log('-----获取积分开启状态-----')
            rule_type = rule_type || this.ruleType
            relate_type = relate_type || this.relateType
            try {
                const { data: { state = false } } = await this.$http('creditState', { rule_type, relate_type })
                this.isOpenIntegral = state
                this.stateFinish(state)
            } catch (e) {
                this.isOpenIntegral = false
                this.stateFinish(false)
                // TODO handle the exception
            }
        },
        // 所有积分相关的接口都放在这个接口后面执行，并且state要为true才往下执行不然不做操作
        stateFinish(state) {
            console.log('活动状态：', state ? '开启' : '关闭')
        }
    }
}
