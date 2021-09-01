import React from 'react'
import {BrowserRouter as Router,Switch,Route,Redirect,Link, withRouter} from 'react-router-dom'
import { isLogin, isRole } from './functions';

const Routes = ({component: Component, ...rest}) => {
    
    return ( 
        
            <div>
                <Route {...rest} render={props => (
                    isLogin()  ? <Component {...props}/> : <Redirect to="/denied"/>)
                } />
                
            </div>
     );
}
 
export default Routes;
