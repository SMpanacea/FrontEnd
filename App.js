import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Join from './Pages/SignUp/Join.js';
import Login from './Pages/SignUp/Login.js';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>panacea App start!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});