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
        <v-flex>
          <div id="fxRatesGraph" style="width: 100%; height: 65vh;"></div>
        </v-flex>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import getFxData from '../api/fixerIo'
import Swal from 'sweetalert2'

import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  MarkLineComponent,
  GridComponent
} from 'echarts/components'

echarts.use([
  TitleComponent,
  TooltipComponent,
  LineChart,
  CanvasRenderer,
  SVGRenderer,
  UniversalTransition,
  LegendComponent,
  MarkLineComponent,
  GridComponent
])

  export default {
    name: 'FxRatesGraph',
    data: () => ({
      allowedDates: val => new Date(val).getDay() === 0,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      today: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      currencies: ['MXN', 'USD', 'AUD', 'CAD', 'PLN', 'NZD', 'CHF', 'GBP', 'DOP', 'EUR'],
      currenciesValue: []
    }),
    mounted () {
      this.init()
    },
    methods: {
      init() {
        // initialize the echarts instance
        let myChart = echarts.init(
          document.getElementById('fxRatesGraph')
        )
        // Draw the chart
        const option = {
          title: {
            text: 'Fx Rates'
          },
          tooltip: {
            trigger: 'axis',
            show: true
          },
          xAxis: [
            {
              type: 'category',
              name: 'Currencies',
              data: this.currencies,
              axisLabel: {
                interval: 0,
                rotate: 30
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'Fx'
            }
          ],
          series: [{
              data: this.currenciesValue,
              type: 'line'
          }]
        }

        myChart.setOption(option)

        window.addEventListener('resize', function () {
          myChart.resize()
        })
      },
      async callData(dateValue) {
        if (dateValue > this.today) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ingresa una fecha correcta'
          })

        } else {

          new Swal({
            title: 'Obteniendo datos...',
            allowOutsideClick: false
          })
          Swal.showLoading()

          await getFxData(dateValue)
            .then( ({data}) => {
              const currencyArray = data.rates
              console.log(currencyArray)
              this.currenciesValue = []
              for (let i = 0; i < this.currencies.length; i++) {
                const element = this.currencies[i]
                const elementPush = currencyArray[element]
                this.currenciesValue.push(elementPush)
              }
              this.init()
              Swal.close()
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error
              })
              console.log(error);
            })
        }
      }
    },
    created () {
      this.callData(this.date)
    },
    watch: {
      date(newValue) {
        this.callData(newValue)
      }
    }
  }
</script>

<style lang="scss" scoped>
.v-text-field{
  width: 200px;
}
</style>
