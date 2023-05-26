// 바코드 약 상세 화면
import axios from 'axios';
import React, { useLayoutEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image, Button, Animated, AccessibilityInfo, UIManager, findNodeHandle } from 'react-native';
import { Card } from 'react-native-paper';
import { StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
//아이콘
import Icon from 'react-native-vector-icons/FontAwesome';

// image import
import Medi from '../../assets/medi.png';

// 즐겨찾기 icon
import BookMarkButton from '../../Components/BookMarkButton';

// 로딩
import Loading from '../../Components/Loading';

// 서버 포트
import ServerPort from '../../Components/ServerPort';
const IP = ServerPort();

// 화면 비율
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const screenWidth = Dimensions.get('window').width;

function BarcodeMedicineDetail({ route }) {
    const navigation = useNavigation();

    // const [isLoading, setIsLoading] = React.useState(false); // 로딩 상태 추가

    const [bar, setBar] = React.useState([]);
    const [barname, setBarname] = React.useState('');
    const [barme, setBarme] = React.useState('');
    const [barimage, setBarimage] = React.useState('');
    
    React.useEffect(() => {
      setBar(route.params.medicineBarcodeData);
      setBarname(route.params.medicineBarcodeData[0])
      setBarme(route.params.medicineBarcodeData[1])
      setBarimage(route.params.medicineBarcodeData[2])
    }, []);
  
    return (
      <View style={styles.container}>
        <View style={styles.imagebox}>
            {barimage !== null ?
              <Image source={{ uri: barimage }} resizeMode="contain" style={styles.image} /> :
              <LottieView
                source={require('../../assets/search_empty.json') /** 움직이는 LottieView */}
                style={styles.Lotteimage}
                autoPlay loop
              />
            }
        </View>
        <View style={styles.meditextbox}>
            <View style={styles.Informationcontainer}>
                {barname ? (
                    <View >
                    <View style={styles.Info} accessible={true}>
                        <Icon style={styles.InfoIcon} name="edit" size={20} color="black" />
                        <Text style={styles.InfoTitle}>약 이름</Text>
                    </View>
                    <View>
                        <Card>
                        <Card.Content>
                            <Text variant="bodyMedium">{barname}</Text>
                        </Card.Content>
                        </Card>
                    </View>
                    </View>
                ) : null}
            </View>
            <View style={styles.Informationcontainer}>
                {barme ? (
                    <View >
                    <View style={styles.Info} accessible={true}>
                        <Icon style={styles.InfoIcon} name="edit" size={20} color="black" />
                        <Text style={styles.InfoTitle}>제조사</Text>
                    </View>
                    <View>
                        <Card>
                        <Card.Content>
                            <Text variant="bodyMedium">{barme}</Text>
                        </Card.Content>
                        </Card>
                    </View>
                    </View>
                    // <Text variant="bodyMedium">{barme}</Text>
                ) : null}
            </View>
        </View>
      </View>
      
    );
  }

  const styles = StyleSheet.create({
    headerRightContainer: {
      marginRight: 20
    },
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
  
    },
    title: {
      width: '93%'
    },
    titlebutton: {
      borderBottomWidth: 1,
      flexDirection: 'row',
      marginBottom: '15%',
    },
    imagebox: {
      flex: 1,
    },
    image: {
      borderWidth: 1,
      borderColor: '#eaeaea',
      width: '100%',
      height: 350, // 원하는 세로 크기로 변경해주세요
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
    },
    Lotteimage: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#eaeaea',
      width: '100%',
      height: 'auto', // 원하는 세로 크기로 변경해주세요
    },
    meditextbox: {
      flex: 1,
      backgroundColor: '#F2F2F2',
      width: width,
      padding: 20,
    },
    Informationcontainer: {
      flex: 1,
      marginBottom: 40,
    },
    Info: {
      flexDirection: 'row',
      alignItems: "center",
    },
    InfoTitle: {
      marginTop: 10,
      marginBottom: 15,
    },
    InfoIcon: {
      borderWidth: 1,
      borderColor: '#F2F2F2',
      padding: 10,
    },
    Infocontent: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: "center",
      justifyContent: "center",
      height: 90,
      padding: 10,
      borderRadius: 20,
    },
    Infotext: {
      textAlignVertical: 'center'
    },
  });

export default BarcodeMedicineDetail;