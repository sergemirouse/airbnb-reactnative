import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import axios, { Axios } from "axios";
import logo from "../assets/airbnb_logo.png";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async () => {
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        { email, password }
      );

      if (response.data.token) {
        // si le token existe dans la BDD de l'API, alors l'utilisateur est redirigé sur la Screen Home
        setToken(response.data.token);
        alert("Connected");
        navigation.navigate("Home");
      }
    } catch (error) {
      // si un champs n'est pas rempli et que le message d'erreur se déclenche, un message d'erreur est attitré
      if (error.response.data.error === "Missing parameter(s)") {
        setErrorMessage("Please fill all fields");
        // si mail n'existe pas en BDD ou que MDP ne correspond pas à email fourni, un autre message d'erreur est attitré
      } else if (error.response.data.error === "Unauthorized") {
        setErrorMessage("Wrong email or password");
      }
    }
  };
  const navigation = useNavigation();
  // je récupère la hauteur de tous les écrans pour adapter les composants en pourcentage
  const { height, width } = useWindowDimensions();
  // console.log(height);
  return (
    <KeyboardAwareScrollView>
      <View style={styles.signInScreen} maxHeight={height}>
        <View style={styles.signInFirstSection}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.signInTitle}>Sign in</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            placeholder="email"
            style={styles.input}
            onChangeText={(input) => {
              setEmail(input);
            }}
          />
          <TextInput
            value={password}
            placeholder="password"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(input) => {
              setPassword(input);
            }}
          />
        </View>
        <View style={styles.signInLastSection}>
          {/* si un message d'erreur se déclenche, l'utilisateur est prévenu */}
          {errorMessage && (
            <Text style={styles.signInErrorMessages}>{errorMessage}</Text>
          )}
          <TouchableOpacity
            title="Sign in"
            style={styles.signInButton}
            onPress={async () => {
              handleSignIn();
            }}
          >
            <Text style={styles.signInButtonText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.signInText}>No account? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  signInScreen: {
    alignItems: "center",
    height: "100%",
    justifyContent: "space-between",
    marginTop: "10%",
  },

  signInFirstSection: {
    height: "30%",
    width: "100%",
    alignItems: "center",
    marginTop: "5%",
  },

  logo: {
    maxHeight: "60%",
    maxWidth: "60%",
    resizeMode: "contain",
    justifyContent: "center",
  },

  signInTitle: {
    width: "100%",
    textAlign: "center",
    marginTop: "7%",
    fontSize: 26,
    color: "#717171",
    fontWeight: "600",
  },

  inputContainer: {
    width: "100%",
    alignItems: "center",
    height: "20%",
    flexDirection: "column",
  },

  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFBAC0",
    width: "80%",
    height: "40%",
    fontSize: 18,
  },

  signInLastSection: {
    width: "100%",
    alignItems: "center",
    height: "30%",
  },

  signInErrorMessages: {
    color: "#EB5A62",
  },

  signInButton: {
    width: "50%",
    height: 60,
    borderColor: "#EB5A62",
    borderWidth: 4,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "3%",
    marginBottom: "5%",
  },

  signInButtonText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#717171",
  },

  signInText: {
    color: "#717171",
  },
});
