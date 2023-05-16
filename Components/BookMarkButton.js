import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import bookmarkImage from '../assets/star.png';
import bookmarkedImage from '../assets/binstar.png';
import { useNavigation } from '@react-navigation/native';

// 서버 포트
import ServerPort from './ServerPort';
const IP = ServerPort();


function BookMarkButton ({medicinedetail, bookmark}){


  


  console.log("두근두근",bookmark) //배열 잘 가져와 근데 뭐가 문제임
  const [bookmarked, setBookmarked] = useState(true); //useState를 사용해서 즐겨찾기 했는지 안 했는지 알려줌 초기설정은 true임 
  const [foundMedicine,setFoundMedicine] = useState(false)
 // const foundMedicine = bookmark && bookmark.find((item) => item === medicinedetail.itemSeq);


  console.log("도키도키", foundMedicine)
  const handleBookmark = () => { //bookmark핸들러
    const check = !bookmarked
    setBookmarked(check); //bookmarked의 반대값을 setBookmarked에 저장해줌
   
    const checkFoundMedicine = check // && bookmark.find((item) => item === medicinedetail.itemSeq);
    setFoundMedicine(checkFoundMedicine)
    console.log("checkFoundMedicine", checkFoundMedicine)





  
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
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4yIiwiZXhwIjoxNjg0MDUxMDQxLCJpYXQiOjE2ODM0NDYyNDF9.BuFZu4A5VHSJHCqM89rpfWD2PzfKisITWLv9zexoefY"//걍 지정해줌
  };

    if(checkFoundMedicine){
      axios.post(`${IP}/medicine/bookmarkoff`, res) // 별 색 있는 거 find했을 때 있으면 색 있는 거
      .then(response => {
        // 통신 성공 시 처리할 로직
        console.log('즐겨찾기 해제 성공:', response.data);
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
      })
      .catch(error => {
        // 통신 실패 시 처리할 로직
        console.error('즐겨찾기 등록 실패:', error);
      });
    }
  };

  return (
    <TouchableOpacity onPress={handleBookmark}> 
      <View style={styles.bookmarkbutton}>
        <Image source={bookmarked ?  bookmarkImage : bookmarkedImage} style={styles.image} /> 
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