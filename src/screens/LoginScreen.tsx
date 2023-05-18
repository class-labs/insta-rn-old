import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Button, Input, Spacer, YStack } from 'tamagui';
import { LOGIN } from '../graphql/queries';
import { useAuth } from '../support/Auth';
import { RootStackParamList } from '../types/Navigation';
import { Login, LoginVariables } from '../__generated__/Login';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export function LoginScreen() {
  const { setAuthToken } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation<Login, LoginVariables>(LOGIN, {
    onError: () => {
      Alert.alert('Error', 'Network request failed. Please try again later.');
    },
    onCompleted: (data) => {
      if (data.login) {
        setAuthToken(data.login.token);
        navigation.replace('Home');
      } else {
        Alert.alert('Login Failed', 'Invalid username or password');
      }
    },
  });
  const onSubmit = () => {
    login({ variables: { username, password } });
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
