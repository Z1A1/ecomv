import React from 'react';
import { Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SORT_OPTIONS = [
  { label: 'Newest arrivals', value: 'newest' },
  { label: 'Price - low to high', value: 'price_low_high' },
  { label: 'Price - high to low', value: 'price_high_low' },
  { label: 'Rating - high to low', value: 'rating_high_low' },
  { label: 'Offers and discounts', value: 'offers' },
  { label: 'Best sellers', value: 'best_sellers' },
];

const SortSheet = ({ visible, selected, onSelect, onClose }) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}>
    <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
      <TouchableOpacity activeOpacity={1} style={styles.sheet}>
        <Text style={styles.heading}>Sort by</Text>
        {SORT_OPTIONS.map(opt => (
          <TouchableOpacity
            key={opt.value}
            style={styles.option}
            onPress={() => {
              onSelect(opt.value);
              onClose();
            }}>
            <Text
              style={[
                styles.optionText,
                selected === opt.value && styles.optionTextSelected,
              ]}>
              {opt.label}
            </Text>
            {selected === opt.value && (
              <Text style={styles.selectedDot}>●</Text>
            )}
          </TouchableOpacity>
        ))}
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.58)',
    justifyContent: 'flex-end',
  },
  sheet: {
    width: '100%',
    minHeight: 246,
    backgroundColor: '#fff',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    paddingTop: 13,
    paddingBottom: 18,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  heading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#463cff',
    paddingHorizontal: 28,
    paddingVertical: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 13,
    color: '#2d3138',
  },
  optionTextSelected: {
    color: '#463cff',
    fontWeight: '600',
  },
  selectedDot: {
    fontSize: 10,
    color: '#463cff',
  },
});

export default SortSheet;
