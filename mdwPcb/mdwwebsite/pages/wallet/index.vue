<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2022-01-06 11:18:45
-->
<template>
    <div>
        <wallet
            ref="wallet"
            :cont-data="pageList"
            :total="total"
            :current-page="currentPage"
            @changeTime="changeTime"
            @changePage="changePage"
        />
    </div>
</template>
<script>
export default {
    async asyncData({ $axios }) {
        let data_
        try {
            const { data } = await $axios.$post('/company/walletRecord', { page: 1, limit: 10 })
            data_ = data
        } catch (error) {
            console.log(error)
        }

        return {
            pageList: data_.list,
            total: data_.count,
            currentPage: data_.page
        }
    },
    data() {
        return {
            time: ''
        }
    },
    methods: {
        changeTime(e) {
            this.$refs.wallet.showPageCom = false
            this.currentPage = 1
            this.time = e.data
            this.getPage()
            this.$refs.wallet.showPageCom = true
        },
        changePage(e) {
            this.currentPage = e
            this.getPage()
            this.$nextTick(() => {
                const d = document.querySelector('.wallet-t')
                d.scrollIntoView({ behavior: 'smooth' })
            })
        },
        async getPage() {
            const { data } = await this.$axios.$post('/company/walletRecord', { page: this.currentPage, limit: 10, date: this.time })
            this.pageList = data.list
            this.total = data.count
            this.currentPage = data.page
        }
    }
}
</script>
<style lang="scss">
</style>
