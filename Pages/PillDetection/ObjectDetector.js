import {
  media,
  MobileModel,
  torch,
  torchvision,
} from 'react-native-pytorch-core';
import COCO_CLASSES from './CocoClasses.json';
import RNFS from 'react-native-fs';
const T = torchvision.transforms;
const IMAGE_SIZE = 640;
const ModelName = 'yoloBest.torchscript.ptl';
const MODEL = require('../../assets/model/' + ModelName);
let model = null;
const rsPath = RNFS.DocumentDirectoryPath
const targetFilePath = rsPath.replace('/files', '') + '/cache/assets/assets/model/' + ModelName;

/**
 * Computes intersection-over-union overlap between two bounding boxes.
 */
function convertToCornerCoordinates(box) {
  let x1 = box[0] - box[2] / 2;
  let y1 = box[1] - box[3] / 2;
  let x2 = box[0] + box[2] / 2;
  let y2 = box[1] + box[3] / 2;
  return [x1, y1, x2, y2];
}

function IOU(x, y) {
  // x, y를 좌표 형식으로 변환합니다.
  a = convertToCornerCoordinates(x);
  b = convertToCornerCoordinates(y);

  // 바운딩 박스의 너비를 구합니다.
  let areaA = (a[2] - a[0]) * (a[3] - a[1]);
  if (areaA <= 0.0) return 0.0;

  let areaB = (b[2] - b[0]) * (b[3] - b[1]);
  if (areaB <= 0.0) return 0.0;

  // 교차 영역의 최소 x, y 좌표와 최대 x, y 좌표를 구합니다.
  const intersectionMinX = Math.max(a[0], b[0]);
  const intersectionMinY = Math.max(a[1], b[1]);
  const intersectionMaxX = Math.min(a[2], b[2]);
  const intersectionMaxY = Math.min(a[3], b[3]);

  // 교차 영역의 넓이를 계산합니다.
  const intersectionArea =
    Math.max(intersectionMaxY - intersectionMinY, 0) *
    Math.max(intersectionMaxX - intersectionMinX, 0);

  // IOU를 계산하여 반환합니다.
  return intersectionArea / (areaA + areaB - intersectionArea);
}


function nonMaxSuppression(boxes, limit, threshold) {
  // 신뢰도 점수를 내림차순으로 정렬합니다.
  const newBoxes = boxes.sort((a, b) => {
    return a.score - b.score;
  });
  const selected = []; // 비최대 억제 후 선택된 박스들을 저장할 배열
  const active = new Array(newBoxes.length).fill(true); // 활성 상태인 박스들을 추적하기 위한 배열
  let numActive = active.length; // 활성 상태인 박스의 수

  // 알고리즘은 간단합니다.
  // 가장 높은 점수를 가진 박스로부터 시작합니다.
  // 주어진 임계값(threshold)보다 더 많이 겹치는 나머지 박스들을 제거합니다.
  // 남은 박스가 있는 경우 (이전의 어떤 박스와도 겹치지 않는 경우),
  // 이 절차를 반복하고 더 이상의 박스가 남지 않거나 제한(limit)에 도달할 때까지 진행합니다.
  let done = false;
  for (let i = 0; i < newBoxes.length && !done; i++) {
    if (active[i]) {
      const boxA = newBoxes[i];
      selected.push(boxA);
      if (selected.length >= limit) break;
      for (let j = i + 1; j < newBoxes.length; j++) {
        if (active[j]) {
          const boxB = newBoxes[j];
          if (IOU(boxA.bounds, boxB.bounds) > threshold) {
            active[j] = false;
            numActive -= 1;
            if (numActive <= 0) {
              done = true;
              break;
            }
          }
        }
      }
    }
  }
  return selected;
}


function outputsToNMSPredictions(
  prediction,
  imgScaleX,
  imgScaleY,
  startX,
  startY,
) {
  // 설정값들
  const predictionThreshold = 0.4; // 예측 신뢰도 임계값
  const iOUThreshold = 0.6; // IOU 임계값
  const nMSLimit = 15; // NMS 제한 개수
  const results = []; // 결과 배열
  const rows = prediction.shape[0]; // 예측 행 개수
  const numberOfClass = prediction.shape[1] - 5; // 클래스 개수
  //console.log('클래스 개수 ', numberOfClass)

  // 각 행에 대해 반복하여 예측 결과를 처리
  for (let i = 0; i < rows; i++) {
    const outputs = prediction[i].data(); // 예측 결과 데이터 가져오기

    // 예측 결과의 신뢰도 점수가 predictionThreshold보다 높으면 객체가 감지된 것으로 간주
    const score = outputs[4];
    //console.log('score', score)
    if (score > predictionThreshold) {
      // 가장 높은 점수를 가진 클래스를 찾고 해당 클래스의 인덱스(classIndex)를 구함
      let max = outputs[5];
      let classIndex = 0;
      for (let j = 0; j < numberOfClass; j++) {
        if (outputs[j + 5] > max) {
          max = outputs[j + 5];
          classIndex = j;
        }
      }
      // console.log('max', max)
      // console.log('classIndex', classIndex)
      // 감지된 객체의 경계 상자(bounding box)를 계산
      const x = outputs[0];
      const y = outputs[1];
      const w = outputs[2];
      const h = outputs[3];

      const left = imgScaleX * (x - w / 2);
      const top = imgScaleY * (y - h / 2);

      const bound = [
        startX + left,
        startY + top,
        w * imgScaleX,
        h * imgScaleY,
      ];

      // 결과 객체를 생성하여 결과 배열에 추가
      const result = {
        classIndex: classIndex,
        score: score,
        bounds: bound,
      };
      results.push(result);
    }
  }

  // Non-Maximum Suppression(NMS) 알고리즘을 사용하여 중복된 객체를 제거하고 최종 결과를 반환
  return nonMaxSuppression(results, nMSLimit, iOUThreshold);
}


export default async function detectObjects(image) {
  //console.log(image)
  // 이미지의 너비와 높이 가져오기
  const imageWidth = image.getWidth();
  const imageHeight = image.getHeight();

  // 이미지를 Blob으로 변환합니다. Blob은 이미지의 바이트 표현입니다.
  // 형식은 높이 (H), 너비 (W), 채널 (C) 혹은 간단하게 HWC 형식입니다.

  const blob = media.toBlob(image);
  // Blob으로부터 Tensor를 생성하고, 이미지 Blob의 형식을 정의합니다.

  let tensor = torch.fromBlob(blob, [imageHeight, imageWidth, 3]);

  // Tensor의 형태를 [CHW]로 재배열합니다.

  tensor = tensor.permute([2, 0, 1]);

  // Tensor의 값을 255로 나눠 [0, 1] 범위의 값으로 조정합니다.

  tensor = tensor.div(255);

  // 이미지 Tensor의 크기를 3 x min(높이, IMAGE_SIZE) x min(너비, IMAGE_SIZE)로 조정합니다.

  const resize = T.resize([IMAGE_SIZE, IMAGE_SIZE]);
  tensor = resize(tensor);

  // 이미지를 IMAGE_SIZE x IMAGE_SIZE로 중앙 크롭합니다.

  const centerCrop = T.centerCrop([IMAGE_SIZE]);
  tensor = centerCrop(tensor);

  // Tensor에 1차원의 추가 차원을 추가합니다.

  const formattedInputTensor = tensor.unsqueeze(0);

  // Load model if not loaded
  if (model == null) {
    let filePath;
    console.log('Loading model...');
    try {
      if (await RNFS.exists(targetFilePath)) {
        console.log('모델 존재')
        filePath = targetFilePath;
      } else {
        console.log('모델 없음')
        filePath = await MobileModel.download(MODEL);
      }
      //console.log('filePath', filePath)
      model = await torch.jit._loadForMobile(filePath);
      console.log('Model successfully loaded');
    } catch (error) {
      console.error('Error loading model:', error);
    }
  }

  // 추론 실행
  const output = await model.forward(formattedInputTensor);
  const prediction = output[0];
  const imgScaleX = imageWidth / IMAGE_SIZE;
  const imgScaleY = imageHeight / IMAGE_SIZE;

  // 결과 필터링 및 경계 계산
  const results = outputsToNMSPredictions(
    prediction[0],
    imgScaleX,
    imgScaleY,
    0,
    0,
  );
  //console.log(results.length);

  // 객체 이름과 경계 상자를 포함한 필터링된 결과 형식화
  const resultBoxes = [];
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const nameIdx = result.classIndex;
    //console.log("nameIdx", nameIdx);
    const name = COCO_CLASSES[nameIdx];
    // console.log("name", name);

    const match = {
      objectClass: name,
      bounds: result.bounds,
    };
    resultBoxes.push(match);
  }

  //console.log(resultBoxes);
  return resultBoxes;
}