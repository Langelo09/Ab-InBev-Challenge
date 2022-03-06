<template>
  <v-container mt-3>
    <v-row>
      <v-col cols="12">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          min-width="auto"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Seleccionar fecha de consulta:"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            locale="mx"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12">
        <v-flex xs12 sm6 offset-sm3>
            graph content
          </v-flex>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  export default {
    name: 'FxRatesGraph',
    data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false
    }),
    watch: {
      date(newValue) {
        console.log(newValue)
      }
    },
  }
</script>

<style lang="scss" scoped>
.v-text-field{
      width: 200px;
}
</style>
