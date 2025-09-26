import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CurrencyInput from './CurrencyInput';

const CurrencyConverter: React.FC = () => {
  const [vndAmount, setVndAmount] = useState<string>('');
  const [usdAmount, setUsdAmount] = useState<string>('');
  const [lastChanged, setLastChanged] = useState<'vnd' | 'usd' | null>(null);

  // Tỷ giá hối đoái: 1 USD = 25,000 VND
  const exchangeRate = 25000;

  // Hàm chuyển đổi từ VND sang USD
  const convertVndToUsd = (vnd: string): string => {
    const vndNumber = parseFloat(vnd.replace(/,/g, ''));
    if (isNaN(vndNumber) || vndNumber === 0) return '';
    const usd = (vndNumber / exchangeRate).toFixed(2);
    return usd;
  };

  // Hàm chuyển đổi từ USD sang VND
  const convertUsdToVnd = (usd: string): string => {
    const usdNumber = parseFloat(usd);
    if (isNaN(usdNumber) || usdNumber === 0) return '';
    const vnd = (usdNumber * exchangeRate).toLocaleString('vi-VN');
    return vnd;
  };

  // Xử lý khi người dùng thay đổi VND
  const handleVndChange = (text: string) => {
    setVndAmount(text);
    setLastChanged('vnd');
    
    if (text === '') {
      setUsdAmount('');
    } else {
      const convertedUsd = convertVndToUsd(text);
      setUsdAmount(convertedUsd);
    }
  };

  // Xử lý khi người dùng thay đổi USD
  const handleUsdChange = (text: string) => {
    setUsdAmount(text);
    setLastChanged('usd');
    
    if (text === '') {
      setVndAmount('');
    } else {
      const convertedVnd = convertUsdToVnd(text);
      setVndAmount(convertedVnd);
    }
  };

  // Format số VND với dấu phẩy
  const formatVndInput = (text: string) => {
    const numbers = text.replace(/[^0-9]/g, '');
    if (numbers === '') return '';
    return parseInt(numbers).toLocaleString('vi-VN');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bài 5 - Chuyển đổi tiền tệ</Text>
      
      <View style={styles.converterContainer}>
        <Text style={styles.headerText}>Chuyển đổi tiền tệ</Text>
        <Text style={styles.rateText}>Tỷ giá: 1 USD = 25,000 VND</Text>
        
        {/* VND Input */}
        <CurrencyInput
          label="Số tiền (VND)"
          value={vndAmount}
          onChangeText={handleVndChange}
          currencySymbol="₫"
          placeholder="100000"
        />
        
        {/* Exchange Icon */}
        <View style={styles.exchangeIcon}>
          <Text style={styles.exchangeSymbol}>⇅</Text>
        </View>
        
        {/* USD Input */}
        <CurrencyInput
          label="Số tiền (USD)"
          value={usdAmount}
          onChangeText={handleUsdChange}
          currencySymbol="$"
          placeholder="4.00"
        />
        
        {/* Info Panel */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>📊 Thông tin chuyển đổi</Text>
          {lastChanged === 'vnd' && vndAmount && (
            <Text style={styles.infoText}>
              {vndAmount} VND = {usdAmount} USD
            </Text>
          )}
          {lastChanged === 'usd' && usdAmount && (
            <Text style={styles.infoText}>
              {usdAmount} USD = {vndAmount} VND
            </Text>
          )}
          {!lastChanged && (
            <Text style={styles.infoText}>
              Nhập số tiền để xem kết quả chuyển đổi
            </Text>
          )}
        </View>
      </View>
      
      <Text style={styles.description}>
        🔄 "Lifting State Up": State được quản lý ở component cha để đồng bộ hóa 2 ô input
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333333',
  },
  converterContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333333',
  },
  rateText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  exchangeIcon: {
    alignSelf: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#e1e8ed',
  },
  exchangeSymbol: {
    fontSize: 24,
    color: '#666666',
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 20,
  },
});

export default CurrencyConverter;