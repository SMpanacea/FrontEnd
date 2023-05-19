import * as React from 'react';
import { SafeAreaView, StyleSheet, View, Modal, Text } from 'react-native';

import * as DBR from 'vision-camera-dynamsoft-barcode-reader';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-paper';


import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { decode } from 'vision-camera-dynamsoft-barcode-reader';
import * as REA from 'react-native-reanimated';
import axios from 'axios';


//느낌상 공간주는 역할
// const Separator = () => (
//     <View style={styles.separator} />
// );


export default function Barcode() {

    //카메라 사용여부
    const [useCamera, setUseCamera] = React.useState(false);
    //바코드 결과값
    const [barcodeResults, setBarcodeResults] = React.useState([]);
    //카메라 허가 여부
    const [hasPermission, setHasPermission] = React.useState(false);
    //프레임 너비
    const [frameWidth, setFrameWidth] = React.useState(720);
    //프레임 높이
    const [frameHeight, setFrameHeight] = React.useState(1280);
    //카메라 장치
    const devices = useCameraDevices();
    //후면 카메라 선택
    const device = devices.back;

    const [modalVisible, setModalVisible] = React.useState(false);



    React.useEffect(() => {
        (async () => {
            //라이센스 키
            await DBR.initLicense("DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==");
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
    }, []);

    React.useEffect(() => {
        onScanned(barcodeResults);
    }, [barcodeResults]);


    //스캔 함수
    const onScanned = (results) => {
        console.log(results);
        setBarcodeResults(results);

        console.log("호출은 계속 되나?");
        //카메라 사용 안함
        if (results[0]) {
            setUseCamera(false);
            // console.log(results[0]);
            // console.log(results[0].barcodeText);

            console.log("axios 호출")
            axios.get("http://172.16.37.98:5000/barcode/search",
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

    //프레임 단위로 작동 함수
    const frameProcessor = useFrameProcessor((frame) => {
        'worklet'
        const config = {};
        config.template = "{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_ONED\"],\"ExpectedBarcodesCount\": \"0\",\"Description\":\"\",\"Name\":\"Settings\",\"LocalizationModes\":[\"LM_SCAN_DIRECTLY\"]},\"Version\":\"3.0\"}";

        config.rotateImage = false;
        const results = decode(frame, config)

        console.log("height: " + frame.height);
        console.log("width: " + frame.width);
        console.log(results);
        REA.runOnJS(setBarcodeResults)(results);
        REA.runOnJS(setFrameWidth)(frame.width);
        REA.runOnJS(setFrameHeight)(frame.height);
    }, [])




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
        <SafeAreaView style={styles.container}>
            {/* {modalVisible && (
                <Modal
                    style={{ height: 300 }}
                    presentationStyle= "formSheet"
                    animationType="fade"  // 모달 애니메이션 지정
                    visible={modalVisible}  // 모달 표시 여부 지정
                    onRequestClose={() => setModalVisible(false)} // 모달 닫기 버튼 클릭 시 처리할 함수 지정, 안드로이드에서는 필수로 구현해야 합니다
                >
                    <View  style={{ height: 300 }}>
                        <Text>상품 정보</Text>
                        {Object.entries(barcodeResults).map(([key, value]) => (
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
            )} */}
            {/* 카메라 사용중일때 띄우는 화면 */}
            {useCamera && (
                <>
                    {device != null &&
                        hasPermission && (
                            <>
                                <Camera
                                    style={{ width: '100%', height: '80%' }}
                                    device={device}
                                    isActive={true}
                                    frameProcessor={frameProcessor}
                                    frameProcessorFps={1}
                                />
                            </>)}

                    {/* <Button
                            icon="close"
                            mode='elevated'
                            onPress={() => setUseCamera(false)}
                        >
                            Close
                        </Button> */}

                </>

            )}
            {/* 카메라 사용안하고 있을때 띄우는 화면  */}
            {/* {!useCamera && ( */}
            <View
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 50, justifyContent: 'flex-end', alignItems: 'center' }}
            >
                <View style={{ alignItems: "center" }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            icon="camera"
                            mode='contained-tonal'
                            onPress={() => setUseCamera(true)}
                            style={{ marginRight: 8 }}
                        >
                            Scan Camera
                        </Button>
                        <Button
                            icon="close"
                            mode='contained-tonal'
                            onPress={() => setUseCamera(false)}
                        >
                            Close
                        </Button>
                        <Button
                            icon="image"
                            mode='contained-tonal'
                            onPress={() => decodeFromAlbum()}
                        >
                            Read Album
                        </Button>
                    </View>

                    {/* {barcodeResults.map((barcode, idx) => (
                        <Text style={StyleSheet.barcodeText} key={idx}>
                            {barcode.barcodeFormat + ": " + barcode.barcodeText}
                        </Text>
                    ))} */}
                </View>
            </View>
            {/* )} */}
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    separator: {
        marginVertical: 4,
    },
    switchView: {
        alignItems: 'center',
        flexDirection: "row",
    },
    barcodeText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
});





