import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Styles from "../../modules/importedStyle";
//font hook
import { useFonts } from "expo-font";

export default function Log({ navigation }) {
  const [fontsLoaded] = useFonts({
    BelweBold: require("../../assets/fonts/BelweBold.otf"),
  });
  if (!fontsLoaded) return null;

  function handleOnProfileCreate() {
    const isUserChangeMode = false;
    navigation.navigate("Address", { isUserChangeMode });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {"  "}ferme de {"\n"} mereynal
        </Text>
      </View>
      <Image source={require("../../assets/fla1.jpg")} style={styles.image} />
      <TouchableOpacity
        onPress={() => handleOnProfileCreate()}
        style={Styles.button}
      >
        <Text style={Styles.textButton}>Créer un nouveau compte</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("UserSignIn")}
        style={Styles.button}
      >
        <Text style={Styles.textButton}>Se connecter</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeTab")}
        style={Styles.button}
      >
        <Text style={Styles.textButton}>Continuer sans se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("ContactChoice")}
        style={Styles.button}
      >
        <Text style={Styles.textButton}>Contacter Flavien</Text>
      </TouchableOpacity>
    </View>
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
    marginTop: 30,
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
