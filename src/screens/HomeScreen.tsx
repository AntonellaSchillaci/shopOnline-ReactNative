import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Product } from '../types';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { addToCart } = useContext(CartContext);
  const { addToFavorites, removeFromFavorites, isFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            title={item.title}
            price={item.price}
            image={item.image}
            onPress={() =>
              navigation.navigate('ProductDetail', { productId: item.id })
            }
          >
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.favoritesButton}
                onPress={() =>
                  isFavorite(item.id) ? removeFromFavorites(item.id) : addToFavorites(item)
                }
              >
                <Ionicons
                  name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                  style={[
                    styles.favoriteIcon,
                    isFavorite(item.id) && styles.favoriteIconActive,
                  ]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(item)}
              >
                <Ionicons name="cart" style={styles.addIcon} />
                <Text style={styles.addButtonText}>Aggiungi</Text>
              </TouchableOpacity>
            </View>
          </ProductCard>
        )}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f2f2f2' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  list: { paddingHorizontal: 8, paddingBottom: 16 },

  actionsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  favoritesButton: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: { fontSize: 22, color: '#333' },
  favoriteIconActive: { color: 'red' },

  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  addIcon: { fontSize: 20, color: '#fff' },
  addButtonText: { color: '#fff', marginLeft: 4, fontWeight: 'bold' },
});

export default HomeScreen;
