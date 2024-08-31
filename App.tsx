/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import Splash from './src/screens/splash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Login from './src/screens/Auth/Login';
import Signup from './src/screens/Auth/Signup';
import ForgetPassword from './src/screens/Auth/ForgetPassword';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ForgetPassword />
    </SafeAreaView>
  );
}

export default App;
