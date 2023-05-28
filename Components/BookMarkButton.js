import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import bookmarkImage from '../assets/star.png'; //색별
import bookmarkedImage from '../assets/binstar.png'; //빈별
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 서버 포트
import ServerPort from './ServerPort';
const IP = ServerPort();


function BookMarkButton ({medicinedetail,bookmarked, setBookMarked, bookmark, setBookmark, token ,onPress }){
  const [bookmarked2, setBookmark2] = useState(bookmarked) //bookmared를 받았으니 별활성화 할지 안 할지의 값을 받은거임 그래서 초기값으로 설정해줬으니 자기값임(부모값을 자식값으로 넣어줌)
  const [showImage, setShowImage] = useState(false);

  const navigation = useNavigation(); // navigation 객체 가져오기
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const click = (data) => {
    setBookMarked(data)//부모의 클릭함수를 실행시킴
    setBookmark2(!bookmarked2)//나의 bookmark활성화 비활성화 값을 변경(나는 BookMarkButton임)
  }

  
  console.log("token2:", getToken);

  // React.useEffect(()=>{

  // },[])
  // const [rander, setRender] = React.useState(false);

  useEffect(() => {
    console.log('cliked 컴포넌트가 재랜더링되었습니다.');
  }, [bookmarked2]);

  console.log("두근두근",bookmark) //배열 잘 가져와 근데 뭐가 문제임
  // const [bookmarked, setBookmarked] = useState(true); //useState를 사용해서 즐겨찾기 했는지 안 했는지 알려줌 초기설정은 true임 
  // const foundMedicine = bookmark && bookmark.find((item) => item === medicinedetail.itemSeq);

  console.log("도키도키", bookmarked)
  const handleBookmark = () => { //bookmark핸들러
    

    if(bookmark.length === 0){
      navigation.navigate('MyPage')
    }else{
      setBookmark(!bookmarked); //bookmarked의 반대값을 setBookmarked에 저장해줌

    }

    console.log("토큰?", token)

  
  // console.log("두근두근",bookmark) //배열 잘 가져와 근데 뭐가 문제임
  // const [bookmarked, setBookmarked] = useState([]); //useState를 사용해서 즐겨찾기 했는지 안 했는지 알려줌 초기설정은 true임 
  // const foundMedicine = bookmark && bookmark.find((item) => item === medicinedetail.itemSeq);


  // console.log("도키도키", foundMedicine)
  // const handleBookmark = () => { //bookmark핸들러
  // setBookmarked(!bookmarked); //bookmarked의 반대값을 setBookmarked에 저장해줌
  
  const res = {
    itemSeq: medicinedetail.itemSeq,
    itemName: medicinedetail.itemName, 
    itemImage: medicinedetail.itemImage, 
    updateDe:medicinedetail.updateDe,
    token:token//걍 지정해줌
  };

    if(bookmarked2){
      axios.post(`${IP}/medicine/bookmarkoff`, res) // 별 색 있는 거 find했을 때 있으면 색 있는 거
      .then(response => {
        // 통신 성공 시 처리할 로직
        console.log("??")
        console.log('즐겨찾기 해제 성공:', response.data); 
        if(response.data !== "false"){
          setBookmark(response.data) //최상위 부모(MedicinMain)의 booklist를 변경시켜줌    
          click(response.data) //BookMarkButton의 click함수를 실행, 이름 바꿔라
        }
      })
      .catch(error => {
        // 통신 실패 시 처리할 로직
        console.error('즐겨찾기 해제 실패:', error);
      });
    }
    else{
      axios.post(`${IP}/medicine/bookmark`, res) //별 색 없는 거 find했을 때 없으면 색 없는 거
      .then(response => {
        // 통신 성공 시 처리할 로직
        console.log('즐겨찾기 등록 성공:', response.data);
        if(response.data !== "false"){
          setBookmark(response.data)//최상위 부모(MedicinMain)의 booklist를 변경시켜줌
          click(response.data)//BookMarkButton의 click함수를 실행, 이름 바꿔라
        }
      })
      .catch(error => {
        // 통신 실패 시 처리할 로직
        console.error('즐겨찾기 등록 실패:', error);
      });
    }
  };

  return (
    <TouchableOpacity onPress={handleBookmark} accessibilityLabel='즐겨찾기' accessibilityRole='button' > 
      <View style={styles.bookmarkbutton}>
        {showImage && <Image source={bookmarked2 ? bookmarkImage : bookmarkedImage} style={styles.image} />}
        {/* <Image source={bookmarked2 ?  bookmarkImage : bookmarkedImage} style={styles.image} />  */}
        {/*bookmarked에 값이 있으면 색별, 아니면 빈별 뜨게 해줌*/}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookmarkbutton: {
  //  flexDirection: 'row',
   justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image:{
    width: 20, 
    height: 20,
  }
  
});


export default BookMarkButton;