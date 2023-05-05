import {StyleSheet, Text, View, FlatList} from 'react-native'
import React from 'react'
// import { FlatList } from 'react-native'

const SearchFilter = (data, input, setInput) =>{
    return(
        <View>
            <Text>SearchFilte</Text>
            <FlatList data={data} renderItem={({item}) => {
                console.log("잘 나옴?")
                if(input === ""){
                    return(
                        <View>
                            <Text>{item}</Text>
                        </View>
                    )
                }
            }}/>
        </View>
    )
}

export default SearchFilter
const styles = StyleSheet.create({

})