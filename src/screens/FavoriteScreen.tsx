import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';
import { CartContext } from '../context/CartContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useNavigation } from '@react-navigation/native';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Favorites'>;

const FavoritesScreen: React.FC = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);
  const navigation = useNavigation<FavoritesScreenNavigationProp>();

  const totalFavorites = favorites.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferiti ({totalFavorites})</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.info}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>€ {item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => addToCart(item)} style={styles.actionButton}>
                <Ionicons name="cart-outline" size={24} color="#007AFF" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeFromFavorites(item.id)} style={styles.actionButton}>
                <Ionicons name="trash-outline" size={24} color="red" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nessun prodotto preferito</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f2f2f2' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: { width: 80, height: 80, resizeMode: 'contain'},
  info: { flex: 1, paddingHorizontal: 12 },
  name: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  price: { fontSize: 14, fontWeight: 'bold', color: '#007AFF' },
  actions: { flexDirection: 'row' },
  actionButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { alignSelf: 'center' },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#666' },
});

export default FavoritesScreen;
