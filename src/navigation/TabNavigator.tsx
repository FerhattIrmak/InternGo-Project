import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudentProfileScreen from '../screens/student/StudentProfileScreen';
import CompanyProfileScreen from '../screens/company/CompanyProfileScreen';
import StudentHomeScreen from '../screens/student/StudentHomeScreen';
import SearchScreen from '../screens/student/StudentSearchScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import CompanyHomeScreen from '../screens/company/CompanyHomeScreen';
import CompanySearchScreen from '../screens/company/CompanySearchScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function MyTabs() {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const getUserType = async () => {
      const type = await AsyncStorage.getItem('userType');
      setUserType(type);
    };
    getUserType();
  }, []);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={userType === 'company' ? CompanyHomeScreen : StudentHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={userType === 'company' ? CompanySearchScreen : SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={userType === 'company' ? CompanyProfileScreen : StudentProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

    
      <Tab.Screen
        name="Login"
        component={userType === 'company' ? LoginScreen : LoginScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-in-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;