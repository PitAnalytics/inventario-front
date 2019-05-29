var app = new Vue({



    el:'#app',

    data(){

      return {
        
        page:{
          menu:{},
          title:'WELLCOME',
          subtitle:'wellcome',
          hide:{
            table:Boolean,

          }
        },

        zona:{
          list:null,
          option:0
        },

        equipo:{
          list:null,
          option:'*',
          descripcion:'---',
          img:''
        },
        
        inventario:{
          list:null,
          option:null        
        }

      }

    },

    mounted() {
      this.zonaIndex();
      this.equipoIndex();
      this.inventarioIndex();
      this.equipoGet();

    },

    methods:{

      equipoChange(){

        this.inventarioSearch();
        this.equipoGet();

      },

      //request zona
      zonaIndex(){
        axios
        .get(serviceUrl+'/zona')
        .then(response => {
          this.zona.list=response.data;
          this.zona.list.unshift({id:0,zona:'*'});
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => this.loading = false);

      },

      /*****************************************/
      /*************AJAX EQUIPOS****************/
      /*****************************************/
      equipoIndex(){
        axios
        .get(serviceUrl+'/equipo')
        .then(response => {
          this.equipo.list=response.data;
          this.equipo.list.unshift({codigo:'*',descripcion:'---'});
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => this.loading = false);
      },

      equipoGet(){
        if(this.equipo.option!=='*'){
          axios
          .get(serviceUrl+'/equipo/obtener'+'/'+this.equipo.option)
          .then(response => {
            this.equipo.descripcion=response.data.descripcion;
            this.equipo.img=response.data.img;
          })
          .catch(error => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => this.loading = false);
        }
        else{
          this.equipo.descripcion='---';
        }
      },
      
      /*****************************************/
      /*************AJAX INVENTARIO*************/
      /****************************************/
      inventarioIndex(){
        axios
        .get(serviceUrl+'/inventario')
        .then(response => {
          this.inventario.list=response.data;
          //console.log(this.inventario.list);
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        }).finally(() => this.loading = false);
      },

      inventarioSearch(){
        axios
        .get(serviceUrl+'/inventario/busqueda'+'/'+this.zona.option.toString()+'/'+this.equipo.option)
        .then(response => {
          this.inventario.list=response.data;
          //console.log(this.inventario.list);
        }).catch(error => {
          console.log(error);
          this.errored = true;
        }).finally(() => this.loading = false);
      },

      inventarioGet(id){
        alert('ok');
        axios
        .get(serviceUrl+'/inventario/obtener'+'/'+id.toString())
        .then(response => {
          this.inventario.option=response.data;
        }).catch(error => {
          console.log(error);
          this.errored = true;
        }).finally(() => this.loading = false);

      }

    }

});