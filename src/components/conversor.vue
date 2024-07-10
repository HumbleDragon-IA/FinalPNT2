<template>

  <section class="src-components-conversor">
    <h1>Conversor Pesos a USD</h1>
    <hr>

    <div class="form-group">
      <input id="pesos" type="number" placeholder="Ingrese monto en pesos" v-model.trim="pesos">
    </div>
    <div class="form-group">
      <input id="tc" type="number" placeholder="Ingrese importe del Tipo de Cambio" v-model.trim="tipoCambio" :readonly="actualizacionAutomatica">
      <label for="automatico"> Actualizacion Automatica  </label>      
      <input id="automatico" type="checkbox" v-model="actualizacionAutomatica">
      <span v-if="this.actualizacionAutomatica"> Ultima Actualizacion :  {{ this.fechaActualizada }} </span>
    </div>

    <div>Valor convertido a USD
      <span v-show="this.pesos && this.tipoCambio"> {{ this.conversion }}</span>
       </div>

       <hr>
       <div>Preguntas: 1:B - 2:B - 3:C - 4:E - 5:C</div>

  </section>

</template>

<script >
import conexionApi from "../services/conexionApi.js"

  export default  {
    name: 'src-components-conversor',
    props: [],
    mounted () {
      this.actualizacionAutomatica= false
    },

    updated(){
      if(this.actualizacionAutomatica){
       this.cambioAutomatico()
      }
      if(!this.actualizacionAutomatica){
        this.tipoCambio=""
      }
    },
    data () {
      return {
        pesos: "",
        tipoCambio: "",
        actualizacionAutomatica: "",
        intervalo: "",
        fecha:""
      }
    },
    methods: {
    async  cambioAutomatico(){
      try{
        const data = await conexionApi.getDolarBlue();
        this.tipoCambio = data
        this.fecha=new Date().toLocaleString()
      }
      catch(error){
        console.log(error)
      }
      },

      
      comenzarActualizacion(){
        this.cambioAutomatico()
        this.intervalo = setInterval(this.cambioAutomatico, 2000)
        
      },

      terminarActualizacion(){
        clearInterval(this.intervalo)
        this.intervalo=null
        this.fecha=""
      }
    },
    computed: {
      conversion(){
        return (this.pesos/this.tipoCambio).toFixed(2)
      },
      fechaActualizada() {
        return this.fecha
      }
    },
    watch: {
      actualizacionAutomatica(nuevoValor){
        if(nuevoValor){
          this.comenzarActualizacion()
        }else{
          this.terminarActualizacion()
        }
      },
      tipoCambio(){
        if(this.actualizacionAutomatica){
          this.placeholderText = `${this.tipoCambio}`
        }
      }
    }
}


</script>

<style scoped lang="css">
  .src-components-conversor {

  }
</style>
