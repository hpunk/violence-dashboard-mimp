import React from 'react';
import * as s from './App.styles';
import * as Palette from './colors'

// Components
import Sidebar from './components/Sidebar/Sidebar';
import MainView from './components/MainView/MainView'


const App = () => {
  const backgroundImage = 'images/mountain.jpg';
  const sidebarHeader = {
    fullName: 'Proyecto de Tesis',
    shortName: 'Tesis'
  };
  
  const menuItems = [
    {name: 'Home', to: '/', icon: '/icons/home.svg', subMenuItems: [] },
    {name: 'Impacto APP', to: '/app-impact', icon: '/icons/prevencion.svg', subMenuItems: [] },
    {name: 'Evolución de la violencia', to: '/violence-evolution', icon: '/icons/evolucion.svg', subMenuItems: [] },
    {name: 'Clustering', to: '/clustering', icon: '/icons/cluster.svg', subMenuItems: [] }
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
      <MainView />
    </s.App>
  );
}

export default App;
