<template>
    <v-row>
        <v-col offset-md="2" md="8">
            <v-form ref="form" v-model="valid" class="c_form">
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-textarea
                            v-model="form.quote"
                            :rules="[rules.required]"
                            label="Текст цитаты"
                            outlined
                            class="c-field"
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="form.author"
                            label="Автор цитаты"
                            :rules="[rules.required, rules.onlyAlphabetic]"
                            outlined
                            class="c-field"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-autocomplete
                            v-model="form.category"
                            label="Жанр цитаты"
                            :rules="[rules.notEmptyArray]"
                            :items="refs.categories"
                            item-text="title"
                            item-value="title"
                            multiple
                            chips
                            outlined
                            class="c-field"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                        <v-btn
                            @click="add_new_quote()"
                            depressed
                            color="var(--green)"
                            dark
                            v-if="!type_edit"
                        >
                            Добавить
                        </v-btn>
                        <v-btn
                            @click="update_quote()"
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
    name: "QuotesForm",
    props: {
        refs: Object,
        type_edit: Boolean,
        edit_item: Object,
    },
    data: () => ({
        valid: false,
        form: {
            quote: "",
            author: "",
            category: [],
        },
        default_form: {
            quote: "",
            author: "",
            category: [],
        },
        rules,
    }),
    methods: {
        reset() {
            this.form = { ...this.default_form };
            this.$refs.form.resetValidation();
            this.$emit("reset");
        },
        add_new_quote() {
            this.$refs.form.validate();
            if (this.valid) {
                this.$emit("add", this.form);
            }
        },
        update_quote() {
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