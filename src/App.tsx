/* eslint-disable react/style-prop-object */
import { useFonts } from "expo-font";
import { TamaguiProvider } from "tamagui";

import config from "../tamagui.config";
import { Navigation } from "./Navigation";
import { ApolloProvider } from "./ApolloProvider";
import { AuthProvider } from "./support/Auth";

export function App() {
  const [fontsLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ApolloProvider>
        <TamaguiProvider config={config}>
          <Navigation />
        </TamaguiProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}
