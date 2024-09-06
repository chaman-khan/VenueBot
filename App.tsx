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
import {SafeAreaProvider} from 'react-native-safe-area-context';

import MainNav from './src/Navigation/mainNav';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {persistor, Store} from './src/App/store';
import {PersistGate} from 'redux-persist/lib/integration/react';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{...backgroundStyle, flex: 1}}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <MainNav />
          <Toast />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

export default App;
