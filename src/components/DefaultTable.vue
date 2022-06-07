<template>
    <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="15"
        class="c-table"
        :search="search"
    >
        <template v-slot:top>
            <div class="d-flex align-center ma-3">
                <v-text-field
                    v-model="search"
                    label="Поиск"
                    class="c-field mr-2"
                    outlined
                    dense
                    hide-details=""
                ></v-text-field>
                <v-btn @click="$emit('get_table')" color="var(--blue)" icon>
                    <v-icon> mdi-reload </v-icon>
                </v-btn>
            </div>
        </template>

        <template v-slot:item.created_at="{ item }">
            {{ item.created_at | format_date }}
        </template>
        <template v-slot:item.updated_at="{ item }">
            {{ item.updated_at | format_date }}
        </template>

        <template v-slot:item.actions="{ item }">
            <div>
                <v-btn
                    @click="$emit('edit_item', item)"
                    icon
                    color="var(--orange)"
                    small
                    class="mr-2"
                >
                    <v-icon small> mdi-pencil </v-icon>
                </v-btn>
                <v-btn
                    @click="$emit('open_delete_dialog', item)"
                    icon
                    color="var(--red)"
                    small
                >
                    <v-icon small> mdi-delete </v-icon>
                </v-btn>
            </div>
        </template>
    </v-data-table>
</template>

<script>
import { format_date } from "@/utils/date_formats";

export default {
    name: "DefaultTable",
    props: {
        headers: Array,
        items: Array,
    },
    data: () => ({
        search: "",
    }),
    filters: {
        format_date,
    },
};
</script>

<style lang="scss">
.c-table {
    border: 1px solid var(--lightgrey);
}
</style>