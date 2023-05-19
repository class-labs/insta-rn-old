/* eslint-disable react/style-prop-object */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { PhotoCapture } from "./screens/PhotoCapture";
import { PostCreate } from "./screens/PostCreate";
import { RootStackParamList } from "./types/Navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="PhotoCapture"
          component={PhotoCapture}
          options={{
            title: "Take Photo",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="PostCreate"
          component={PostCreate}
          options={{
            title: "New Post",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
