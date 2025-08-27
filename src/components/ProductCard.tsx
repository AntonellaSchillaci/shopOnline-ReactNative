import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type ProductCardProps = {
  title: string;
  price: number;
  image: string;
  onPress?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.price}>💰 {price.toFixed(2)} $</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'contain',
    backgroundColor: '#f5f5f5',
  },
  info: {
    padding: 10,
    
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF', 
  },
});

export default ProductCard;
