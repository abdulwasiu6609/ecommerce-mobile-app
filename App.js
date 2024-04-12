import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

// Screens
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import CartScreen from './screens/CartScreen';
import AccountScreen from './screens/AccountScreen';
import ProductDetailScreen from './screens/ProductDetailScreen'; // Import ProductDetailScreen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Create stack navigator

const MenuStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="" component={MenuScreen} options={{ headerShown: false }}  />
    <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{ headerShown: false }}  />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Cart"
        tabBarOptions={{
          labelStyle: {
            textAlign: 'center',
          },
          activeTintColor: '#DB3C25', // Active tab color
          inactiveTintColor: '#858585', // Inactive tab color
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" color={color} size={size} />
            ),
            tabBarLabelPosition: 'below-icon', // Adjust label position
            headerTitleAlign: 'center', // Center the title
          }}
        />
        <Tab.Screen
          name="Menu"
          component={MenuStack} // Use MenuStack as component
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="menu" color={color} size={size} />
            ),
            tabBarLabelPosition: 'below-icon', // Adjust label position
            headerTitleAlign: 'center', // Center the title
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <SimpleLineIcons name="handbag" size={24} color={color} />
            ),
            tabBarLabelPosition: 'below-icon', // Adjust label position
            headerTitleAlign: 'center', // Center the title
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
            tabBarLabelPosition: 'below-icon', // Adjust label position
            headerTitleAlign: 'center', // Center the title
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
