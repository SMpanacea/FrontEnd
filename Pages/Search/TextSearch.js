// 글로 검색할 때 보이는 화면
import React from 'react';
import axios from 'axios';
import {StyleSheet, View, ScrollView, Modal, Image, Animated, TextInput, TouchableOpacity} from 'react-native';
import { Text, TouchableRipple, Button,  } from 'react-native-paper';
// navigation
import 'react-native-gesture-handler';

// 외부에서 불러온 것들
import Search from '../../Components/Search';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import Card from '../../Components/Card';


// 로딩
import Loading from '../../Components/Loading';


import {theme} from '../../theme';

// 서버
import ServerPort from '../../Components/ServerPort';

// import { black } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
const IP = ServerPort();
let count = 0

// function TextSearch({navigation}) {
//   const [input, setInput] = React.useState("");//내가 검색
//   const [medicinedata, setMedicinedata] = React.useState([]);//서버에서 가져온 데이터 내보내기
//   const [page, setPage] = React.useState(1);//다음 page 번호

//   //검색 axios  // 약이름, page번호 요청
//   const search = async (keyword, pageNo) => {
//     // 검색어와 페이지 번호를 매개변수로 받는 수정된 search 함수
//     await axios.get(`${IP}/medicine/search`, {
//       params: {
//         itemName: keyword,
//         pageNo: pageNo,
//       },
//     })
//       .then(function(res) {
//         setMedicinedata(res.data.items);
//       })
//       .catch(function(error) {
//         console.log("Medicine 이름 목록 가져오기 실패", error);
//       });
//   };

//   // React.useEffect(()=>{
//   //   search();
//   // },[]);
//   React.useEffect(() => {
//     // 컴포넌트 마운트 시 초기 데이터 요청
//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     // 전체 데이터를 가져오는 함수 (TextInput 값이 없을 때 호출)
//     await axios.get(`${IP}/medicine/search`, {
//       params: {
//         pageNo: page,
//       },
//     })
//       .then(function(res) {
//         setMedicinedata(res.data.items);
//       })
//       .catch(function(error) {
//         console.log("Medicine 이름 목록 가져오기 실패", error);
//       });
//   };

//   // 검색 버튼 클릭 이벤트 핸들러
//   const handleButtonPress = () => {
//     if (input) {
//       search(input);
//     } else {
//       // 검색어가 없는 경우 전체 데이터 요청
//       fetchAllData();
//     }
//   };


//   const handleNextPage = () => {
//     // 다음 페이지로 이동하는 함수
//     if (input) {
//       setPage(page + 1);
//       search(input, page + 1);
//     } else {
//       setPage(page + 1);
//       fetchAllData();
//     }
//   };

  
//   React.useEffect(() => {
//     // 초기 페이지 로딩 시 데이터 가져오기
//     if (input) {
//       search(input, page);
//     } else {
//       fetchAllData();
//     }
//   }, [input]);

//   const handleClearInput = async () => {
//     setInput("");
//     setMedicinedata([]); // setMedicinedata([])를 먼저 호출하면 input 값이 변경되기 전에 state 값이 변경되므로 setInput("") 이후에 호출합니다.
//     await search();
//   }

  
//   //로딩 useEffect
//   const [isLoading, setIsLoading] = React.useState(false); // 로딩 상태 추가

//   //페이지 랜더링
//   const handlePageChange = (newPage) => {
//     // console.log("페이지 바뀜?",newPage)
//     setPage(newPage);
//   }
//   React.useEffect(() => {
//       const setData = async () => {
//         setIsLoading(true); // 로딩 상태 true 로 변경
//         try {
//           const res = await axios.get(`${IP}/medicine/search`, {
//             params: {
//               pageNo: page,
//             }, 
//           });
//           setMedicinedata(res.data.items);
//           setTimeout(() => {
//             setIsLoading(false); // 3초 후 로딩 상태 false 로 변경
//           }, 4000); // 4초의 지연 시간 설정
//         } catch (error) {
//           console.log('Medicine 목록 가져오기 실패', error);
//           setIsLoading(false); // 에러 발생 시에도 로딩 상태 false 로 변경
//         }
//       };
//       setData();
//     }, [page]);

//   //북마크 리스트 가져오는 AXIOS
//   const [bookmark, setBookmark] = React.useState([]);//bookmark 리스트 있는지 확인
//   React.useEffect(()=>{
//     const Bookmark = () => {
//       axios.post(`${IP}/medicine/bookmarklist`,{
//         token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibW9ua2V5MyIsImV4cCI6MTY4NTA5NTAxNCwiaWF0IjoxNjg0NDkwMjE0fQ.F9ZRcSS5Jb6zmFR6awLORFCsSxZvfBKCR1Mra8T00lQ"//걍 지정해줌
//       })
//       .then(function(res){
//         console.log("북마크 잘 가져왔나요?", res.data);
//         setBookmark(res.data);
//         console.log("test",bookmark);
//       })
//       .catch(function(e){
//         console.log("즐겨찾기 리스트 못 가져옴,,,", e)
//       })

//     };
//     Bookmark();
//     // console.log("bookmark배열 값 잘 가져오나요?",bookmark)
//   },[]);



//   return (
//     <View style={styles.c}>
//       {isLoading ? (
//         <Loading /> // 로딩 중인 동안 로딩 스피너 표시
//       ) : (
//       <View style={styles.container}>
//         <ScrollView>
//           {/* 검색 창 */}
//             <View style={styles.TextInputcontainer}>
//               <View style={styles.innerContainer}>
//                   <View style={styles.inputAndMicrophone}>
//                       <TextInput
//                           multiline
//                           placeholder='알약 이름 검색'
//                           style={styles.input}
//                           value={input} // 현재 message 값을 입력 값으로 설정
//                           onChangeText={(text)=>setInput(text)}
//                       />
//                       <TouchableOpacity  onPress={()=>{handleClearInput()}}>
//                         <Icon4 name="times" color='black' size={25}style={{ marginRight:20 }} />
//                       </TouchableOpacity>
//                   </View>   
                  
//                   <View>
//                     <TouchableOpacity onPress={()=>{handleButtonPress()}}>
//                       <Icon4 name="search" color='black' size={25} />
//                     </TouchableOpacity>
//                   </View> 
//               </View>
//             </View>
        

//           {/* <List medicinedata={medicinedata}/> */}
//           <Card 
//             medicinedata={medicinedata|| []} // medicinedata가 null 또는 undefined인 경우 빈 배열로 대체 
//             bookmark = {bookmark} //bookmark list넘겨줌
//             setBookmark = {setBookmark} //bookmark list를 변경하는 함수 넘겨줌
//             onPress={(medicinename, bookmark) => {
//               AccessibilityInfo.announceForAccessibility(medicinename+"을 선택하셨습니다!");
//               navigation.navigate('Detail', { medicinename, bookmark })
//             }}
//           />
//            <View style={{flexDirection: 'row',justifyContent:"space-between", alignItems:'center'}}>
//               <TouchableRipple onPress={()=>{page > 1 && handlePageChange(page -1)}}>
//                 <Button mode="Outlined">이전 페이지</Button>
//               </TouchableRipple>
//               <Text>{page}</Text>
//               <TouchableRipple onPress={()=>{handleNextPage}}>
//                 <Button mode="Outlined">다음 페이지</Button>
//               </TouchableRipple>
//             </View>
//         </ScrollView>
//       </View>
//       )}
//     </View>
//   );
// }

// function TextSearch({navigation}) {
//   const [input, setInput] = React.useState("");//내가 검색
//   const [medicinedata, setMedicinedata] = React.useState([]);//서버에서 가져온 데이터 내보내기

//   //검색 axios
//   const search = async (keyword) =>{
//     await axios.get(`${IP}/medicine/search`,{
//       params:{
//         // 약이름, page번호 요청
//         itemName: keyword,
//       }
//     })
//     .then(function(res){
//       // console.log("Medicin 이름 데이터 잘 받아왔나요?: ", res.data);
//       console.log("검색", keyword)
//       setMedicinedata(res.data.items);
//       console.log('count:', count++)
//     })
//     .catch(function(error){
//       console.log("Medicin 이름 목록 가져오기 실패,,,", error)
//     })
//     console.log("너는 누구니?", keyword)
//   }

//   React.useEffect(()=>{
//     search();
//   },[]);

//     const handleButtonPress = () => {
//     search(input);
//   };

//   const handleClearInput = async () => {
//     setInput("");
//     setMedicinedata([]); // setMedicinedata([])를 먼저 호출하면 input 값이 변경되기 전에 state 값이 변경되므로 setInput("") 이후에 호출합니다.
//     await search();
//   }

  
//   //로딩 useEffect
//   const [isLoading, setIsLoading] = React.useState(false); // 로딩 상태 추가

//   //페이지 랜더링
//   const [page, setPage] = React.useState(1);//다음 page 번호
//   const handlePageChange = (newPage) => {
//     // console.log("페이지 바뀜?",newPage)
//     setPage(newPage);
    
//   }
//   React.useEffect(() => {
//       const setData = async () => {
//         setIsLoading(true); // 로딩 상태 true 로 변경
//         try {
//           const res = await axios.get(`${IP}/medicine/search`, {
//             params: {
//               pageNo: page,
//             },
//           });
//           setMedicinedata(res.data.items);
//           setTimeout(() => {
//             setIsLoading(false); // 3초 후 로딩 상태 false 로 변경
//           }, 4000); // 4초의 지연 시간 설정
//         } catch (error) {
//           console.log('Medicine 목록 가져오기 실패', error);
//           setIsLoading(false); // 에러 발생 시에도 로딩 상태 false 로 변경
//         }
//       };
//       setData();
//     }, [page]);

//   //북마크 리스트 가져오는 AXIOS
//   const [bookmark, setBookmark] = React.useState([]);//bookmark 리스트 있는지 확인
//   React.useEffect(()=>{
//     const Bookmark = () => {
//       axios.post(`${IP}/medicine/bookmarklist`,{
//         token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibW9ua2V5MyIsImV4cCI6MTY4NTA5NTAxNCwiaWF0IjoxNjg0NDkwMjE0fQ.F9ZRcSS5Jb6zmFR6awLORFCsSxZvfBKCR1Mra8T00lQ"//걍 지정해줌
//       })
//       .then(function(res){
//         console.log("북마크 잘 가져왔나요?", res.data);
//         setBookmark(res.data);
//         console.log("test",bookmark);
//       })
//       .catch(function(e){
//         console.log("즐겨찾기 리스트 못 가져옴,,,", e)
//       })

//     };
//     Bookmark();
//     // console.log("bookmark배열 값 잘 가져오나요?",bookmark)
//   },[]);



//   return (
//     <View style={styles.c}>
//       {isLoading ? (
//         <Loading /> // 로딩 중인 동안 로딩 스피너 표시
//       ) : (
//       <View style={styles.container}>
//         <ScrollView>
//           {/* 검색 창 */}
//             <View style={styles.TextInputcontainer}>
//               <View style={styles.innerContainer}>
//                   <View style={styles.inputAndMicrophone}>
//                       <TextInput
//                           multiline
//                           placeholder='알약 이름 검색'
//                           style={styles.input}
//                           value={input} // 현재 message 값을 입력 값으로 설정
//                           onChangeText={(text)=>setInput(text)}
//                       />
//                       <TouchableOpacity  onPress={()=>{handleClearInput()}}>
//                         <Icon4 name="times" color='black' size={25}style={{ marginRight:20 }} />
//                       </TouchableOpacity>
//                   </View>   
                  
//                   <View>
//                     <TouchableOpacity onPress={()=>{handleButtonPress()}}>
//                       <Icon4 name="search" color='black' size={25} />
//                     </TouchableOpacity>
//                   </View> 
//               </View>
//             </View>
        

//           {/* <List medicinedata={medicinedata}/> */}
//           <Card 
//             medicinedata={medicinedata} 
//             bookmark = {bookmark} //bookmark list넘겨줌
//             setBookmark = {setBookmark} //bookmark list를 변경하는 함수 넘겨줌
//             onPress={(medicinename, bookmark) => {
//               AccessibilityInfo.announceForAccessibility(medicinename+"을 선택하셨습니다!");
//               navigation.navigate('Detail', { medicinename, bookmark })
//             }}
//           />
//            <View style={{flexDirection: 'row',justifyContent:"space-between", alignItems:'center'}}>
//               <TouchableRipple onPress={()=>{page > 1 && handlePageChange(page -1)}}>
//                 <Button mode="Outlined">이전 페이지</Button>
//               </TouchableRipple>
//               <Text>{page}</Text>
//               <TouchableRipple onPress={()=>{handlePageChange(page +1)}}>
//                 <Button mode="Outlined">다음 페이지</Button>
//               </TouchableRipple>
//             </View>
//         </ScrollView>
//       </View>
//       )}
//     </View>
//   );
// }

function TextSearch({navigation}) {
  const [input, setInput] = React.useState("");
  const [medicinedata, setMedicinedata] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [bookmark, setBookmark] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);

  const search = async (keyword, pageNo) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${IP}/medicine/search`, {
        params: {
          itemName: keyword,
          pageNo: pageNo,
        },
      });
      setMedicinedata(res.data.items);
      setTotalCount(res.data.totalCount);
    } catch (error) {
      console.log("Medicine 이름 목록 가져오기 실패,", error);
    }
    setIsLoading(false);
  };

  const handleButtonPress = () => {
    search(input, 1);
  };

  const handleClearInput = async () => {
    setInput("");
  };
  
  const handlePageChange = async (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalCount / 10)) {
      setPage(newPage);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      search(input, page);
    };
    fetchData();
  }, [page]); // page가 변경될 때마다 실행

  React.useEffect(() => {
    const getBookmarkList = async () => {
      try {
        const res = await axios.post(`${IP}/medicine/bookmarklist`, {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibW9ua2V5MyIsImV4cCI6MTY4NTA5NTAxNCwiaWF0IjoxNjg0NDkwMjE0fQ.F9ZRcSS5Jb6zmFR6awLORFCsSxZvfBKCR1Mra8T00lQ",
        });
        setBookmark(res.data);
      } catch (e) {
        console.log("즐겨찾기 리스트 못 가져옴,,,", e);
      }
    };
    getBookmarkList();
  }, []);


  return (
    <View style={styles.c}>
      {isLoading ? (
        <Loading /> // 로딩 중인 동안 로딩 스피너 표시
      ) : (
      <View style={styles.container}>
        <ScrollView>
          {/* 검색 창 */}
            <View style={styles.TextInputcontainer}>
              <View style={styles.innerContainer}>
                  <View style={styles.inputAndMicrophone}>
                      <TextInput
                          multiline
                          placeholder='알약 이름 검색'
                          style={styles.input}
                          value={input} // 현재 message 값을 입력 값으로 설정
                          onChangeText={(text)=>setInput(text)}
                      />
                      {input ? (
                         <TouchableOpacity  onPress={()=>{handleClearInput()}}>
                          <Icon4 name="times" color='black' size={25}style={{ marginRight:20 }} />
                         </TouchableOpacity>
                      ):null}
                     
                  </View>   
                  
                  <View>
                    <TouchableOpacity onPress={()=>{handleButtonPress()}}>
                      <Icon4 name="search" color='black' size={25} />
                    </TouchableOpacity>
                  </View> 
              </View>
            </View>
        

          {/* <List medicinedata={medicinedata}/> */}
          <Card 
            medicinedata={medicinedata} 
            bookmark = {bookmark} //bookmark list넘겨줌
            setBookmark = {setBookmark} //bookmark list를 변경하는 함수 넘겨줌
            onPress={(medicinename, bookmark) => {
              AccessibilityInfo.announceForAccessibility(medicinename+"을 선택하셨습니다!");
              navigation.navigate('Detail', { medicinename, bookmark })
            }}
          />
           <View style={{flexDirection: 'row',justifyContent:"space-between", alignItems:'center'}}>
              <TouchableRipple onPress={()=>{page > 1 && handlePageChange(page -1)}}>
                <Button mode="Outlined">이전 페이지</Button>
              </TouchableRipple>
              <Text>{page}</Text>
              <TouchableRipple onPress={()=>{handlePageChange(page +1)}}>
                <Button mode="Outlined">다음 페이지</Button>
              </TouchableRipple>
            </View>
        </ScrollView>
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  c:{
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eaeaea',
  },
  warningbox: {
    flex:1,
    flexDirection: 'row',
    alignItems: "center",
    borderWidth:1,

    marginBottom: '5%',
    height:150,
    padding:20
  },
  warningtext:{
    flex:1,
  },
  loginbox:{
    flex: 2,
    height:410,
    borderWidth:1,
    borderColor:"black",
    padding:20
    // justifyContent: 'center',
  },
  loginsbox:{
    flex:1,
    justifyContent: "center",
  },
  login:{
    flex:1, 
    marginBottom:10, 
    justifyContent: 'center',
  },
  loginbutton:{
    borderBottomWidth:1,
    borderBottomColor:'red',
    marginBottom:10,
  },

  easy:{
    flex:2,
  },
  easybox:{
    flex:1,
    borderBottomWidth:1,
    marginBottom:20,
    justifyContent: "center",
  },
  kakaobutton:{
    flex:1,
    borderWidth:1,
    backgroundColor:'yellow',
    alignItems: "center",
    justifyContent: "center",
    borderRadius:30,
    marginBottom:20,
  },
  googlebutton:{
    flex:1,
    borderWidth:1,
    backgroundColor:'blue',
    alignItems: "center",
    justifyContent: "center",
    borderRadius:30,
    marginBottom:20
  },
  //검색
  TextInputcontainer:{
    justifyContent: 'center',
    marginBottom:20,
    // backgroundColor: theme.colors.white
  },
  innerContainer:{
    // paddingHorizontal:10,
    // marginHorizontal:10,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    // paddingVertical:10
  },
  inputAndMicrophone:{
    flexDirection:'row',
    backgroundColor:theme.colors.inputBackground2,
    flex:3,
    marginRight:10,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input:{
    // backgroundColor:'transparent',
    paddingLeft:20,
    color: theme.colors.inputText,
    flex:3,
    fontSize:15,
    height:50,
    alignSelf: 'center',
  },
  
  
});

export default TextSearch;

