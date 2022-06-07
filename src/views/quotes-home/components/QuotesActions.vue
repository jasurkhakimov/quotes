<template>
  <div class="quotes__home__actions">
    <div class="random_quote">
      <div class="random_quote__title">
        <span> Случайная цитата </span>
        <v-btn @click="$emit('get_random_quote')" class="ml-2" icon depressed color="var(--grey)">
          <v-icon> mdi-cached </v-icon>
        </v-btn>
      </div>
      <div class="random_quote__quote">
        <v-row>
          <v-col offset-md="3" md="6">
            <v-card class="mb-6">
              <v-card-title>{{ quote.author }}</v-card-title>

              <v-card-text class="text-h5">
                {{ quote.quote || 'Сгенирируйте цитату' }}
              </v-card-text>
              <div class="pa-4">
                <v-chip
                  color="var(--blue)"
                  dark
                  class="mr-1"
                  small
                  v-for="(cat, index1) in quote.category || []"
                  :key="index1"
                >
                  {{ cat }}
                </v-chip>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuotesActions",
  props: {
    quote: Object,
  },
};
</script>

<style lang="scss">
.quotes__home__actions {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 24px;
}
.random_quote {
  flex: 2;
}
.random_quote__title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 24px;
}
</style>