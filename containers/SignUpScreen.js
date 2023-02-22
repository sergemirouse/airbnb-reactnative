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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import logo from "../assets/airbnb_logo.png";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerif, setPasswordVerif] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        { email, username, description, password }
      );

      if (response.data.token) {
        // si le token existe dans la BDD de l'API, alors l'utilisateur est redirigé sur la Screen Home
        setToken(response.data.token);
        alert("Connected");
        navigation.navigate("Home");
      }
    } catch (error) {
      // si un champs n'est pas rempli et que le message d'erreur se déclenche, un message d'erreur est attitré
      console.log(error.response.data);
      if (error.response.data.error === "Missing parameters") {
        setErrorMessage("Please fill all fields");
      } else if (passwordVerif !== password) {
        setErrorMessage("Please be sure both password are the same");
      } else if (
        error.response.data.error === "This email already has an account."
      ) {
        setErrorMessage("This email already exists");
      } else if (
        error.response.data.error === "This username already has an account."
      ) {
        setErrorMessage("This username is not available");
      }
    }
  };

  const { height, width } = useWindowDimensions();

  return (
    <KeyboardAwareScrollView>
      <View style={styles.signUpScreen} maxHeight={height}>
        <View style={styles.signUpFirstSection}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.signUpTitle}>Sign up</Text>
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
            value={username}
            placeholder="username"
            style={styles.input}
            onChangeText={(input) => {
              setUsername(input);
            }}
          />
          <TextInput
            value={description}
            placeholder="Describe yourself in a few words..."
            numberOfLines={4}
            style={styles.descriptionInput}
            onChangeText={(input) => {
              setDescription(input);
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
          <TextInput
            value={passwordVerif}
            placeholder="confirm password"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(input) => {
              setPasswordVerif(input);
            }}
          />
        </View>
        <View style={styles.signUpLastSection}>
          {errorMessage && (
            <Text style={styles.signUpErrorMessages}>{errorMessage}</Text>
          )}
          <TouchableOpacity
            title="Sign up"
            style={styles.signUpButton}
            onPress={async () => {
              handleSignUp();
            }}
          >
            <Text style={styles.signUpButtonText}>Sign up</Text>
          </TouchableOpacity>
          <Text style={styles.signUpText}>
            Already have an account? Sign in
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  signUpScreen: {
    alignItems: "center",
    height: "100%",
    justifyContent: "space-between",
    marginTop: "2%",
  },

  signUpFirstSection: {
    height: "20%",
    width: "100%",
    alignItems: "center",
  },

  logo: {
    maxHeight: "70%",
    maxWidth: "70%",
    resizeMode: "contain",
    justifyContent: "center",
  },

  signUpTitle: {
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
    height: "30%",
    flexDirection: "column",
  },

  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFBAC0",
    width: "80%",
    height: "20%",
    fontSize: 18,
  },

  descriptionInput: {
    textAlign: "left",
    borderWidth: "2",
    borderColor: "#FFBAC0",
    fontSize: 18,
    height: "30%",
    width: "80%",
    marginTop: "7%",
  },

  signUpLastSection: {
    width: "100%",
    alignItems: "center",
    height: "40%",
    marginTop: "20%",
  },

  signUpErrorMessages: {
    color: "#EB5A62",
  },

  signUpButton: {
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

  signUpButtonText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#717171",
  },

  signUpText: {
    color: "#717171",
  },
});
