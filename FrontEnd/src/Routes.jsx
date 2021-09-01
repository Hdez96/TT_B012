import React from 'react'
import {BrowserRouter as Router,Switch,Route,Link, withRouter,Redirect} from 'react-router-dom'

import Login from './componentes/Login/Login'
import SignUp from './componentes/Login/Signup'
import User from './componentes/Login/User'
import RecuperaC from './componentes/Login/RecuperarC'
import Denied from './componentes/paginas/Denied';

import Levantamiento from './componentes/paginas/Levantamiento';
import Almacen from './componentes/paginas/Almacen';
import Header from './componentes/paginas/Header';
import Formatos from './componentes/paginas/Formatos';

import Consumo from './componentes/paginas/formatos/consumo';
import CedulaRTI from './componentes/paginas/formatos/cedularti';
import CedulaTRA from './componentes/paginas/formatos/cedulatra';
import ConsumoMantenimiento from './componentes/paginas/formatos/consumomantenimiento';
import EstatusPatio from './componentes/paginas/formatos/estatuspatio';
import EstatusPatioS from './componentes/paginas/formatos/estatuspatiosalida';
import Km from './componentes/paginas/formatos/km';
import PruebaDes from './componentes/paginas/formatos/pruebades';
import Reffa from './componentes/paginas/formatos/reffa';
import Reffai from './componentes/paginas/formatos/reffaindice';
import Reffaf from './componentes/paginas/formatos/reffafotos';
import Rendimientos from './componentes/paginas/formatos/rendimiento';
import ReporteIncidencia from './componentes/paginas/formatos/reporteincidencia';

import busqueda from './componentes/paginas/formatos/Busqueda';
import busquedaPDF from './componentes/paginas/formatos/BusquedaPDF';
import Empleados from './componentes/paginas/formatos/Empleados';
import imagemb from './componentes/paginas/formatos/ImageMB'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './LogRoute'
import LRoute from './LRoute'

import Principal from './componentes/Login/Principal'

const Routes = () => {
    return ( 
        <Router>
            <div>
            <hr/>
                <Route path="/" exact={true} component={Login}/>
                
		<Route path="/log" component={Login} exact/>
                <Route path="/sign" component={SignUp} exact/>
                <Route path="/recup" component={RecuperaC} exact/>
                
		<PrivateRoute path="/perfil" component={User} exact/>
                <Route path="/denied" component={Denied} exact/>  
                <PublicRoute path="/Main" component={Principal} exact/>

                <PrivateRoute path="/Jud/levantamientos" component={Levantamiento} exact/>
                <PrivateRoute path="/Mantenimiento/Almacen" component={Almacen} exact/>
                <PrivateRoute path="/Revisiones/Formatos" component={Formatos} exact/>
                <PrivateRoute path="/Header" component={Header} exact/>
                
                <PrivateRoute path="/consumo" component={Consumo} exact/>
                <PrivateRoute path="/cedularti" component={CedulaRTI} exact/>
                <PrivateRoute path="/cedulatra" component={CedulaTRA} exact/>
                <PrivateRoute path="/consumomantenimiento" component={ConsumoMantenimiento} exact/>
                <PrivateRoute path="/estatuspatio" component={EstatusPatio} exact/>
                <PrivateRoute path="/estatuspatioS" component={EstatusPatioS} exact/>
                <PrivateRoute path="/km" component={Km} exact/>
                <PrivateRoute path="/pruebades" component={PruebaDes} exact/>
                <PrivateRoute path="/reffa" component={Reffa} exact/>
                <PrivateRoute path="/reffaindice" component={Reffai} exact/>
                <PrivateRoute path="/reffafoto" component={Reffaf} exact/>
                <PrivateRoute path="/rendimiento" component={Rendimientos} exact/>
                <PrivateRoute path="/reporteincidencia" component={ReporteIncidencia} exact/>

                <PrivateRoute path="/Busqueda" component={busqueda} exact/>
                <PrivateRoute path="/Empleados" component={Empleados} exact/>
                <PrivateRoute path="/ImagenMB" component={imagemb} exact/>
                <PrivateRoute path="/Cedulatra/BusquedaPDF" component={busquedaPDF} exact/>

            </div>
        </Router>
     );
}
 
export default Routes;
