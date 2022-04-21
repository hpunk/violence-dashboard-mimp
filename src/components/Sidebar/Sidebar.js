import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import * as s from './Sidebar.styles';

const Sidebar = props => {
  const { 
    backgroundImage = '', 
    sidebarHeader = {
      fullName: '',
      shortName: ''
    },
    menuItems = [],
    fonts = {
      header: '',
      menu: ''
    },
    colorPalette = {
      bgColor1: 'rgba(11, 171, 100, 0.8)',
      bgColor2: 'rgba(59, 183, 143, 0.8)',
      fontColor: 'rgba(22, 46, 39)',
      fontColorSelected: 'rgba(255, 255, 255)',
      dividerColor: 'rgba(122, 204, 178)',
      selectedBackgroundCollapsedMode: 'dark'
    }
  } = props;

  // State
  const [selected, setSelectedMenuItem] = useState(menuItems[0].name);
  const [isSidebarOpen, setSidebarState] = useState(true);
  const [header, setHeader] = useState(sidebarHeader.fullName);


  // Set selected menu item based on URL pathname
  useLayoutEffect(() => {
    const path = window.location.pathname;
    const parts = path.split('/');

    if (path !== '/' && parts[1].charAt(0).toUpperCase() !== menuItems[0].name) {
      const selectedItem = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
      setSelectedMenuItem(selectedItem)
    }
  }, [menuItems])

  // Update of header state
  useEffect(() => {
    isSidebarOpen ? setTimeout(() => setHeader(sidebarHeader.fullName), 200) : setHeader(sidebarHeader.shortName);
  }, [isSidebarOpen, sidebarHeader])


  // Update of sidebar state
  useEffect(() => {
    const updateWindowWidth = () => {
      if (window.innerWidth < 1280) setSidebarState(false);
      else setSidebarState(true)
    }

    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, [isSidebarOpen]);

  const handleMenuItemClick = (name) => {
    setSelectedMenuItem(name);
    setSidebarState(false);
  }


  const menuItemsJSX = menuItems.map((item, index) => {
    const isItemSelected = selected === item.name;

    return (
      <s.ItemContainer key={index}>
        <Link to={item.to} style={{ textDecoration: 'none' }}>
          <s.MenuItem           
            font={fonts.menu}
            selected={isItemSelected}
            onClick={() => handleMenuItemClick(item.name, index)}
            isSidebarOpen={isSidebarOpen}
            colorPalette={colorPalette}
          >
            {item.isMain
              ?
              <s.Icon isSidebarOpen={isSidebarOpen} src={item.icon} />
              :
              <s.TextSmall isSidebarOpen={isSidebarOpen} >{item.icon}</s.TextSmall>
            }
            <s.Text isSidebarOpen={isSidebarOpen}>{item.name}</s.Text>
          </s.MenuItem>
        </Link>
      </s.ItemContainer>
    )
  });

  return (
    <s.SidebarContainer backgroundImage={backgroundImage} isSidebarOpen={isSidebarOpen} colorPalette={colorPalette}>
      <s.TogglerContainer onClick={() => setSidebarState(!isSidebarOpen)}>
        <s.Toggler />
      </s.TogglerContainer>
      <s.SidebarHeader font={fonts.header}>{header}</s.SidebarHeader>
      
      <s.MenuItemContainer>{menuItemsJSX}</s.MenuItemContainer>
      
    </s.SidebarContainer>
  )
}

export default Sidebar