// 약 상세 화면
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



function MedicineDetail({ navigation, route }) {
  const { medicinedatitemSeq } = route.params;//다른 컴포넌트에서 넘겨받은 약 고유값
  const [bookmark, setBookmark2] = React.useState(route.params.bookmark); //bookmarklist를 받아서 bookmarklist로 초기값 설정해줌
  const { setBookmark } = route.params; //부모의 booklist를 변경해주는 함수
  // const [bookmarked, setBookMarked] = React.useState(bookmark.includes(medicinedatitemSeq)); //별표를 성화할지 비활성화 해줄 true, false값
  const [bookmarked, setBookMarked] = React.useState(bookmark && bookmark.includes(medicinedatitemSeq)); //값이 있는지 없는지 판단해서 있으면 별표 활성화해줄 어쩌꾸,.,
  // const [token, setToken] = React.useState(route.params.token);
  const token = route.params.token;
  console.log("token깔깔", token)

  const [medicinedetail, setMedicinedetail] = React.useState(null);
  const [medicinname, setMedicinName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false); // 로딩 상태 추가

  React.useEffect(() => {
    console.log('cliked 재랜더링되었습니다.');
    console.log("bo", bookmark);
  }, [bookmarked]);

  const click = (data) => { //setBookMarked라는 이름으로 BookMarkButton으로 넘겨줌
    setBookmark(data)
    setBookmark2(data) //click 자신의 booklist(bookmark)를 변경해줌
    setBookMarked(!bookmarked)//별표에 활성 비활성화를 변경해줌()
  }

  React.useEffect(() => {
    const setData = async () => {
      setIsLoading(true); // 로딩 상태 true로 변경
      try {
        const res = await axios.get(`${IP}/medicine/detail`, {
          params: {
            itemSeq: medicinedatitemSeq, // 약 고유 번호 서버로 보내서 그값만 보여줌
          },
        });
        setMedicinedetail(res.data);
        setMedicinName(res.data.itemName);
        // console.log("모든 데이터 출력:", JSON.stringify(res.data, null, 2));
      } catch (error) {
        console.log("Medicindetail 목록 가져오기 실패,,,", error)
      } finally {
        setIsLoading(false); //로딩 상태 false로 변경
      }
    };
    setData();
    console.log(medicinname)
    console.log("bookmarklist 잘 가져오냐??? ㅋㅋ 제발 떠라,,", bookmark)

  }, []);

  // navigation 기본 제공 header이름 수정
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel='뒤로가기'>
          <Image source={require('../../assets/left.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
        </TouchableOpacity>
      ),
      headerTitle: medicinname, //header 약 이름 출력
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          {/* {bookmarked.length > 0 && (
            <BookMarkButton medicinedetail={medicinedetail} bookmarked={bookmarked} setBookMarked={click} bookmark={bookmark} setBookmark={setBookmark} />
            //header오른쪽에 bookMarkbutton component 불러오기 //값이랑 함수들 다 넘겨줌
          )} */}
          {console.log("과연 크기는?", bookmark)}
          {/* bookmarmk가 없을 때 별 안 보이게 처리함 */}
          {/* {bookmark.length === 0 ? null: (
            //bookmark 크기가 0이면 별 아예 안 보이게 만들어줌
            <BookMarkButton medicinedetail={medicinedetail} bookmarked={bookmarked} setBookMarked={click} bookmark={bookmark} setBookmark={setBookmark} token={token}/>
            //header오른쪽에 bookMarkbutton component 불러오기 //값이랑 함수들 다 넘겨줌
          )} */}
          {/* 걍 값 다 넘기고 bookMarkButton내부에서 로그인 창으로 넘어가게 만들어줌 */}
          {isLoading && (<BookMarkButton medicinedetail={medicinedetail} bookmarked={bookmarked} setBookMarked={click} bookmark={bookmark} setBookmark={setBookmark} token={token} />)}



        </View>
      ),
      headerStyle: {
        elevation: 10, // 안드로이드 그림자 효과
        shadowOpacity: 0.5, // iOS 그림자 효과
        shadowColor: 'black', // 그림자 색상 설정
        shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋 설정
        shadowRadius: 4, // 그림자 반경 설정
      },
    });
  }, [medicinname])

  return (
    <View style={styles.container} >
      {isLoading ? (
        <Loading /> //로딩 중인 동안 로딩 스피너
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imagebox}>
            {medicinedetail && medicinedetail.itemImage !== null ?
              <Image source={{ uri: medicinedetail.itemImage }} resizeMode="contain" style={styles.image} /> :
              <LottieView
                source={require('../../assets/search_empty.json') /** 움직이는 LottieView */}
                style={styles.Lotteimage}
                autoPlay loop
              />
            }
          </View>

          <View style={styles.meditextbox}>
            <View>
              {/* 약 데이터 정보 뿌리는 화면 */}
              {medicinedetail && medicinedetail.efcyQesitm ? (
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info} accessible={true}>
                    <Icon style={styles.InfoIcon} name="plus" size={20} color="black" />
                    <Text style={styles.InfoTitle}>효과 · 효능</Text>
                  </View>
                  <View>
                    <Card>
                      <Card.Content style={{ backgroundColor: '#F5FAFD' }}>
                        <Text variant="bodyMedium">{medicinedetail.efcyQesitm}</Text>
                      </Card.Content>
                    </Card>
                  </View>
                </View>
              ) : null}

              {medicinedetail && medicinedetail.useMethodQesitm ? (
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info} accessible={true}>
                    <Icon style={styles.InfoIcon} name="question-circle" size={20} color="black" />
                    <Text style={styles.InfoTitle}>사용법</Text>
                  </View>
                  <View>
                    <Card>
                      <Card.Content style={{ backgroundColor: '#F5FAFD' }}>
                        <Text variant="bodyMedium">{medicinedetail.useMethodQesitm}</Text>
                      </Card.Content>
                    </Card>
                  </View>
                </View>

              ) : null}

              {medicinedetail && medicinedetail.atpnWarnQesitm ? (
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info} accessible={true}>
                    <Icon style={styles.InfoIcon} name="exclamation-triangle" size={20} color="black" />
                    <Text style={styles.InfoTitle}>주의사항 - 경고</Text>
                  </View>
                  <View>
                    <Card>
                      <Card.Content style={{ backgroundColor: '#F5FAFD' }}>
                        <Text variant="bodyMedium">{medicinedetail.atpnWarnQesitm}</Text>
                      </Card.Content>
                    </Card>
                  </View>
                </View>

              ) : null}

              {medicinedetail && medicinedetail.atpnQesitm ? (
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info} accessible={true}>
                    <Icon style={styles.InfoIcon} name="exclamation-circle" size={20} color="black" />
                    <Text style={styles.InfoTitle}>주의사항</Text>
                  </View>
                  <View>
                    <Card>
                      <Card.Content style={{ backgroundColor: '#F5FAFD' }}>
                        <Text variant="bodyMedium">{medicinedetail.atpnQesitm}</Text>
                      </Card.Content>
                    </Card>
                  </View>
                </View>
              ) : null}

              {medicinedetail && medicinedetail.intrcQesitm ? (
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info} accessible={true}>
                    <Icon style={styles.InfoIcon} name="refresh" size={20} color="black" />
                    <Text style={styles.InfoTitle}>상호작용</Text>
                  </View>
                  <View>
                    <Card>
                      <Card.Content style={{ backgroundColor: '#F5FAFD' }}>
                        {/* <Text variant="titleLarge"></Text> */}
                        <Text variant="bodyMedium">{medicinedetail.intrcQesitm}</Text>
                      </Card.Content>
                    </Card>
                  </View>
                </View>
              ) : null}

              {medicinedetail && medicinedetail.seQesitm ? (
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info} accessible={true}>
                    <Icon style={styles.InfoIcon} name="shield" size={20} color="black" />
                    <Text style={styles.InfoTitle}>부작용</Text>
                  </View>
                  <View>
                    <Card>
                      <Card.Content style={{ backgroundColor: '#F5FAFD' }}>
                        <Text variant="bodyMedium">{medicinedetail.seQesitm}</Text>
                      </Card.Content>
                    </Card>
                  </View>
                </View>
              ) : null}

              {medicinedetail && medicinedetail.depositMethodQesitm ? (
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info} accessible={true}>
                    <Icon style={styles.InfoIcon} name="archive" size={20} color="black" />
                    <Text style={styles.InfoTitle}>보관법</Text>
                  </View>
                  <View>
                    <Card>
                      <Card.Content style={{ backgroundColor: '#F5FAFD' }}>
                        <Text variant="bodyMedium">{medicinedetail.depositMethodQesitm}</Text>
                      </Card.Content>
                    </Card>
                  </View>
                </View>
              ) : null}

              {medicinedetail && medicinedetail.entpName ? (
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info} accessible={true}>
                    <Icon style={styles.InfoIcon} name="building" size={20} color="black" />
                    <Text style={styles.InfoTitle}>업체명</Text>
                  </View>
                  <View>
                    <Card>
                      <Card.Content style={{ backgroundColor: '#F5FAFD' }}>
                        <Text variant="bodyMedium">{medicinedetail.entpName}</Text>
                      </Card.Content>
                    </Card>
                  </View>
                </View>
              ) : null}

              {medicinedetail && medicinedetail.itemSeq ? (
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info} accessible={true}>
                    <Icon style={styles.InfoIcon} name="list-ul" size={20} color="black" />
                    <Text style={styles.InfoTitle}>품목기준코드</Text>
                  </View>
                  <View>
                    <Card>
                      <Card.Content style={{ backgroundColor: '#F5FAFD' }}>
                        <Text variant="bodyMedium">{medicinedetail.itemSeq}</Text>
                      </Card.Content>
                    </Card>
                  </View>
                </View>
              ) : null}

              {medicinedetail && medicinedetail.openDe ? (
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info} accessible={true}>
                    <Icon style={styles.InfoIcon} name="check-square-o" size={20} color="black" />
                    <Text style={styles.InfoTitle}>공개일자</Text>
                  </View>
                  <View>
                    <Card>
                      <Card.Content style={{ backgroundColor: '#F5FAFD' }}>
                        <Text variant="bodyMedium">{medicinedetail.openDe}</Text>
                      </Card.Content>
                    </Card>
                  </View>
                </View>
              ) : null}

              {medicinedetail && medicinedetail.updateDe ? (
                <View style={styles.Informationcontainer}>
                  <View style={styles.Info} accessible={true}>
                    <Icon style={styles.InfoIcon} name="edit" size={20} color="black" />
                    <Text style={styles.InfoTitle}>수정일자</Text>
                  </View>
                  <View>
                    <Card>
                      <Card.Content style={{ backgroundColor: '#F5FAFD' }}>
                        <Text variant="bodyMedium">{medicinedetail.updateDe}</Text>
                      </Card.Content>
                    </Card>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );


}

const styles = StyleSheet.create({
  headerRightContainer: {
    marginRight: 20
  },
  container: {
    flex: 1,
    backgroundColor: 'white',

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
    borderColor: 'white',
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
    backgroundColor: 'white',
    width: width,
    padding: 20,
  },
  Informationcontainer: {
    flex: 1,
    marginBottom: 40,
  },
  Info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
  },
  InfoTitle: {
    marginTop: 10,
    marginBottom: 15,
  },
  InfoIcon: {
    // borderWidth: 1, 안예쁘게 출력되서 주석처리함;;
    // borderColor: '#F2F2F2',
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

export default MedicineDetail;