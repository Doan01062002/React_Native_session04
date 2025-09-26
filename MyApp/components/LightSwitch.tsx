import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LightSwitch: React.FC = () => {
  const [isLightOn, setIsLightOn] = useState<boolean>(false);

  const toggleLight = () => {
    setIsLightOn(!isLightOn);
  };

  return (
    <View style={[styles.container, { backgroundColor: isLightOn ? '#FFF8DC' : '#2C2C2C' }]}>
      <Text style={[styles.title, { color: isLightOn ? '#333333' : '#FFFFFF' }]}>
        Bài 3 - Xử lý sự kiện Bật/Tắt đèn
      </Text>
      
      {/* Khu vực hiển thị bóng đèn */}
      <View style={styles.lightContainer}>
        <View style={styles.lightBulbBase}>
          {/* Phần đèn chính */}
          <View style={[styles.lightBulb, { backgroundColor: isLightOn ? '#FFD700' : '#666666' }]}>
            {/* Hiệu ứng ánh sáng khi bật đèn */}
            {isLightOn && (
              <>
                <View style={styles.lightGlow1} />
                <View style={styles.lightGlow2} />
                <View style={styles.lightGlow3} />
              </>
            )}
          </View>
          
          {/* Phần chụp đèn */}
          <View style={styles.lightBase} />
          
          {/* Phần sọc trang trí trên bóng đèn */}
          <View style={styles.lightLines}>
            <View style={[styles.line, { backgroundColor: isLightOn ? '#FFA500' : '#444444' }]} />
            <View style={[styles.line, { backgroundColor: isLightOn ? '#FFA500' : '#444444' }]} />
            <View style={[styles.line, { backgroundColor: isLightOn ? '#FFA500' : '#444444' }]} />
          </View>
        </View>
      </View>
      
      {/* Thông tin trạng thái */}
      <Text style={[styles.statusText, { color: isLightOn ? '#333333' : '#FFFFFF' }]}>
        Đèn đang: {isLightOn ? '🔆 BẬT' : '⚫ TẮT'}
      </Text>
      
      {/* Nút bật/tắt */}
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: isLightOn ? '#FF6B35' : '#4CAF50' }]} 
        onPress={toggleLight}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {isLightOn ? 'TẮT ĐÈN' : 'BẬT ĐÈN'}
        </Text>
      </TouchableOpacity>
      
      <Text style={[styles.description, { color: isLightOn ? '#666666' : '#CCCCCC' }]}>
        Nhấn nút để {isLightOn ? 'tắt' : 'bật'} đèn
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  lightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  lightBulbBase: {
    alignItems: 'center',
    position: 'relative',
  },
  lightBulb: {
    width: 120,
    height: 150,
    borderRadius: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightGlow1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  lightGlow2: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  lightGlow3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
  },
  lightBase: {
    width: 80,
    height: 30,
    backgroundColor: '#8B7355',
    borderRadius: 15,
    marginTop: 5,
    borderWidth: 2,
    borderColor: '#654321',
  },
  lightLines: {
    position: 'absolute',
    top: 40,
    gap: 8,
  },
  line: {
    width: 80,
    height: 2,
    borderRadius: 1,
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default LightSwitch;