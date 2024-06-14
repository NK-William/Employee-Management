import React from 'react';
import {SafeAreaView} from 'react-native';
import {List, Details} from './src/screens';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <List />
    </SafeAreaView>
  );
};

export default App;
