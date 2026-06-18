import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { loadProducts, selectProducts, selectProductsStatus } from '../store/productsSlice';
import { applySort, applyFilter } from '../utils/sortFilter';
import Header from '../components/header';
import ProductCard from '../components/productCard';
import SortSheet from '../components/sortSheet';
import FilterSheet from '../components/filterSheet';

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const [sortOption, setSortOption] = useState(null);
  const [filters, setFilters] = useState({});
  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    if (status === 'idle') dispatch(loadProducts());
  }, [status, dispatch]);

  const categories = useMemo(
    () => [...new Set(products.map(product => product?.category).filter(Boolean))],
    [products],
  );

  const displayedProducts = useMemo(
    () => applySort(applyFilter(products, filters), sortOption),
    [products, filters, sortOption],
  );

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  if (status === 'loading') {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color="#3d00e0" />
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View style={styles.loadingWrap}>
        <Text style={styles.errorText}>Failed to load products. Please try again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="T-shirts" />
      <FlatList
        data={displayedProducts}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={item => String(item?.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: 78 + insets.bottom },
        ]}
        ListHeaderComponent={
          <View style={styles.resultWrap}>
            <Text style={styles.resultCount} numberOfLines={1}>
              Showing{' '}
              <Text style={styles.resultCountBlue}>
                {displayedProducts.length} result
                {displayedProducts.length !== 1 ? 's' : ''}
              </Text>{' '}
              for Slim Fit XL Men's T-shirts
            </Text>
          </View>
        }
      />
      <View style={[styles.controlsBar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => setSortVisible(true)}
          activeOpacity={0.7}>
          <Text style={styles.controlIcon}>↕</Text>
          <Text style={styles.controlText}>Sort by</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => setFilterVisible(true)}
          activeOpacity={0.7}>
          <Text style={styles.controlIcon}>☷</Text>
          <Text style={styles.controlText}>
            Filters{activeFilterCount > 0 ? `  ${activeFilterCount}` : ''}
          </Text>
          {activeFilterCount > 0 && <View style={styles.filterDot} />}
        </TouchableOpacity>
      </View>
      <SortSheet
        visible={sortVisible}
        selected={sortOption}
        onSelect={setSortOption}
        onClose={() => setSortVisible(false)}
      />
      <FilterSheet
        visible={filterVisible}
        filters={filters}
        categories={categories}
        onApply={newFilters => {
          setFilters(newFilters);
          setFilterVisible(false);
        }}
        onClose={() => setFilterVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 14,
    color: '#cc0000',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  listContent: {
    paddingTop: 0,
  },
  row: {
    paddingHorizontal: 10,
  },
  resultWrap: {
    backgroundColor: '#fff',
  },
  resultCount: {
    fontSize: 11,
    color: '#5c6470',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  resultCountBlue: {
    color: '#463cff',
    fontWeight: '700',
  },
  controlsBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e3e5eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 8,
  },
  controlBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
    gap: 6,
  },
  controlIcon: {
    fontSize: 15,
    color: '#463cff',
    fontWeight: '700',
  },
  controlText: {
    fontSize: 13,
    color: '#2d3138',
    fontWeight: '600',
  },
  divider: {
    width: 1,
    backgroundColor: '#e3e5eb',
    marginVertical: 10,
  },
  filterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#463cff',
    marginLeft: 4,
  },
});

export default ProductsScreen;
