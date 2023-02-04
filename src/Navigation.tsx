/* eslint-disable react/style-prop-object */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { PhotoCaptureScreen } from './screens/PhotoCaptureScreen';
import { PostCreateScreen } from './screens/PostCreateScreen';
import { RootStackParamList } from './types/Navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="PhotoCapture"
          component={PhotoCaptureScreen}
          options={{
            title: 'Take Photo',
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="PostCreate"
          component={PostCreateScreen}
          options={{
            title: 'New Post',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
