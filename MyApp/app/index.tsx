import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import UserListScreen from "../components/UserListScreen";
import TodoList from "../components/TodoList";
import Counter from "../components/Counter";
import LightSwitch from "../components/LightSwitch";
import LoginForm from "../components/LoginForm";
import CurrencyConverter from "../components/CurrencyConverter";
import RegisterForm from "../components/RegisterForm";
import ShopScreen from "../components/ShopScreen";
import TabNavigation from "../components/TabNavigation";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<string>('users');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserListScreen />;
      case 'counter':
        return <Counter />;
      case 'light':
        return <LightSwitch />;
      case 'login':
        return <LoginForm />;
      case 'currency':
        return <CurrencyConverter />;
      case 'todos':
        return <TodoList />;
      case 'register':
        return <RegisterForm />;
      case 'shop':
        return <ShopScreen />;
      default:
        return <UserListScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TabNavigation 
        activeTab={activeTab} 
        onTabPress={setActiveTab}
      />
      <View style={styles.content}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
});
