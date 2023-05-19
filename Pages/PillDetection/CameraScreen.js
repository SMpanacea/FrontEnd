import * as React from 'react';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera } from 'react-native-pytorch-core';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CameraScreen({ onCapture }) {
  const cameraRef = useRef(null);
  const buttonRef = useRef(null);//button focus
  const MyIcon = <Icon name="camera-retro" size={100} color="#fff" />;

  function handleTakePicture() {
    const camera = cameraRef.current;
    if (camera != null) {
      camera.takePicture();
    }
  }
  return (
    <View style={styles.container} accessible>
      <Camera
        ref={cameraRef}
        onCapture={onCapture}
        style={styles.camera}
        hideCaptureButton={true}
        hideFlipButton={true}
        targetResolution={{ width: 1080, height: 1920 }}
      />
      <View style={styles.buttonContainer}>
        <IconButton
          icon="camera-outline"
          iconColor="#fff"
          accessibilityLabel="사진촬영버튼"
          size={100}
          onPress={handleTakePicture}
        />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 50,
  },
});

