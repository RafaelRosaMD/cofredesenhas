import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

type PasswordCardProps = {
  title: string;
  username: string;
  password?: string;
  onDelete: () => void;
};

export default function PasswordCard({
  title,
  username,
  password,
  onDelete,
}: PasswordCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        {title}
      </Text>

      <Text style={styles.username}>
        {username}
      </Text>

      <Text style={styles.password}>
        {showPassword
          ? password
          : "••••••••••••"}
      </Text>

      <View style={styles.buttonRow}>

  <Pressable

    style={[styles.button, styles.rowButton]}

    onPress={togglePassword}

  >

    <Text style={styles.buttonText}>

      {showPassword ? "Ocultar" : "Mostrar"}

    </Text>

  </Pressable>

  <Pressable

    style={[styles.deleteButton, styles.rowButton]}

    onPress={onDelete}

  >

    <Text style={styles.buttonText}>

      Excluir

    </Text>

  </Pressable>

</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },

  username: {
    marginBottom: 8,
  },

  password: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#1f2937",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "#b91c1c",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  buttonRow: {
  flexDirection: "row",
  gap: 8,
},

rowButton: {
  flex: 1,
},

});