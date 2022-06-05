<template>
    <v-row>
        <v-col offset-md="4" md="4">
            <v-form ref="form" v-model="valid" class="с-form">
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-text-field
                            v-model="form.author"
                            label="Жанр цитаты"
                            :rules="[rules.required]"
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
                        >
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
    name: "CategoriesForm",
    props: {
        loading: Boolean,
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
        },
        add_new_category() {
            this.$refs.form.validate();
            if (this.valid) {
                console.log("lol");
            }
        },
    },
};
</script>
