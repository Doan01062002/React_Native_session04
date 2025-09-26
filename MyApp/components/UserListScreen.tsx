import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import UserInfoCard from "./UserInfoCard";

const UserListScreen: React.FC = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Bài 1 - Danh sách người dùng</Text>
        
        {/* Sử dụng UserInfoCard lần 1 */}
        <UserInfoCard
          name="Trần Văn An"
          email="tran.an@example.com"
          avatarUrl="https://i.pravatar.cc/150?u=1"
        />
        
        {/* Sử dụng UserInfoCard lần 2 */}
        <UserInfoCard
          name="Lý Thị Bình"
          email="ly.binh@example.com"
          avatarUrl="https://i.pravatar.cc/150?u=2"
        />
        
        {/* Thêm một vài user khác để thể hiện tính tái sử dụng */}
        <UserInfoCard
          name="Nguyễn Hoàng Nam"
          email="nguyen.nam@example.com"
          avatarUrl="https://i.pravatar.cc/150?u=3"
        />
        
        <UserInfoCard
          name="Phạm Thu Hương"
          email="pham.huong@example.com"
          avatarUrl="https://i.pravatar.cc/150?u=4"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333333',
  },
});

export default UserListScreen;