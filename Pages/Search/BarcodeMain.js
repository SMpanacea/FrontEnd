//BarcodeMain에서 갤러리 들어가서 바코드 검사하는 코드까지 있는 페이지임

import * as React from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { TouchableRipple} from 'react-native-paper';
import * as DBR from 'vision-camera-dynamsoft-barcode-reader';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { MainButtonStyle } from '../css/MainButtonCSS'


// 서버
import ServerPort from '../../Components/ServerPort';
const IP = ServerPort();

//license 가져와잇!
import BarcodeLicense from '../../Components/BarcodeLicense';
const License = BarcodeLicense();


//아이콘
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Card } from 'react-native-paper';

// 로딩
import Loading from '../../Components/Loading';

import Search from '../../Components/Search';
import LoadingScreen from '../PillDetection/LoadingScreen';

export default function BarcodeMain({navigation}) {
    //카메라 사용여부
    const [useCamera, setUseCamera] = React.useState(false);
    //바코드 결과값
    const [barcodeResults, setBarcodeResults] = React.useState([]);
    //바코드 결과값 없을 경우
    const [nobar, setNobar] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [check, setCheck] = React.useState(false);

    //로딩
    const [isLoading, setIsLoading] = React.useState(false); // 로딩 보여줄지 말지 상태 관리

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel='뒤로가기'>
                  <Image source={require('../../assets/left.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
              </TouchableOpacity>
          ),
          headerTitle: "바코드 검색",
        });
      }, [])

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

                  onScanned(barcodeResults);
                }
              }
          }
    }, [barcodeResults]);

    //alert에서 보여줄 값
    const [pnm, setPnm] = React.useState(""); //제품명
    const [bnm, setBnm] = React.useState(""); //제조사명
    const [dcnm, setDcnm] = React.useState(""); //식품유형
    const [daycnt, setDaycnt] = React.useState(""); //유통/소비기한
    const [datatype,setDatatype] = React.useState("")//datatype저장

    //alert에서 보여줄 값(약)
    const [barname, setBarname] = React.useState(''); //약 이름
    const [barme, setBarme] = React.useState(''); //제조사
    const [barimage, setBarimage] = React.useState(''); //약 사진

   
    
    // 스캔 함수
    const onScanned = async (results) => {
      console.log(results);
      setBarcodeResults(results); //바코드 결과값 담아줌
      setIsLoading(true); // 로딩 화면 표시

      // 카메라 사용 안함
      if (results[0]) {
        console.log("axios 호출");
        try {
          const response = await axios.get(`${IP}/barcode/search`, {
            params: {
              // 약이름, page번호 요청
              barcode: results[0].barcodeText,
            },
          });
          if (response.data.data_type === "food") {
            console.log("food로 들어와?");
            console.log("이름 가져오나?", response.data);
            setPnm(response.data.data[0].PRDLST_NM);
            setBnm(response.data.data[0].BSSH_NM);
            setDcnm(response.data.data[0].PRDLST_DCNM);
            setDaycnt(response.data.data[0].POG_DAYCNT);
            setDatatype(response.data.data_type);
            setBarcodeResults(response.data.data[0]);
            setModalVisible(!modalVisible);
            setCheck(true);
          } else if (response.data.data_type === "medicine") {
            console.log("약", response.data.data);
            setBarname(response.data.data[0]);
            setBarme(response.data.data[1]);
            setBarimage(response.data.data[2]);
            setDatatype(response.data.data_type);
            setModalVisible(!modalVisible);
            setCheck(true);
          } else {
            console.log("여기로 와?");
            console.log(response.data);
            setNobar(true);
            setModalVisible(!modalVisible);
            setCheck(true);
          }
        } catch (error) {
          console.error("뭐선 에러임",error);
        } finally {
          setIsLoading(false); // 로딩 화면 숨김
        }
      }
      console.log("스캔이 완료되었습니다!");
    };

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
                setIsLoading(true);
            }
        }
    }

    if(modalVisible){
        console.log("데이터 타입 잘 가져와?", datatype)
        console.log("nobar", nobar)
          return (
            <View >
              <Modal
                presentationStyle={"formSheet"}
                animationType="slide"  // 모달 애니메이션 지정
                onRequestClose={() => setModalVisible(false)} // 모달 닫기 버튼 클릭 시 처리할 함수 지정, 안드로이드에서는 필수로 구현해야 합니다
                transparent={true} // 투명한 모달로 설정        
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    {nobar === true ? (
                      <View>
                        <Card>
                        <Card.Content>
                          <Text variant="bodyMedium">바코드에 등록된 정보가 없습니다.</Text>
                        </Card.Content>
                      </Card>
                        {/* 모달 닫기 버튼 클릭 시 모달을 닫는 동시에 카메라 켜기*/}
                        <TouchableRipple style={styles.button} onPress={() => { setModalVisible(false);setUseCamera(true);setNobar(!nobar);}}>
                          <Icon name="times" style={styles.Icon} color='black' size={50} accessibilityLabel='닫기' accessibilityRole='button'/>
                        </TouchableRipple>
                      </View>
                    ):(
                    <View>
                      {/* 음식일 경우 */}
                      { datatype === "food" ? (
                        <View>
                          {pnm && pnm ? (
                            <View style={{marginBottom:10,}}>
                              <View style={styles.Info2}>
                                <Icon style={styles.InfoIcon} name="box" size={20} color="black" />
                                <Text style={styles.InfoTitle}>제품명</Text>
                              </View>
                              <Card>
                                <Card.Content>
                                  <Text variant="bodyMedium">{pnm}</Text>
                                </Card.Content>
                              </Card>
                            </View>
                          ) : null}
                        {bnm && bnm ? (
                            <View style={{marginBottom:10,}}>
                              <View style={styles.Info2}>
                                <Icon style={styles.InfoIcon} name="boxes" size={20} color="black" />
                                <Text style={styles.InfoTitle}>제조사명</Text>
                              </View>
                              <Card>
                                <Card.Content>
                                  <Text variant="bodyMedium">{bnm}</Text>
                                </Card.Content>
                              </Card>
                            </View>
                        ) : null}
  
                        {dcnm && dcnm ? (
                            <View style={{marginBottom:10,}}>
                              <View style={styles.Info2}>
                                <Icon style={styles.InfoIcon} name="bread-slice" size={20} color="black" />
                                <Text style={styles.InfoTitle}>식품 유형</Text>
                              </View>
                              <Card>
                                <Card.Content>
                                  <Text variant="bodyMedium">{dcnm}</Text>
                                </Card.Content>
                              </Card>
                            </View>
                        ) : null}
                        {daycnt && daycnt ? (
                            <View style={{marginBottom:10,}}>
                              <View style={styles.Info2}>
                                <Icon style={styles.InfoIcon} name="calendar-day" size={20} color="black" />
                                <Text style={styles.InfoTitle}>유통/소비기한</Text>
                              </View>
                              <Card>
                                <Card.Content>
                                  <Text variant="bodyMedium">{daycnt}</Text>
                                </Card.Content>
                              </Card>
                            </View>
                        ) : null}
  
                          {/* 모달 닫기 버튼 클릭 시 모달을 닫는 동시에 카메라 켜기*/}
                          <TouchableRipple style={styles.button} onPress={() => { setModalVisible(false);setUseCamera(true);}}>
                            <Icon name="times" style={styles.Icon} color='black' size={50} accessibilityLabel='닫기' accessibilityRole='button'/>
                          </TouchableRipple>
  
                        </View>
                      ): null}

                      {/* 약일 경우 */}
                      { datatype === "medicine" ? (
                      <View>
                        <ScrollView 
                        showsVerticalScrollIndicator={false} // 스크롤바 표시 여부 설정 없애버림
                        >
                        <View style={styles.imagebox}>
                          {barimage !== null ?
                          <View style={{marginBottom:10,}}>
                            <View style={styles.Info2}>
                              <Icon style={styles.InfoIcon} name="image" size={20} color="black" />
                              <Text style={styles.InfoTitle}>이미지</Text>
                            </View>
                            <Image source={{ uri: barimage }} resizeMode="contain" style={styles.image} />
                          </View>
                             :
                            <LottieView
                              source={require('../../assets/search_empty.json') /** 움직이는 LottieView */}
                              style={styles.Lotteimage}
                              autoPlay loop
                            />
                          }
                      </View>
                          {barname ? (
                            <View style={{marginBottom:10,}}>
                              <View style={styles.Info2}>
                                <Icon style={styles.InfoIcon} name="box" size={20} color="black" />
                                <Text style={styles.InfoTitle}>제품명</Text>
                              </View>
                              <Card>
                                <Card.Content>
                                  <Text variant="bodyMedium">{barname}</Text>
                                </Card.Content>
                              </Card>
                            </View>
                          ) : null}
                         {barme ? (
                            <View style={{marginBottom:10,}}>
                              <View style={styles.Info2}>
                                <Icon style={styles.InfoIcon} name="boxes" size={20} color="black" />
                                <Text style={styles.InfoTitle}>제조사명</Text>
                              </View>
                              <Card>
                                <Card.Content>
                                  <Text variant="bodyMedium">{barme}</Text>
                                </Card.Content>
                              </Card>
                            </View>
                          ) : null}
                        
                          {/* 모달 닫기 버튼 클릭 시 모달 닫기*/}
                          <TouchableRipple style={styles.button} onPress={() => { setModalVisible(false);}}>
                            <Icon name="times" style={styles.Icon} color='black' size={50} accessibilityLabel='닫기' accessibilityRole='button'/>
                          </TouchableRipple>
                        </ScrollView>
                      </View>
                    ): null}
                    </View>
                    )}
                  </View>
                </View>
              </Modal>
            </View>
          );
      }

    return (
        <View style={{ flex: 1}}>
                {/*로딩 표시*/}
            {isLoading && isLoading ?
              <Loading/>
            :(
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                 <TouchableOpacity style={[MainButtonStyle.button, MainButtonStyle.down]} onPress={() => navigation.navigate('BarcodeCamera')}>

                    <View style={MainButtonStyle.textContainer}>
                        <Text style={MainButtonStyle.text}>카메라로 바코드 스캔하기 &gt; </Text>
                        <Text style={MainButtonStyle.subText}>카메라로 바코드 스캔하여 검색</Text>
                    </View>
                    <LottieView
                        source={require('../../assets/scan.json') /** 움직이는 LottieView */}
                        style={MainButtonStyle.CameraSerachMainButton}
                        autoPlay loop
                    />
                    </TouchableOpacity>

                    <TouchableOpacity style={[MainButtonStyle.button, MainButtonStyle.down]} onPress={() => decodeFromAlbum()}>

                    <View style={MainButtonStyle.textContainer}>
                        <Text style={MainButtonStyle.text}>갤러리로 바코드 스캔하기 &gt; </Text>
                        <Text style={MainButtonStyle.subText}>갤러리로 사진 선택 후 바코드 스캔하여 검색</Text>
                    </View>
                    <LottieView
                        source={require('../../assets/barcode.json') /** 움직이는 LottieView */}
                        style={MainButtonStyle.barcode}
                        autoPlay loop
                    />
                    </TouchableOpacity>

              </View>
             
            )}
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
    },
    container: {
        flex: 1,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    barcodeText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1,
      marginBottom: 10,
      marginTop: 20,
      borderRadius: 5,
      height: 150,
      padding: 10,
      elevation: 2,
    },
    Info: {
      flex: 1,
      flexDirection: 'row',
      alignItems: "center",
    },
    Info2: {
      flexDirection: 'row',
      alignItems: "center",
    },
    InfoTitle: {
      marginTop: 10,
      marginBottom: 15,
    },
    InfoIcon: {
      padding: 10,
    },
    Icon:{
      // borderWidth:1,
      width:100,
      marginLeft:60,
      
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 30,
      width:'80%',
      // alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    imagebox: {
      flex: 1,
    },
    image: {
      borderWidth: 1,
      borderColor: '#eaeaea',
      width: '100%',
      height: 150, // 원하는 세로 크기로 변경해주세요
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
    },
    Lotteimage: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#eaeaea',
      width: '100%',
      height: 'auto', // 원하는 세로 크기로 변경해주세요
    },
    loadingcontainer:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
});


