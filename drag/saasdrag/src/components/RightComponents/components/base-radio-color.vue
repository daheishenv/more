<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-21 18:00:40
-->
<template>
    <div>
        <span
            v-if="selOptionsText_"
            class="el-form-item__left-text"
        >{{selOptionsText_}}</span>
        <div class="base-radio-color">
            <div
                class="base-radio-color__item"
                :class="{'base-radio-color__item--active': colorValue_ === item.value}"
                v-for="(item, index) in options"
                :key="index"
                @click="handleClick(item.value)"
            >
                <span
                    class="base-radio-color__inner"
                    :style="{backgroundColor: item.color}"
                ></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            default: () => []
        },
        value: {
            type: String,
            default: ''
        }
    },
    computed: {
        colorValue_: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        },
        selOptionsText_() {
            return (this.options.find(o => o.value === this.colorValue_) || this.options[0]).label
        },
    },
    methods: {
        handleClick(value) {
            this.$emit('input', value)
        }
    }
}
</script>

<style lang="scss" scope>
.base-radio-color {
    @include flex(row);
    justify-content: flex-end;
    &__item {
        cursor: pointer;
        margin-right: 6px;
        width: 24px;
        height: 24px;
        background-color: #f5f5f5;
        border: 1px solid rgba(220, 222, 224, 1);
        display: inline-block;
        padding: 4px;
        border-radius: 100%;
        &--active {
            border-color: rgba(27, 122, 255, 1);
        }
    }
    &__inner {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background-color: red;
    }
}
</style>