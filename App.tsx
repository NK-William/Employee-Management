import React from 'react';
import {SafeAreaView} from 'react-native';
import {List, Details} from './src/screens';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {primaryDark, textColor} from './src/constants/colors';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: primaryDark},
            headerTintColor: textColor,
          }}>
          <Stack.Screen
            name="List"
            component={List}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
        <Toast />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
