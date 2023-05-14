//로딩 스피너 component
import * as React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

function Loading(){
  return(
    <ActivityIndicator animating={true} color='red' size='large'/>
  )
}


export default Loading;