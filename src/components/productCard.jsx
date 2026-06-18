import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToBag } from '../store/bagSlice';
import { formatPrice } from '../utils/format';

const toTitleCase = str =>
  str
    ?.split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ') ?? '';

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const originalPrice = Math.round((item?.price ?? 0) * 1.4);
  const discountPct = 30;

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.heartBtn}
        activeOpacity={0.7}
        onPress={() => setLiked(prev => !prev)}>
        <Text style={[styles.heart, liked && styles.heartLiked]}>
          {liked ? '♥' : '♡'}
        </Text>
      </TouchableOpacity>
      <Image
        source={{ uri: item?.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.brand} numberOfLines={1}>
          {toTitleCase(item?.category)}
        </Text>
        <Text style={styles.title} numberOfLines={1}>
          {item?.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item?.description}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(item?.price)}</Text>
          <Text style={styles.originalPrice}>₹{originalPrice}</Text>
          <Text style={styles.discount}>{discountPct}% OFF</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.8}
          onPress={() => dispatch(addToBag(item))}>
          <Text style={styles.addBtnText}>Add to Bag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    marginBottom: 13,
    overflow: 'hidden',
  },
  heartBtn: {
    position: 'absolute',
    top: 7,
    right: 7,
    zIndex: 1,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    fontSize: 22,
    color: '#8b93a0',
    lineHeight: 25,
  },
  heartLiked: {
    color: '#e53935',
  },
  image: {
    width: '100%',
    height: 190,
    backgroundColor: '#f0f1f5',
    borderRadius: 8,
  },
  info: {
    paddingTop: 7,
    paddingHorizontal: 1,
  },
  brand: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1f2329',
    marginBottom: 2,
  },
  title: {
    fontSize: 10,
    color: '#59616d',
    lineHeight: 13,
    fontWeight: '600',
  },
  description: {
    fontSize: 9,
    color: '#6d7480',
    lineHeight: 12,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 3,
    marginBottom: 6,
  },
  price: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1f2329',
  },
  originalPrice: {
    fontSize: 10,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 9,
    color: '#463cff',
    fontWeight: '700',
  },
  addBtn: {
    backgroundColor: '#463cff',
    borderRadius: 4,
    paddingVertical: 7,
    alignItems: 'center',
  },
  addBtnText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '700',
  },
});

export default ProductCard;
