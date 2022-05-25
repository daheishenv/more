<template>
    <!-- item-tag  -->
    <view
        class="item item-tag"
        :class="{'item--disabled':limitNum <= useNum}"
    >
        <view
            class="item-mouse"
            @mouseover="onfocusTip"
            @mouseout="offfocusTip"
            @mousedown="onmousedown"
            @click="handleClick"
        >
        </view>
        <view class="title">
            <view class="title-icon">
                <i :class="['drag', icon]"></i>
            </view>
            <view class="title-name">{{name}}</view>
            <view class="title-num">{{useNum}}/{{limitNum}}</view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'ComponentContainer',
    props: {
        config: {       //或者整个组件的传参
            type: Object,
            default: () => { }
        },
        num: {
            type: Array,
            default: () => []
        },
        type: {
            type: String,
            default: 'basics'
        },
        componentName: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        limitNum: {
            type: Number,
            default: 1
        },
        useNum: {
            type: Number,
            default: 0
        }
    },
    methods: {
        handleClick(e) {
            this.$emit('selected', e)
        },
        onmousedown() {
            // 非基础组件
            if (!this.componentName.startsWith('I')) {
                this.$store.commit('setShowComponentPreview', { showComponentPreview: false })
            }
        },
        offfocusTip() {
            // 非基础组件
            if (!this.componentName.startsWith('I')) {
                this.$store.commit('setShowComponentPreview', { showComponentPreview: false })
            }
        },
        onfocusTip() {
            // 非基础组件
            if (!this.componentName.startsWith('I')) {
                // 二开
                // 图片预览新增 传入组件的cmptId
                this.$store.commit('setComponentPreviewName', { componentPreviewName: this.componentName })
                // 传入store里配置的这个数据
                this.$store.commit('setComponentPreviewConfig', this.config)
                this.$store.commit('setShowComponentPreview', { showComponentPreview: true })
            }
        }
    },
    components: {
    }
}
</script>

<style lang="scss" scoped>
.item {
    position: relative;
    width: 90px;
    height: 90px;
    color: #666;
    cursor: move;
    padding: 8px 0;
    &:hover,
    &.item-chosen {
        background-color: $uni-color-primary;
        color: #fff;
    }
    &--disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
    &-mouse {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
    }
}

.content {
    height: 55px;
    width: 75px;
    position: relative;
    border: 2px solid #f7f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: none;
    overflow: hidden;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDkzNzZFN0RDODhFMTFFOEExOUJFNkQ0MTNFM0Q2OTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDkzNzZFN0VDODhFMTFFOEExOUJFNkQ0MTNFM0Q2OTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEOTM3NkU3QkM4OEUxMUU4QTE5QkU2RDQxM0UzRDY5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEOTM3NkU3Q0M4OEUxMUU4QTE5QkU2RDQxM0UzRDY5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PktroGEAAAAoSURBVHjaYvz06RMDDPDy8sLZTAw4AOkSjP///4dzPn/+TAs7AAIMAG56COJosoI3AAAAAElFTkSuQmCC);
}

.title-icon {
    line-height: 1;
    // text-align: center;
    // display: inline-block;
    // width: 32px;
    // height: 32px;
    i {
        font-size: 32px;
    }
}
// .title-icon i {
//     font-size: 20px;
//     margin-top: 8px;
// }
.title-name,
.title-num {
    font-size: 12px;
}
</style>
