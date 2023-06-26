import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Styles from "../../modules/importedStyle";
//font hook
import { useFonts } from "expo-font";
import { useDispatch } from "react-redux";
import { disconnect } from "../../reducers/users";

export default function MyAccountScreen({ navigation }) {
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    BelweBold: require("../../assets/fonts/BelweBold.otf"),
  });
  if (!fontsLoaded) return null;

  function handleOnDisconnect() {
    dispatch(disconnect());
    navigation.navigate("Log");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <View style={styles.header}>
          <Text style={styles.title}>profil</Text>
        </View>
        <Image source={require("../../assets/fla1.jpg")} style={styles.image} />

        <TouchableOpacity
          onPress={() => navigation.navigate("ListDesProduits")}
          style={Styles.button}
        >
          <Text style={Styles.textButton}>List des produits</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MyOrders")}
          style={Styles.button}
        >
          <Text style={Styles.textButton}>Mes commandes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Address")}
          style={Styles.button}
        >
          <Text style={Styles.textButton}>Modifier mon profil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("PasswordChange")}
          style={Styles.button}
        >
          <Text style={Styles.textButton}>Modifier mot de passe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOnDisconnect()}
          style={Styles.button}
        >
          <Text style={Styles.textButton}>Me deconnecter</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ContactChoice")}
          style={Styles.button}
        >
          <Text style={Styles.textButton}>Contacter Flavien</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F9",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 3,
    backgroundColor: "#ffffff",
    width: "100%",
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: "#ABABAB",
  },
  image: {
    width: "100%",
    height: "40%",
  },
  line: {
    backgroundColor: "#ABABAB",
    height: 1,
    width: "80%",
  },
  title: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#3A7D44",
  },
});
