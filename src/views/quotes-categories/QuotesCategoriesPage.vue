<template>
  <div>
    <categories-form
      :edit_item="selected_item"
      :type_edit="type_edit"
      @add="add"
      @update="update"
      @reset="reset_edit_item"
      ref="form"
    ></categories-form>
    <v-row>
      <v-col offset-md="3" md="6">
        <default-table
          @get_table="load_refs"
          @open_delete_dialog="open_delete_dialog"
          @edit_item="edit_item"
          :headers="headers"
          :items="categories"
        ></default-table>
      </v-col>
    </v-row>

    <delete-dialog
      :item_id="selected_item.id"
      :item_name="selected_item.title"
      :dialog="dialog"
      @close_dialog="reset_dialog"
      @delete_item="remove"
    ></delete-dialog>
  </div>
</template>

<script>
import DefaultTable from "@/components/DefaultTable.vue";
import CategoriesForm from "./components/CategoriesForm.vue";
import { mapActions } from "vuex";
import { Module } from "@/store/modules";
import {
  LOAD_CATEGORIES,
  ADD_NEW_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY,
} from "@/store/modules/categories/types.js";
import DeleteDialog from "@/components/DeleteDialog.vue";

export default {
  components: { CategoriesForm, DefaultTable, DeleteDialog },
  name: "QuoteCategoriesPage",
  data: () => ({
    headers: [
      {
        text: "Наименование",
        value: "title",
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
    dialog: false,
    selected_item: {},
    type_edit: false,
  }),
  mounted() {
    this.load_refs();
  },
  methods: {
    ...mapActions(Module.CATEGORIES, {
      load_categories: LOAD_CATEGORIES,
      add_new_category: ADD_NEW_CATEGORY,
      remove_category: REMOVE_CATEGORY,
      update_category: UPDATE_CATEGORY,
    }),

    async load_refs() {
      this.categories = await this.load_categories();
    },

    async add(title) {
      const { success } = await this.add_new_category(title);
      if (success) {
        this.reload();
      }
    },
    async update(payload) {
      const { success } = await this.update_category(payload);
      if (success) {
        this.reload();
        this.reset_edit_item();
      }
    },
    async remove(id) {
      this.reset_dialog();
      const { success } = await this.remove_category(id);
      if (success) {
        this.reload();
      }
    },

    reload() {
      this.$refs.form?.reset();
      this.load_refs();
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

<style lang="scss" scoped>
</style>