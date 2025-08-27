import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CartContext } from '../context/CartContext';
import { Product } from '../types';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartScreen: React.FC = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrello</Text>

      <FlatList
        data={cart}
        keyExtractor={(item, index) => `${item.id}-${index}`} // unico anche se stesso prodotto più volte
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>💰 {item.price.toFixed(2)} $</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(index)}
            >
              <Ionicons name="trash-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>Il carrello è vuoto</Text>}
      />

      <Text style={styles.total}>Totale: 💰 {totalPrice.toFixed(2)} $</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  item: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 8,
  },
  image: { width: 80, height: 80, resizeMode: 'contain' },
  info: { flex: 1, paddingLeft: 8 },
  name: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 14, fontWeight: 'bold', color: '#007AFF', marginTop: 4 },
  removeButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 6,
    padding: 6,
    marginLeft: 8,
  },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 16, textAlign: 'right', paddingBottom: 20 },
});

export default CartScreen;
