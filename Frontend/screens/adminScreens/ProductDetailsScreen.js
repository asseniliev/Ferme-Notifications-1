import backendUrl from "../../modules/backendUrl";
import React from "react";
import ProductFile from "../../components/ProductFile";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  TouchableOpacityBase,
} from "react-native";
import { useEffect, useState } from "react";

export default function ProductDetails({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Page navigation header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <AntDesign name="caretleft" size={24} color="#F3A712" />
          <Text
            style={styles.title2}
            onPress={() => navigation.navigate("ListOfProducts")}
          >
            {"  "}Liste{"\n"}
            {"  "}des produits
          </Text>
        </View>
        <Text style={styles.title1}>Dossier{"\n"}produit</Text>
      </View>

      {/* Product details */}
      <View style={styles.productContainer}>
        <ProductFile />
      </View>

    </View>
  )
}

const styles = StyleSheet.creare({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F9",
  },
  header: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 3,
    backgroundColor: "#ffffff",
    width: "100%",
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: "#ABABAB",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  productContainer: {
    flex: 0.8,
    width: "90%",
    marginLeft: "5%"
  }
})