// 글로 검색할 때 보이는 화면
import React from 'react';
import axios from 'axios';
import { StyleSheet, View, ScrollView, Modal, Image, Animated, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, TouchableRipple, Button, } from 'react-native-paper';

// navigation
import 'react-native-gesture-handler';

// 외부에서 불러온 것들
import Search from '../../Components/Search';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import Card from '../../Components/Card';

//토큰
import AsyncStorage from '@react-native-async-storage/async-storage';

// 로딩
import Loading from '../../Components/Loading';

import { theme } from '../../theme';

// 서버
import ServerPort from '../../Components/ServerPort';

// import { black } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
const IP = ServerPort();

function TextSearch({ navigation }) {
  const [input, setInput] = React.useState("");
  const [medicinedata, setMedicinedata] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [bookmark, setBookmark] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);

  const search = async (keyword = "", pageNo) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${IP}/medicine/search`, {
        params: {
          itemName: keyword,
          pageNo: pageNo,
        },
      });
      if (!res.data || !res.data.items || res.data.items.length === 0) {
        // 검색 결과가 없을 경우, 빈 배열로 설정하여 map 함수를 실행하지 않음
        setMedicinedata([]);
        setInput("");
        console.log("하하,,,")
      } else {
        setMedicinedata(res.data.items);
        setTotalCount(res.data.totalCount);
      }
      // setTotalCount(res.data.totalCount);
    } catch (error) {
      console.log("Medicine 이름 목록 가져오기 실패,", error);
    }
    setIsLoading(false);
  };

  const handleButtonPress = () => {
    setPage(1); // Set page to 1
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel='뒤로가기'>
              <Image source={require('../../assets/left.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
          </TouchableOpacity>
      ),
      headerTitle: "약 검색",
    });
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      search(input, page);
    };
    fetchData();
  }, [page]); // page가 변경될 때마다 실행

  React.useEffect( async() => {
    const getToken = await AsyncStorage.getItem('token'); //로그인되어있다면, 토큰을 async-storage에서 가져옴. 가져와서 변수에 저장시켜줄 것. 토큰을 서버에 보내라
    console.log("textsearch getToken : ", getToken)
    const getBookmarkList = async () => {
      try {
        const res = await axios.post(`${IP}/medicine/bookmarklist`, {
          token:
          getToken,
        });
        console.log("textsearch res data : ", res.data);
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
                    placeholder='약품의 이름을 입력해 주세요'
                    style={styles.input}
                    value={input} // 현재 message 값을 입력 값으로 설정
                    onChangeText={(text) => setInput(text)}
                  />

                  {input ? (
                    <TouchableOpacity onPress={() => { handleClearInput() }} >
                      <Icon4 name="times" color='black' size={25} style={{ marginRight: 20 }}  accessibilityLabel='삭제' accessibilityRole='button'/>
                    </TouchableOpacity>
                  ) : null}
                </View>

                <View>
                  <TouchableOpacity onPress={() => { handleButtonPress() }}>
                    <Icon4 name="search" color='black' size={25} accessibilityLabel='검색' accessibilityRole='button'/>
                  </TouchableOpacity>
                </View>

              </View>
            </View>


            {/* <List medicinedata={medicinedata}/> */}
            {medicinedata.length > 0 ? (
              <>
               <Card
                medicinedata={medicinedata}
                bookmark={bookmark} //bookmark list넘겨줌
                setBookmark={setBookmark} //bookmark list를 변경하는 함수 넘겨줌
                onPress={(medicinename, bookmark) => {
                  AccessibilityInfo.announceForAccessibility(medicinename + "을 선택하셨습니다!");
                  navigation.navigate('Detail', { medicinename, bookmark })
                }}
              />
              <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
              <TouchableRipple onPress={() => { page > 1 && handlePageChange(page - 1) }} accessibilityLabel='이전 페이지' accessibilityRole='button'>
                <Button mode="Outlined" labelStyle={{ color: '#447378' }} importantForAccessibility='no-hide-descendants' >이전 페이지</Button>
              </TouchableRipple>
              <Text style={styles.font} accessibilityLabel={`현재 페이지는 ${page}입니다`}>{page}</Text>
              <TouchableRipple onPress={() => { handlePageChange(page + 1) }} accessibilityLabel='다음 페이지' accessibilityRole='button'>
                <Button  mode="Outlined" labelStyle={{ color: '#447378' }} importantForAccessibility='no-hide-descendants'>다음 페이지</Button>
              </TouchableRipple>
            </View>
              
              </>
             
            ) : (
              <View>
                <Text>검색 결과가 없습니다.</Text>
                <TouchableOpacity onPress={() => { search("", 1) }}><Text>다시 돌아가기</Text></TouchableOpacity>
              </View>
              
              
            )}
              {/* <Card
                medicinedata={medicinedata}
                bookmark={bookmark}
                setBookmark={setBookmark}
                onPress={(medicinename, bookmark) => {
                  AccessibilityInfo.announceForAccessibility(
                    medicinename + "을 선택하셨습니다!"
                  );
                  navigation.navigate("Detail", { medicinename, bookmark });
                }}
              /> */}
            
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  c: {
    flex: 1,
  },
  font: {
    color: '#447378'
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  warningbox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    borderWidth: 1,

    marginBottom: '5%',
    height: 150,
    padding: 20
  },
  warningtext: {
    flex: 1,
  },
  loginbox: {
    flex: 2,
    height: 410,
    borderWidth: 1,
    borderColor: "black",
    padding: 20
    // justifyContent: 'center',
  },
  loginsbox: {
    flex: 1,
    justifyContent: "center",
  },
  login: {
    flex: 1,
    marginBottom: 10,
    justifyContent: 'center',
  },
  loginbutton: {
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    marginBottom: 10,
  },

  easy: {
    flex: 2,
  },
  easybox: {
    flex: 1,
    borderBottomWidth: 1,
    marginBottom: 20,
    justifyContent: "center",
  },
  kakaobutton: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: 'yellow',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginBottom: 20,
  },
  googlebutton: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: 'blue',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginBottom: 20
  },
  //검색
  TextInputcontainer: {
    justifyContent: 'center',
    marginBottom: 20,
    // backgroundColor: theme.colors.white
  },
  innerContainer: {
    // paddingHorizontal:10,
    // marginHorizontal:10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // paddingVertical:10
  },
  inputAndMicrophone: {
    flexDirection: 'row',
    backgroundColor: theme.colors.inputBackground2,
    flex: 3,
    marginRight: 10,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    // backgroundColor:'transparent',
    paddingLeft: 20,
    color: theme.colors.inputText,
    flex: 3,
    fontSize: 15,
    height: 50,
    alignSelf: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#9a9b9c'
  },


});

export default TextSearch;

