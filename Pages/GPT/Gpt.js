// //gpt 채팅 화면
// import React from 'react';
// import { Text, TouchableOpacity, StyleSheet, View, TextInput } from 'react-native';
// import {useState, useEffect, useRef} from 'react';


// const configuration = new Configuration({
//     apiKey: process.env.OPEN_API_KEY,
// });

// const openai = new OpenAIApi(configuration);


// function Gpt(){
//     const [input, setInput] = useState('');
//     const [output, setOutput] = useState('');

//     const handleInput = async () => {
//         try{
//             const userInput = constPrompt + input
//             const response = await openai.createCompletion({
//                 model: "text-davinci-003",
//                 prompt: `you: ${userInput}\nAI:`,
//                 temperature: 0,
//                 max_tokens: 60,
//                 top_p: 1.0,
//                 frequency_penalty:0.5,
//                 presence_penalty: 0.0,
//                 stop: ["You:"],
//             });
//             setOutput(response.data.choices[0].text);
//         } catch(error){
//             console.log("gpt입력 에러,,,", error)
//         }

//         setInput('');
//     }

//     return(
//         <View style={styles.container}>
//             <Text style={styles.title}>AI Chatbot</Text>
//             <View style={styles.chatContainer}>
//                 <View style={styles.inputContainter}>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="gpt에게 물어볼 말 여기에 적어주세요."
//                         onChangeText={(text)=>setInput(text)}
//                         value={input}
//                     />
//                     <TouchableOpacity style={styles.sendButton} onPress={handleInput}>
//                         <Text style={styles.sendButtonText}>send</Text>
//                     </TouchableOpacity>
//                     <View style={styles.outputContainer}>
//                         <Text style={styles.output}>{output}</Text>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     )

// }

// export default Gpt;


// const styles = StyleSheet.create({
//     container:{
//       flex:1,
//       alignItems:'center',
//       justifyContent: 'center',
//     },
//     title:{
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     chatContainer:{
//         width:'90%',
//         height:'70%',
//         borderWidth:10,
//         overflow:'hidden',
//     },
//     inputContainter:{
//         flexDirection:'row',
//         alignItems:'center',
//         padding:10,
//         backgroundColor:'#F2F2F2',
//     },
//     input:{
//         flex:1,
//         height:40,
//         borderWidth:1,
//         borderRadius: 20,
//         padding:10,
//         marginRight:10,
//         backgroundColor:'#fff',
//     },
//     sendButton:{
//         backgroundColor:'#2196F3',
//         padding:10,
//         borderRadius:20,
//     },
//     sendButtonText:{
//         color:'#fff',
//         fontWeight:'bold',
//         textAlign:'center',
//     },
//     outputContainer:{
//         flex:1,
//         padding:10,
//         backgroundColor:'#fff',
//     },
//     output:{
//         fontSize:16,
//     }
//   });