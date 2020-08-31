<template>
    <section class="toy-chat-cs">
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
    </section>
</template>

<script>
export default {
    props: {
        footer: String,
        validator: function(footer) {
            return footer.length > 10
        }
    }
}
</script>

<style>

</style>