/* eslint-disable vue/no-mutating-props */
<template>
    <v-dialog v-model="dialog_local" persistent max-width="390">
        <v-card>
            <v-card-text class="py-7">
                <h2>Вы точно хотите удалить {{ item_name }}?</h2>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="var(--grey)"
                    text
                    @click="$emit('close_dialog')"
                    dark
                >
                    Отмена
                </v-btn>
                <v-btn
                    color="var(--red)"
                    dark
                    text
                    @click="$emit('delete_item', item_id)"
                >
                    Удалить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "DeleteDialog",
    props: {
        item_name: String,
        item_id: String,
        dialog: Boolean,
    },
    computed: {
        dialog_local: {
            get() {
                return this.dialog;
            },
            set() {},
        },
    },
};
</script>

<style lang="scss" scoped>
</style>