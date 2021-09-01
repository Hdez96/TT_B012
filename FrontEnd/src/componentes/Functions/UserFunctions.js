import axios from 'axios'

export const register = newUser => {
  return axios
    .post('Users/register', {
      Nombre: newUser.Nombre,
      Apellido: newUser.Apellido,
      Departamento: newUser.Departamento,
      Tipo: newUser.Tipo,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
	 console.log('Registrado')
	 return response.data
    })
}

export const login = user => {
  return axios
    .post('Users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      console.log(response.data.success + " " +response.data.estado)      
      if(response.data.success == true)
        return {success: true}
      else if(response.data.success == false && response.data.estado == "INACTIVO")
      {
        console.log("La cuenta no esta activa."+response.data.estado)
        return {success: false, estado: response.data.estado}
      }
      else
        return{success:false,estado:"No existe"}
      //return response.data
    })
    .catch(err => {
      console.log('Contraseña y Usuarios no validos , ' + err)
      return{success:false,estado:"No existe"}
    })
}

export const getData = url => {
  return axios
  .post(url)
    .then(resp => {
        //console.log(resp.data.data)
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
        console.log("Error al cargar los datos de >: "+url+" error "+err);
        return {success:false}
    })
}

export const getUserData = newUser => {
  return axios
  .post(newUser.url, {
        email: newUser.email
      })
    .then(resp => {
        //console.log(resp.data.data)
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
        console.log("Error al cargar los datos de >: "+newUser.url+" error "+err);
        return {success:false}
    })
}

export const activar_Empleado = newUser =>{
  return axios
      .post('users/update', {
        Nombre: newUser.Nombre,
        Apellido: newUser.Apellido,
        Departamento: newUser.Departamento,
        Tipo: newUser.Tipo,
        email: newUser.email,
        password: newUser.password,
        estado: newUser.estado
      })
      .then(response => {
         console.log('Actualizado.')
         window.location.reload(false)
         return response.data
      })
}

export const recuperar_contraseña = newUser =>{
  return axios
      .post('users/recup', {
        email: newUser.email
      })
      .then(response => {
         console.log('Actualizado.')
         console.log("Prueba")
         console.log(response)
         return response
      })
}

export const ActualizarPerfil = newUser =>{
  return axios
      .post('users/UpdateAll', {
        Nombre: newUser.Nombre,
        Apellido: newUser.Apellido,
        Foto: newUser.Foto,
        Departamento: newUser.Departamento,
        Tipo: newUser.Tipo,
        email: newUser.email,
        password: newUser.password,
        passwordn: newUser.passwordn,
      })
      .then(response => {
        if(response.data.success)
        {
          console.log('Actualizado.')
          return {success:true}
        }
        else
          return {success:false}
      })
      .catch(err => {
        console.log("Error al actualizar los datos de >: "+newUser.email+" error "+err);
        return {error:false}
    })
}


export const cambiarCargo = newUser =>{
  return axios
      .post('users/UpdateCargo', {
        Nombre: newUser.Nombre,
        Apellido: newUser.Apellido,
        Departamento: newUser.Departamento,
        Tipo: newUser.Tipo,
        email: newUser.email,
        password: newUser.password,
        estado: newUser.estado
      })
      .then(response => {
         console.log('Actualizado.')
         window.location.reload(false)
         return response.data
      })
}
