import { View, Text, Image , StyleSheet ,ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

const Detail = () => {

    const [Singleproduct , setSingleProducts] = useState<SingleItems | null>(null);
    const [loading , setLoading] = useState(true);
    const {id} = useLocalSearchParams();
    const router = useRouter();

    interface SingleItems {
        id: number;
        title: string;
        price: number;
        description: string;
        category: string;
        image: string;
    }
    useEffect(() =>{
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) =>{
         setSingleProducts(data);
         setLoading(false);
        })
        .catch((error) => {
        console.log("Error Fetching product details ==>" ,error);
        setLoading(false)
    })
    },[id])


    if (loading) {
        return <ActivityIndicator size="large" color="#00ff00" style={styles.loading} />;
      }

    if (!Singleproduct) {
        return <Text style={styles.errorText}>Product not found.</Text>;
      }
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
     <Image source={{ uri: Singleproduct.image }} style={styles.image} />
     <Text style={styles.title}>{Singleproduct.title}</Text>
      <Text style={styles.price}>${Singleproduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{Singleproduct.description}</Text>
      {/* <TouchableOpacity style={styles.backbtn} onPress={() => router.push('/')} >
      Back to Products
      </TouchableOpacity> */}
    </ScrollView>
  )
}

export default Detail
const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 12,
      color: '#333',
    },
    price: {
      fontSize: 20,
      color: '#555',
      marginBottom: 12,
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      color: '#666',
      marginBottom: 20,
    },
    backbtn: {
        fontSize:16,
        color:"#fff",
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 18,
      textAlign: 'center',
      color: 'red',
      marginTop: 20,
    },
  });