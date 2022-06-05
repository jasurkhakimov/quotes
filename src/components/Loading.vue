<template>
    <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        color="var(--blue)"
    ></v-progress-linear>
</template>

<script>
import { mapState } from "vuex";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Loading",
    computed: {
        ...mapState({
            loading: (state) => state.loading.loading,
        }),
    },
};
</script>

<style lang="scss" scoped>
</style>