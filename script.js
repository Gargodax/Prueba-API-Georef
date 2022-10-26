
/* Georef - API del Servicio de Normalización de Datos Geográficos de Argentina */
/* https://datosgobar.github.io/georef-ar-api/*/
//------------------------------------------------------------------------------//



//Funcion para traer los datos de la API y mostrar el listado de provincias.
function traerProvincia() {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")

        .then(data => data.json())
        .then(data => {
            let opt = '<option value="Elige una provincia">Elige una provincia</option>';
            data.provincias.forEach(element => opt += `<option value=${element.nombre}>${element.nombre}</option>)`);
            selectProvincias.innerHTML = opt;
        })
    
        .catch(error => {
            let message = error.statusText || "<b>-Ocurrió un error-</b></br>";
            selectProvincias.nextElementSibling.innerHTML = `${message}`;
        })
}


//Función para mostrar listado de municipios, previa selección de provincia.
function elegirMunicipio(provincias) {
    fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincias}&max=1000`)
        .then(data => data.json())
        .then(data => {
            let opt = '<option value="Elige un municipio">Elige un municipio</option>';
            data.municipios.forEach(element => opt += `<option value=${element.id}>${element.nombre}</option>)`);
            selectMunicipio.innerHTML = opt;
        })
    
        .catch(error => {
            let message = error.statusText || "<b>-Ocurrió un error-</b></br>";
            selectMunicipio.nextElementSibling.innerHTML = `${message}`;
        })
}

selectProvincias.addEventListener("change", e => {
    elegirMunicipio(e.target.value);
    console.log(e.target.value)
})


//Función para mostrar listado de localidades, previa selección de municipio.
function elegirLocalidad(municipios) {
    fetch(`https://apis.datos.gob.ar/georef/api/localidades?municipio=${municipios}&max=1000`)
        .then(data => data.json())
        .then(data => {
            let opt = '<option value="Elige una localidad">Elige una localidad</option>';
            data.localidades.forEach(element => opt += `<option value=${element.id}>${element.nombre}</option>)`);
            selectLocalidad.innerHTML = opt;
        })
    
        .catch(error => {
            let message = error.statusText || "<b>-Ocurrió un error-</b></br>";
            selectLocalidad.nextElementSibling.innerHTML = `${message}`;
        })
}

selectMunicipio.addEventListener("change", e => {
    elegirLocalidad(e.target.value);
    console.log(e.target.value)
})


//Llamado a la función principal.
traerProvincia();
