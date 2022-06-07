<template>
  <div>
    <quotes-form
      :refs="{
        categories,
      }"
      :edit_item="selected_item"
      :type_edit="type_edit"
      @add="add"
      @update="update"
      @reset="reset_edit_item"
      ref="form"
    ></quotes-form>
    <v-row>
      <v-col offset-md="2" md="8">
        <quotes-filter
          :refs="{
            categories,
          }"
          @get_filtered_quotes="get_filtered_quotes"
          @get_quotes="get_quotes"
        ></quotes-filter>
      </v-col>
      <v-col offset-md="2" md="8">
        <default-table
          group_by="author"
          :items="quotes"
          :headers="headers"
          @get_table="get_quotes"
          @open_delete_dialog="open_delete_dialog"
          @edit_item="edit_item"
        ></default-table>
      </v-col>
    </v-row>
    <delete-dialog
      :item_id="selected_item.id"
      :item_name="selected_item.id"
      :dialog="dialog"
      @close_dialog="reset_dialog"
      @delete_item="remove"
    ></delete-dialog>
  </div>
</template>

<script>
import QuotesForm from "./components/QuotesForm.vue";
import QuotesFilter from "./components/QuotesFilter.vue";
import DefaultTable from "@/components/DefaultTable.vue";
import { mapActions } from "vuex";
import { Module } from "@/store/modules";
import {
  LOAD_QUOTES,
  LOAD_FILTERED_QUOTES,
  ADD_NEW_QUOTE,
  REMOVE_QUOTE,
  UPDATE_QUOTE,
} from "@/store/modules/quotes/types.js";
import DeleteDialog from "@/components/DeleteDialog.vue";
import { LOAD_CATEGORIES } from "@/store/modules/categories/types";

export default {
  components: {
    QuotesForm,
    QuotesFilter,
    DefaultTable,
    DeleteDialog,
  },
  name: "QuotesCrudPage",
  data: () => ({
    headers: [
      {
        text: "Цитата",
        value: "quote",
        groupable: false,
      },
      {
        text: "Автор",
        value: "author",
      },
      {
        text: "Жанр",
        value: "category",
        groupable: false,
      },
      {
        text: "Дата создания",
        value: "created_at",
        groupable: false,
      },
      {
        text: "Дата обновления",
        value: "updated_at",
        groupable: false,
      },
      {
        text: "Действия",
        align: "end",
        sortable: false,
        value: "actions",
        groupable: false,
      },
    ],
    categories: [],
    quotes: [],
    dialog: false,
    selected_item: {},
    type_edit: false,
  }),
  mounted() {
    this.get_quotes();
    this.get_categories();
  },
  methods: {
    ...mapActions(Module.CATEGORIES, {
      load_categories: LOAD_CATEGORIES,
    }),
    ...mapActions(Module.QUOTES, {
      load_quotes: LOAD_QUOTES,
      load_filtered_quotes: LOAD_FILTERED_QUOTES,
      add_new_quote: ADD_NEW_QUOTE,
      remove_quote: REMOVE_QUOTE,
      update_quote: UPDATE_QUOTE,
    }),

    async get_quotes() {
      this.quotes = await this.load_quotes();
    },

    async get_filtered_quotes(categories) {
      this.quotes = await this.load_filtered_quotes(categories);
    },

    async get_categories() {
      this.categories = await this.load_categories();
    },

    async add(title) {
      const { success } = await this.add_new_quote(title);
      if (success) {
        this.reload();
      }
    },
    async update(payload) {
      const { success } = await this.update_quote(payload);
      if (success) {
        this.reload();
        this.reset_edit_item();
      }
    },
    async remove(id) {
      this.reset_dialog();
      const { success } = await this.remove_quote(id);
      if (success) {
        this.reload();
      }
    },

    reload() {
      this.$refs.form?.reset();
      this.get_quotes();
    },

    open_delete_dialog(item) {
      this.dialog = true;
      this.selected_item = { ...item };
    },

    reset_dialog() {
      this.selected_item = {};
      this.dialog = false;
    },

    edit_item(item) {
      this.selected_item = { ...item };
      this.type_edit = true;
    },

    reset_edit_item() {
      this.selected_item = {};
      this.type_edit = false;
    },
  },
};
</script>

<style lang="scss">
</style>