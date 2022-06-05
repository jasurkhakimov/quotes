<template>
    <v-app>
        <loading></loading>
        <v-main>
            <alert></alert>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import Alert from "./components/Alert.vue";
import Loading from "./components/Loading.vue";
export default {
    components: { Alert, Loading },
    name: "App",
    data: () => ({
        loading: true,
    }),
};
</script>
