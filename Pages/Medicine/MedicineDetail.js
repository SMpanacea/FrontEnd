// 약 상세 화면
import axios from 'axios';
import React,{useLayoutEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image, Button, Animated} from 'react-native';
import { StatusBar } from 'react-native';

// image import
import Medi from '../../assets/medi.png';

// 즐겨찾기 icon
import BookMarkButton from '../../Components/BookMarkButton';

// //약 정보
// import Meditext from '../../Components/MediText';

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
                <View style={{flex:1,}}>
                  <Text style={{margin:10,}}>효능</Text>
                  {medicinedetail&&medicinedetail.efcyQesitm ? (
                    <View style={{
                      flex:1, 
                      backgroundColor:'red', 
                      alignItems:"center", 
                      justifyContent: "center",
                      height:90,
                      padding:10, 
                      borderRadius:20,
                      }}
                    >
                      <Text style={{ textAlignVertical: 'center' }}>{medicinedetail.efcyQesitm}</Text> 
                    </View>
                    ) : (
                      <Text>값이 없어!</Text>
                    )}
                </View>
                <View>
                  <Text>사용법</Text>
                  {medicinedetail&&medicinedetail.useMethodQesitm ? (
                      <Text>{medicinedetail.useMethodQesitm}</Text>
                    ) : (
                      <Text>값이 없어!</Text>
                    )}
                </View>
                <View>
                  <Text>주의사항 - 경고</Text>
                  {medicinedetail && medicinedetail.atpnWarnQesitm ? (
                      <Text>{medicinedetail.atpnWarnQesitm}</Text>
                    ) : (
                      <Text>값이 없어!</Text>
                    )}
                </View>
                <View>
                  <Text> 주의사항</Text>
                  {medicinedetail && medicinedetail.atpnWarnQesitm ? (
                      <Text>{medicinedetail.atpnWarnQesitm}</Text>
                    ) : (
                      <Text>값이 없어!</Text>
                    )}
                  <Text>{medicinedetail&&medicinedetail.atpnQesitm}</Text>
                </View>
                <View>
                  <Text> 상호작용</Text>
                  {medicinedetail && medicinedetail.atpnWarnQesitm ? (
                      <Text>{medicinedetail.atpnWarnQesitm}</Text>
                    ) : (
                      <Text>값이 없어!</Text>
                    )}
                  <Text>{medicinedetail&&medicinedetail.intrcQesitm}</Text>
                </View>
                <View>
                  <Text> 부작용</Text>
                  {medicinedetail && medicinedetail.atpnWarnQesitm ? (
                      <Text>{medicinedetail.atpnWarnQesitm}</Text>
                    ) : (
                      <Text>값이 없어!</Text>
                    )}
                  <Text>{medicinedetail&&medicinedetail.seQesitm}</Text>
                </View>
                <View>
                  <Text> 보관법</Text>
                  {medicinedetail&&medicinedetail.depositMethodQesitm ? (
                      <Text>{medicinedetail.depositMethodQesitm}</Text>
                    ) : (
                      <Text>값이 없어!</Text>
                    )}
                </View>
                <View>
                  <Text> 업체명</Text>
                  {medicinedetail&&medicinedetail.entpName ? (
                      <Text>{medicinedetail.entpName}</Text>
                    ) : (
                      <Text>값이 없어!</Text>
                    )}
                </View>
                <View>
                  <Text> 품목기준코드</Text>
                  {medicinedetail&&medicinedetail.itemSeq ? (
                      <Text>{medicinedetail.itemSeq}</Text>
                    ) : (
                      <Text>값이 없어!</Text>
                    )}
                </View>
                <View>
                  <Text> 공개일자</Text>
                  {medicinedetail&&medicinedetail.openDe ? (
                      <Text>{medicinedetail.openDe}</Text>
                    ) : (
                      <Text>값이 없어!</Text>
                    )}
                </View>
                <View>
                  <Text> 수정일자</Text>
                  {medicinedetail&&medicinedetail.updateDe ? (
                      <Text>{medicinedetail.updateDe}</Text>
                    ) : (
                      <Text>값이 없어!</Text>
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
    height: 400, // 원하는 세로 크기로 변경해주세요
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
  meditexttitle:{
    // borderWidth:1,
    // borderColor:'#800000',
    marginBottom:'5%',
  },
  meditextcontent:{
    // borderWidth:1,
    // borderColor:'#B22222',
  }
  
});

export default MedicineDetail;

