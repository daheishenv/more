
<script>
export default {
    functional: true,
    props: {
        serchText: {
            type: String,
            default: ""
        },
        item: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    render(h, context) {
        console.log(context);
        const { item, serchText } = context.props;

        const reg = new RegExp(serchText, 'g');

        const html = item.value.replace(reg, `<span style='color:red'>${serchText}</span>`)

        return h("div", {
            domProps: {
                innerHTML: html
            }
        })
    }
}
</script>
