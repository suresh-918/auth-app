import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { registerUser } from "../services/authService";
import { errorToast, successToast } from "../utils/toast";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        router.replace("/protected/dashboard");
      }
    };
    checkAuth();
  }, []);

  const handleRegister = async () => {
    try {
      const response = await registerUser({
        name,
        email,
        password,
      });

      if (response.status === 201) {
        //Alert.alert("Success", "Registration successful! Please login.");
        successToast({
          message: "Registration successful! Please login."
         })
         router.replace("/login");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      //Alert.alert("Registration Error", message);
      errorToast({
        message: errorMessage
      })
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Pressable style={styles.btn} onPress={handleRegister}>
        <Text style={styles.btnText}>Register</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  link: {
    textAlign: "center",
    marginTop: 15,
    color: "#2563eb",
  },
});
