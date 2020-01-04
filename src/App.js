import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima'


function App() {


  // State Principal 
  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    // prevenir ejecución
    if(ciudad === '') return;
    
    const consultarAPI = async() => {

      const appId = '4b385132016ed58cf27ba7f997a7c5ac';
      let url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
      // Consultar la URL
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarResultado(resultado);
      
    }

    consultarAPI();
  },[ ciudad, pais ])

  const datosConsulta = datos => {
    // Validar que ambos campos esten
    if(datos.ciudad === '' || datos.pais === '' ) {
      guardarError(true); 
      return;
    }

    // Ciudad y pais existe, agregarlos al State  
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais); 
    guardarError(false); 

  }

  // Cargar un componente condicionalmente
  let componente;
  if(error) {
    // Hay un error mostrarlo
    componente = <Error mensaje='Ambos campos son obligatorios' />
  } else if(resultado.cod === "404") {
    componente = <Error mensaje='La Ciudad NO existe en nuestro registro' />
  } else {
    // mostrar el clima
    componente = <Clima 
                    resultado={resultado}
                 />;
  }

  return (
    <div className="App">
      <Header
        titulo='Clima React App' 
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s16 m6">
              <Formulario
                datosConsulta={datosConsulta} 
              />
            </div>
            <div className="col s16 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
 