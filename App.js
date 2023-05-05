import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { torch } from 'react-native-pytorch-core';

export default function App() {
  const [tensor, _setTensor] = useState(torch.rand([2, 3]));
  return (
    <View style={styles.container}>
      <Text>{`Random tensor of shape ${tensor.shape} with data ${tensor.data()}`}</Text>
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
//########################################################################################
// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, ActivityIndicator } from 'react-native';
// import { useSharedValue } from 'react-native-reanimated';
// import {
//   Camera,
//   useCameraDevices,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import { labelImage } from 'vision-camera-image-labeler';

// import { Label } from './Pages/components/Label';

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(false);
//   const currentLabel = useSharedValue('');

//   const devices = useCameraDevices();
//   const device = devices.back;

//   useEffect(() => {
//     (async () => {
//       const status = await Camera.requestCameraPermission();
//       setHasPermission(status === 'authorized');
//     })();
//   }, []);

//   const frameProcessor = useFrameProcessor(
//     (frame) => {
//       'worklet';
//       const labels = labelImage(frame);

//       //console.log('Labels:', labels);
//       console.log('Labels:', labels[0]?.label, labels[0]?.bounds)
//       currentLabel.value = labels[0]?.label;
//     },
//     [currentLabel]
//   );

//   return (
//     <View style={styles.container}>
//       {device != null && hasPermission ? (
//         <>
//           <Camera
//             style={styles.camera}
//             device={device}
//             isActive={true}
//             frameProcessor={frameProcessor}
//             frameProcessorFps={3}
//           />
//           <Label sharedValue={currentLabel} />
//         </>
//       ) : (
//         <ActivityIndicator size="large" color="white" />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'black',
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//   },
// });

//======================================================================================================================
// // import { StatusBar } from 'expo-status-bar';
// // import { StyleSheet, Text, View } from 'react-native';

// // export default function App() {
// //   return (
// //     <View style={styles.container}>
// //       <Text>Open up App.js to start working on your app!</Text>
// //       <StatusBar style="auto" />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });

// import * as React from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import Constants from 'expo-constants';
// // npm install @react-navigation/native --save해줬음
// import {NavigationContainer} from '@react-navigation/native';

// // bottomtabnavigation은 바꿀거임 우리 앱에 맞게 일단은 사이즈 보려고 넣어둔거임
// import BottomTab from './Components/BottomTab';
// import Navigation from './Components/StackNavigation';
// // import BottomTabNavigationApp from './Navigation/BottomTabNavigationApp';
// // import Navigation from './Navigation/Navigation';

// // test
// // import Test from './Test';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <NavigationContainer>
//         <Navigation />
//       </NavigationContainer>
//     </View>
//     // <Test />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// // import React, { useRef, useEffect } from 'react';
// // import { StyleSheet, View, ActivityIndicator } from 'react-native';
// // import { Camera, useCameraDevices } from 'react-native-vision-camera';

// // const LoadingView = () => (
// //   <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
// //     <ActivityIndicator size="large" color="#0000ff" />
// //   </View>
// // );

// // export default function App() {
// //   const cameraRef = useRef(null);
// //   useEffect(() => {
// //     const getPermission = async () => {
// //       const cameraPermission = await Camera.getCameraPermissionStatus();
// //       const microphonePermission = await Camera.getMicrophonePermissionStatus();
// //       await Camera.requestCameraPermission();
// //       await Camera.requestMicrophonePermission();
// //     };
// //     getPermission();
// //   }, []);

// //   const devices = useCameraDevices()
// //   const device = devices.back

// //   if (device == null) return <LoadingView />
// //   return (
// //     <Camera
// //       style={StyleSheet.absoluteFill}
// //       device={device}
// //       isActive={true}
// //     />
// //   )
// // }