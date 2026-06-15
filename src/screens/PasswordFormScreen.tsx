import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Controller, useForm } from "react-hook-form";
import AppButton from "../components/AppButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../services/api";

const passwordSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  username: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
  notes: z.string(),
});

export default function PasswordFormScreen({ navigation }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),

    defaultValues: {
      title: "",
      username: "",
      password: "",
      notes: "",
    },
  });

  async function onSubmit(data: any) {
    try {
      const response = await api.post("/posts", {
        title: data.title,
        username: data.username,
        password: data.password,
        notes: data.notes,
      });

      console.log("POST REALIZADO:");
      console.log(response.data);

      navigation.navigate("PasswordList", {
        newPassword: {
          id: String(Date.now()),
          title: data.title,
          username: data.username,
          password: data.password,
          notes: data.notes,
        },
      });
    } catch (error) {
      console.log("ERRO NO POST:");
      console.log(error);

      Alert.alert("Erro", "Não foi possível enviar os dados.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>

      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder="Ex: Gmail"
          />
        )}
      />

      {errors.title && (
        <Text style={styles.error}>{String(errors.title.message)}</Text>
      )}

      <Text style={styles.label}>Usuário / E-mail</Text>

      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder="Ex: rafael@gmail.com"
          />
        )}
      />

      {errors.username && (
        <Text style={styles.error}>{String(errors.username.message)}</Text>
      )}

      <Text style={styles.label}>Senha</Text>

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            secureTextEntry
            placeholder="Digite a senha"
          />
        )}
      />

      {errors.password && (
        <Text style={styles.error}>{String(errors.password.message)}</Text>
      )}

      <Text style={styles.label}>Observação</Text>

      <Controller
        control={control}
        name="notes"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, styles.notesInput]}
            value={value}
            onChangeText={onChange}
            placeholder="Observações"
            multiline
          />
        )}
      />

      <AppButton title="Salvar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  label: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },

  notesInput: {
    height: 100,
    textAlignVertical: "top",
  },

  error: {
    color: "red",
    marginTop: 4,
  },
});
