import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsScreen from '../screens/productsScreen';
import BagScreen from '../screens/bagScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="productsScreen" component={ProductsScreen} />
    <Stack.Screen name="bagScreen" component={BagScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
