import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ProductItem, { Product } from './ProductItem';

interface CartItem {
  product: Product;
  quantity: number;
}

const ShopScreen: React.FC = () => {
  // State giỏ hàng - mảng các objects phức tạp
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Danh sách sản phẩm mẫu
  const products: Product[] = [
    { id: '1', name: 'iPhone 15 Pro', price: 25000000 },
    { id: '2', name: 'MacBook Air M3', price: 32000000 },
    { id: '3', name: 'Apple Watch Series 9', price: 11000000 },
    { id: '4', name: 'AirPods Pro 2', price: 6000000 },
    { id: '5', name: 'iPad Pro 12.9', price: 28000000 },
    { id: '6', name: 'Magic Keyboard', price: 8000000 },
  ];

  // Logic thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product: Product) => {
    setCartItems(prevCartItems => {
      // Kiểm tra xem sản phẩm đã có trong giỏ chưa
      const existingItemIndex = prevCartItems.findIndex(
        item => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Nếu đã có, tăng số lượng lên 1
        const updatedItems = [...prevCartItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        // Nếu chưa có, thêm mới với số lượng 1
        return [...prevCartItems, { product, quantity: 1 }];
      }
    });
  };

  // Tính tổng số mặt hàng trong giỏ (không tính số lượng, chỉ tính số loại sản phẩm khác nhau)
  const getTotalItemsInCart = (): number => {
    return cartItems.length; // Chỉ đếm số loại sản phẩm, không đếm quantity
  };

  // Tính tổng giá trị giỏ hàng
  const getTotalCartValue = (): number => {
    return cartItems.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );
  };

  const formatPrice = (price: number): string => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bài 8 - Giỏ hàng mua sắm</Text>
      
      {/* Header hiển thị số mặt hàng trong giỏ */}
      <View style={styles.cartHeader}>
        <Text style={styles.cartCount}>
          🛒 Số mặt hàng trong giỏ: {getTotalItemsInCart()}
        </Text>
        {getTotalCartValue() > 0 && (
          <Text style={styles.cartValue}>
            💰 Tổng giá trị: {formatPrice(getTotalCartValue())}
          </Text>
        )}
      </View>
      
      {/* Danh sách sản phẩm */}
      <View style={styles.productsContainer}>
        <Text style={styles.sectionTitle}>📱 Sản phẩm</Text>
        {products.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </View>
      
      {/* Chi tiết giỏ hàng */}
      {cartItems.length > 0 && (
        <View style={styles.cartDetailsContainer}>
          <Text style={styles.sectionTitle}>🛒 Chi tiết giỏ hàng</Text>
          {cartItems.map(item => (
            <View key={item.product.id} style={styles.cartItem}>
              <View style={styles.cartItemInfo}>
                <Text style={styles.cartItemName}>{item.product.name}</Text>
                <Text style={styles.cartItemDetails}>
                  {formatPrice(item.product.price)} x {item.quantity}
                </Text>
              </View>
              <Text style={styles.cartItemTotal}>
                {formatPrice(item.product.price * item.quantity)}
              </Text>
            </View>
          ))}
          
          <View style={styles.cartSummary}>
            <Text style={styles.cartSummaryText}>
              Tổng cộng: {formatPrice(getTotalCartValue())}
            </Text>
          </View>
        </View>
      )}
      
      <Text style={styles.description}>
        🔄 "Lifting State Up": Giỏ hàng (mảng objects) được quản lý ở component cha, 
        ProductItem chỉ gửi callback lên để cập nhật state
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333333',
  },
  cartHeader: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  cartValue: {
    fontSize: 16,
    color: '#28a745',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
  productsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  cartDetailsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  cartItemDetails: {
    fontSize: 14,
    color: '#666666',
  },
  cartItemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  cartSummary: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#2196F3',
    alignItems: 'center',
  },
  cartSummaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  description: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
    fontStyle: 'italic',
    marginBottom: 20,
  },
});

export default ShopScreen;