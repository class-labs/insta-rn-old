import { RouteProp, useRoute } from '@react-navigation/native';
import { Text } from 'tamagui';
import { RootStackParamList } from '../types/Navigation';

type RsolvedRouteProp = RouteProp<RootStackParamList, 'PostCreate'>;

export function PostCreateScreen() {
  const route = useRoute<RsolvedRouteProp>();
  if (route.params.openPicker) {
    // TODO: Open the photo picker automatically
    // You might need to useEffect()
  }
  // Render the form. If there's no photo to render (which in this case there won't be)
  // then just have a button to open the picker
  // See: https://docs.expo.dev/versions/latest/sdk/imagepicker/
  return <Text>Create form will go here</Text>;
}
