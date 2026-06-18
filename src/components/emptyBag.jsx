import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EmptyBag = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.oops}>OOPS ☹</Text>
      <Text style={styles.subtitle}>Your bag is empty.</Text>
      <View style={styles.illustration}>
        <View style={styles.box}>
          <View style={styles.boxLid} />
          <View style={styles.boxBody}>
            <Text style={styles.arrowText}>↑</Text>
          </View>
        </View>
      </View>
      <Text style={styles.message}>Add items to your bag now</Text>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.85}
        onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>Start shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  oops: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3138',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#2d3138',
    fontWeight: '700',
    marginBottom: 30,
  },
  illustration: {
    marginBottom: 30,
  },
  box: {
    alignItems: 'center',
  },
  boxLid: {
    width: 118,
    height: 34,
    borderWidth: 3,
    borderColor: '#c3c4c8',
    borderRadius: 4,
    transform: [{ rotate: '-18deg' }, { translateY: 8 }],
  },
  boxBody: {
    width: 118,
    height: 72,
    borderWidth: 3,
    borderColor: '#c3c4c8',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  arrowText: {
    fontSize: 31,
    color: '#c3c4c8',
  },
  message: {
    fontSize: 14,
    color: '#2d3138',
    fontWeight: '700',
    marginBottom: 12,
  },
  btn: {
    backgroundColor: '#463cff',
    minWidth: 224,
    minHeight: 47,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default EmptyBag;
