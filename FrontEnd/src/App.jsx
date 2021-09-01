import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import Cookies from 'js-cookie';

import Container from './componentes/SideBar/Container';
//import ContainerL from './componentes/SideBar/SideBarL/ContainerL'
//import ContainerM from './componentes/SideBar/SideBarM/ContainerM'
//import ContainerCu from './componentes/SideBar/SideBarCu/ContainerCu'
import Routes from './Routes';
import { isLogin, hasRole } from './functions';

function App(props) {
  
  if(Cookies.get("Departamento")==="Transporte" && Cookies.get("Token"))  
  return (
    <ThemeProvider theme={theme}>
      <Container/>
    </ThemeProvider>
  );
  else 
  return (
    <ThemeProvider theme={theme}>
      <Routes/>
    </ThemeProvider>
  );

  {/*return (
    <ThemeProvider theme={theme}>
      <ContainerL/>
    </ThemeProvider>
  );*/}
 
}
export default App;
