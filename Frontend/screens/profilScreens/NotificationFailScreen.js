import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function NotificationFailScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        {/* <Text style={styles.textTitle}>{"              "} Thank You!</Text> */}
        <Image
          source={require("../../assets/AttentionSign.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.text}>
          Something went wrong. Notification was not submitted. Please retry!
          {"\n"}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ContactChoice")}
          style={styles.buttonFull}
        >
          <Text style={styles.textButton}>Return to Contact Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: "5%",
  },
  topSection: {
    flex: 1,
    width: "100%",
    marginTop: "20%",
  },
  bottomSection: {
    flex: 0.5,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "20%",
  },
  textTitle: {
    fontSize: 30,
    marginBottom: "2%",
  },
  text: {
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: 20,
    lineHeight: 40,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonFull: {
    backgroundColor: "#3a7d44",
    marginLeft: "2%",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: "5%",
    width: "90%",
    alignItems: "center",
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
