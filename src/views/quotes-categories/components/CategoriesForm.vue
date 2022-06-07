<template>
    <v-row>
        <v-col offset-md="3" md="6">
            <v-form ref="form" v-model="valid" class="с_form">
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-text-field
                            v-model="form.title"
                            label="Жанр цитаты"
                            :rules="[rules.required, rules.onlyAlphabetic]"
                            outlined
                            class="c-field"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-btn
                            @click="add_new_category()"
                            depressed
                            color="var(--green)"
                            dark
                            v-if="!type_edit"
                        >
                            Добавить
                        </v-btn>
                        <v-btn
                            @click="update_category()"
                            depressed
                            color="var(--orange)"
                            dark
                            v-else
                        >
                            Обновить
                        </v-btn>
                        <v-btn
                            @click="reset()"
                            class="ml-1"
                            depressed
                            color="var(--grey)"
                            dark
                        >
                            Очистить
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
import rules from "@/utils/rules";

export default {
    name: "CategoriesForm",
    props: {
        type_edit: Boolean,
        edit_item: Object,
    },
    data: () => ({
        valid: false,
        form: {
            title: "",
        },
        default_form: {
            title: "",
        },
        rules,
    }),
    methods: {
        reset() {
            this.form = { ...this.default_form };
            this.$refs.form.resetValidation();
            this.$emit("reset");
        },
        add_new_category() {
            this.$refs.form.validate();
            if (this.valid) {
                this.$emit("add", this.form.title);
            }
        },
        update_category() {
            this.$refs.form.validate();
            if (this.valid) {
                this.$emit("update", this.form);
            }
        },
    },
    watch: {
        type_edit(val) {
            if (val) {
                this.form = { ...this.edit_item };
            }
        },
    },
};
</script>
