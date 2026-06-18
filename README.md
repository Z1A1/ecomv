# ecom — React Native E-Commerce App

A React Native e-commerce application built with Redux Toolkit, featuring a product listing screen with sort & filter, a shopping bag with quantity management, and full bag persistence across app restarts.

---

## Features

| Feature | Details |
|---|---|
| Products screen | 2-column grid fetched from Fake Store API |
| Sort | Price low→high, high→low, rating high→low |
| Filter | Category filter (functional); additional sections static UI |
| Add to Bag | Via "Add to Bag" button or heart (♡/♥) icon on each card |
| Bag screen | Empty state + filled state with quantity controls and grand total |
| Persistence | Bag contents survive full app restarts (AsyncStorage + redux-persist) |

---

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| React Native | 0.86.0 | Core framework |
| React | 19.2.3 | UI runtime |
| Redux Toolkit | ^2.12 | State management |
| react-redux | ^9.3 | React bindings for Redux |
| redux-persist | ^6.0 | Bag persistence |
| AsyncStorage | ^3.1 | Persist storage engine |
| React Navigation (native-stack) | ^7.x | Screen navigation |
| react-native-safe-area-context | ^5.5 | Safe area insets |
| react-native-screens | ^4.25 | Native screen optimisation |

---

## Setup

### Prerequisites
- Node >= 22.11.0
- Ruby (for CocoaPods on iOS) — managed via rbenv/rvm
- Xcode (iOS) or Android Studio (Android)
- React Native environment set up: https://reactnative.dev/docs/set-up-your-environment

### Install

```sh
# 1. Clone the repo and install JS dependencies
npm install

# 2. iOS only — install CocoaPods dependencies
bundle install          # first time only, installs CocoaPods gem
cd ios && pod install   # run every time native deps change
cd ..
```

### Run

```sh
# Start Metro bundler (keep this running in a separate terminal)
npm start

# iOS
npm run ios

# Android
npm run android
```

---

## Project Structure

```
ecom/
├── App.tsx                        # Root: Provider → PersistGate → NavigationContainer
├── index.js                       # AppRegistry entry point
│
└── src/
    ├── navigation/
    │   └── appNavigator.jsx       # Native stack: productsScreen → bagScreen
    │
    ├── store/
    │   ├── index.js               # configureStore + persistStore (bag slice only)
    │   ├── bagSlice.js            # Bag state, reducers, selectors
    │   └── productsSlice.js       # Products list, fetch thunk, status
    │
    ├── screens/
    │   ├── productsScreen.jsx     # Product grid + sort/filter controls
    │   └── bagScreen.jsx          # Bag (empty state + filled state)
    │
    ├── components/
    │   ├── header.jsx             # Navigation header with bag badge
    │   ├── productCard.jsx        # Product card with heart + Add to Bag
    │   ├── sortSheet.jsx          # Sort options modal
    │   ├── filterSheet.jsx        # Two-panel filter modal
    │   ├── quantitySelector.jsx   # − qty + control
    │   └── emptyBag.jsx           # Empty bag illustration + CTA
    │
    └── utils/
        ├── api.js                 # fetchProducts() — Fake Store API
        ├── format.js              # formatPrice(price) → "₹N"
        ├── navigation.js          # navigationRef + navigate() helper
        └── sortFilter.js          # applySort() and applyFilter() — pure functions
```

---

## State Management

### Redux Store shape

```js
{
  bag: {
    items: [
      { id, title, price, image, category, description, rating, quantity }
    ]
  },
  products: {
    items: [],        // raw API response
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null
  }
}
```

### Bag actions (`src/store/bagSlice.js`)

| Action | Payload | Behaviour |
|---|---|---|
| `addToBag(product)` | product object | Adds product; increments quantity if already present |
| `removeFromBag(id)` | product id | Removes the item entirely |
| `increaseQuantity(id)` | product id | +1 to quantity |
| `decreaseQuantity(id)` | product id | −1 to quantity (floor: 1) |

### Selectors

```js
selectBagItems(state)   // array of bag items
selectBagCount(state)   // total units across all items
selectBagTotal(state)   // grand total price (sum of price × quantity)
```

### Persistence

Only the `bag` slice is persisted. Products always re-fetch from the API on launch.

```js
// src/store/index.js
const bagPersistConfig = { key: 'bag', storage: AsyncStorage };
```

---

## API

**Base URL:** `https://fakestoreapi.com`

| Endpoint | Used in |
|---|---|
| `GET /products` | `src/utils/api.js → fetchProducts()` |

Each product returned:
```json
{
  "id": 1,
  "title": "...",
  "price": 9.99,
  "description": "...",
  "category": "men's clothing",
  "image": "https://...",
  "rating": { "rate": 3.9, "count": 120 }
}
```

Prices are displayed as `₹{rounded}` to match the design (no currency conversion).

---

## Sort Options

| Label | Value | Functional |
|---|---|---|
| Newest arrivals | `newest` | Static (no-op) |
| Price – low to high | `price_low_high` | ✓ |
| Price – high to low | `price_high_low` | ✓ |
| Offers and discounts | `offers` | Static |
| Best sellers | `best_sellers` | Static |
| Rating – high to low | `rating_high_low` | ✓ |

---

## Filter Options

The filter sheet has a left-rail section list. Only **Category** is functional (maps to API `category` field). All other sections (Gender, Price, Brand, etc.) are static UI.

**API categories:** `electronics`, `jewelery`, `men's clothing`, `women's clothing`

---

## Development Commands

```sh
npm start                  # Start Metro bundler
npm run ios                # Build & run on iOS simulator
npm run android            # Build & run on Android emulator/device
npm run lint               # ESLint check
npm test                   # Run Jest tests
npm test -- App.test       # Run a single test file
npm test -- -t "name"      # Run tests matching a name
```

---

c
