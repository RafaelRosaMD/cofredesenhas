import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UnlockScreen from "./src/screens/UnlockScreen";
import PasswordListScreen from "./src/screens/PasswordListScreen";
import PasswordFormScreen from "./src/screens/PasswordFormScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Unlock">
        <Stack.Screen
          name="Unlock"
          component={UnlockScreen}
          options={{ title: "Cofre de Senhas" }}
        />

        <Stack.Screen
          name="PasswordList"
          component={PasswordListScreen}
          options={{ title: "Minhas Senhas" }}
        />

        <Stack.Screen
          name="PasswordForm"
          component={PasswordFormScreen}
          options={{ title: "Nova Senha" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}