<template>
    <div>
        <categories-form></categories-form>
    </div>
</template>

<script>
import CategoriesForm from './components/CategoriesForm.vue'
    export default {
    components: { CategoriesForm },
        name: 'QuoteCategoriesPage',
        mounted() {
            this.$http.get('/categories');
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>

</style>