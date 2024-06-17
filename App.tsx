import React from 'react';
import {SafeAreaView} from 'react-native';
import {List, Details} from './src/screens';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Details />
      <Toast />
    </SafeAreaView>
  );
};

export default App;
