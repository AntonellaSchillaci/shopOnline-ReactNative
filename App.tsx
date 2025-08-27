import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { CartProvider } from './src/context/CartContext';
import { FavoritesProvider } from './src/context/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </CartProvider>
    </FavoritesProvider>
  );
}
