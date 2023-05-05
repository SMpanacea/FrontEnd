import {media, torch, torchvision} from 'react-native-pytorch-core';

const T = torchvision.transforms;
const IMAGE_SIZE = 640;

export default async function detectObjects(image) {
  // Get image width and height
  const imageWidth = image.getWidth();
  console.log(imageWidth)
  const imageHeight = image.getHeight();
  console.log(imageHeight)
  // Convert image to blob, which is a byte representation of the image
  // in the format height (H), width (W), and channels (C), or HWC for short
  const blob = media.toBlob(image);

  // Get a tensor from image the blob and also define in what format
  // the image blob is.
  let tensor = torch.fromBlob(blob, [imageHeight, imageWidth, 3]);

  // Rearrange the tensor shape to be [CHW]
  tensor = tensor.permute([2, 0, 1]);

  // Divide the tensor values by 255 to get values between [0, 1]
  tensor = tensor.div(255);

  // Resize the image tensor to 3 x min(height, IMAGE_SIZE) x min(width, IMAGE_SIZE)
  const resize = T.resize([IMAGE_SIZE, IMAGE_SIZE]);
  tensor = resize(tensor);

  // Center crop the image to IMAGE_SIZE x IMAGE_SIZE
  const centerCrop = T.centerCrop([IMAGE_SIZE]);
  tensor = centerCrop(tensor);

  // Unsqueeze adds 1 leading dimension to the tensor
  const formattedInputTensor = tensor.unsqueeze(0);

  console.log(formattedInputTensor.data[0]);
  console.log(formattedInputTensor.size());
  console.log(JSON.stringify(formattedInputTensor));



}