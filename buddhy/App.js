import 'react-native-gesture-handler';
import React from 'react';
import store from './src/redux/store';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigator from './src/components/Navigator';
// imports for web
import {Platform} from 'react-native';
import MaterialCommunityIconFont from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
import IoniconFont from 'react-native-vector-icons/Fonts/Ionicons.ttf';

// icon setting if platform === web
if (Platform.OS === 'web') {
  const iconFontStyles = `
  @font-face {
    src: url(${IoniconFont});
    font-family: Ionicons;
  }
  @font-face {
    src: url(${MaterialCommunityIconFont});
    font-family: MaterialCommunityIcons;
  }`;
  const style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = iconFontStyles;
  } else {
    style.appendChild(document.createTextNode(iconFontStyles));
  }
  document.head.appendChild(style);
}

// set theme for react-native-paper componenets
const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    primary: '#2f999e',
    //   accent: 'yellow',
  },
};

// app entry point
const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider
        settings={{icon: props => <Icon {...props} />}}
        theme={paperTheme}>
        <Navigator />
      </PaperProvider>
    </StoreProvider>
  );
};
export default App;
