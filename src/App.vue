<template>
  <v-app>

    <Navbar />

    <v-main>
      <fxRatesGraph/>
    </v-main>

    <Footer />

  </v-app>
</template>

<script>
import FxRatesGraph from './components/FxRatesGraph'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default {
  name: 'App',

  components: {
    FxRatesGraph,
    Navbar,
    Footer
  }
};
</script>
