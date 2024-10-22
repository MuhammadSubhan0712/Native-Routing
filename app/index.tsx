import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  interface Items {

    title : string,
    id: number,
    price:number,
  }
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products ==>", error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }:Items) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
    <Link href={`/PDetail?id=${item.id}`} style={styles.link}>
      <Text style={styles.title}>{item.title}</Text>
    </Link>
  </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.noProducts}>No Products Found</Text>}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 130,
    height: 130,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  link: {
    width: '100%',
    alignItems: 'center',
    textAlign: "center",
    justifyContent: 'center',
    textDecorationLine: 'none',
  },

  // price: {
  //   fontSize: 14,
  //   color: '#555',
  // },
  noProducts: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
});
