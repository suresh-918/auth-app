import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import InputField from "../components/InputField";
import AppButton from "../components/AppButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../services/authService";
import { errorToast, successToast } from "../utils/toast";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser({ email, password });

      if (response.status === 200) {
        // Store token & user info
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("email", response.data.email);
        await AsyncStorage.setItem("name", response.data.name);

        successToast({
          message: "Login successfull"
        })
        // Navigate to protected dashboard
        router.replace("/protected/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong. Try again.";
      errorToast({
        message: errorMessage
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <InputField
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <AppButton
          title={loading ? "Logging in..." : "Login"}
          onPress={handleLogin}
          disabled={loading}
        />

        <Pressable onPress={() => router.push("/register")}>
          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <Text style={styles.register}>Register</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  card: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  registerText: {
    textAlign: "center",
    marginTop: 15,
    color: "#2563eb",
  },
  register: {
    textDecorationLine: "underline",
    color: "#0bed5eff",
  },
});
