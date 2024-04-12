import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Text,
  Image,
  Alert,
  AsyncStorage,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

import products from '../database/Product'; // Assuming you have your product data in a separate file

const MenuScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchProduct = () => {
    if (searchText.trim() === '') {
      setSearchResults(products);
    } else {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(filteredProducts);
    }
  };

  const addToCart = async (productId) => {
    try {
      // Get existing cart data from AsyncStorage
      const cartData = await AsyncStorage.getItem('cart');
      const cart = cartData ? JSON.parse(cartData) : [];

      // Find the product by productId
      const product = products.find((item) => item.id === productId);

      // Add product to cart
      cart.push(product);

      // Save updated cart data to AsyncStorage
      await AsyncStorage.setItem('cart', JSON.stringify(cart));

      // Show alert
      Alert.alert('Success', `${product.title} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const toggleFavorite = (productId) => {
    // Toggle favorite status of the product
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, favorite: !product.favorite };
      }
      return product;
    });
    // Update product data
    // For now, just log the updated products
    console.log(updatedProducts);
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: pressed ? '#e6e6e6' : 'white',
        padding: 10,
        margin: 5,
        flex: 0,
        gap: 8,
        width: '45%', // Adjust width to fit two columns
      })}
      onPress={() => {
        console.log(
          'Navigating to ProductDetailScreen with productId:',
          item.id
        );
        navigation.navigate('ProductDetailScreen', { productId: item.id });
      }}>
      <Pressable
        onPress={() => toggleFavorite(item.id)}
        style={{ alignItems: 'flex-end' }}>
        <Ionicons
          name={item.favorite ? 'heart' : 'heart-outline'}
          size={24}
          color={item.favorite ? 'red' : '#4A4A4A'}
        />
      </Pressable>
      <Image
        // source={require(`${item.images[0]}`)}
        source={require('../assets/images/Image1.png')}
        style={{ width: 100, height: 100, marginBottom: 5 }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: '#151515',
            flex: 0.8,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
          {item.title}
        </Text>
        <Text style={{ color: '#DB3C25' }}>£{item.price}</Text>
      </View>
      <Pressable
        onPress={() => addToCart(item.id)}
        style={{
          backgroundColor: '#DB3C25',
          flex: 1,
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          paddingHorizontal: 12,
          alignItems: 'center',
          borderRadius: 40,
        }}>
        <SimpleLineIcons name="handbag" size={24} color="white" />
        <Text style={{ color: '#ffffff' }}>Add to cart</Text>
      </Pressable>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          padding: 10,
        }}>
        <TextInput
          style={{
            position: 'relative',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#E1E5E9',

            height: 40,
            paddingLeft: 40,
          }}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          placeholder="Search..."
        />
        <Pressable
          onPress={searchProduct}
          style={{ position: 'absolute', top: '50%', left: 20 }}>
          <Ionicons name="search" size={24} color="#858585" />
        </Pressable>
      </View>

      <FlatList
        data={searchResults.length > 0 ? searchResults : products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2} // Set number of columns to 2
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
});

export default MenuScreen;
