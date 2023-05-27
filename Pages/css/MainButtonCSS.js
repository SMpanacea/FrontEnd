import { StyleSheet } from "react-native";

export const MainButtonStyle = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        borderRadius: 50,
        overflow: 'hidden',
        height: 280,
        width: 350,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonThree: {
        backgroundColor: 'white',
        borderRadius: 50,
        overflow: 'hidden',
        height: 200,
        width: 350,
        alignItems: 'center',
        justifyContent: 'center',
    },
    down: {
        marginBottom: 30
    },
    imageBackground: {
        //borderRadius: 50, // 원하는 borderRadius 값으로 조정
        resizeMode: 'cover',
        flex: 1,
        justifyContent: 'center', // Center button vertically
        alignItems: 'center', // Center button horizontally
    },
    image: {
        width: 230, // or whatever size you want
        height: 170, // or whatever size you want
        position: 'absolute',
        right: -30,
        bottom: 10,
        resizeMode: 'center',
    },
    // ...other styles here...
    textContainer: {
        position: 'absolute',
        left: 30, // or adjust the value you want
        top: 30, // or adjust the value you want
        // 마진 크기 조정
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10
    },
    mainSerachImage: {
        width: 230, // or whatever size you want
        height: 200, // or whatever size you want
        position: 'absolute',
        right: -10,
        bottom: 10,
    },
    CameraSerachMainButton: {
        width: 230, // or whatever size you want
        height: 200, // or whatever size you want
        position: 'absolute',
        right: -20,
        bottom: -10,
    },
    CameraSerachMainButton_album: {
        width: 430, // or whatever size you want
        height: 400, // or whatever size you want
        position: 'absolute',
        right: -70,
        bottom: -60,
    },
    barcode: {
        width: 160, // or whatever size you want
        height: 130, // or whatever size you want
        position: 'absolute',
        right: 5,
        bottom: 10,
    }
});

