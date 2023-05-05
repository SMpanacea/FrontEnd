// 검색바 컴포넌트
import { SearchBar } from 'react-native-elements';
import {useState} from 'react';

// 참고 사이트: https://reactnativeelements.com/docs/components/searchbar

export default function Search (props) {
  const [state,setState] = useState('');//useState를 사용해서 사용자가 검색한 값을 setState에 저장해서 state값을 바꿔준다.

  // const search = state;

  return (
    <SearchBar
      placeholder="약 검색해주세요..." //검색바에 뜨는 문구
      onChangeText={setState} //텍스트 바뀌게 해주는 핸들러
      value={state}           //value값;을 state에서 가져온다
      style={{fontSize:13, marginBottom:10}}  //즐겨찾기 할 어쩌구 폰트사이즈 정해주기
    />
  );
}