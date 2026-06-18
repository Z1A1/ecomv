import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

const FILTER_SECTIONS = [
  { key: 'suggested', label: 'Suggested filters' },
  { key: 'new_arrivals', label: 'New arrivals' },
  { key: 'category', label: 'Category' },
  { key: 'gender', label: 'Gender' },
  { key: 'price', label: 'Price' },
  { key: 'brand', label: 'Brand' },
  { key: 'fabric', label: 'Fabric' },
  { key: 'fit', label: 'Fit' },
  { key: 'size', label: 'Size' },
  { key: 'color', label: 'Color' },
  { key: 'discounts', label: 'Discounts' },
  { key: 'delivery', label: 'Delivery time' },
];

const STATIC_CHIPS = {
  suggested: ['2 days delivery', 'Brown', 'Under ₹700', '50% off'],
  new_arrivals: ['Last 7 days', 'Last 30 days'],
  price: ['Under ₹500', '₹500–₹1000', '₹1000–₹2000', 'Above ₹2000'],
  brand: ['Nike', 'Adidas', 'H&M', 'Zara', 'Mango'],
  fabric: ['Cotton', 'Polyester', 'Silk', 'Linen'],
  fit: ['Slim Fit', 'Regular Fit', 'Loose Fit'],
  size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  color: ['Black', 'White', 'Blue', 'Red', 'Green', 'Yellow'],
  discounts: ['10%+', '20%+', '30%+', '50%+'],
  delivery: ['Same day', '1–2 days', '3–5 days'],
};

const GENDER_CHIPS = ['Men', 'Women', 'Boys', 'Girls', 'Unisex'];

const toTitleCase = str =>
  str
    ?.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') ?? '';

const FilterSheet = ({ visible, filters, categories, onApply, onClose }) => {
  const [activeSection, setActiveSection] = useState('category');
  const [pendingCategory, setPendingCategory] = useState(null);

  useEffect(() => {
    if (visible) {
      setPendingCategory(filters?.category ?? null);
      setActiveSection('category');
    }
  }, [visible, filters]);

  const handleApply = () => onApply({ category: pendingCategory });

  const handleClear = () => setPendingCategory(null);

  const renderRightPanel = () => {
    if (activeSection === 'category') {
      return (
        <ScrollView contentContainerStyle={styles.chipsWrap}>
          <Text style={styles.sectionHint}>Choose from available categories</Text>
          <View style={styles.chips}>
            {categories.map(category => {
              const isSelected = pendingCategory === category;
              return (
                <TouchableOpacity
                  key={category}
                  style={[styles.chip, isSelected && styles.chipSelected]}
                  onPress={() => setPendingCategory(isSelected ? null : category)}
                  activeOpacity={0.7}>
                  <Text
                    style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                    {toTitleCase(category)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      );
    }

    if (activeSection === 'gender') {
      return (
        <ScrollView contentContainerStyle={styles.chipsWrap}>
          <Text style={styles.sectionHint}>Select gender</Text>
          <View style={styles.chips}>
            {GENDER_CHIPS.map(gender => (
              <View key={gender} style={styles.chip}>
                <Text style={styles.chipText}>{gender}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      );
    }

    const chips = STATIC_CHIPS[activeSection] ?? [];
    return (
      <ScrollView contentContainerStyle={styles.chipsWrap}>
        {activeSection === 'suggested' && (
          <Text style={styles.sectionHint}>Choose from the mostly used filters</Text>
        )}
        <View style={styles.chips}>
          {chips.map(chip => (
            <View key={chip} style={styles.chip}>
              <Text style={styles.chipText}>{chip}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={styles.sheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.heading}>Filters</Text>
          </View>
          <View style={styles.body}>
            <ScrollView style={styles.leftRail} showsVerticalScrollIndicator={false}>
              {FILTER_SECTIONS.map(section => {
                const isActive = activeSection === section.key;
                return (
                  <TouchableOpacity
                    key={section.key}
                    style={[styles.sectionItem, isActive && styles.sectionItemActive]}
                    onPress={() => setActiveSection(section.key)}
                    activeOpacity={0.7}>
                    {isActive && <View style={styles.activeBar} />}
                    <Text
                      style={[
                        styles.sectionLabel,
                        isActive && styles.sectionLabelActive,
                      ]}>
                      {section.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <View style={styles.rightPanel}>{renderRightPanel()}</View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.clearBtn} onPress={handleClear} activeOpacity={0.7}>
              <Text style={styles.clearText}>Clear all</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={handleApply} activeOpacity={0.85}>
              <Text style={styles.applyText}>Apply filter</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.58)',
    justifyContent: 'flex-end',
  },
  sheet: {
    height: '63%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    overflow: 'hidden',
  },
  sheetHeader: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
  },
  heading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#463cff',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  leftRail: {
    width: 150,
    backgroundColor: '#f0f1f4',
    borderRightWidth: 1,
    borderRightColor: '#e3e5eb',
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 38,
    paddingRight: 12,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e2e8',
    position: 'relative',
  },
  sectionItemActive: {
    backgroundColor: '#fff',
  },
  activeBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#463cff',
  },
  sectionLabel: {
    fontSize: 12,
    color: '#373d45',
    flex: 1,
  },
  sectionLabelActive: {
    color: '#463cff',
    fontWeight: '600',
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chipsWrap: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 16,
  },
  sectionHint: {
    fontSize: 11,
    color: '#2d3138',
    marginBottom: 12,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#d6d9e2',
    borderRadius: 20,
    minHeight: 28,
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  chipSelected: {
    borderColor: '#463cff',
    backgroundColor: '#fff',
  },
  chipText: {
    fontSize: 11,
    color: '#2d3138',
  },
  chipTextSelected: {
    color: '#463cff',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 14,
    gap: 14,
    borderTopWidth: 1,
    borderTopColor: '#e3e5eb',
  },
  clearBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#463cff',
    borderRadius: 18,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    fontSize: 13,
    color: '#2d3138',
    fontWeight: '600',
  },
  applyBtn: {
    flex: 1,
    backgroundColor: '#463cff',
    borderRadius: 18,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '700',
  },
});

export default FilterSheet;
