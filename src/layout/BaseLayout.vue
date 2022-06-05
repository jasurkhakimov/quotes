<template>
    <v-container>
        <navbar></navbar>

        <v-main>
            <router-view />
        </v-main>
        
    </v-container>
</template>

<script>
import Navbar from './Navbar.vue';
export default {
    components: { Navbar },
    name: "BaseLayout",
};
</script>

<style lang="scss" scoped>
</style>