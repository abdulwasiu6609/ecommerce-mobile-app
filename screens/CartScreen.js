import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const products = [
  {
    id: 1,
    title: 'Asaro (Yam Porridge)',
    description:
      'Rare Eat Puff Puff Mix can be made into a deep-fried dough. They are made from yeast dough, shaped into balls and deep-fried until golden brown. It has a doughnut-like texture but slightly ',
    images: ['../assets/images/Image1.png'],
    price: 30,
  },
  {
    id: 2,
    title: 'Moi-moi (bean cake)',
    description:
      'Rare Eat Puff Puff Mix can be made into a deep-fried dough. They are made from yeast dough, shaped into balls and deep-fried until golden brown. It has a doughnut-like texture but slightly ',
    images: ['https://example.com/image2.jpg'],
    price: 30,
  },
  {
    id: 3,
    title: 'Efo riro',
    description:
      'Rare Eat Puff Puff Mix can be made into a deep-fried dough. They are made from yeast dough, shaped into balls and deep-fried until golden brown. It has a doughnut-like texture but slightly ',
    images: ['https://example.com/image3.jpg'],
    price: 30,
  },
];

const CartScreen = ({ navigation }) => {
  const [unit, setUnit] = useState(1);

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

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={require('../assets/images/Image1.png')}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>£{item.price}</Text>
        <AntDesign name="delete" size={20} color="black" />
      </View>
      <View style={styles.quantityContainer}>
        <Pressable onPress={decrementUnit} style={styles.quantityButton}>
          <AntDesign
            name="minus"
            size={20}
            color={unit > 1 ? '#151515' : '#E1E5E9'}
          />
        </Pressable>
        <Text style={styles.quantity}>{unit}</Text>
        <Pressable onPress={incrementUnit} style={styles.quantityButton}>
          <AntDesign name="plus" size={20} color="black" />
        </Pressable>
      </View>
    </View>
  );

  const totalPrice = () => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total += products[i].price;
    }
    return total.toFixed(2);
  };

  const Separator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={Separator}
        ListFooterComponent={Separator}
      />
      <View style={{ padding: 10, gap: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Total ({products.length} items) </Text>
          <Text style={{ fontWeight: 'bold' }}>£{totalPrice()}</Text>
        </View>
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            backgroundColor: '#DB3C25',
            borderRadius: 50,
            height: 40,
          }}>
          <Text style={{ color: '#ffffff' }}>Checkout - £{totalPrice()}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    gap:4,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  detailsContainer: {
    flex: 0.9,
    marginLeft: -10,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#DB3C25',
  },
  quantityContainer: {
    alignItems: 'center',
  },
  quantityButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E1E5E9',
    backgroundColor: '#ffffff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#E1E5E9',
    marginVertical: 5,
  },
});

export default CartScreen;
