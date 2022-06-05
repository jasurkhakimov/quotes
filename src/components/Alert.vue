<template>
    <div>
        <v-snackbar
            :color="alert.color"
            top
            center
            v-model="alert.status"
            :timeout="timeout"
        >
            {{ alert.text }}
            <template v-slot:action="{ attrs }">
                <v-btn icon v-bind="attrs" @click="resetAlert()">
                    <v-icon> mdi-close </v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { RESET_ALERT } from "@/store/modules/alert/types";
import { Module } from "@/store/modules";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Alert",
    data: () => ({
        snackbar: true,
        timeout: 1500,
    }),
    computed: {
        ...mapState({
            alert: (state) => state.alert.alert,
        }),
    },
    methods: {
        ...mapActions(Module.ALERT, {
            resetAlert: RESET_ALERT,
        }),
    },
};
</script>

<style lang="scss" scoped>
</style>