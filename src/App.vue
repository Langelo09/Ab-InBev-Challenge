<template>
  <v-app>
    
    <Loader v-if="loader" />

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
import Loader from './components/Loader'

export default {
  name: 'App',

  components: {
    FxRatesGraph,
    Navbar,
    Footer,
    Loader
  },
  data: () => ({
    loader: false,
  }),
};
</script>
