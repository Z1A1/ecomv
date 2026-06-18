import React from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  removeFromBag,
  increaseQuantity,
  decreaseQuantity,
  selectBagItems,
  selectBagCount,
  selectBagTotal,
} from '../store/bagSlice';
import { formatPrice } from '../utils/format';
import Header from '../components/header';
import EmptyBag from '../components/emptyBag';
import QuantitySelector from '../components/quantitySelector';

const BagScreen = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const items = useSelector(selectBagItems);
  const bagCount = useSelector(selectBagCount);
  const bagTotal = useSelector(selectBagTotal);

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Header title="Bag" showBack showBagIcon={false} />
        <EmptyBag />
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const originalPrice = Math.round((item?.price ?? 0) * 1.4);
    return (
      <View style={styles.bagItem}>
        <View style={styles.checkBox}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
        <Image
          source={{ uri: item?.image }}
          style={styles.itemImage}
          resizeMode="contain"
        />
        <View style={styles.itemInfo}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle} numberOfLines={1}>
              {item?.title}
            </Text>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => dispatch(removeFromBag(item?.id))}
              activeOpacity={0.7}
              accessibilityLabel="Remove product from bag">
              <Text style={styles.removeText}>×</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.itemDesc} numberOfLines={2}>
            {item?.description}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.itemPrice}>{formatPrice(item?.price)}</Text>
            <Text style={styles.itemOrigPrice}>₹{originalPrice}</Text>
          </View>
          <Text style={styles.tryBuy}>TRY | BUY</Text>
          <QuantitySelector
            quantity={item?.quantity}
            onIncrease={() => dispatch(increaseQuantity(item?.id))}
            onDecrease={() => dispatch(decreaseQuantity(item?.id))}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Bag" showBack showBagIcon={false} />

      <View style={styles.deliveryBanner}>
        <Text style={styles.deliveryIcon}>🛵</Text>
        <View style={styles.deliveryText}>
          <Text style={styles.deliveryTitle}>Delivering in just 60 min</Text>
          <Text style={styles.deliveryAddr} numberOfLines={1}>
            Full address - 29 Aparna Complex, Gurugon...
          </Text>
        </View>
        <Text style={styles.chevron}>⌄</Text>
      </View>

      <Text style={styles.freeDelivery}>
        ✹ Yayy! Your order is eligible for FREE delivery.
      </Text>

      <TouchableOpacity style={styles.deselectRow}>
        <Text style={styles.deselectText}>Deselect all items</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={item => String(item?.id)}
        renderItem={renderItem}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>
            Total items: <Text style={styles.totalValue}>{bagCount}</Text>
          </Text>
          <Text style={styles.totalLabel}>
            Grand total: <Text style={styles.totalValue}>{formatPrice(bagTotal)}</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.proceedBtn} activeOpacity={0.85}>
          <Text style={styles.proceedText}>Proceed to pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  deliveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eff1f4',
  },
  deliveryIcon: {
    fontSize: 24,
  },
  deliveryText: {
    flex: 1,
  },
  deliveryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2d3138',
  },
  deliveryAddr: {
    fontSize: 11,
    color: '#68707c',
    marginTop: 1,
  },
  chevron: {
    fontSize: 17,
    color: '#5b626d',
    paddingHorizontal: 3,
  },
  freeDelivery: {
    fontSize: 13,
    color: '#463cff',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 9,
    fontWeight: '700',
  },
  deselectRow: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#eceff3',
  },
  deselectText: {
    fontSize: 11,
    color: '#463cff',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  list: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingBottom: 4,
  },
  bagItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eceff3',
  },
  checkBox: {
    width: 19,
    height: 19,
    borderWidth: 1,
    borderColor: '#463cff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
    backgroundColor: '#463cff',
  },
  checkMark: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  itemImage: {
    width: 104,
    height: 122,
    backgroundColor: '#f0f1f4',
    borderRadius: 5,
    marginRight: 13,
  },
  itemInfo: {
    flex: 1,
    paddingTop: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  itemTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: '#2d3138',
    lineHeight: 17,
    marginBottom: 2,
  },
  removeBtn: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
    marginRight: -4,
  },
  removeText: {
    fontSize: 19,
    color: '#8b93a0',
    lineHeight: 21,
    fontWeight: '600',
  },
  itemDesc: {
    fontSize: 11,
    color: '#68707c',
    lineHeight: 15,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 4,
    marginBottom: 1,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2d3138',
  },
  itemOrigPrice: {
    fontSize: 12,
    color: '#8b93a0',
    textDecorationLine: 'line-through',
  },
  tryBuy: {
    fontSize: 10,
    color: '#2d3138',
    fontWeight: '700',
    marginBottom: 6,
  },
  footer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eef0f4',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 12,
    color: '#5b626d',
    fontWeight: '600',
  },
  totalValue: {
    color: '#2d3138',
    fontWeight: '800',
  },
  proceedBtn: {
    backgroundColor: '#463cff',
    borderRadius: 24,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proceedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default BagScreen;
