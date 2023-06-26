import backendUrl from "../../modules/backendUrl";
import React from "react";
import { useEffect, useState } from "react";
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
import { AntDesign } from "@expo/vector-icons";
import importedStyle from "../../modules/importedStyle";
import ArchivedProduct from "../../components/ArchivedProduct";
import ActiveProduct from "../../components/ActiveProduct";

export default function ListDesProduits({ navigation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productsList, setProductsList] = useState(null);
  const [acrhivedProducts, setArchivedProducts] = useState(null);
  const [activeProducts, setActiveProducts] = useState(null);

  async function fetchProducts() {
    let data = await fetch(`${backendUrl}/products/all`);
    data = await data.json();
    setProductsList(data.result);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (productsList !== null) {

      let activeProd = productsList.filter(prod => prod.isActive === true);

      activeProd = activeProd.map((prod, i) => {
        return (
          <ActiveProduct
            key={i}
            id={prod._id}
            description={prod.description}
            imageUrl={prod.imageUrl}
            price={prod.price}
            title={prod.title}
            unitScale={prod.unitScale}
            priceUnit={prod.priceUnit}
          />
        )
      })
      setActiveProducts(activeProd);

      let archivedProd = productsList.filter(prod => prod.isActive === false)
      archivedProd = archivedProd.map((prod, i) => {
        return (
          <ArchivedProduct
            key={i}
            id={prod._id}
            description={prod.description}
            imageUrl={prod.imageUrl}
            price={prod.price}
            title={prod.title}
            unitScale={prod.unitScale}
          />
        )
      })
      setArchivedProducts(archivedProd);
    }

  }, [productsList]);

  function toggleArchivedList() {
    setIsOpen(!isOpen);
  }

  return (
    <View style={styles.container}>

      {/* Page navigation header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <AntDesign name="caretleft" size={24} color="#F3A712" />
          <Text
            style={styles.title2}
            onPress={() => navigation.navigate("Dashboard")}
          >
            {"  "}tableau{"\n"}
            {"  "}de bord
          </Text>
        </View>
        <Text style={styles.title1}>Liste des{"\n"}articles</Text>
      </View>

      {/* Archived products list*/}
      <>
        {/* Open/Close button */}
        <TouchableOpacity
          onPress={() => toggleArchivedList()}
          style={[styles.dropDownButton, styles.button]}
        >
          <Text style={importedStyle.textButton}>
            Produits archivés :{"             "}
          </Text>
          <Text>
            <AntDesign
              name={isOpen ? "up" : "down"}
              size={24}
              color="white"
            />
          </Text>
        </TouchableOpacity>
        {/* List of archived items */}
        {isOpen && (
          <View style={styles.scrollContainer}>
            <ScrollView >
              {acrhivedProducts}
            </ScrollView>
          </View>
        )}
      </>

      {/* New Article Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("SnapScreen")}
        style={[styles.button, styles.newArticleButton]}
      >
        <Text style={importedStyle.textButton}>
          + Nouvel Article
        </Text>
      </TouchableOpacity>

      {/* Active products list */}

      <View style={styles.scrollContainer}>
        <Text style={styles.title3}>Liste des produits actifs</Text>
        <ScrollView>
          {activeProducts}
        </ScrollView>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title1: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#3A7D44",
    marginLeft: "8%",
  },
  title2: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#F3A712",
  },
  title3: {
    fontFamily: "BelweBold",
    fontSize: 18,
    color: "#3A7D44",
    alignSelf: "center"
  },
  button: {
    width: "96%",
    paddingHorizontal: 20,
    paddingTop: 10,
    marginLeft: "2%",
    backgroundColor: "#F3A712",
    borderRadius: 10,
    flexDirection: "row",
  },
  dropDownButton: {
    marginTop: 10,
    marginBottom: 2,
    justifyContent: "space-between",
  },
  newArticleButton: {
    marginTop: 15,
    justifyContent: "center",
    marginBottom: 20
  },
  scrollContainer: {
    width: "96%",
    marginLeft: "2%",
    height: "70%",
    padding: 3,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#3A7D44",
    backgroundColor: "#3A7D4415",
    borderRadius: 10
  },

});
