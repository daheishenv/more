
import Vue from 'vue'
import VueQuillEditor, { Quill } from 'vue-quill-editor/dist/ssr'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

Vue.use(VueQuillEditor)
