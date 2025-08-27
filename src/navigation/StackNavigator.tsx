import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoriteScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Favorites: undefined;
  ProductDetail: { productId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: 'Shop Online',
          headerStyle: styles.header,
          headerTintColor: '#fff',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <View style={styles.headerButtons}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Favorites')}
                style={styles.iconButton}
              >
                <Ionicons name="heart-outline" size={26} color="#fff" />
                {favorites.length > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{favorites.length}</Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={styles.iconButton}
              >
                <Ionicons name="cart" size={26} color="#fff" />
                {cart.length > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cart.length}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Carrello',
          headerStyle: styles.header,
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Preferiti',
          headerStyle: styles.header,
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          title: 'Dettaglio prodotto',
          headerStyle: styles.header,
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: { backgroundColor: '#007AFF' },
  headerButtons: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginLeft: 16 },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});

export default StackNavigator;
