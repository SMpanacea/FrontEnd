import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import bookmarkImage from '../assets/star.png';
import bookmarkedImage from '../assets/binstar.png';


// <TouchableOpacity onPress={handleBookmark}> -> 여기 누르면 handleBookmark실행됨
// <Image source={bookmarked ? bookmarkedImage : bookmarkImage} style={styles.image} /> -> bookmarked값이 없으면 빈별보여주고 bookmarked값이 있으면 별보여주기 

const BookMarkButton = () => {
  const [bookmarked, setBookmarked] = useState(true); //useState를 사용해서 즐겨찾기 했는지 안 했는지 알려줌 초기설정은 true임 

  const handleBookmark = () => { //bookmark핸들러
    setBookmarked(!bookmarked); //bookmarked의 반대값을 setBookmarked에 저장해줌
  };

  return (
    <TouchableOpacity onPress={handleBookmark}> 
      <View style={styles.bookmarkbutton}>
        <Image source={bookmarked ? bookmarkedImage : bookmarkImage} style={styles.image} /> 
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