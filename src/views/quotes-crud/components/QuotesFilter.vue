<template>
  <div class="quotes__filter">
    <v-autocomplete
      v-model="categories"
      label="Жанр цитаты"
      :items="refs.categories"
      item-text="title"
      item-value="title"
      multiple
      chips
      outlined
      hide-details
      dense
      @change="use_filter()"
      class="c-field"
    ></v-autocomplete>
    <v-btn @click="reset()" depressed color="var(--grey)" dark small>
      Сбросить
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "QuotesFilter",
  props: {
    refs: Object,
  },
  data: () => ({
    categories: [],
  }),
  methods: {
    use_filter() {
      if (this.categories.length) {
        this.$emit("get_filtered_quotes", this.categories);
      } else {
        this.$emit("get_quotes");
      }
    },
    reset() {
      if (this.categories.length) {
        this.categories = [];
        this.$emit("get_quotes");
      }
    },
  },
};
</script>

<style lang="scss">
.quotes__filter {
  display: flex;
  padding: 12px;
  border: 1px solid var(--lightgrey);
  align-items: center;
  gap: 10px;
}
</style>