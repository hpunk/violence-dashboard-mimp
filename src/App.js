import React from 'react';
import * as s from './App.styles';
import * as Palette from './colors'

// Components
import Sidebar from './components/Sidebar/Sidebar';
import Main from './views/Main'


const App = () => {
  const sidebarHeader = {
    fullName: 'Proyecto de Tesis',
    shortName: 'Tesis'
  };
  
  const menuItems = [
    {name: 'Inicio', to: '/', icon: '/icons/home.svg', isMain:true, subMenuItems: [] },
    {name: 'Impacto Acciones Preventivas', to: '/app-impact', icon: 'IMP', isMain:false, subMenuItems: [] },
    {name: 'Evolución de la violencia', to: '/violence-evolution', icon: 'EV', isMain:false, subMenuItems: [] },
    {name: 'Clustering', to: '/clustering', icon: 'CLU', isMain:false, subMenuItems: [] }
  ];

  const fonts = {
    header: 'Console',
    menu: 'Poppins'
  }

  return (
    <s.App>
      <Sidebar
        sidebarHeader={sidebarHeader}
        menuItems={menuItems}
        fonts={fonts}
        colorPalette={Palette.creation}
      />
      <Main />
    </s.App>
  );
}

export default App;
