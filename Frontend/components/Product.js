import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../reducers/productCounter";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Overlay } from "react-native-elements";
import Styles from "../modules/importedStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getLoggedUser } from "../modules/isUserLogged";
import { FontAwesome } from '@expo/vector-icons';


export default function Product(props) {

  console.log(props.imageUrl);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => setVisible(!visible);

  const compteur = useSelector((state) => {
    const product = state.productCounter.value.find((p) => p.id === props.id);
    return product ? product.quantity : 0;
  });

  const loggedUser = getLoggedUser();

  const dispatch = useDispatch();
  const incrementBtn = () => {
    dispatch(
      increment({
        id: props.id,
        title: props.title,
        imageUrl: props.imageUrl,
        price: props.price,
        priceUnit: props.priceUnit,
      })
    );
  };
  const decrementBtn = () => dispatch(decrement({ id: props.id, title: props.title }));

  return (
    <View style={styles.product1}>
      <View style={styles.bigContent}>
        <View style={styles.imageContainer}>
          {props.description
            ? (
              <TouchableOpacity onPress={toggleOverlay}>
                <Image source={{ uri: props.imageUrl }} style={styles.image} />
                <MaterialCommunityIcons name="information-outline" size={24} color="black" style={styles.logoI} />
              </TouchableOpacity>
            ) : (
              <Image source={{ uri: props.imageUrl }} style={styles.image} />
            )}
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <View style={styles.modal}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {props.title} :
              </Text>
              <Text style={{ fontSize: 20 }}>
                {props.description}
              </Text>
              <TouchableOpacity onPress={toggleOverlay} style={Styles.button}>
                <Text style={Styles.textButton}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </Overlay>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productName}>
            {props.title}
          </Text>
          <View style={styles.priceUnit}>
            <Text style={styles.price}>
              {props.price}€/
            </Text>
            <Text style={styles.unit}>
              {props.priceUnit}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        {loggedUser.accesstoken !== "" ? (
          <>
            <TouchableOpacity style={styles.minus} onPress={() => decrementBtn()} disabled={compteur !== 0 ? false : true}>
              <FontAwesome name="minus" size={24} color={compteur !== 0 ? "#fff" : "#ABABAB"} style={styles.logo} />
            </TouchableOpacity>
            <View style={styles.quantity}>
              <Text>{compteur}</Text>
            </View>
            <TouchableOpacity style={styles.plus} onPress={() => incrementBtn()} >
              <FontAwesome name="plus" size={24} color="#fff" style={styles.logo} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Log")} >
            <Text style={styles.loginButtonText}>Se connecter</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  product1: {
    flexBasis: "47%",
    height: 302,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
  },
  bigContent: {
    flex: 0.88,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    width: "100%",
    height: undefined,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  logoI: {
    position: "absolute",
    top: 134,
    right: 10,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowRadius: 2,
  },
  textContainer: {
    marginTop: 10,
    marginHorizontal: 12,
    width: "100%",
  },
  productName: {
    fontSize: 16,
  },
  priceUnit: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 13,
  },
  unit: {
    fontSize: 12,
  },
  quantityContainer: {
    flexDirection: "row",
  },
  minus: {
    width: 42,
    height: 35,
    backgroundColor: "#F3A712",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: "#ABABAB",
  },
  quantity: {
    width: 42,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ABABAB",
    marginBottom: 21,
  },
  plus: {
    width: 42,
    height: 35,
    backgroundColor: "#F3A712",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#ABABAB",
  },
  loginButton: {
    backgroundColor: "#F3A712",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    width: 250,
    height: 200,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
