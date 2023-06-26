import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ActiveProduct(prop) {

  function showAlert(id) {
    Alert.alert(
      'Attention !',
      'Êtes-vous sur de vouloir archiver ce produit ?',
      [
        {
          text: 'OK', onPress: () => {
            console.log('Archive product ' + prop.id)
            // makesDisappear(data._id)
            // handleDelete(id)
          }
        },
        { text: 'Annuler', onPress: () => console.log('Annuler appuyé'), style: 'cancel' }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.articleInfo}
        onPress={() => console.log("Modify")}    >
        <Text style={styles.textArticleName}>{prop.title}</Text>
        <Text style={styles.textArticlePrice}>{prop.price}€ / {prop.unitScale}{prop.priceUnit}</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: prop.imageUrl }}
        ></Image>
      </View>
      <TouchableOpacity onPress={() => showAlert()}>
        <FontAwesome name="archive" size={24} color={"#3A7D44"} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "1%",
    paddingRight: "3%",
    width: "96%",
    height: 60,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#3A7D443F"
  },
  articleInfo: {
    width: "60%",
  },
  textArticleName: {
    fontSize: 18,
    color: "#3A7D44",
    fontWeight: 600
  },
  textArticlePrice: {
    fontSize: 14,
    color: "#3A7D44",
    fontWeight: 400
  },
  imageContainer: {
    width: 56,
  },
  image: {
    height: 56,
  },
});