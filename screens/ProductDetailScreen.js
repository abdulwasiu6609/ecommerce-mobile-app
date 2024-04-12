import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  FlatList,
  Alert,
  AsyncStorage,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import products from '../database/Product'; // Assuming you have your product data in a separate file

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const product = products.find((item) => item.id === productId);
  const [modalVisible, setModalVisible] = useState(false);
  const [unit, setUnit] = useState(1);
  const [dropdown, setDropdown] = useState(false);

  const addToCart = async () => {
    try {
      // Get existing cart data from AsyncStorage
      const cartData = await AsyncStorage.getItem('cart');
      const cart = cartData ? JSON.parse(cartData) : [];

      // Find the product by productId
      const existingProductIndex = cart.findIndex(
        (item) => item.id === productId
      );

      if (existingProductIndex !== -1) {
        // If product already exists in cart, update quantity
        cart[existingProductIndex].unit += unit;
      } else {
        // Otherwise, add new product to cart
        cart.push({ ...product, unit });
      }

      // Save updated cart data to AsyncStorage
      await AsyncStorage.setItem('cart', JSON.stringify(cart));

      // Show alert
      Alert.alert('Success', `${product.title} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Function for incrementing unit
  const incrementUnit = () => {
    setUnit(unit + 1);
  };

  // Function for decrementing unit
  const decrementUnit = () => {
    if (unit > 1) {
      setUnit(unit - 1);
    }
  };

  // Function for handling subscribe button press
  const handleSubscribe = () => {
    // Logic for subscribing to the product (to be implemented)
    // Add your implementation here or leave it blank with a comment
  };
  const Separator = () => (
    <View
      style={{
        height: 1,
        backgroundColor: '#E1E5E9',
        marginVertical: 5,
      }}
    />
  );

  const property = [
    'Ingredients',
    'Nutritional Information',
    'How to Prepare',
    'Dietary Information',
    'Storage Information',
    'Extra',
  ];

  return (
    <ScrollView style={{ flex: 1, padding: 10, backgroundColor: '#F9F9F9' }}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: '#ffffff',
          borderColor: '#E1E5E9',
          borderWidth: 1,
          borderRadius: 5,
          width: 36,
          height: 36,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MaterialIcons name="arrow-back-ios-new" size={24} color="#131313" />
      </Pressable>
      <View style={{flex:1, justifyContent:"center", alignItems: 'center', marginBottom: 10, }}>
        <Pressable onPress={() => setModalVisible(true)} style={{flex:1, justifyContent:"center", alignItems:'center',gap:5, }}>
          <Image
            source={require('../assets/images/Image1.png')}
            style={{ width: 200, height: 200 }}
          />
          <View style={{ flexDirection: 'row',  gap:8 }}>
            <Pressable Style={{  }}>
              <FontAwesome name="circle" size={8} color="#DB3C25" />
            </Pressable>
            <Pressable Style={{}}>
              <FontAwesome name="circle" size={8} color="#D9D9D9" />
            </Pressable>
            <Pressable Style={{ }}>
              <FontAwesome name="circle" size={8} color="#D9D9D9" />
            </Pressable>
          </View>
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../assets/images/Image1.png')}
            style={{ width: 300, height: 300 }}
          />
          <Pressable onPress={() => setModalVisible(false)}>
            <Text>Close</Text>
          </Pressable>
        </View>
      </Modal>
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
            {product.title}
          </Text>
          <Text style={{ color: '#DB3C25', paddingRight: 30 }}>
            £{product.price}
          </Text>
        </View>
        <Text style={{ color: '#4A4A4A' }}>
          {product.description}...
          <Text style={{ color: '#DB3C25' }}>read more</Text>
        </Text>
      </View>
      <FlatList
        style={{ flex: 1, paddingRight: 10, gap: 5, marginTop: 10 }}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={Separator}
        ListFooterComponent={Separator}
        data={property}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setDropdown(!dropdown)}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Text style={{ fontWeight: 'bold' }}>{item}</Text>
            <Pressable onPress={() => setDropdown(!dropdown)}>
              {!dropdown ? (
                <SimpleLineIcons name="arrow-down" size={12} color="#000000" />
              ) : (
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={12}
                  color="#000000"
                />
              )}
            </Pressable>
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: ' center',
          padding: 10,
          marginVertical: 10,
        }}>
        <Pressable
          onPress={decrementUnit}
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#E1E5E9',
            backgroundColor: '#ffffff',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign
            name="minus"
            size={24}
            color={unit > 1 ? '#151515' : '#E1E5E9'}
          />
        </Pressable>
        <Text style={{ alignSelf: 'center' }}>{unit}</Text>
        <Pressable
          onPress={incrementUnit}
          style={{
            borderWidth: 1,
            borderColor: '#E1E5E9',
            backgroundColor: '#ffffff',
            padding: 10,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign name="plus" size={24} color="black" />
        </Pressable>
      </View>
      <View style={{ marginBottom: 10, padding: 10, flex: 1, gap: 10 }}>
        <Pressable
          onPress={addToCart}
          style={{
            height: 48,
            backgroundColor: '#DB3C25',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#ffffff' }}>Add to Cart</Text>
        </Pressable>
        <Pressable
          onPress={handleSubscribe}
          style={{
            height: 48,
            borderWidth: 1,
            borderColor: '#DB3C25',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#DB3C25', fontSize: 14, fontWeight: 700 }}>
            Subscribe to a plan
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;
