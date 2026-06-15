import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import PasswordCard from "../components/PasswordCard";
import AppButton from "../components/AppButton";
import { api } from "../services/api";

const PASSWORDS_KEY = "PASSWORDS";

export default function PasswordListScreen({ navigation, route }: any) {
  const [passwords, setPasswords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadPasswords() {
    const storedPasswords = await SecureStore.getItemAsync(PASSWORDS_KEY);

    if (storedPasswords) {
      setPasswords(JSON.parse(storedPasswords));
    } else {
      setPasswords([]);
    }
  }

  async function savePasswords(newPasswords: any[]) {
    setPasswords(newPasswords);
    await SecureStore.setItemAsync(PASSWORDS_KEY, JSON.stringify(newPasswords));
  }

  async function getStoredPasswords() {
    const storedPasswords = await SecureStore.getItemAsync(PASSWORDS_KEY);

    if (storedPasswords) {
      return JSON.parse(storedPasswords);
    }

    return [];
  }

  async function testApi() {
    try {
      setLoading(true);

      const response = await api.get("/posts/1");

      console.log("RESPOSTA API:");
      console.log(response.data);
    } catch (error) {
      console.log("ERRO API:");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleDeletePassword(passwordId: string) {
    Alert.alert(
      "Excluir senha",
      "Tem certeza que deseja excluir esta senha?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const currentPasswords = await getStoredPasswords();

            const updatedPasswords = currentPasswords.filter(
              (password: any) => password.id !== passwordId
            );

            savePasswords(updatedPasswords);
          },
        },
      ]
    );
  }

  useEffect(() => {
    loadPasswords();
    testApi();
  }, []);

  useEffect(() => {
    async function addNewPassword() {
      if (route.params?.newPassword) {
        const currentPasswords = await getStoredPasswords();

        const updatedPasswords = [
          ...currentPasswords,
          route.params.newPassword,
        ];

        await savePasswords(updatedPasswords);

        navigation.setParams({
          newPassword: undefined,
        });
      }
    }

    addNewPassword();
  }, [route.params?.newPassword]);

  function handleNewPassword() {
    navigation.navigate("PasswordForm");
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Senhas</Text>

      {passwords.length === 0 && (
        <Text style={styles.emptyText}>Nenhuma senha cadastrada ainda.</Text>
      )}

      {passwords.map((password) => (
        <PasswordCard
          key={password.id}
          title={password.title}
          username={password.username}
          password={password.password}
          onDelete={() => handleDeletePassword(password.id)}
        />
      ))}

      <AppButton title="Nova Senha" onPress={handleNewPassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  emptyText: {
    color: "#666",
    marginBottom: 16,
  },
});