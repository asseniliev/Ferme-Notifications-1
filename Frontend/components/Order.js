import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import importedStyle from "../modules/importedStyle";

export default function Order(props) {
  const [isOpen, setIsOpen] = useState(false);

  function formatDate(date) {
    const formattedDate = new Date(date).toLocaleDateString("fr-FR");
    return formattedDate;
  }

  function toggleOrderDetails() {
    setIsOpen(!isOpen);
  }

  return (
    <View style={styles.orderContainer}>
      <Text style={styles.text}>
        {props.lastName} {props.firstName}
      </Text>
      {props.deliveryAddress ? (
        <Text style={styles.text}>{props.deliveryAddress}</Text>
      ) : (
        <></>
      )}
      <Text style={styles.text}>
        Date de commande : {formatDate(props.date)}
      </Text>

      <Text style={styles.text}>Montant total : {props.totalAmount} €</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text style={styles.text}>Payé : {props.isPaid ? "Oui" : "Non"}</Text>
        <Text style={styles.text}>Numéro : {props.orderNumber}</Text>
      </View>
      <TouchableOpacity
        onPress={() => toggleOrderDetails()}
        style={styles.dropDownButton}
      >
        <Text style={importedStyle.textButton}>
          Détails de la commande :{"             "}
        </Text>
        <Text>
          <AntDesign name={isOpen ? "up" : "down"} size={24} color="white" />
        </Text>
      </TouchableOpacity>
      {isOpen &&
        props.items?.map((item, j) => (
          <View key={j} style={{ marginBottom: 3 }}>
            <Text style={styles.text}>
              {item.title || "Titre du produit non disponible"}
            </Text>
            <Text style={styles.detailsText}>
              Quantité : {item.quantity} {item.priceUnit}
            </Text>
            <Text style={styles.detailsText}>
              Prix unitaire : {item.price} €
            </Text>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  orderContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 0,
  },
  text: {
    fontSize: 18,
    padding: 2,
  },
  dropDownButton: {
    paddingHorizontal: 9,
    marginTop: 10,
    paddingTop: 10,
    backgroundColor: "#F3A712",
    borderRadius: 10,
    flexDirection: "row",
  },
  detailsText: {
    fontSize: 15,
    padding: 4,
    color: "#ABABAB",
  },
});
