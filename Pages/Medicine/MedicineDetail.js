// 약 상세 화면
import axios from 'axios';
import React,{useLayoutEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image, Button, Animated} from 'react-native';
import { Card } from 'react-native-paper';
import { StatusBar } from 'react-native';

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



function MedicineDetail({navigation, route}) {
  const {medicinedatitemSeq} = route.params;//다른 컴포넌트에서 넘겨받은 약 고유값
  const [medicinedetail, setMedicinedetail] = React.useState(null);
  const [medicinname, setMedicinName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false); // 로딩 상태 추가
  const [bookmark, setBookmark] = React.useState([]);//bookmark 리스트 있는지 확인

  // const [data, setDat] = React.useState([]);//

  React.useEffect(()=>{
    const Bookmark = () => {
      axios.post(`${IP}/medicine/bookmarklist`,{
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4yIiwiZXhwIjoxNjg0MDUxMDQxLCJpYXQiOjE2ODM0NDYyNDF9.BuFZu4A5VHSJHCqM89rpfWD2PzfKisITWLv9zexoefY"//걍 지정해줌
      })
      .then(function(res){
        // console.log("잘 가져왔나요?", res.data);
        setBookmark(res.data);
      })
      .catch(function(e){
        console.log("즐겨찾기 리스트 못 가져옴,,,", e)
      })

    };
    Bookmark();
  },[]);

  React.useEffect(()=>{
    const setData = async () =>{
      setIsLoading(true); // 로딩 상태 true로 변경
      try{
          const res = await axios.get(`${IP}/medicine/detail`,{
            params: {
              itemSeq: medicinedatitemSeq, // 약 고유 번호 서버로 보내서 그값만 보여줌
            },
          });
          setMedicinedetail(res.data);
          setMedicinName(res.data.itemName);
          console.log("모든 데이터 출력:", JSON.stringify(res.data, null, 2));
        } catch(error){
          console.log("Medicindetail 목록 가져오기 실패,,,", error)
        } finally {
          setIsLoading(false); //로딩 상태 false로 변경
        }
      // await axios.get(`${IP}/medicine/detail`,{
      //   params: {
      //     itemSeq: medicinedatitemSeq, // 약 고유 번호 서버로 보내서 그값만 보여줌
      //   },
      // })
      // .then(function(res){
      //   // console.log("res데이터 잘 받아왔나요?: ", res.data);
      //   // console.log("1",res.data);
      //   const data = res.data;
      //   console.log(`Data:\n${JSON.stringify(data, null, 2)}`);
      //   setMedicinedetail(res.data);
      //   setMedicinName(res.data.itemName);
      // })
      // .catch(function(error){
      //   console.log("Medicindetail 목록 가져오기 실패,,,", error)
      // })
    };
    setData();
    console.log(medicinname)
  },[]);


  // console.log("medicineDetail까지 들어오나요?", bookmark)
  // navigation 기본 제공 header이름 수정
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: medicinname, //header 약 이름 출력
      headerRight: () => <BookMarkButton medicinedetail={medicinedetail} bookmark={bookmark}/> //header오른쪽에 bookMarkbutton component 불러오기
    });
  }, [medicinname])

  // // 로딩 화면 넣기 전 코드
  // React.useEffect(()=>{
  //   const setData = async () =>{
  //     await axios.get(`${IP}/medicine/detail`,{
  //       params: {
  //         itemSeq: medicinedatitemSeq, // 약 고유 번호 서버로 보내서 그값만 보여줌
  //       },
  //     })
  //     .then(function(res){
  //       // console.log("res데이터 잘 받아왔나요?: ", res.data);
  //       // console.log("1",res.data);
  //       const data = res.data;
  //       console.log(`Data:\n${JSON.stringify(data, null, 2)}`);
  //       setMedicinedetail(res.data);
  //       setMedicinName(res.data.itemName);
  //     })
  //     .catch(function(error){
  //       console.log("Medicindetail 목록 가져오기 실패,,,", error)
  //     })
  //   }
  //   setData();
  //   console.log(medicinname)
  // },[]);



  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  

 
  return (
      // <CustomHeader title={medicinname} route={{ params: { medicinedetail } }} />
      <View style={styles.container}> 
        {isLoading ? (
          <Loading /> //로딩 중인 동안 로딩 스피너
        ) : (
        <ScrollView>  
          <View style={styles.imagebox}>
            {medicinedetail && medicinedetail.itemImage !== null ?
             <Image source={{uri:medicinedetail.itemImage}} resizeMode="contain" style={styles.image}/> :
              (medicinedetail ?
                <Image
            source={{ uri: 'https://panacea.s3.ap-northeast-2.amazonaws.com/default/medicine_default.jpg' }}
            style={styles.image}
          /> : <Image source={Medi} resizeMode="contain" style={styles.image} />)}   
          </View>

            <View style={styles.meditextbox}>
              <View>
              {/* 약 데이터 정보 뿌리는 화면 */}
                
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info}>
                     <Icon style={styles.InfoIcon} name="plus" size={20} color="black" />
                    <Text style={styles.InfoTitle}>효과 · 효능</Text>
                  </View>
                  {medicinedetail&&medicinedetail.efcyQesitm ? (
                    <Card>
                      <Card.Content>
                        {/* <Text variant="titleLarge"></Text> */}
                        <Text variant="bodyMedium">{medicinedetail.efcyQesitm}</Text>
                      </Card.Content>
                    </Card>
                    
                    // <View style={styles.Infocontent}>
                    //   <Text style={styles.Infotext}>{medicinedetail.efcyQesitm}</Text> 
                    // </View>
                    ) : (
                      <Card>
                         <Card.Content>
                            {/* <Text variant="titleLarge"></Text> */}
                            {/* <Text variant="bodyMedium">값이 없어!!</Text> */}
                            {null}
                          </Card.Content>
                      </Card>
                     
                    //   <View style={styles.Infocontent}>
                    //   <Text style={styles.Infotext}>값이 없어!</Text>
                    // </View>
                    )}
                </View>
                
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info}>
                    <Icon style={styles.InfoIcon} name="question-circle" size={20} color="black" />
                    <Text style={styles.InfoTitle}>사용법</Text>
                  </View>
                    {medicinedetail&&medicinedetail.useMethodQesitm ? (
                      <Card>
                        <Card.Content>
                          {/* <Text variant="titleLarge"></Text> */}
                          <Text variant="bodyMedium">{medicinedetail.useMethodQesitm}</Text>
                        </Card.Content>
                      </Card>
                      // <View style={styles.Infocontent}>
                      //   <Text style={styles.Infotext}>{medicinedetail.useMethodQesitm}</Text>
                      // </View>
                    ) : (
                      <Card>
                         <Card.Content>
                            {/* <Text variant="titleLarge"></Text> */}
                            {/* <Text variant="bodyMedium">값이 없어!!</Text> */}
                            {null}
                          </Card.Content>
                      </Card>
                    )}
                </View>
                
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info}>
                    <Icon style={styles.InfoIcon} name="exclamation-triangle" size={20} color="black" />
                    <Text style={styles.InfoTitle}>주의사항 - 경고</Text>
                  </View>
                  {medicinedetail && medicinedetail.atpnWarnQesitm ? (
                    <Card>
                      <Card.Content>
                        {/* <Text variant="titleLarge"></Text> */}
                        <Text variant="bodyMedium">{medicinedetail.atpnWarnQesitm}</Text>
                      </Card.Content>
                    </Card>
                    // <View style={styles.Infocontent}>
                    //   <Text style={styles.Infotext}>{medicinedetail.atpnWarnQesitm}</Text>
                    // </View>
                    ) : (
                      <Card>
                         <Card.Content>
                            {/* <Text variant="titleLarge"></Text> */}
                            {/* <Text variant="bodyMedium">값이 없어!!</Text> */}
                            {null}
                          </Card.Content>
                      </Card>
                      // <View style={styles.Infocontent}>
                      //   <Text style={styles.Infotext}>값이 없어!</Text>
                      // </View>
                    )}
                </View>
                
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info}>
                    <Icon style={styles.InfoIcon} name="exclamation-circle" size={20} color="black" />
                    <Text style={styles.InfoTitle}> 주의사항</Text>
                  </View>
                  {medicinedetail && medicinedetail.atpnQesitm ? (
                    <Card>
                      <Card.Content>
                        {/* <Text variant="titleLarge"></Text> */}
                        <Text variant="bodyMedium">{medicinedetail.atpnQesitm}</Text>
                      </Card.Content>
                    </Card>
                    // <View style={styles.Infocontent}>
                    //   <Text style={styles.Infocontent}>{medicinedetail.atpnQesitm}</Text>
                    // </View>
                    ) : (
                      <Card>
                         <Card.Content>
                            {/* <Text variant="titleLarge"></Text> */}
                            {/* <Text variant="bodyMedium">값이 없어!!</Text> */}
                            {null}
                          </Card.Content>
                      </Card>
                    //   <View style={styles.Infocontent}>
                    //   <Text style={styles.Infotext}>값이 없어!</Text>
                    // </View>
                    )}
                  {/* <Text style={styles.Infotext}>{medicinedetail&&medicinedetail.atpnQesitm}</Text> */}
                </View>
                
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info}>
                    <Icon style={styles.InfoIcon} name="refresh" size={20} color="black" />
                    <Text style={styles.InfoTitle}> 상호작용</Text>
                  </View>
                  {medicinedetail && medicinedetail.intrcQesitm ? (
                    <Card>
                      <Card.Content>
                        {/* <Text variant="titleLarge"></Text> */}
                        <Text variant="bodyMedium">{medicinedetail.intrcQesitm}</Text>
                      </Card.Content>
                    </Card>
                      // <View style={styles.Infocontent}>
                      //   <Text style={styles.Infocontent}>{medicinedetail.intrcQesitm}</Text>
                      // </View>
                    ) : (
                      <Card>
                         <Card.Content>
                            {/* <Text variant="titleLarge"></Text> */}
                            {/* <Text variant="bodyMedium">값이 없어!!</Text> */}
                            {null}
                          </Card.Content>
                      </Card>
                      // <View style={styles.Infocontent}>
                      //   <Text style={styles.Infotext}>값이 없어!</Text>
                      // </View>
                    )}
                  {/* <Text style={styles.Infotext}>{medicinedetail&&medicinedetail.intrcQesitm}</Text> */}
                </View>
                
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info}>
                    <Icon style={styles.InfoIcon} name="shield" size={20} color="black" />
                    <Text style={styles.InfoTitle}> 부작용</Text>
                  </View>
                  {medicinedetail && medicinedetail.seQesitm ? (
                    <Card>
                      <Card.Content>
                        {/* <Text variant="titleLarge"></Text> */}
                        <Text variant="bodyMedium">{medicinedetail.seQesitm}</Text>
                      </Card.Content>
                    </Card>
                    // <View style={styles.Infocontent}>
                    //   <Text style={styles.Infocontent}>{medicinedetail.seQesitm}</Text>
                    //   </View>
                    ) : (
                    //   <View style={styles.Infocontent}>
                    //   <Text style={styles.Infotext}>값이 없어!</Text>
                    // </View>
                    <Card>
                      <Card.Content>
                        {/* <Text variant="titleLarge"></Text> */}
                        {/* <Text variant="bodyMedium">값이 없어!!</Text> */}
                        {null}
                      </Card.Content>
                    </Card>
                    )}
                  {/* <Text style={styles.Infotext}>{medicinedetail&&medicinedetail.seQesitm}</Text> */}
                </View>
                
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info}>
                    <Icon style={styles.InfoIcon} name="archive" size={20} color="black" />
                    <Text style={styles.InfoTitle}> 보관법</Text>
                  </View>
                  {medicinedetail&&medicinedetail.depositMethodQesitm ? (
                    <Card>
                      <Card.Content>
                        {/* <Text variant="titleLarge"></Text> */}
                        <Text variant="bodyMedium">{medicinedetail.depositMethodQesitm}</Text>
                      </Card.Content>
                    </Card>
                    // <View style={styles.Infocontent}>
                    //   <Text>{medicinedetail.depositMethodQesitm}</Text>
                    //   </View>
                    ) : (
                    //   <View style={styles.Infocontent}>
                    //   <Text style={styles.Infotext}>값이 없어!</Text>
                    // </View>
                    <Card>
                         <Card.Content>
                            {/* <Text variant="titleLarge"></Text> */}
                            {/* <Text variant="bodyMedium">값이 없어!!</Text> */}
                            {null}
                          </Card.Content>
                      </Card>
                    )}
                </View>
                
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info}>
                  <Icon style={styles.InfoIcon} name="building" size={20} color="black" />
                    <Text style={styles.InfoTitle}> 업체명</Text>
                  </View>
                  {medicinedetail&&medicinedetail.entpName ? (
                    <Card>
                      <Card.Content>
                        {/* <Text variant="titleLarge"></Text> */}
                        <Text variant="bodyMedium">{medicinedetail.entpName}</Text>
                      </Card.Content>
                    </Card>
                    // <View style={styles.Infocontent}>
                    //   <Text>{medicinedetail.entpName}</Text>
                    //   </View>
                    ) : (
                      <Card>
                         <Card.Content>
                            {/* <Text variant="titleLarge"></Text> */}
                            {/* <Text variant="bodyMedium">값이 없어!!</Text> */}
                            {null}
                          </Card.Content>
                      </Card>
                    //   <View style={styles.Infocontent}>
                    //   <Text style={styles.Infotext}>값이 없어!</Text>
                    // </View>
                    )}
                </View>
                
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info}>
                    <Icon style={styles.InfoIcon} name="list-ul" size={20} color="black" />
                    <Text style={styles.InfoTitle}> 품목기준코드</Text>
                  </View>
                  {medicinedetail&&medicinedetail.itemSeq ? (
                    <Card>
                      <Card.Content>
                        {/* <Text variant="titleLarge"></Text> */}
                        <Text variant="bodyMedium">{medicinedetail.itemSeq}</Text>
                      </Card.Content>
                    </Card>
                    // <View style={styles.Infocontent}>
                    //   <Text>{medicinedetail.itemSeq}</Text>
                    //   </View>
                    ) : (
                      <Card>
                         <Card.Content>
                            {/* <Text variant="titleLarge"></Text> */}
                            {/* <Text variant="bodyMedium">값이 없어!!</Text> */}
                            {null}
                          </Card.Content>
                      </Card>
                    //   <View style={styles.Infocontent}>
                    //   <Text style={styles.Infotext}>값이 없어!</Text>
                    // </View>
                    )}
                </View>

                <View style={styles.Informationcontainer}>
                  <View style={styles.Info}>
                    <Icon style={styles.InfoIcon} name="check-square-o" size={20} color="black" />
                    <Text style={styles.InfoTitle}> 공개일자</Text>
                  </View>
                  {medicinedetail&&medicinedetail.openDe ? (
                    <Card>
                      <Card.Content>
                        {/* <Text variant="titleLarge"></Text> */}
                        <Text variant="bodyMedium">{medicinedetail.openDe}</Text>
                      </Card.Content>
                    </Card>
                    // <View style={styles.Infocontent}>
                    //   <Text>{medicinedetail.openDe}</Text>
                    //   </View>
                    ) : (
                      <Card>
                         <Card.Content>
                            {/* <Text variant="titleLarge"></Text> */}
                            {/* <Text variant="bodyMedium">값이 없어!!</Text> */}
                            {null}
                          </Card.Content>
                      </Card>
                      // <View style={styles.Infocontent}>
                      //   <Text style={styles.Infotext}>값이 없어!</Text>
                      // </View>
                    )}
                </View>

                <View style={styles.Informationcontainer}>
                  <View style={styles.Info}>
                    <Icon style={styles.InfoIcon} name="edit" size={20} color="black" />
                    <Text style={styles.InfoTitle}> 수정일자</Text>
                  </View>
                  {medicinedetail&&medicinedetail.updateDe ? (
                    <Card>
                      <Card.Content>
                        {/* <Text variant="titleLarge"></Text> */}
                        <Text variant="bodyMedium">{medicinedetail.updateDe}</Text>
                      </Card.Content>
                    </Card>
                    // <View style={styles.Infocontent}>
                    //   <Text>{medicinedetail.updateDe}</Text>
                    //   </View>
                    ) : (
                      <Card>
                         <Card.Content>
                            {/* <Text variant="titleLarge"></Text> */}
                            {/* <Text variant="bodyMedium">값이 없어!!</Text> */}
                            {null}
                          </Card.Content>
                      </Card>
                    //   <View style={styles.Infocontent}>
                    //   <Text style={styles.Infotext}>값이 없어!</Text>
                    // </View>
                    )}
                </View>

              </View>
            </View>
        </ScrollView> 

        )}
        
      </View>
  );
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    backgroundColor:'#F2F2F2',
    // paddingTop: StatusBar.currentHeight
    
  },
  title: {
    // borderBottomWidth:1,
    // borderBottomColor: 'black',
    width:'93%'
    // marginBottom: '15%',
  },
  titlebutton:{
    borderBottomWidth:1,
    // borderColor:"blue",
    flexDirection: 'row',
    marginBottom: '15%',
  },
  imagebox:{
    flex:1,
    // borderWidth:1,
    // borderColor:'black',
    // marginBottom:'10%',
  },
  image:{
    borderWidth:1,
    borderColor:'#eaeaea',
    width: '100%',
    height: 350, // 원하는 세로 크기로 변경해주세요
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50,
    // borderRadius:50,
    // width: '100%',
    // height: 150,
    // resizeMode: "contain"
  },
  meditextbox:{
    flex:1,
    backgroundColor:'#F2F2F2',
    width:width,
    padding:20,
  },
  Informationcontainer:{
    flex:1,
    marginBottom:40,
  },
  Info:{
    flex:1,
    flexDirection: 'row',
    // borderWidth:1,
    alignItems:"center", 
    // justifyContent: "center",
  },
  InfoTitle:{
    marginTop:10,
    marginBottom:15,
  },
  InfoIcon:{
    borderWidth:1,
    borderColor:'#F2F2F2',
    padding:10,
  },
  Infocontent:{
    flex:1,  
    backgroundColor:'red', 
    alignItems:"center", 
    justifyContent: "center",
    height:90,
    padding:10, 
    borderRadius:20,
  },
  Infotext:{
    textAlignVertical: 'center'
  },



  // meditexttitle:{
  //   // borderWidth:1,
  //   // borderColor:'#800000',
  //   marginBottom:'5%',
  // },
  // meditextcontent:{
  //   // borderWidth:1,
  //   // borderColor:'#B22222',
  // }
  
});

export default MedicineDetail;

