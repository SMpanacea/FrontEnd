// // main에서 알약 검색 누르면 보이는 화면
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, TouchableOpacity } from 'react-native';
// import { Text, Button } from 'react-native-paper';
// import { launchImageLibrary } from 'react-native-image-picker';

// //license 가져와잇!
// import BarcodeLicense from '../../Components/BarcodeLicense';
// const License = BarcodeLicense();


// export default function BarcodeMain({ navigation }) {
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [barcodeResults, setBarcodeResults] = useState([]); // 바코드 결과값
//     const [modalVisible, setModalVisible] = React.useState(false);// 모달 표시 여부


//     // 갤러리에서 선택한 이미지 처리 함수
//     const handleImageSelected = (base64) => {
//       setSelectedImage(base64);
//     };

//     // 갤러리 열기 함수
//     const openGallery = async () => {
//         let options = {
//             mediaType: 'photo',
//             includeBase64: true,
//         };
//         // let response = await launchImageLibrary(options);
//         // if (response && response.assets) {
//         //     if (response.assets[0].base64) {
//         //         handleImageSelected(response.assets[0].base64);
//         //     }
//         // }
//         let response = await launchImageLibrary(options);
//         if (response && response.assets) {
//           if (response.assets[0].base64) {
//             console.log(response.assets[0].base64);
//             let results = await DBR.decodeBase64(response.assets[0].base64);
//             setBarcodeResults(results);
//           }
//         }
//     };

//  // 스캔 함수
//  const onScanned = async (results) => {
//     console.log(results);
//     setBarcodeResults(results);
  
//     if (results[0]) {
//       setUseCamera(false);
  
//       console.log("axios 호출");
//       axios
//         .get("http://172.16.37.98:5000/barcode/search", {
//           params: {
//             barcode: results[0].barcodeText,
//           },
//         })
//         .then((response) => {
//           console.log(response.data);
//           setBarcodeResults(response.data[0]);
//           setModalVisible(true);
//           alert(
//             Object.entries(response.data[0])
//               .map(([key, value]) => `${key}: ${value}`)
//               .join("\n")
//           );
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
  
//     // 바코드가 스캔되고 처리되면 앨범에서 바코드를 읽습니다.
//     await decodeFromAlbum();
//   };
//   const modal_view = (data, boolean_data) => {
//     console.log("modal_view 호출");
//     console.log(data);
//     if (boolean_data) {
//         console.log("modalVisible true");
//         return (
//             <View>
//                 <Text>들어옴!</Text>
//                 <Modal
//                     presentationStyle={"formSheet"}
//                     animationType="slide"  // 모달 애니메이션 지정
//                     visible={boolean_data}  // 모달 표시 여부 지정
//                     onRequestClose={() => setModalVisible(false)} // 모달 닫기 버튼 클릭 시 처리할 함수 지정, 안드로이드에서는 필수로 구현해야 합니다
//                 >
//                     <View>
//                         <Text>상품 정보</Text>
//                         {Object.entries(data).map(([key, value]) => (
//                             <View key={key}>
//                                 <Text>{key}</Text>
//                                 <Text>{value}</Text>
//                             </View>
//                         ))}
//                         <Button
//                             title="Close"
//                             onPress={() => setModalVisible(false)} // 모달 닫기 버튼 클릭 시 모달을 닫습니다
//                         />
//                     </View>
//                 </Modal>
//             </View>
//         );
//     }
// }

//     React.useEffect(() => {
//         (async () => {
//             //라이센스 키
//             await DBR.initLicense(`${License}`);
//         })();
//     }, []);

//     React.useEffect(() => {
//         (async () => {
//             const status = await Camera.requestCameraPermission();
//             setHasPermission(status === 'authorized');
//         })();
//     }, []);

//     React.useEffect(() => {
//         if(barcodeResults !== undefined){
//             if(barcodeResults[0] !== undefined){
//                 if(barcodeResults[0].barcodeText !== undefined){
//         console.log("result~~~~~~~~~~~~~~~~~~~~");
//         console.log(barcodeResults);
//         console.log(barcodeResults[0]);
//         console.log(barcodeResults[0].barcodeText);
//         console.log("end~~~~~~~~~~~~~~~~~~~~~~~~~");

//         onScanned(barcodeResults);
//         }}}
//     }, [barcodeResults]);

// return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         mode="outlined"
//         style={styles.down}
//         contentStyle={styles.button}
//         labelStyle={{ fontSize: 20 }}
//         onPress={() => navigation.navigate('BarcodeCamera')}
//       >
//         카메라로 바코드 스캔
//       </Button>
      
//       <Button
//         mode="outlined"
//         style={styles.down}
//         contentStyle={styles.button}
//         labelStyle={{ fontSize: 20 }}
//         onImageSelected={handleImageSelected}
//         onPress={openGallery}
//       >
//         갤러리 바코드 스캔
//       </Button>
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         {/* ... */}
//         {modal_view(barcodeResults, modalVisible)}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     button: {
//         height: 130, 
//         width: 300, 
//         alignItems: 'center', 
//         justifyContent: 'center',
//     },
//     down: {
//         marginBottom:60
//     }
// });



import * as React from 'react';
import { SafeAreaView, StyleSheet, View, Modal, Text } from 'react-native';

import * as DBR from 'vision-camera-dynamsoft-barcode-reader';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-paper';


import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { decode } from 'vision-camera-dynamsoft-barcode-reader';
import * as REA from 'react-native-reanimated';
import axios from 'axios';


//license 가져와잇!
import BarcodeLicense from '../../Components/BarcodeLicense';
const License = BarcodeLicense();


export default function BarcodeMain({navigation}) {

    //카메라 사용여부
    const [useCamera, setUseCamera] = React.useState(false);
    //바코드 결과값
    const [barcodeResults, setBarcodeResults] = React.useState([]);

    const [modalVisible, setModalVisible] = React.useState(false);



    React.useEffect(() => {
        (async () => {
            //라이센스 키
            await DBR.initLicense(`${License}`);
        })();
    }, []);

    React.useEffect(() => {
        if(barcodeResults !== undefined){
            if(barcodeResults[0] !== undefined){
                if(barcodeResults[0].barcodeText !== undefined){
        console.log("result~~~~~~~~~~~~~~~~~~~~");
        console.log(barcodeResults);
        console.log(barcodeResults[0]);
        console.log(barcodeResults[0].barcodeText);
        console.log("end~~~~~~~~~~~~~~~~~~~~~~~~~");

        onScanned(barcodeResults);
        }}}
    }, [barcodeResults]);


    //스캔 함수
    const onScanned = async(results) => {
        console.log(results);
        setBarcodeResults(results);

        console.log("호출은 계속 되나?");
        //카메라 사용 안함
        if (results[0]) {
            setUseCamera(false);
            // console.log(results[0]);
            // console.log(results[0].barcodeText);

            console.log("axios 호출")
            await axios.get("http://172.16.38.121:5000/barcode/search",
                {
                    params: {
                        // 약이름, page번호 요청
                        barcode: results[0].barcodeText,
                    }
                })
                .then(response => {
                    console.log(response.data);
                    setBarcodeResults(response.data[0]);
                    setModalVisible(true);
                    alert(
                        // JSON.stringify(response.data[0])
                        Object.entries(response.data[0])
                        .map(([key, value]) => `${key}: ${value}`)
                        .join("\n")
                        );
                    // modal_view(response.data[0], true);


                })
                .catch(error => {
                    console.error(error);
                });
        }
        console.log("하여튼 찍혔다!");

    }

    //앨범에서 바코드 읽기
    const decodeFromAlbum = async () => {
        let options = {
            mediaType: 'photo',
            includeBase64: true,
        }
        let response = await launchImageLibrary(options);
        if (response && response.assets) {
            if (response.assets[0].base64) {
                console.log(response.assets[0].base64);
                let results = await DBR.decodeBase64(response.assets[0].base64);
                setBarcodeResults(results);
            }
        }
    }


    const modal_view = (data, boolean_data) => {
        console.log("modal_view 호출");
        console.log(data);
        if (boolean_data) {
            console.log("modalVisible true");
            return (
                <View>
                    <Text>들어옴!</Text>
                    <Modal
                        presentationStyle={"formSheet"}
                        animationType="slide"  // 모달 애니메이션 지정
                        visible={boolean_data}  // 모달 표시 여부 지정
                        onRequestClose={() => setModalVisible(false)} // 모달 닫기 버튼 클릭 시 처리할 함수 지정, 안드로이드에서는 필수로 구현해야 합니다
                    >
                        <View>
                            <Text>상품 정보</Text>
                            {Object.entries(data).map(([key, value]) => (
                                <View key={key}>
                                    <Text>{key}</Text>
                                    <Text>{value}</Text>
                                </View>
                            ))}
                            <Button
                                title="Close"
                                onPress={() => setModalVisible(false)} // 모달 닫기 버튼 클릭 시 모달을 닫습니다
                            />
                        </View>
                    </Modal>
                </View>
            );
        }
    }



    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Button
            mode="outlined"
            style={styles.down}
            contentStyle={styles.button}
            labelStyle={{ fontSize: 20 }}
            onPress={() => navigation.navigate('BarcodeCamera')}
        >
            카메라로 바코드 스캔
        </Button>
        
        <Button
            mode="outlined"
            style={styles.down}
            contentStyle={styles.button}
            labelStyle={{ fontSize: 20 }}
            onPress={() => decodeFromAlbum()}
        >
            갤러리 바코드 스캔
        </Button>
        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {modal_view(barcodeResults, modalVisible)}
        </View> */}
            
        </View>
    );
}


const styles = StyleSheet.create({
    button: {
        height: 130, 
        width: 300, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    down: {
        marginBottom:60
    }
});


