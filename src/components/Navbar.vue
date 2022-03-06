<template>
  <v-app-bar
      app
      color="primary"
      dark
    >

    <v-img
      alt="Modelo Logo"
      class="shrink mr-2"
      contain
      src="@/assets/img/modelo-logo.png"
      transition="scale-transition"
      width="45"
    />

    <v-app-bar-nav-icon 
      v-if="$vuetify.breakpoint.xsOnly"
    />

    <v-img
      alt="Project Name"
      class="display-1 mb-1"
      contain
      min-width="80"
      width="150"
      v-if="$vuetify.breakpoint.smAndUp"
    >
    Fx rates project
    </v-img>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    </v-app-bar>

</template>

<script>
export default {
  data: () => ({
    //
  }),
}
</script>

<style>

</style>