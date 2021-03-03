let autos = require('./autos');
let persona ={
        nombre: 'Juan',
        capacidadDePagoEnCuotas: 8000,
        capacidadDePagoTotal: 150000
        };

let concesionaria = {
    autos : autos,
    buscarAuto  : function (patenteBuscada) {

        let autoBuscado = this.autos.filter(auto => auto.patente == patenteBuscada);
        return autoBuscado.length > 0 ? autoBuscado[0] : null
    },
    venderAuto : function (patenteBuscada) {
        
        let autoBuscado = this.buscarAuto(patenteBuscada);
        autoBuscado.vendido = true
        return autoBuscado
    },
    autosParaLaVenta: function () {
        return this.autos.filter(auto => auto.vendido == false);
    },
    autosNuevos: function () {
        let autosDisponibles =  this.autosParaLaVenta()
        return autosDisponibles.filter(auto => auto.km < 100 );
    },
    listaDeVentas: function () {
        let autosVendidos = this.autos.filter(auto => auto.vendido == true);
        let lista = []
        autosVendidos.forEach(function (i) {
            lista.push(i.precio)  
        })
        return lista 
    },
    totalDeVentas:function () {
        let lista  = this.listaDeVentas()
        if (lista.length > 0 ) {
            freduce = (acum,valor) => acum + valor 
            return lista.reduce(freduce) ;
        }else{
            return 0
        }
    },
    puedeComprar: function (auto,persona) {
        let valorDeCuota = auto.precio / auto.cuotas
        return auto.precio <= persona.capacidadDePagoTotal && valorDeCuota <= persona.capacidadDePagoEnCuotas            
    },

    autosQuePuedeComprar: function (persona) {
        let listaDeAutosDisponibles = this.autosParaLaVenta()
        return listaDeAutosDisponibles.filter(auto => this.puedeComprar(auto,persona));
    }
};


console.log(concesionaria.autosQuePuedeComprar());