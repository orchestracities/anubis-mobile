/**
 * @format
 */
 import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {  MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';



const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4b56b8',
    secondary:'#8086ba',
    background: '#4b56b8F',
    
  },
};

const  Main= () => {
    return (
        <PaperProvider theme={theme}><App/></PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () =>  Main);
