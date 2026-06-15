import { View, Text, StyleSheet, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

import AppButton from "../components/AppButton";

export default function UnlockScreen({ navigation }: any) {
  async function handleUnlock() {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();

    if (!hasHardware) {
      Alert.alert(
        "Erro",
        "Este aparelho não possui suporte à biometria."
      );
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isEnrolled) {
      Alert.alert(
        "Biometria não configurada",
        "Cadastre uma digital no aparelho para acessar o cofre."
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Use sua digital para acessar o cofre",
      cancelLabel: "Cancelar",
    });

    if (result.success) {
      navigation.navigate("PasswordList");
    } else {
      Alert.alert(
        "Acesso negado",
        "Falha na autenticação biométrica."
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cofre de Senhas</Text>

      <Text style={styles.subtitle}>
        Suas senhas protegidas por biometria.
      </Text>

      <AppButton
        title="Entrar com Digital"
        onPress={handleUnlock}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
});