import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';


export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { productId: number };
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Dettaglio' }} />
    <Stack.Screen name="Cart" component={CartScreen} />
  </Stack.Navigator>
);

export default StackNavigator;
