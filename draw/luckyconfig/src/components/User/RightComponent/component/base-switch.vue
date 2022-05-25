<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-23 08:50:08
-->
<template>
    <div class="base-switch">
        <span
            v-if="hasIcon_ && selOptionsText_"
            class="base-switch__left-text pr48"
        >{{selOptionsText_}}</span>
        <el-radio-group
            v-model="switchValue_"
            :disabled="extraOpt.disabled"
            size="mini"
        >
            <el-radio-button
                v-for="(item,index) in options"
                :key="index"
                :label="item.value"
                :disabled="item.disabled"
                :class="{'switch-button-icon': item.icon}"
            >
                <el-popover
                    :width="item.img ? 350 : 'auto'"
                    v-if="item.icon || item.img"
                    placement="bottom"
                    trigger="hover"
                >
                    <c-icons
                        slot="reference"
                        v-if="item.icon"
                        size="28"
                        :type="item.icon"
                    ></c-icons>
                    <span
                        slot="reference"
                        v-if="item.img"
                    >{{item.label}}</span>
                    <c-image
                        v-if="item.img"
                        width="100%"
                        :src="item.img"
                        mode="widthFix"
                    />
                    <span v-else-if>{{item.label}}</span>
                </el-popover>
                <span v-else>{{item.label}}</span>
            </el-radio-button>
        </el-radio-group>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: [String, Boolean, Number],
            default: ''
        },
        options: {
            type: Array,
            default: () => []
        },
        // 当前项是否可以被点击，如果禁止，name默认值是什么都在这个参数里面
        extraOpt: {
            type: Object,
            default: () => {
                return {
                    disabled: false
                }
            }
        }
    },
    computed: {
        switchValue_: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        },
        // 是否含有图标
        hasIcon_() {
            return !!(this.options[0] || {}).icon
        },
        selOptionsText_() {
            return (this.options.find(o => o.value === this.switchValue_) || this.options[0]).label
        }
    },
    watch: {
        extraOpt: {
            handler(val) {
                if (val.disabled) {
                    this.$emit('input', val.value)
                }
            },
            deep: true
        },
        options: {
            handler(val) {
                const curIndex = val.findIndex(o => o.value === this.value && o.disabled)
                // 说明已选中的值已经被禁止
                if (curIndex !== -1) {
                    // 默认选中可选的第一个
                    this.$emit('input', val.filter(o => !o.disabled)[0].value)
                }
            },
            deep: true,
            immediate: true
        }
    }
}
</script>