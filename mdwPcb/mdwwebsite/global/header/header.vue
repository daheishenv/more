<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-12-18 11:32:33
-->
<template>
    <div class="b-header">
        <div class="main-container flex align-center justify-between">
            <a
                class="b-header-hd"
                @click="$router.push('/')"
            >
                <img
                    class="b-header__brand"
                    src="/images/logo.png"
                />
            </a>
            <div class="b-header-bd flex align-center">
                <ul class="b-header-nav flex align-center">
                    <li
                        v-for="(item, index) in menuList"
                        :key="index"
                        :class="{'active': activeIndex === index}"
                        @click="clickMenu(item)"
                    >
                        <a>{{ item.label }}</a>
                    </li>
                </ul>
                <div class="b-header__search">
                    <el-input
                        v-show="showInput"
                        v-model="keywords"
                        class="b-header__search"
                        placeholder="搜索小区名称、订单编号、业主称呼"
                        @focus="onfocus"
                        @input="onInput"
                    >
                        <img
                            slot="suffix"
                            class="b-header__search-icon"
                            src="/images/search.png"
                        />
                    </el-input>
                </div>
                <div class="b-header__info flex align-center">
                    <div
                        v-if="userInfo"
                        class="flex"
                    >
                        <div
                            class="name"
                            @click="$router.push('/wallet')"
                        >
                            {{ userInfo.show_name }}
                        </div>
                        <div
                            class="logout"
                            @click="logout"
                        >退出</div>
                    </div>
                    <div v-else>
                        <span
                            class="logout"
                            @click="login"
                        >登录</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'BHeader',
    props: {
        logo: {
            type: Object,
            default: () => {
                return {
                    logo: ''
                }
            }
        }
    },
    data() {
        return {
            menuList: [
                { label: '首页', path: '/', autoCompany: false },
                { label: '抢单', path: '/rendering', autoCompany: false },
                { label: '案例', path: '/case', autoCompany: true },
                { label: '设计师大赛', path: '/activity', autoCompany: true },
                { label: '施工工艺', path: '/work', autoCompany: true },
                { label: '人员', path: '/staff', autoCompany: true },
                { label: '工地', path: '/construction', autoCompany: true },
                { label: '管理中心', path: '/wallet', autoCompany: false }
            ],
            menuListNull: [],
            keywords: ''
        }
    },
    computed: {
        ...mapState(['userInfo']),
        showInput() {
            return this.$route.fullPath === '/'
        },
        activeIndex() {
            return this.menuList.findIndex(o => this.getParentPath(this.$route.fullPath) === o.path)
        }
    },
    watch: {
        '$route.name': {
            handler(val) {
                const menuList = this.menuList
                if (val === 'register' || val === 'agreement') {
                    this.menuList = this.menuListNull
                } else {
                    this.menuList = menuList
                }
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        if (this.$route.name !== 'register' && this.$route.name !== 'agreement') { !this.userInfo && this.$store.dispatch('getUserInfo') }
    },
    methods: {
        clickMenu(item) {
            const { id = 0 } = this.userInfo
            if (id <= 0 && item.autoCompany) {
                this.$confirm('请先绑定企业信息?', '提示', {
                    confirmButtonText: '前往绑定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/wallet/firm')
                }).catch(() => {

                })
                return
            }
            this.$router.replace(item.path)
        },
        onfocus() {
            // const d = document.querySelector('.index__order-header')
            // d.scrollIntoView({ behavior: 'smooth' })
        },
        onInput(res) {
            this.$store.commit('search/search', res)
        },
        getParentPath(str) {
            // '/' 或者 '/xx' '/xx/cc'
            if (str === '/') {
                return '/'
            } else {
                const arr = str.split('/')
                return '/' + arr[1]
            }
        },
        logout() {
            this.$confirm('是否确认退出登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('clearLogin')
            }).catch(() => {

            })
        },
        login() {
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped lang="scss">
.b-header {
    background-color: $--color-primary;
    .main-container {
        height: 80px;
    }
    &__brand {
        display: block;
        height: 41px;
        cursor: pointer;
    }
    &__search {
        width: 320px;
        &-icon {
            width: 20px;
            height: 20px;
            display: block;
            @include site(null, 12px);
        }
        /deep/ .el-input__inner {
            border-radius: 20px;
            padding-right: 36px;
            padding-left: 20px;
            font-size: 16px;
            font-weight: 400;
            &:focus {
                border-color: $--color-primary;
            }
        }
    }
    &-nav {
        padding: 0 8px;
        li {
            margin: 0 20px;
            a {
                cursor: pointer;
                padding: 10px 0;
                display: block;
                font-size: 18px;
                font-weight: 400;
                color: #ffffff;
                line-height: 25px;
                border-bottom: 2px solid transparent;
                @include tst;
            }
            &.active,
            &:hover {
                a {
                    border-color: #fff;
                    font-weight: bold;
                }
            }
        }
    }
    &__info {
        white-space: nowrap;
        margin-left: 40px;
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        .name {
            white-space: nowrap;
            max-width: 200px;
            overflow: hidden;
            @include ellipsis;
            cursor: pointer;
        }
        .logout {
            white-space: nowrap;
            margin-left: 20px;
            cursor: pointer;
        }
    }
}
</style>
