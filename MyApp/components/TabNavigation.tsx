import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface TabNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'users', title: 'Bài 1 - Users', icon: '👥' },
    { id: 'counter', title: 'Bài 2 - Counter', icon: '🔢' },
    { id: 'light', title: 'Bài 3 - Light', icon: '💡' },
    { id: 'login', title: 'Bài 4 - Login', icon: '🔐' },
    { id: 'currency', title: 'Bài 5 - Currency', icon: '💱' },
    { id: 'todos', title: 'Bài 6 - Todos', icon: '📝' },
    { id: 'register', title: 'Bài 7 - Register', icon: '✍️' },
    { id: 'shop', title: 'Bài 8 - Shop', icon: '🛒' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && styles.activeTab
          ]}
          onPress={() => onTabPress(tab.id)}
        >
          <Text style={styles.tabIcon}>{tab.icon}</Text>
          <Text style={[
            styles.tabText,
            activeTab === tab.id && styles.activeTabText
          ]}>
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#007AFF',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabText: {
    fontSize: 5,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default TabNavigation;