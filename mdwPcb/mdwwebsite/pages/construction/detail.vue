<template>
    <div
        v-if="pageShow"
        class="construction-detail"
    >
        <div
            v-if="id && detailData.site_name"
            class="construction-detail__title"
        >
            <i class="iconfont icon-gongdi"></i>
            <span>{{ detailData.site_name }}</span>
            <span
                v-if="detailData.stage_name"
                class="tag"
            >{{ detailData.stage_name }}</span>
        </div>
        <el-form
            ref="form"
            :inline="true"
            :model="formData"
            :rules="rules"
        >
            <el-form-item
                label="工地名称："
                class="name-cls"
                prop="site_name"
            >
                <el-input
                    v-model="formData.site_name"
                    placeholder="请输入工地名称"
                >
                </el-input>
            </el-form-item>
            <!-- 轮播图 -->
            <div class="item-list">
                <div class="construction-common-title">
                    <span class="blue-icon"></span>
                    <span class="word1">轮播图</span>
                    <span class="word2">(上传的第一张图片将被默认为“封面”，小程序工地列表和分享工地将会使用封面图片，轮播图最多上传6张)</span>
                </div>
                <div>
                    <upload-swiper
                        :upload-list="uploadList"
                        mode="construction"
                        :limit="5"
                        @upload="upload"
                        @remove="remove"
                        @setMain="setMain"
                    />
                </div>
            </div>
            <!-- 业主、负责人和营销电话 -->
            <div class="item-list">
                <div class="construction-common-title">
                    <span class="blue-icon"></span>
                    <span class="word1">业主、负责人和营销电话</span>
                    <span class="word2">(可以选择已启用的设计师和工长，营销电话用于非业主客户联系，业主总是能直接联系到负责人)</span>
                </div>
                <div>
                    <el-form-item label="业主：">
                        <el-select
                            v-model="formData.site_uid"
                            class="w300"
                            multiple
                            filterable
                            remote
                            reserve-keyword
                            placeholder="请搜索业主的电话号码"
                            :remote-method="remoteMethod"
                            :loading="loading"
                            :multiple-limit="1"
                        >
                            <el-option
                                v-for="item in siteList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择负责人：">
                        <el-select
                            v-model="formData.director_uid"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in directorList"
                                :key="item._id"
                                :label="item.name"
                                :value="item._id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </div>
            <!-- 工地信息 -->
            <div class="item-list">
                <div class="construction-common-title">
                    <span class="blue-icon"></span>
                    <span class="word1">工地信息</span>
                    <span class="word2">(如果您不想关联小区，请直接选择 型，施工周期仅业主可见)</span>
                </div>
                <div class="inline-form">
                    <el-form-item
                        label="关联小区："
                        prop="housing_estate_id"
                        label-width="100px"
                    >
                        <el-select
                            v-model="formData.housing_estate_id"
                            placeholder="请选择"
                            filterable
                            @change="handleGetHouseType"
                        >
                            <el-option
                                v-for="item in housingEstateList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="户型："
                        prop="housing_type_id"
                    >
                        <el-select
                            v-model="formData.housing_type_id"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in housingTypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="面积："
                        prop="housing_area"
                    >
                        <el-input
                            v-model="formData.housing_area"
                            placeholder="请输入面积"
                            :disabled="areasDisabled"
                        >
                            <template slot="append">m²</template>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="inline-form">
                    <el-form-item
                        label="关联案例："
                        label-width="100px"
                    >
                        <div @click="handleCheckCase">
                            <div
                                v-if="!caseChecked"
                                class="change-cls"
                            >请点击选择案例</div>
                            <div
                                v-else
                                class="change-cls checked-cls"
                            >{{ caseName }}</div>
                        </div>
                    </el-form-item>
                    <el-form-item
                        label="装修风格："
                        prop="housing_style_id"
                    >
                        <el-select
                            v-model="formData.housing_style_id"
                            placeholder="请选择"
                            :disabled="cantChecked"
                        >
                            <el-option
                                v-for="item in styleList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div class="block">
                        <span class="demonstration">施工周期：</span>
                        <el-date-picker
                            v-model="formData.build_period"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div class="inline-form">
                    <el-form-item
                        label="工地位置："
                        label-width="100px"
                    >
                        <el-select
                            v-model="formData.province_id"
                            placeholder="请选择"
                            @change="handleProvice"
                        >
                            <el-option
                                v-for="item in provinceList"
                                :key="item.region_id"
                                :label="item.name"
                                :value="item.region_id"
                            >
                            </el-option>
                        </el-select>
                        <el-select
                            v-model="formData.city_id"
                            placeholder="请选择"
                            @change="handleCity"
                        >
                            <el-option
                                v-for="item in cityList"
                                :key="item.region_id"
                                :label="item.name"
                                :value="item.region_id"
                            >
                            </el-option>
                        </el-select>
                        <el-select
                            v-model="formData.district_id"
                            placeholder="请选择"
                            @change="handleDistrict"
                        >
                            <el-option
                                v-for="item in districtList"
                                :key="item.region_id"
                                :label="item.name"
                                :value="item.region_id"
                            >
                            </el-option>
                        </el-select>
                        <el-input
                            v-model="formData.address"
                            style="width: 300px"
                            placeholder="请输入道路名称和路牌号"
                        >
                        </el-input>
                    </el-form-item>
                </div>
            </div>
            <!-- 施工进度 -->
            <div
                v-if="id"
                class="item-list"
            >
                <div class="construction-common-title">
                    <span class="blue-icon"></span>
                    <span class="word1">施工进度</span>
                    <el-button
                        type="primary"
                        icon="el-icon-edit"
                        plain
                        :disabled="formData.stage_status===10"
                        @click="handleSchedule('add')"
                    >新增进度</el-button>
                    <el-button
                        type="primary"
                        icon="el-icon-edit"
                        @click="handleComplete"
                    >工地完工</el-button>
                </div>
            </div>
            <div
                v-if="id"
                class="stage-list"
            >
                <template v-if="notesList && notesList.length > 0">
                    <div
                        v-for="(item, index) in notesList"
                        :key="index"
                        class="stage-list-item"
                    >
                        <div class="stage-list-item__top">
                            <div>
                                <span class="word">施工阶段-{{ item.stage_name }}</span>
                                <span class="time">更新时间：{{ item.create_time }}</span>
                            </div>
                            <div>
                                <el-button
                                    type="primary"
                                    plain
                                    @click="handleSchedule('edit', item)"
                                >编辑</el-button>
                                <el-button
                                    type="danger"
                                    plain
                                    @click="progressDelect(item)"
                                >删除</el-button>
                            </div>
                        </div>
                        <p>{{ item.content }}</p>
                        <div class="img-list">
                            <div
                                v-for="(j, i) in item.process_images"
                                :key="i"
                                class="img-item"
                            >
                                <img
                                    :src="j"
                                    alt=""
                                >
                            </div>
                        </div>
                    </div>
                </template>
                <div
                    v-else
                    style="height: 300px"
                >
                    <no-data show-img />
                </div>
            </div>
        </el-form>
        <div class="construction-detail-btn">
            <el-button
                type="primary"
                @click="handleSubmit"
            >提交</el-button>
            <el-button
                type="primary"
                plain
                @click="handleCancel"
            >取消</el-button>
            <el-button
                v-if="id"
                type="danger"
                plain
                @click="handleDeletModule"
            >删除</el-button>
        </div>
        <choiceCase
            v-model="dialogFormVisible"
            @change="change"
        />
    </div>
</template>
<script>
import UploadSwiper from '@/components/upload/upload-swiper.vue'
import choiceCase from './components/choice-case.vue'
export default {
    name: 'Detail',
    components: {
        UploadSwiper,
        choiceCase
    },
    data() {
        return {
            dialogFormVisible: false, // 选择案例
            detailData: {},
            pageShow: false,
            id: 0,
            uploadList: [], // banner图
            formData: {
                site_uid: '', // 业主uid
                director_uid: '', // 负责人ID
                housing_estate_id: '', // 小区ID
                housing_type_id: '', // 户型ID
                housing_area: '', // 面积
                pattern_case_id: '', // 案例ID
                housing_style_id: '', // 风格ID
                build_period: [], // 周期
                province_id: '', // 省
                city_id: '', // 市
                district_id: '', // 区
                stage_status: 0,
                address: '', // 地址
                site_images: [], // 轮播图
                site_name: '', // 工地名称
                id: 0
            },
            value1: '',
            imgList: [
                {
                    imgUrl: 'https://betastatic-saas.zzsupei.com/saas/upload/20220426/6b57a8b4e7d3926c51b5b02f4b70dc68.jpg'
                }
            ],
            // 负责人
            directorList: [],
            // 小区
            housingEstateList: [],
            // 风格
            styleList: [],
            // 户型
            housingTypeList: [],
            // 不能选择装修风格
            cantChecked: false,
            // 业主列表
            siteList: [],
            loading: false, // 业主搜索
            cityType: 'province', // 获取省市区类型
            provinceList: [], // 省级列表
            cityList: [], // 市级列表
            districtList: [], // 区列表
            region_id: 0, // 当前省市区id
            notesList: [], // 进度列表
            notesListCache: false,
            caseName: '',
            caseChecked: false, // 是否选择案例
            rules: {
                site_name: [
                    { required: true, message: '不能为空!', trigger: 'change' }
                ],
                housing_estate_id: [
                    { required: true, message: '不能为空!', trigger: 'change' }
                ],
                housing_type_id: [
                    { required: true, message: '不能为空!', trigger: 'change' }
                ],
                housing_area: [
                    { required: true, message: '不能为空!', trigger: 'change' }
                ],
                housing_style_id: [
                    { required: true, message: '不能为空!', trigger: 'change' }
                ]
            },
            areasDisabled: false
        }
    },
    watch: {
        'formData.housing_type_id': {
            handler(val) {
                if (val) {
                    const area = this.housingTypeList.find(v => v.id === val).area
                    this.formData.housing_area = area
                    this.areasDisabled = true
                }
            },
            deep: true
        }
    },
    activated() {
        this.notesListCache = true
        // 获取进度
        this.handleProgress()
    },
    mounted() {
        console.log('mountedmountedmountedmounted')
        this.id = Number(this.$route.query.id) || 0
        this.handleGetData()
        // 省市区数据
        this.handleGetRegion()
        // 获取进度
        this.handleProgress()
    },
    methods: {
        upload(res) {
            const img = {
                img: res.src,
                url: res.src,
                src: res.src,
                is_main: 0
            }
            if (this.uploadList.length === 0) {
                img.is_main = 1
            }
            this.uploadList = [...this.uploadList, img]
            console.log('upload 最终数组', this.uploadList)
        },
        remove(res) {
            this.uploadList.splice(res.detail.value, 1)
            console.log('remove 最终数组', this.uploadList)
        },
        setMain(item) {
            if (item.is_main) return
            this.uploadList.forEach((v, i) => {
                v.is_main = 0
                if (v.is_main === 0 && item.index === i) {
                    v.is_main = 1
                }
            })
        },
        // 获取基本数据
        async handleGetData() {
            const {
                data,
                data: {
                    directorList,
                    housingEstateList,
                    styleList,
                    // 下面添加的时候不存在
                    housing_estate_id,
                    housing_type_id,
                    housing_area,
                    pattern_case_id,
                    pattern_case_name,
                    housing_style_id,
                    build_period,
                    stage_status,
                    site_name,
                    province_id,
                    city_id,
                    district_id,
                    address,
                    site_images,
                    director_uid
                }
            } = await this.$axios.$post('/Decoration/edit', { id: this.id })
            this.pageShow = true
            this.detailData = data
            this.directorList = directorList
            this.housingEstateList = housingEstateList
            this.styleList = styleList
            this.caseChecked = true
            this.caseName = pattern_case_name
            pattern_case_id && (this.formData.pattern_case_id = pattern_case_id)
            stage_status && (this.formData.stage_status = stage_status)
            if (housing_estate_id) {
                this.formData.housing_estate_id = housing_estate_id
            }
            if (director_uid) {
                console.log(director_uid, 'director_uiddirector_uiddirector_uiddirector_uid')
                this.formData.director_uid = director_uid.toString()
            }
            // 获取户型 type: all --获取全部户型
            if (housing_type_id) {
                await this.handleGetHouseType('all')
                this.formData.housing_type_id = housing_type_id
            }
            if (housing_area) {
                this.formData.housing_area = housing_area
                this.areasDisabled = true
            }
            if (housing_style_id) {
                this.cantChecked = true
                this.formData.housing_style_id = housing_style_id
            }
            if (build_period) {
                const build_period_arr = build_period.split(' ~ ')
                this.formData.build_period.push(build_period_arr[0])
                this.formData.build_period.push(build_period_arr[1])
            }
            if (site_name) {
                this.formData.site_name = site_name
            }
            if (province_id) {
                this.formData.province_id = province_id
                this.region_id = province_id
                this.handleGetRegion('cityList')
            }
            if (city_id) {
                this.formData.city_id = city_id
                this.region_id = city_id
                this.handleGetRegion('districtList')
            }
            if (district_id) {
                this.formData.district_id = district_id
            }
            if (address) {
                this.formData.address = address
            }
            if (site_images) {
                const site_images1 = site_images.map((v, i) => {
                    return {
                        url: v.src,
                        img: v.src,
                        src: v.src,
                        is_main: Number(v.is_main)
                    }
                })
                this.uploadList = site_images1
            }
            this.formData.id = this.id
        },
        // 获取进度
        async handleProgress() {
            // if (!this.notesListCache) return
            const {
                data: {
                    list
                }
            } = await this.$axios.$post('/Decoration/notesList', { site_id: this.id })
            this.notesList = list
        },
        // 获取户型
        async handleGetHouseType(type) {
            const {
                data: {
                    housingTypeList,
                    province_id,
                    city_id,
                    district_id,
                    address
                }
            } = await this.$axios.$post('/Decoration/getHousingEstate', { id: this.formData.housing_estate_id })
            this.housingTypeList = housingTypeList
            if (type !== 'all') {
                this.formData.address = address
                if (province_id) {
                    this.formData.province_id = province_id
                    this.region_id = province_id
                    this.handleGetRegion('cityList')
                }
                if (city_id) {
                    this.formData.city_id = city_id
                    this.region_id = city_id
                    this.handleGetRegion('districtList')
                }
                if (district_id) {
                    this.formData.district_id = district_id
                }
                this.formData.housing_type_id = ''
                this.formData.housing_area = ''
                this.areasDisabled = false
            }
        },
        // 业主搜索
        async remoteMethod(query) {
            if (query !== '') {
                this.loading = true
                const {
                    data
                } = await this.$axios.$post('/Decoration/selectDirectorList', { mobile: query })
                this.siteList = data
                this.loading = false
            } else {
                this.options = []
            }
        },
        async handleProvice(id) {
            this.region_id = id
            this.cityType = 'city'
            this.formData.city_id = ''
            this.formData.district_id = ''
            await this.handleGetRegion(id)
        },
        async handleCity(id) {
            this.region_id = id
            this.cityType = 'district'
            this.formData.district_id = ''
            await this.handleGetRegion(id)
        },
        async handleDistrict(id) {
            this.region_id = id
            this.cityType = ''
            await this.handleGetRegion(id)
        },
        // 获取省市区 type - default 单纯获取当前级别列表
        async handleGetRegion(type) {
            if (this.cityType === '') {
                return
            }
            if (!this.cityType) return
            const params = {
                region_id: this.region_id
            }
            const {
                data: {
                    list
                }
            } = await this.$axios.$post('/Tools/getRegion', params)
            const values = []
            for (const key in list) {
                values.push({
                    region_id: Number(key),
                    name: list[key]
                })
            }
            if (type === 'cityList') {
                this.cityList = values
                return
            }
            if (type === 'districtList') {
                this.districtList = values
                return
            }
            // cityType 区别省市区
            if (this.cityType === 'province') {
                this.provinceList = values
                this.cityType = 'city'
                return
            }
            if (this.cityType === 'city') {
                this.cityList = values
                this.cityType = 'district'
                return
            }
            if (this.cityType === 'district') {
                this.districtList = values
                this.cityType = ''
            }
        },
        // 提交修改
        handleSubmit() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    const params = this.$deepClone(this.formData)
                    if (params.build_period) {
                        params.build_period = `${params.build_period[0]} ~ ${params.build_period[1]}`
                    }
                    params.site_uid = params.site_uid.toString()
                    params.site_images = this.uploadList.map((v) => {
                        return {
                            src: v.src,
                            is_main: v.is_main
                        }
                    })
                    const { code, msg } = await this.$axios.$post('/Decoration/save', params)
                    if (code === 0) {
                        setTimeout(() => {
                            this.$router.push('/construction')
                        }, 300)
                    }
                    this.$message({
                        message: msg,
                        type: code === 0 ? 'success' : 'error'
                    })
                } else {
                    console.log('error')
                    return false
                }
            })
        },
        // 删除整个进度
        handleDeletModule() {
            this.$confirm('删除工地将会导致该工地的所有信息丢失 确认删除吗？', '重要提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true,
                center: true
            }).then(async () => {
                const { code, msg } = await this.$axios.$post('/Decoration/delNotes', { id: this.id })
                if (code === 0) {
                    setTimeout(() => {
                        this.$router.push('/construction')
                    }, 300)
                }
                this.$message({
                    message: msg,
                    type: code === 0 ? 'success' : 'error'
                })
            }).catch((error) => {
                console.log(error)
            })
        },
        // 删除单项进度
        progressDelect(item) {
            this.$confirm('删除更新将导致内容及相关数据永久删除 确认删除吗？', '重要提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true,
                center: true
            }).then(async () => {
                const { code, msg } = await this.$axios.$post('/Decoration/delNotes', { id: item.id })
                if (code === 0) {
                    this.handleProgress()
                }
                this.$message({
                    message: msg,
                    type: code === 0 ? 'success' : 'error'
                })
            }).catch((error) => {
                console.log(error)
            })
        },
        // 完工
        handleComplete() {
            this.$confirm('<div><div>设置“工地完工”将会使所有施工阶段被标记为完工状态，无法更新工地内容</div><div> 确认设置“工地完工”状态吗？</div></div>', '重要提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true,
                center: true
            }).then(async () => {
                const { code, msg } = await this.$axios.$post('/Decoration/siteOver', { id: this.id })
                this.$message({
                    message: msg,
                    type: code === 0 ? 'success' : 'error'
                })
                setTimeout(() => {
                    this.$router.push({
                        path: '/construction'
                    })
                }, 300)
            }).catch((error) => {
                console.log(error)
            })
        },
        // 取消修改，新增
        handleCancel() {
            this.$router.go(-1)
        },
        // 编辑
        handleSchedule(type, item = {}) {
            const params = {
                id: this.id || 0,
                type
            }
            if (item.stage_id) {
                params.stage_id = item.id
                params.status = item.status
                params.process_images = JSON.stringify(item.process_images)
                params.content = item.content
            }
            this.$router.push({
                path: '/construction/schedule',
                query: params
            })
        },
        // 选择案例
        handleCheckCase() {
            this.dialogFormVisible = true
        },
        change(e) {
            this.caseChecked = true
            this.formData.housing_style_id = e.job_style_id
            this.caseName = e.name
            this.formData.pattern_case_id = e.id
            this.cantChecked = true
        }
    }
}
</script>
<style lang="scss">
.construction-detail {
    padding: 40px;
    background: #fff;
    &__title {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 500;
        padding-bottom: 24px;
        border-bottom: 1px solid #d6d6d6;
        i {
            color: #4185ec;
            font-size: 20px;
            margin-right: 8px;
        }
        .tag {
            font-size: 12px;
            border-radius: 2px;
            border: 1px solid #4185ec;
            color: #4185ec;
            padding: 2px 6px;
            margin-left: 8px;
        }
    }
    .construction-common-title {
        display: flex;
        align-items: center;
        .blue-icon {
            display: inline-block;
            width: 3px;
            height: 19px;
            background: #4185ec;
            border-radius: 2px;
            margin-right: 8px;
        }
        .word1 {
            font-size: 18px;
            margin-right: 16px;
        }
        .word2 {
            color: #f60d0d;
            font-size: 12px;
        }
    }
    .item-list {
        padding-top: 23px;
        .construction-common-title {
            margin-bottom: 24px;
        }
    }
    .input-cls {
        .el-input {
            width: 300px;
        }
    }
    .inline-form {
        display: flex;
        .el-form-item {
            margin-right: 40px;
        }
    }
    .w300 {
        width: 300px;
    }
    .change-cls {
        border: 1px solid #4185ec;
        width: 196px;
        height: 36px;
        line-height: 36px;
        border-radius: 4px;
        text-align: center;
        color: #4185ec;
        cursor: pointer;
        // margin-left: 8px;
        &.checked-cls {
            border-color: #e6e6e6;
            color: #333;
            text-align: left;
            padding-left: 15px;
        }
    }
    /deep/ .el-date-editor .el-range-separator {
        padding: 0;
    }
    .stage-list {
        &-item {
            padding: 24px 24px 8px 24px;
            border: 1px solid #d8d8d8;
            margin-bottom: 24px;
            &__top {
                display: flex;
                justify-content: space-between;
                .word {
                    font-size: 16px;
                    font-weight: 500;
                    margin-right: 10px;
                }
                .time {
                    font-size: 12px;
                    color: #999;
                }
            }
            p {
                line-height: 24px;
                font-size: 12px;
            }
            .img-list {
                display: flex;
                flex-wrap: wrap;
                margin: 0 -8px;
                .img-item {
                    width: calc(100% / 6);
                    padding: 0 8px;
                    margin-bottom: 16px;
                    height: 205px;
                    img {
                        overflow: hidden;
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
    &-btn {
        display: flex;
        justify-content: center;
        margin-top: 60px;
    }
    .demonstration {
        padding-right: 6px;
        font-size: 14px;
        color: #606266;
    }
    .el-date-editor .el-range-separator {
        padding: 0 !important;
    }
    .name-cls {
        margin-top: 25px;
        margin-bottom: -5px;
    }
}
</style>
