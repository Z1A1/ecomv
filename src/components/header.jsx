import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { selectBagCount } from '../store/bagSlice';
import Logo from '../assets/logo.png';

const PRIMARY = '#463cff';

const SearchIcon = () => (
  <View style={styles.searchIcon}>
    <View style={styles.searchCircle} />
    <View style={styles.searchHandle} />
  </View>
);

const BagIcon = () => (
  <View style={styles.bagIcon}>
    <View style={styles.bagHandle} />
  </View>
);

const Header = ({ title, showBack = false, showBagIcon = true }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const bagCount = useSelector(selectBagCount);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.inner}>
        <View style={styles.left}>
          {showBack ? (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
              <Text style={styles.backArrow}>‹</Text>
            </TouchableOpacity>
          ) : (
            <>
              <Image source={Logo} style={styles.logoImage} />
              <Text style={styles.title}>{title}</Text>
            </>
          )}
        </View>
        {showBack && <Text style={styles.centerTitle}>{title}</Text>}
        <View style={styles.right}>
          {!showBack && (
            <TouchableOpacity style={styles.iconBtn}>
              <SearchIcon />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.heartIcon}>♡</Text>
          </TouchableOpacity>
          {showBagIcon && (
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => navigation.navigate('bagScreen')}>
              <View>
                <BagIcon />
                {bagCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{bagCount > 9 ? '9+' : bagCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f5f7',
    borderBottomWidth: 1,
    borderBottomColor: '#dfe2e7',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54,
    paddingHorizontal: 14,
    position: 'relative',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoImage: {
    width: 30,
    height: 22,
    marginRight: 6,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2d3138',
  },
  centerTitle: {
    position: 'absolute',
    left: 72,
    right: 72,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#2d3138',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 88,
  },
  iconBtn: {
    width: 32,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 22,
    height: 22,
    position: 'relative',
  },
  searchCircle: {
    position: 'absolute',
    left: 3,
    top: 3,
    width: 12,
    height: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#343941',
  },
  searchHandle: {
    position: 'absolute',
    left: 14,
    top: 14,
    width: 8,
    height: 2,
    borderRadius: 2,
    backgroundColor: '#343941',
    transform: [{ rotate: '45deg' }],
  },
  heartIcon: {
    fontSize: 24,
    color: '#343941',
    lineHeight: 28,
  },
  bagIcon: {
    width: 20,
    height: 22,
    marginTop: 2,
    borderWidth: 1.8,
    borderColor: '#343941',
    borderRadius: 3,
  },
  bagHandle: {
    position: 'absolute',
    left: 4,
    top: -6,
    width: 9,
    height: 8,
    borderWidth: 1.8,
    borderBottomWidth: 0,
    borderColor: '#343941',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: '#f4f5f7',
  },
  backArrow: {
    fontSize: 31,
    color: '#343941',
    lineHeight: 34,
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -7,
    backgroundColor: PRIMARY,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
});

export default Header;
