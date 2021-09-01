const axios = require("axios")
const cookies = require("js-cookie")

export const hasRole = (token) => {
    const Role = JSON.parse(token).Role;
    console.log("Role: "+Role);
    return Role;
}

export const isLogin = () => {
    console.log(cookies.get("Token"))
    if(cookies.get("Token"))
        return true;
    else
        return false;
}

export const isRole = (ROLE) => {
    if(ROLE == hasRole(cookies.get("departamento")))
        return true; 
    else
        return false;
}


//Obtener Estaciones

export const getEstacionesLine = async (linea) => {
    const result = await axios.get(`/el/estacionlinea/${linea}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        
    });
    return result.data;
};

//Obtener Sentidos

export const getSentidosEstaciones = async (estacion) => {
    const result = await axios.get(`/sentes/sentidoestaciones/${estacion}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        
    });
    return result.data;
};

//Obetener Categorias

export const getCategorias = async (linea) => {
    const result = await axios.get(`/cat/list/${linea}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        
    });

    return result.data;
    
};

// Obtener Conceptos

export const getConceptos = async (categoria) => {
    const result = await axios.get(`/categorias/list/${categoria}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {
        
    });

    return result.data;
}
// Obtener partes
export const getPartes = async (linea,concepto) => {
    const result = await axios.get(`/partes/list/${linea}/${concepto}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {

    });

    return result.data;
}
//Obtener Parte

export const getParte = async(linea, concepto, parte) => {
    const result = await axios.get(`/partes/list/${linea}/${concepto}/${parte}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {

    });

    return result.data;
}

// Obtener fallas
export const getFallas = async (partes) => {
    const result = await axios.get(`/partes/falla/${partes}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {

    });

    return result.data;
}

export const CodeSearch = async (id) => {
    const result = await axios.get(`/categorias/code/${id}`)
    .then(rows => {
        return rows;
    })
    .catch(err => {

    });
    return result.data;
}
