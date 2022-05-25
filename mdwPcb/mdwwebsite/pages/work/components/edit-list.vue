<template>
    <div class="case-list">
        <el-upload
            class="avatar-uploader"
            action=""
            list-type="picture-card"
            :limit="5"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
            <div class="add-cont">+</div>
            <div class="add-word">
                （注：案例图片不少于5张，小程序分享时将使用封面）
            </div>
        </el-upload>
        <div
            v-for="(item,i) in listImg"
            :key=" item.id || i"
        >
            <div class="img-cont">
                <z-image :src="item.img_url" />
                <div
                    v-if="item.is_cover_img"
                    class="status-cls status-cls__blue"
                >封面</div>
                <div
                    v-else
                    class="status-cls__set"
                    @click="clickStatus(i)"
                >
                    设为封面
                </div>
                <i
                    class="el-icon-delete"
                    @click="del(i)"
                ></i>
            </div>
            <div class="item-select">
                <div>
                    空间：
                    <el-select
                        v-model="item.type"
                        placeholder="请选择"
                        @change="changeOut"
                    >
                        <el-option
                            v-for="(list,d) in room_class_list"
                            :key="d"
                            :label="list"
                            :value="d"
                        ></el-option>
                    </el-select>
                </div>
                <div>
                    色调：
                    <el-select
                        v-model="item.color_type"
                        placeholder="请选择"
                        @change="changeOut"
                    >
                        <el-option
                            v-for="(list,d) in color_class_list"
                            :key="d"
                            :label="list"
                            :value="d"
                        ></el-option>

                    </el-select>
                </div>
            </div>
            <div class="item-textarea">
                <el-input
                    v-model="item.desc"
                    type="textarea"
                    placeholder="请输入对图片的表述"
                    @input="changeOut"
                >
                </el-input>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            dataBox: {

            },
            listImg: [],
            img_url: '',
            room_class_list: [],
            color_class_list: []
        }
    },
    computed: {
    },
    watch: {
        data: {
            handler(newVal) {
                this.listImg = newVal.map((item) => {
                    return {
                        ...item,
                        color_type: item.color_type ? String(item.color_type) : '',
                        type: item.type ? String(item.type) : ''
                    }
                })
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.initData()
    },
    methods: {
        async initData() {
            const { data } = await this.$axios.$post('/patternCase/getEffectConfigList')
            this.room_class_list = data.room_class_list
            this.color_class_list = data.color_class_list
        },
        beforeAvatarUpload(file) {
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')
            if (!isJPG) {
                this.$message.error('请上传 JPG/PNG 格式的图片!')
            }
            return isJPG
        },
        clickStatus(i) {
            this.listImg = this.listImg.map((item, index) => {
                return {
                    ...item,
                    is_cover_img: i === index ? 1 : 0
                }
            })
        },
        /**
         * @name: 上传头像
         * @param {*} response
         * @param {*} file
         * @return {*}
         */
        async handleAvatarSuccess(res, file) {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            const { data: { src } } = await this.$upload(file)
            this.listImg.push({
                img_url: src,
                type: null,
                color_type: null,
                is_cover_img: 0,
                desc: ''
            })
            this.changeOut()
            loading.close()
        },
        // 删除
        del(i) {
            this.listImg.splice(i, 1)
            this.changeOut()
        },
        changeOut() {
            this.$emit('change', this.listImg)
        }
    }
}
</script>

<style lang="scss" scoped>
.case-list {
    font-size: 14px;
    display: flex;
    margin: 24px 0 0;
    flex-wrap: wrap;
    /deep/ .el-upload {
        width: 100%;
        height: 100%;
        border: none;
    }
    /deep/ .el-input__inner {
        height: 36px;
        line-height: 36px;
    }

    & > div {
        position: relative;
        width: 24%;
        margin-right: 1%;
        margin-bottom: 24px;
        background: #fff;
        padding: 16px;
        height: 428px;
        .img-cont {
            position: relative;
            height: 210px;
            img {
                display: block;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            .status-cls {
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 0px 0px 13px 0px;
                width: 70px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                &__gray {
                    background: #999;
                }
                &__blue {
                    background: #4185ec;
                }
                &__red {
                    background: #f60d0d;
                }
                &__set {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    background: rgba(0, 0, 0, 0.5);
                    border-radius: 15px;
                    color: #fff;
                    transform: translate(-50%, -50%);
                    font-size: 12px;
                    padding: 5px 20px;
                    cursor: pointer;
                }
            }
            .el-icon-delete {
                display: none;
                position: absolute;
                right: 0;
                top: 0;
                cursor: pointer;
                width: 40px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                color: #fff;
                background: rgba(0, 0, 0, 0.5);
                &:hover {
                    opacity: 0.7;
                }
            }
            &:hover {
                .el-icon-delete {
                    display: block;
                }
            }
        }

        .item-select {
            display: flex;
            justify-content: space-between;
            margin: 14px 0;
            .el-select {
                width: 100px;
            }
        }
        .item-textarea {
            /deep/ .el-textarea__inner {
                height: 116px !important;
            }
        }
    }
    .avatar-uploader {
        padding: 0 !important;
    }
    .add {
        color: #999;
        font-size: 50px;
        position: relative;
        cursor: pointer;

        &-cont {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background: #fff;
            font-size: 100px;
            color: #999;
            font-weight: normal;
        }
        &-word {
            position: absolute;
            left: 0;
            bottom: 20px;
            width: 100%;
            line-height: 40px;
            text-align: center;
            font-size: 12px;
            color: #f60d0d;
        }
    }
}
</style>
