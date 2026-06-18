import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.btn} onPress={onDecrease} activeOpacity={0.7}>
      <Text style={styles.btnText}>−</Text>
    </TouchableOpacity>
    <Text style={styles.qty}>{quantity}</Text>
    <TouchableOpacity style={styles.btn} onPress={onIncrease} activeOpacity={0.7}>
      <Text style={styles.btnText}>+</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d8dbe3',
    borderRadius: 14,
    alignSelf: 'flex-start',
    height: 25,
    overflow: 'hidden',
  },
  btn: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 15,
    color: '#343941',
    fontWeight: '600',
  },
  qty: {
    minWidth: 24,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#343941',
    height: 24,
    lineHeight: 24,
  },
});

export default QuantitySelector;
