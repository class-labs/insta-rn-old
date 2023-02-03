import { useState } from 'react';
import { Button, Input, Spacer, YStack } from 'tamagui';
import { useAuth } from '../support/Auth';

export function LoginScreen() {
  const { setAuthToken } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = () => {
    // TODO: Send a GraphQL mutation, then call setAuthToken, then navigate to home
    console.log({ username, password });
  };
  return (
    <YStack
      flex={1}
      justifyContent="flex-start"
      alignItems="stretch"
      px={16}
      pt={16}
      pb={24}
      backgroundColor="white"
    >
      <YStack space={20}>
        <Input
          size="$4"
          value={username}
          onChangeText={(value) => {
            setUsername(value);
          }}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          onSubmitEditing={() => {
            // TODO: Focus the password field
          }}
          placeholder="Enter your username"
        />
        <Input
          size="$4"
          value={password}
          onChangeText={(value) => {
            setPassword(value);
          }}
          secureTextEntry={true}
          returnKeyType="go"
          onSubmitEditing={() => onSubmit()}
          placeholder="Enter your password"
        />
      </YStack>
      <Spacer flex={1} />
      <Button
        backgroundColor="$primary"
        color="$textOnPrimary"
        onPress={() => onSubmit()}
      >
        Login
      </Button>
    </YStack>
  );
}
