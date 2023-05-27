import ImagePicker from 'react-native-image-crop-picker';


export default function galarySearch({ navigation }) {

  let imgPath;
  ImagePicker.openPicker({
    multiple: true,
  }).then(images => {
    imgPath = images.path;
  })
  return (
    <View></View>
  )
}