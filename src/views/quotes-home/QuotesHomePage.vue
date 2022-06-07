<template>
  <div>
    <div class="quotes__home">
      <quotes-actions
        :quote="random_quote"
        @get_random_quote="get_random_quote"
      ></quotes-actions>

      <quotes-list
        :quotes="quotes"
        :refs="{
          categories,
        }"
        @get_filtered_quotes="get_filtered_quotes"
        @get_quotes="get_quotes"
      ></quotes-list>
    </div>
  </div>
</template>

<script>
import { Module } from "@/store/modules";
import { mapActions, mapState } from "vuex";
import QuotesActions from "./components/QuotesActions.vue";
import {
  LOAD_QUOTES,
  LOAD_FILTERED_QUOTES,
  RANDOM_QUOTE
} from "@/store/modules/quotes/types";
import QuotesList from "./components/QuotesList.vue";
import { LOAD_CATEGORIES } from "@/store/modules/categories/types";

export default {
  components: { QuotesActions, QuotesList },
  name: "QuotesHomePage",
  computed: {
    ...mapState({
      random_quote: (state) => state.quotes.random_quote,
    }),
  },
  data: () => ({
    categories: [],
    quotes: [],
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
      load_random_quote: RANDOM_QUOTE
    }),

    async get_categories() {
        this.categories = await this.load_categories();
    },

    async get_quotes() {
      this.quotes = await this.load_quotes();
    },

    async get_filtered_quotes(categories) {
      this.quotes = await this.load_filtered_quotes(categories);
    },

    get_random_quote() {
        this.load_random_quote();
    }
  },
};
</script>

<style lang="scss">
</style>