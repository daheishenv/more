<!--
 * @Descripttion: 首页轮播图 + 获取报价表单
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-12-18 09:24:13
-->
<template>
    <div class="banner white-bg">
        <el-carousel height="400px">
            <el-carousel-item
                v-for="(item) in bannerList"
                :key="item.id"
                @click="$router.push(item.href)"
            >
                <img
                    class="banner-item"
                    :src="item.img_url"
                    alt=""
                >
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
export default {
    props: {
        bannerList: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            imgList: [
                'banner3.png',
                'banner.png'
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.banner {
    height: 400px;
    position: relative;
    .banner-item {
        width: 100%;
        height: 100%;
    }

    .banner-box {
        width: 1440px;
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 9;
        transform: translate(-50%, -50%);
    }
}
.white-bg {
    background-color: #fff;
}
</style>
