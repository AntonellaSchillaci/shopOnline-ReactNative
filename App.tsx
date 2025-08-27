import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import ProductCard from './src/components/ProductCard';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAV}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🛒 Shop Online</Text>
        </View>
      </SafeAreaView>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard title={item.title} price={item.price} image={item.image} />
        )}
        numColumns={2} 
        contentContainerStyle={styles.list}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  safeAV: {
    backgroundColor: '#007AFF',
  },
});

export default App;
