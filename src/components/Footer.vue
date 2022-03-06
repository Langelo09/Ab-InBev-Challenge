<template>
    <v-footer color="primary" height="auto" dark app>
      <v-layout row>
        <v-flex color="primary" d-flex justify-center dark py-3 text-xs-center white--text xs12>
          &copy;{{anio}} — <strong>Angel Luna</strong>
        </v-flex>
      </v-layout>
    </v-footer>
</template>

<script>
    export default {
        data() {
            return {
                anio: new Date().getFullYear()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>