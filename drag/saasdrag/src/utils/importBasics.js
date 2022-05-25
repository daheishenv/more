/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-06-28 19:54:43
 */
// 所有组件的壳
import saasComponent from '@/home/components/component/component'
// 基础配置组件
import BaseUpload from '@/components/RightComponents/components/base-upload.vue'
import BaseUploadVideo from '@/components/RightComponents/components/base-upload-video.vue'
import BaseMagicSquare from '@/components/RightComponents/components/base-magic-square.vue'
import BaseRichText from '@/components/RightComponents/components/base-rich-text.vue'
import BaseRichTextNew from '@/components/RightComponents/components/base-rich-text-new.vue'
import BaseTimePicker from '@/components/RightComponents/components/base-time-picker.vue'
import BaseReqSelect from '@/components/RightComponents/components/base-req-select.vue'
import baseReqClassify from '@/components/RightComponents/components/base-req-classify.vue'
import BaseColorPicker from '@/components/RightComponents/components/base-color-picker.vue'
import BaseLinks from '@/components/RightComponents/components/base-links.vue'
import BaseRadioColor from '@/components/RightComponents/components/base-radio-color.vue'
import BaseRadioText from '@/components/RightComponents/components/base-radio-text.vue'
import BaseSwitch from '@/components/RightComponents/components/base-switch.vue'
import BaseSetting from '@/components/RightComponents/components/base-setting.vue'
import BaseSelectGoods from '@/components/RightComponents/components/base-select-goods.vue'
import BaseSelectCategory from '@/components/RightComponents/components/base-select-category.vue'
import BaseSelectKeyword from '@/components/RightComponents/components/base-select-keyword.vue'
import BaseCheckbox from '@/components/RightComponents/components/base-checkbox.vue'
import BaseDragList from '@/components/RightComponents/components/base-drag-list.vue'
import BaseCoupons from '@/components/RightComponents/components/base-coupons.vue'
import BaseForm from '@/components/RightComponents/components/base-form.vue'
import BaseUploadBgImg from '@/components/RightComponents/components/base-upload-bg-img.vue'



// 基础弹窗
import SelectDialog from '@/components/RightComponents/selectDialog/index.vue'
// 弹窗组件
import DesignDialog from '@/components/RightComponents/selectDialog/design.vue'
import CaseDialog from '@/components/RightComponents/selectDialog/case.vue'
import D3roomDialog from '@/components/RightComponents/selectDialog/d3room'
import TeamDialog from '@/components/RightComponents/selectDialog/team'
import CraftDialog from '@/components/RightComponents/selectDialog/craft'
import GoodsDialog from '@/components/RightComponents/selectDialog/goods'
import couponsDialog from '@/components/RightComponents/selectDialog/coupons'
import FormDialog from '@/components/RightComponents/selectDialog/form'
import categoryDialog from '@/components/RightComponents/selectDialog/category'
import ChooseOperation from '@/components/RightComponents/selectDialog/components/chooseOperation'
import packageDialog from '@/components/RightComponents/selectDialog/package'




// 组件设置
let basics = {
    BaseUploadBgImg,
    saasComponent,
    BaseUpload,
    BaseUploadVideo,
    BaseRichText,
    BaseRichTextNew,
    BaseMagicSquare,
    BaseTimePicker,
    BaseReqSelect,
    baseReqClassify,
    BaseColorPicker,
    BaseLinks,
    BaseRadioColor,
    BaseRadioText,
    BaseSwitch,
    BaseSelectGoods,
    BaseDragList,
    BaseCoupons,
    SelectDialog,
    BaseSetting,
    BaseCheckbox,
    DesignDialog,
    CaseDialog,
    D3roomDialog,
    TeamDialog,
    CraftDialog,
    GoodsDialog,
    couponsDialog,
    FormDialog,
    ChooseOperation,
    BaseForm,
    categoryDialog,
    BaseSelectCategory,
    BaseSelectKeyword,
    packageDialog,
}

export default basics
