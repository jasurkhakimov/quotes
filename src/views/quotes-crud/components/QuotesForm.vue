<template>
    <v-row>
        <v-col offset-md="4" md="4">
            <v-form ref="form" v-model="valid" class="c-form">
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
                            :rules="[rules.required]"
                            outlined
                            class="c-field"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-autocomplete
                            v-model="form.category"
                            label="Жанр цитаты"
                            :rules="[rules.notEmptyArray]"
                            outlined
                            class="c-field"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                        <v-btn @click="add_new_quote()" depressed color="var(--green)" dark>
                            Добавить
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
    data: () => ({
        valid: false,
        form: {
            id: "",
            quote: "",
            author: "",
            category: [],
            createdAt: "",
            updatedAt: "",
        },
        default_form: {
            id: "",
            quote: "",
            author: "",
            category: [],
            createdAt: "",
            updatedAt: "",
        },
        rules,
    }),
    methods: {
        reset() {
            this.form = { ...this.default_form };
            this.$refs.form.resetValidation();
        },
        add_new_quote() {
            this.$refs.form.validate();

            if(this.valid) {
                console.log('lol');
            }
        }
    },
};
</script>

<style lang="scss">

</style>