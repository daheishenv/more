/*
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-12-07 14:14:35
 */
export default {
    data() {
        return {
            regionList: []
        }
    },
    onLoad() {
        this.getRegionList()
    },
    watch: {
        regionList: {
            handler(val) {
                uni.setStorageSync(this.$config.localCityCatchName, val)
            },
            deep: true
        }
    },
    computed: {
        curCity_() {
            const allCity = this.regionList
            let curCity = {}
            if (allCity) {
                curCity = allCity.find(o => o.checked) || allCity.find(o => o.curCity) || {}
            }
            return curCity
        }
    },
    methods: {
        // 可根据经纬度或者地址相互获取查询
        async getLocationInfo({ lat, lng, address }) {
            const { data } = await this.$http('getLocalInfo', {
                lat,
                lng,
                address
            })
            return data
        },
        getRegionList() {
            this.regionList = uni.getStorageSync(this.$config.localCityCatchName) || []
        },
        setRegionList(list) {
            this.regionList = list
        },
        // 设置选中地址（有选中历史）
        setRegionListItem(address) {
            this.getRegionList()
            // const index = regionList.findIndex(o => o.id === item.id)
            let deleteItem = address
            let inserIndex = -1
            this.regionList.forEach((o, i) => {
                o.checked = o.id === address.id
                if (o.checked) inserIndex = i
            })
            address.checked = true
            inserIndex !== -1 && (deleteItem = this.regionList.splice(inserIndex, 1)[0])
            this.regionList.splice(this.regionList.length && !deleteItem.curCity ? 1 : 0, 0, deleteItem)
        },
        getLocation() {
            return new Promise((rs, rj) => {
                uni.getLocation({
                    type: 'gcj02',
                    success: async (res) => {
                        console.error(res)
                        console.log('当前位置的经度：' + res.longitude)
                        console.log('当前位置的纬度：' + res.latitude)
                        const address = await this.getLocationInfo({
                            lat: res.latitude,
                            lng: res.longitude
                        })
                        const resAddress = {
                            ...res,
                            ...address,
                            name: address.city,
                            curCity: address.city
                        }
                        this.setRegionListItem(resAddress)
                        rs(resAddress)
                    },
                    fail: (err) => {
                        rj(err)
                        console.error(err)
                    }
                })
            })
        }
    }
}
