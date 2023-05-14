// //카메라 보이는 화면


// import axios from 'axios';
// import React, {useState, useEffect, useRef} from 'react';
// import { StyleSheet, Text, View, Image, ImageBackground} from "react-native";
// import {Camera, CameraType} from 'expo-camera';
// import * as MediaLibrary from 'expo-media-library';

// //카메라 버튼 가져옴
// import CameraButton from '../../Components/CameraButton';

// //서버
// import ServerPort from '../../Components/ServerPort';
// const IP = ServerPort();

// function CameraSearch() {
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [image, setImage] = useState(null);
//   const [isFirstPictureTaken, setIsFirstPictureTaken] = useState(false);
//   const [photos, setPhotos] = useState([]);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
//   const cameraRef = useRef(null);

//   //카메라 권한 물어보기
//   useEffect(() => {
//     (async () => {
//       MediaLibrary.requestPermissionsAsync();
//       const cameraStatus = await Camera.requestCameraPermissionsAsync();
//       // const cameraStatus = await Camera.requestCameraPermissionsAsync
//       setHasCameraPermission(cameraStatus.status === 'granted');
//     })();
//     alert('첫번째 사진을 찍어주세요!');
//   }, [])

//   //사진 찍기 버튼
//   const takePicture = async () => {
//     if (cameraRef.current) {
//       try {
//         const data = await cameraRef.current.takePictureAsync();
//         console.log(data);
//         if (photos.length === 1) {
//           // 두 번째 이미지를 찍을 때
//           alert('두번째 사진을 찍어주세요!');
//           sendImageToServer(photos[0], data.uri);
//           setPhotos([...photos, data.uri]); // 이전 배열에 새로운 데이터 추가
//           setIsFirstPictureTaken(false);
//           console.log("2번사진")
//         } else {
//           // 첫 번째 이미지를 찍었을 때
//           alert('사진 배열에 저장 완료♪');
//           setPhotos([data.uri]);
//           console.log("배열 확인용",photos.length)
//           setIsFirstPictureTaken(true);
//           console.log("1번사진")
//         }
//         if (photos.length === 2) { // photos 배열의 길이가 2이면
//           alert('사진 서버로 전송 완료♪')
//           sendImageToServer(photos[0], photos[1]); // 두 개의 사진 데이터를 전달
//           console.log("들어왔나?", photos)
//         }
//       } catch (e) {
//         console.log("사진 찍기 실패,,,", e);
//       }
//     }
//   };

//   //사진 저장하기 버튼
//   // const saveImage = async () => {
//   //   if (image) {
//   //     try {
//   //       const asset = await MediaLibrary.createAssetAsync(image.uri); // 여기에서 변경됨
//   //       await sendImageToServer(image); // Flask 서버로 이미지 전송
//   //       alert('사진 저장 완료♪')
//   //       setImage(null);
//   //       setIsFirstPictureTaken(false);
//   //     } catch (e) {
//   //       console.log("사진 저장하기 실패,,,", e)
//   //     }
//   //   }
//   // }

//   // 사진 서버에 보내기
//   const sendImageToServer = async (imageUri1, imageUri2) => {
//     try {
//       const image = new FormData();
//       image.append('image1', {
//         uri: imageUri1,
//         type: 'image/jpeg',
//         name: 'image1.jpg',
//       });
//       if (imageUri2) {
//         image.append('image2', {
//           uri: imageUri2,
//           type: 'image/jpeg',
//           name: 'image2.jpg',
//         });
//       }
  
//       const res = await axios.post(`${IP}/user/image`, image, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       console.log('사진 보내짐?', res.data)
//     } catch (e) {
//       console.log('사진 axios 서버로 보내기 실패,,,', e)
//       console.log("나오냐", imageUri1, imageUri2)
//       // if (e.response) {
//       //   // 요청은 성공했지만 응답에서 오류 코드가 반환됨
//       //   console.log('response.data:', e.response.data);
//       //   console.log('response.status:', e.response.status);
//       //   console.log('response.headers:', e.response.headers);
//       // } else if (e.request) {
//       //   // 요청을 보냈으나 응답을 받지 못함
//       //   console.log('request:', e.request);
//       // } else {
//       //   // 요청을 보내기 전에 오류가 발생함
//       //   console.log('Error:', e.message);
//       // }
//     }
//   };  
 

//   // hasCameraPermission은 카메라 권한임
//   //만약 hasCameraPermission이 false라면 camera 연결 안 되었다고 화면에 띄우기
//   if(hasCameraPermission === false){
//     return <Text>No access to camera</Text>
//   }

//   return(
//     <View style={styles.container}>
//       {!image ? 
//       <Camera
//         style={styles.camera}
//         type={type}
//         flashMode={flash}
//         ref={cameraRef}
//       >
//          <View style={{flexDirection:'row', justifyContent:'space-between', padding:20,}}>
//           <CameraButton icon={'retweet'} onPress={() => {
//             setType(type === CameraType.back ? CameraType.front : CameraType.back)
//           }}/>
//           <CameraButton icon={'flash'}
//           color = {flash === Camera.Constants.FlashMode.off ? 'gray' : 'blue'} 
//           onPress={() => {
//             setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)
//           }}/>
//         </View>
//       </Camera>
//       :
//       <Image source={{uri: image.uri}} style={styles.camera}/>
//       }
//       <View>
//         {/* {image ?
//         <View style={{flexDirection:"row", justifyContent: 'space-between', paddingHorizontal: 50}}>
//           <CameraButton title={"Re-take"} icon="retweet" onPress={() => setImage(null)}/>
//           <CameraButton title={"save"} icon="check" onPress={saveImage}/>
//         </View>
//         :
//         <CameraButton title={'Take a picture'} icon="camera" onPress={takePicture}/>
//         } */}
//        {/* {image ?
//           <View style={{flexDirection:"row", justifyContent: 'space-between', paddingHorizontal: 50}}>
//             {isFirstPictureTaken ? 
//               <CameraButton title={"Next Picture"} icon="camera" onPress={nextPicture}
//               /> :
//               <>
//                 <CameraButton title={"Re-take"} icon="retweet" onPress={() => setImage(null)}/>
//                 <CameraButton title={"save"} icon="check" onPress={saveImage}/>
//               </>
//             }
//           </View>
//         :
//           <CameraButton title={'Take a picture'} icon="camera" onPress={takePicture}/>
//         } */}
//         {image ?
//           <View style={{flexDirection:"row", justifyContent: 'space-between', paddingHorizontal: 50}}>
//             {photos.length === 2 ? 
//               <CameraButton title={"Save"} icon="check" onPress={saveImage}/> :
//               isFirstPictureTaken ? 
//                 <CameraButton title={"Next Picture"} icon="camera" onPress={nextPicture}
//                 /> :
//                 <>
//                   <CameraButton title={"Re-take"} icon="retweet" onPress={() => setImage(null)}/>
//                   <CameraButton title={"Next Picture"} icon="camera" onPress={nextPicture}/>
//                 </>
//             }
//           </View>
//           :
//           <CameraButton title={'Take a picture'} icon="camera" onPress={takePicture}/>
//         }
//       </View>
//     </View>
//   )
  
// }

// export default CameraSearch;

// const styles = StyleSheet.create({
//   container:{
//     flex:1,
//     backgroundcolor: '#fff',
//     justifyContent: 'center',
//     paddingBottom: 20
//   },
//   camera:{
//     flex:1,
//     borderRadius: 20,

//   }
// });

//카메라 보이는 화면


import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Alert} from "react-native";
import {Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

//카메라 버튼 가져옴
import CameraButton from '../../Components/CameraButton';

//서버
import ServerPort from '../../Components/ServerPort';

import * as ImageManipulator from 'expo-image-manipulator';

const IP = ServerPort();





function CameraSearch({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);//카메라 권한
  const [image, setImage] = useState(null);//이미지
  const [isFirstPictureTaken, setIsFirstPictureTaken] = useState(false);
  const [photos, setPhotos] = useState([]);//이미지 저장할 배열
  const [type, setType] = useState(Camera.Constants.Type.back);//사진 type지정
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);//불 켜져랏!
  const cameraRef = useRef(null);

  //카메라 권한 물어보기
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      // const cameraStatus = await Camera.requestCameraPermissionsAsync
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
    alert('첫번째 사진을 찍어주세요!');
    // const unsubscribe = navigation.addListener('focus', () => {
    //   // 다시 focus 될 때 실행될 코드
    //   // 예를 들어, 사진 찍는 화면으로 이동하기 전에 초기화할 상태를 초기화할 수 있습니다.
    //   useEffect();
    // });
    // return navigation.addListener('focus',async () => {
    //   // 다시 focus 될 때 실행될 코드
    //   // 예를 들어, 사진 찍는 화면으로 이동하기 전에 초기화할 상태를 초기화할 수 있습니다.
    //   alert('다시 focus 되었습니다! 첫번째 사진 찍으실?');
    //   if (cameraRef.current) {
    //     if (!cameraRef.current._isMounted) {
    //       await cameraRef.current.resumePreview();
    //     }
    //     CameraSearch();
    //   }
    // });
  }, [])

  const options = {
    format: 'png',
  };

  //사진 찍기 버튼 (alert수정 전)
  // const takePicture = async () => {
  //   if (cameraRef.current) {
  //     try {
  //       const data = await cameraRef.current.takePictureAsync();

  //       const pngPhoto = await ImageManipulator.manipulateAsync(
  //         data.uri,
  //         [{ resize: { width: data.width, height: data.height } }],
  //         { compress: 0, format: ImageManipulator.SaveFormat.PNG }
  //       );


  //       console.log("png 변환");
  //       console.log(pngPhoto.uri);


  //       console.log(data);
  //       if (photos.length === 1) {
  //         // 두 번째 이미지를 찍을 때
  //         alert('사진 배열에 저장 완료♪');
  //         console.log("배열 확인용",photos.length)
  //         console.log(photos)
  //         // sendImageToServer(photos[0], data.uri);
  //         setPhotos([...photos, pngPhoto.uri]); // 이전 배열에 새로운 데이터 추가
  //         console.log("두번째 사진 배열 저장");
  //         setIsFirstPictureTaken(false);
  //         saveImage([...photos, pngPhoto.uri]);
  //       } else {
  //         // 첫 번째 이미지를 찍었을 때
  //         // alert('사진 배열에 저장 완료♪');
  //         alert('두번째 사진을 찍어주세요!');
  //         setPhotos([pngPhoto.uri]);
  //         console.log("배열 확인용",photos.length)
  //         console.log(photos)
  //         setIsFirstPictureTaken(true);
  //       }
  //     } catch (e) {
  //       console.log("사진 찍기 실패,,,", e);
  //     }
  //   }
  // };

    //사진 찍기 버튼(alert 수정 완료, 다시 돌아왔을 때는 수정전)
    const takePicture = async () => {
      if (cameraRef.current) {
        try {
          const data = await cameraRef.current.takePictureAsync();
  
          const pngPhoto = await ImageManipulator.manipulateAsync(
            data.uri,
            [{ resize: { width: data.width, height: data.height } }],
            { compress: 0, format: ImageManipulator.SaveFormat.PNG }
          );
  
  
          console.log("png 변환");
          console.log(pngPhoto.uri);
  
  
          console.log(data);
          if (photos.length === 1) {
            // 두 번째 이미지를 찍을 때
            alert('사진 배열에 저장 완료♪');
            console.log("배열 확인용",photos.length)
            console.log(photos)
            // sendImageToServer(photos[0], data.uri);
            setPhotos([...photos, pngPhoto.uri]); // 이전 배열에 새로운 데이터 추가
            console.log("두번째 사진 배열 저장");
            setIsFirstPictureTaken(false);
            saveImage([...photos, pngPhoto.uri]); //saveImage에 이미지 저장된 배열 보내줌
          } else {
            // 첫 번째 이미지를 찍었을 때
            // alert('사진 배열에 저장 완료♪');
            alert('두번째 사진을 찍어주세요!');
            setPhotos([pngPhoto.uri]);
            console.log("배열 확인용",photos.length)
            console.log(photos)
            setIsFirstPictureTaken(true);
          }
        } catch (e) {
          console.log("사진 찍기 실패,,,", e);
        }
      }
    };


  //사진 저장하기 버튼
  const saveImage = async (saveImage) => {
    console.log("받은 배열 확인 !!")
          console.log(saveImage)
    if (photos) {
      try {
        const asset1 = await MediaLibrary.createAssetAsync(saveImage[0]); // 여기에서 변경됨
        const asset2 = await MediaLibrary.createAssetAsync(saveImage[1]); // 여기에서 변경됨

        await sendImageToServer(saveImage); // Flask 서버로 이미지 전송 (sendImageToServer로 saveImage담아서 보냄)
        // alert('사진 저장 완료♪')
        
        setImage(null);
        setIsFirstPictureTaken(false);
      } catch (e) {
        console.log("사진 저장하기 실패,,,", e)
      }
    }
  }

  // 사진 서버에 보내기
  const sendImageToServer = async (imageUri) => {
    try {
      console.log("보내기전 배열 확인용");
      console.log(imageUri);
      const image = new FormData();
      image.append('image1', {
        uri: imageUri[0],
        type: 'image/png',
        name: 'image1.png',
      });
      if (imageUri.length > 1) {
        image.append('image2', {
          uri: imageUri[1],
          type: 'image/png',
          name: 'image2.png',
        });
      }
      console.log("image만듦");
      console.log(image);
      // const res = await axios.post(`${IP}/user/image`, image, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });
      // alert('사진 저장 완료♪')
      Alert.alert(
        '사진 저장 완료♪',
        '확인',
        [
          {
            text: '확인',
            onPress: () => {
              navigation.navigate('CameraList');
            },
          },
        ],
      );

      console.log("돌아옴");
      console.log(res);
      console.log('사진 보내짐?', res.data)
    } catch (e) {
      console.log('사진 axios 서버로 보내기 실패,,,', e)
      console.log("나오냐", image)
    }
  };  
 

  // hasCameraPermission은 카메라 권한임
  //만약 hasCameraPermission이 false라면 camera 연결 안 되었다고 화면에 띄우기
  if(hasCameraPermission === false){
    return <Text>No access to camera</Text>
  }

  return(
    <View style={styles.container}>
      {!image ? 
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
      >
        <View style={{flexDirection:'row', justifyContent:'space-between', padding:20,}}>
          <CameraButton icon={'retweet'} onPress={() => {
            setType(type === CameraType.back ? CameraType.front : CameraType.back)
          }}/>
          <CameraButton icon={'flash'}
          color = {flash === Camera.Constants.FlashMode.off ? 'gray' : 'blue'} 
          onPress={() => {
            setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)
          }}/>
        </View>
      </Camera>
      :
      <Image source={{uri: image.uri}} style={styles.camera}/>
      }
      <View>
        <CameraButton title={'Take a picture'} icon="camera" onPress={takePicture}/>
      </View>
      {/* <View>
       {image ?
          <View style={{flexDirection:"row", justifyContent: 'space-between', paddingHorizontal: 50}}>
            {isFirstPictureTaken ? 
              <CameraButton title={"Next Picture"} icon="camera" onPress={nextPicture}
              /> :
              <>
                <CameraButton title={"Re-take"} icon="retweet" onPress={() => setImage(null)}/>
                <CameraButton title={"save"} icon="check" onPress={saveImage}/>
              </>
            }
          </View>
            :
          <CameraButton title={'Take a picture'} icon="camera" onPress={takePicture}/>
        }
      </View> */}
    </View>
  )
  
}

export default CameraSearch;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundcolor: '#fff',
    justifyContent: 'center',
    paddingBottom: 20
  },
  camera:{
    flex:1,
    borderRadius: 20,

  }
});




