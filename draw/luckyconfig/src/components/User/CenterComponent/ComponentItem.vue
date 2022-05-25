<template>
    <div @click.stop.prevent="handleClick">
        <slot />
    </div>
</template>

<script>
export default {
    methods: {
        handleClick(e) {
            this.$emit('selected', e)
        }
    }
}
</script>