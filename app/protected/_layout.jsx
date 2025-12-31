import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function ProtectedLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        // If not logged in, redirect to login page
        router.replace("/login");
      } else {
        // If logged in, allow access to protected routes
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    // Show loading spinner while checking auth
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return <Slot />;
}
