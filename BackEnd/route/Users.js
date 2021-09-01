const express = require("express")
const Cookies = require("js-cookie")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer');


const User = require("../Models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'
let depart = ""
let email = ""
users.post('/register', (req, res) => {
    const today = new Date().toJSON()
    const userData = {
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        Departamento: req.body.Departamento,
        Tipo: req.body.Tipo,
        email: req.body.email,
        password: req.body.password,
    }
    User.findOne({
        where: {
          email: req.body.email
        }
    })
    .then(user => {
      if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
            userData.password = hash
            User.create(userData)
            .then(user => {
              //res.json({ status: user.email + 'Registrado!' })
              res.send("Registrado")
	        })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.send({ error: 'El usuario ya existe' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/login', (req,res) =>{
    User.findOne({
        where: {
            email: req.body.email
        },
	attributes: ['email', 'estado','password','Departamento','Nombre','Apellido','Tipo']
    })
    .then(user => {
        if(user)
        {
            if (bcrypt.compareSync(req.body.password,user.password))
            {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                let nombre = user.Nombre + " " + user.Apellido
                let cargo = user.Tipo
            	let departamento = user.Departamento
            	depart = departamento 
    	        let estado = user.estado
                email = req.body.email
        		let expi = new Date(Number(new Date()) + (4 * 60 * 60000) )
                console.log(expi + " " + estado)
                if(estado == "ACTIVO")
                {
                    res.cookie('Nombre' , user.Nombre, {expires : expi , MaxAge : (4 * 60 * 60000)} )
                    res.cookie('Apellido' , user.Apellido, {expires : expi , MaxAge : (4 * 60 * 60000)} )
                    res.cookie('Cargo' , cargo, {expires : expi , MaxAge : (4 * 60 * 60000)} )
                    res.cookie('Departamento' , departamento, {expires : expi , MaxAge : (4 * 60 * 60000)})
                    res.cookie('Token', token, {expires : expi , MaxAge : (4 * 60 * 60000)})
                    res.cookie('Email', req.body.email, {expires : expi , MaxAge : (4 * 60 * 60000)})
                    res.json({ success: true, token: token, nombre: nombre, cargo: cargo, departamento: departamento,estado: estado})
                }
                else
                    res.json({ success: false, token: token, nombre: nombre, cargo: cargo, departamento: departamento,estado: estado})
        		//console.log(user)
        		//res.send(token)
            }
	    else
		res.send({success: false, data:"Contraseña incorrecta", fail: true})
        }
        else
        {
            res.json({success:false})
        }
    })
    .catch(err => {
        res.status(400).json({success: false , error: err})

    })
})

let transport = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
       user: 'proyectometrobus2021@outlook.com',
       pass: 'jottaz-nozTyw-8cikpo'
    }
});


users.post('/recup', (req,res) =>{ 
    console.log(req.body.email)
    User.findOne({
        where: {
          email: req.body.email
        }
    })
    .then(user => {
        if(user) 
        {   
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < 10; i++ ) 
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            console.log("Contraseña " + result)
            bcrypt.hash(result, 10, (err, hash) => {
                User.update({password: hash}, {where: {email: req.body.email}})
                .then(user => {
                    const message = {
                        from: 'proyectometrobus2021@outlook.com', // Sender address
                        to: req.body.email,         // List of recipients
                        subject: 'Recupera tu contraseña', // Subject line
                        text: 'Tu contraseña es '+ result + '. \n Se recomienda cambiar la contraseña.' // Plain text body
                    };
                    transport.sendMail(message, function(err, info) {
                        if (err) 
                        {
                            console.log("ERROR")  
                            console.log(err)
                        } 
                        else 
                            console.log(info);
                    });
                  res.send({success:true})
                })
                .catch(err => {
                  res.send('error: ' + err)
                })
            })
        }
        else
        {
            console.log("El correo " + req.body.email + " no esta registrado.")
            res.send({success:false, message:err});
        }
    })
    .catch(err=>{
        res.send({success:false, message:err});
    })
})

users.post('/get_User', (req,res) => {
    User.findOne({
    where: {
        email: req.body.email
        } 
    })
    .then(obj=>{
            res.send({success:true, data:obj});
    })
    .catch(err=>{
        res.send({success:false, message:err});
    })
})

users.post('/get_Users', (req,res) => {
    let data2 = Cookies.get("Departamento")
    console.log(depart)
    User.findAll({
    where: {
        Departamento: depart
        } 
    })
    .then(obj=>{
            res.send({success:true, data:obj});
    })
    .catch(err=>{
        res.send({success:false, message:err});
    })
        
})

users.post('/UpdateAll', (req,res) =>{
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(user)
        {
            if(bcrypt.compareSync(req.body.password,user.password))
            {
                if(req.body.passwordn)
                {
                    bcrypt.hash(req.body.passwordn, 10, (err, hash) => {
                        req.body.passwordn = hash
                        console.log(req.body.passwordn)
                        User.update({
                            Nombre: req.body.Nombre,
                            Apellido: req.body.Apellido,
                            Foto: req.body.Foto,
                            Departamento: req.body.Departamento,
                            Tipo: req.body.Tipo,
                            email: req.body.email,
                            password: req.body.passwordn
                        }, {where: {email: req.body.email}})
                        .then(user => {
                            let expi = new Date(Number(new Date()) + (4 * 60 * 60000) )
                            console.log("req.body")
                            console.log(req.body)

                            console.log("Actualizado.")
                            res.cookie('Nombre' , req.body.Nombre, {expires : expi , MaxAge : (4 * 60 * 60000)} )
                            res.cookie('Apellido' , req.body.Apellido, {expires : expi , MaxAge : (4 * 60 * 60000)} )
                            res.cookie('Cargo' , req.body.Tipo, {expires : expi , MaxAge : (4 * 60 * 60000)} )
                            res.cookie('Departamento' , req.body.Departamento, {expires : expi , MaxAge : (4 * 60 * 60000)})
                            res.send({ success: 'true'})
                        })
                        .catch(err => {
                          res.send({ error: 'Falle'})
                        })
                    })
                }
                else
                {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        req.body.password = hash
                        console.log(req.body.passwordn)
                        User.update({
                            Nombre: req.body.Nombre,
                            Apellido: req.body.Apellido,
                            Foto: req.body.Foto,
                            Departamento: req.body.Departamento,
                            Tipo: req.body.Tipo,
                            email: req.body.email,
                            password: req.body.password
                        }, {where: {email: req.body.email}})
                        .then(user => {
                            let expi = new Date(Number(new Date()) + (4 * 60 * 60000) )
                            console.log("req.body")
                            console.log(req.body)

                            console.log("Actualizado.")
                            res.cookie('Nombre' , req.body.Nombre, {expires : expi , MaxAge : (4 * 60 * 60000)} )
                            res.cookie('Apellido' , req.body.Apellido, {expires : expi , MaxAge : (4 * 60 * 60000)} )
                            res.cookie('Cargo' , req.body.Tipo, {expires : expi , MaxAge : (4 * 60 * 60000)} )
                            res.cookie('Departamento' , req.body.Departamento, {expires : expi , MaxAge : (4 * 60 * 60000)})
                            res.send({ success: 'true'})
                        })
                        .catch(err => {
                          res.send('error: Falle ' + err)
                        })
                    })
                }
                
            }
            else
                res.send('error: La contraseña no coincide.')
        }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/Update', (req,res) =>{
    const userData = {
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        Departamento: req.body.Departamento,
        Tipo: req.body.Tipo,
        email: req.body.email,
        password: req.body.password,
        estado: req.body.estado
    }
    
    User.findOne({
        where: {
          email: req.body.email
        }
    })
    .then(user => {
      if (user) {
            if(userData.estado === "INACTIVO")
                req.body.estado = "ACTIVO"
            else
                req.body.estado = "INACTIVO"  
            
            User.update({estado: req.body.estado}, {where: {email: userData.email}})
            .then(user => {
              res.send({status:"success",data:userData})
            })
            .catch(err => {
              res.send('error: ' + err)
            })
      } else {
        res.send({ error: 'El usuario no existe' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/UpdateCargo', (req,res) =>{
    const userData = {
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        Departamento: req.body.Departamento,
        Tipo: req.body.Tipo,
        email: req.body.email,
        password: req.body.password,
        estado: req.body.estado
    }
    
    User.findOne({
        where: {
          email: req.body.email
        }
    })
    .then(user => {
      if(user) {
            User.update({Tipo: req.body.Tipo}, {where: {email: userData.email}})
            .then(user => {
              res.send({status:"success",data:userData})
            })
            .catch(err => {
              res.send('error: ' + err)
            })
      } else {
        res.send({ error: 'El usuario no existe' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports  = users
