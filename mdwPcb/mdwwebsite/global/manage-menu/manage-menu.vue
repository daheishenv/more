<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-12-22 12:35:14
-->
<template>
    <ul class="b-manage-menu">
        <li
            v-for="(item, index) in menuList"
            :key="index"
            :class="[
                item.checked && (!item.children || item.children.lengtn === 0) ||activeIndex ===index ? 'active' : '',
                item.children && item.children.length > 0 ? 'has-sub' : ''
            ]"
        >
            <a
                class="b-manage-menu__link"
                @click.stop="handleClick(index)"
            >
                <span>{{ item.label }}</span>
                <i
                    v-if="item.children && item.children.length > 0"
                    class="iconfont ml10"
                    :class="[item.checked? 'icon-shouqi' : 'icon-zhankai']"
                ></i>

            </a>
            <ul
                v-if="item.children && item.children.length > 0"
                class="b-manage-menu-sub"
                :class="{'open': item.checked}"
            >
                <li
                    v-for="(subItem, subIndex) in item.children"
                    :key="subIndex"
                    :class="{'active': subItem.checked}"
                >
                    <a
                        class="b-manage-menu__link"
                        @click.stop="handleClick(index, subIndex)"
                    >
                        <span>{{ subItem.label }}</span></a>
                </li>
            </ul>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'BManageMenu',
    data() {
        return {
            menuList: [{
                label: '我的钱包',
                path: '/wallet'
            }, {
                label: '轮播图',
                path: '/wallet/banner'
            },
            {
                label: '荣誉资质',
                path: '/wallet/honor'
            },
            {
                label: '企业信息',
                path: '/wallet/firm'
            }, {
                label: '账号设置',
                path: '',
                children: [{
                    label: '账户设置',
                    path: '/wallet/account'
                }, {
                    label: '重置密码',
                    path: '/wallet/reset'
                }
                    // , {
                    //     label: '绑定SaaS账户',
                    //     path: '/wallet/bind'
                    // }
                ]
            }]
        }
    },
    computed: {
        activeIndex() {
            return this.menuList.findIndex(o => this.$route.fullPath === o.path)
        }
    },
    methods: {
        handleClick(index, subIndex) {
            const menuList = this.$deepClone(this.menuList)
            const modifyItem = menuList[index]
            // 如果不是点击二级菜单，并且二级菜单没有东西，就直接返回
            if (subIndex === undefined && modifyItem.checked && (!modifyItem.children || modifyItem.children.length === 0)) return
            menuList.forEach((o, i) => { index !== i && (o.checked = false) })
            modifyItem.checked = subIndex === undefined && modifyItem.children && modifyItem.children.length ? !modifyItem.checked : true
            if (subIndex !== undefined) {
                modifyItem.children.forEach((o, i) => {
                    o.checked = subIndex === i
                })
            }
            menuList[index] = modifyItem
            this.menuList = menuList
            this.jump(subIndex === undefined ? modifyItem : modifyItem.children[subIndex])
        },
        jump({ path }) {
            path && path !== this.$route.path && this.$router.replace(path)
        }
    }
}
</script>

<style lang="scss">
.b-manage-menu {
    &__link {
        @include flex(row);
        align-items: center;
        padding-left: 52px;
        height: 38px;
        font-weight: 400;
        font-size: inherit;
        color: inherit;
        cursor: pointer;
        .iconfont {
            font-size: 12px;
        }
    }
    li {
        background: #fff;
        padding: 10px 0;
        color: #333;
        user-select: none;
        font-size: 14px;
        position: relative;
        &::after {
            content: "";
            @include site(0);
            height: 100%;
            width: 2px;
            background-color: transparent;
        }
        &.active,
        &:not(.has-sub):hover {
            background: #f8f8f8;
            color: $--color-primary;
            &::after {
                background-color: currentColor;
            }
        }
        &:hover {
            .b-manage-menu__link {
                border-left-color: transparent;
            }
        }
        & + li {
            border-top: 1px dotted #d6d6d6;
        }
    }
    &-sub {
        overflow: hidden;
        max-height: 0;
        pointer-events: none;
        @include tst;
        &.open {
            max-height: 380px;
            pointer-events: auto;
        }
        & > li {
            padding: 0;
            font-size: 12px;
            border: none !important;
        }
        .b-manage-menu {
            &__link {
                color: #999999;
            }
        }
    }
}
</style>
