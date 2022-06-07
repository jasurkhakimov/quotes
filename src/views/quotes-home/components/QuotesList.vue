<template>
  <v-data-iterator
    :items="quotes"
    :search="search"
    :sort-by="sortBy.toLowerCase()"
    :sort-desc="sortDesc"
    :items-per-page.sync="itemsPerPage"
    :page.sync="page"
    hide-default-footer
    no-results-text="По вашему запросу, записей не найдено"
  >
    <template v-slot:header>
      <v-toolbar dark color="var(--grey)" class="mb-10">
        <v-text-field
          v-model="search"
          clearable
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Поиск"
        ></v-text-field>
        <template v-if="$vuetify.breakpoint.mdAndUp">
          <v-select
            v-model="sortBy"
            flat
            solo-inverted
            hide-details
            :items="keys"
            item-text="title"
            item-value="value"
            prepend-inner-icon="mdi-filter-variant"
            label="Сортировать по"
            class="mx-4"
          ></v-select>
          <v-autocomplete
            v-model="categories"
            label="Жанр цитаты"
            :items="refs.categories"
            item-text="title"
            item-value="title"
            multiple
            chips
            flat
            solo-inverted
            hide-details
            @change="use_filter()"
            class="ml-4"
          ></v-autocomplete>
          <v-spacer></v-spacer>
          <v-btn-toggle v-model="sortDesc" mandatory>
            <v-btn large depressed color="var(--grey)" :value="false">
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn large depressed color="var(--grey)" :value="true">
              <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
          </v-btn-toggle>
        </template>
      </v-toolbar>
    </template>
    <template v-slot:default="props">
      <v-row>
        <v-col
          v-for="(quote, index) in props.items"
          :key="index"
          cols="12"
          md="6"
        >
          <v-card class="mb-6">
            <v-card-title>{{ quote.author }}</v-card-title>

            <v-card-text class="text-h5">
              {{ quote.quote }}
            </v-card-text>
            <div class="pa-4">
                <v-chip color="var(--blue)" dark class="mr-1" small v-for="(cat, index1) in quote.category" :key="index1">
                    {{ cat }}
                </v-chip>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-slot:footer>
      <div class="d-flex align-center justify-end">
        <span class="mr-4 grey--text">
          Page {{ page }} of {{ numberOfPages }}
        </span>
        <v-btn
          depressed
          fab
          color="var(--grey)"
          dark
          small
          class="mr-1"
          @click="formerPage"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          depressed
          fab
          color="var(--grey)"
          dark
          small
          class="ml-1"
          @click="nextPage"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </template>
  </v-data-iterator>
</template>

<script>
export default {
  name: "QuotesList",
  props: {
    quotes: Array,
    refs: Object,
  },
  data: () => ({
    isActive: false,
    search: "",
    filter: {},
    sortDesc: true,
    page: 1,
    itemsPerPage: 15,
    sortBy: "created_at",
    keys: [
      {
        title: "Цитата",
        value: "quote",
      },
      {
        title: "Автор",
        value: "author",
      },
      {
        title: "Дата создания",
        value: "created_at",
      },
      {
        title: "Дата обновления",
        value: "updated_at",
      },
    ],
    categories: [],
  }),
  computed: {
    numberOfPages() {
      return Math.ceil(this.quotes.length / this.itemsPerPage);
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
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
</style>