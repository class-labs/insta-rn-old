import { Keyboard } from 'react-native';
import { useEffect, useState } from 'react';

export function useKeyboardVisibility() {
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
      setVisible(true);
    });
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      setVisible(false);
    });
    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);
  return isVisible;
}
