# PANACEA

<div align="center">
<img width="400" src="https://github.com/SMpanacea/FrontEnd/assets/101163897/0fc5068b-f144-4446-b132-48bcf91541f4"/>

<br>

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FSMpanacea%2FFrontEnd&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

</div>

## 프로젝트 소개
### 시각장애인 및 사회적 약자를 위한 Machine Learning과 ChatGPT를 이용한 의약품 검색 및 상담 애플리케이션

![image](https://github.com/SMpanacea/FrontEnd/assets/101163897/ffa0d0c0-5109-4d1d-802b-cd0623eaee74)
  
## 문제 정의
  - ### 휴대전화 카메라를 활용하여 알약 이미지만으로 의약품 정보 조회가 가능한 애플리케이션 개발
     - 의약품 검색 애플리케이션은 시각장애인을 포함한 모든 사용자가 의약품 정보에 쉽게 접근하고 확인할 수 있도록 도와준다. 휴대전화 카메라를 사용하여 알약 이미지나 바코드를 인식하고, 이를 통해 해당 의약품의 정보를 제공하도록 한다. 이를 통해 시각장애인들은 의약품을 식별하고 안전하게 복용할 수 있다.

  - ### 사용자들의 의약 복용 습관의 자주화
    - 알람 기능을 통해 정확한 복용 시간을 알려주고 사용자들의 의약품 복용 습관을 자주화시킨다. 정해진 시간에 약을 복용함으로써 약물의 효과를 극대화하고 건강을 유지할 수 있다. 이를 통해 사용자들은 건강한 복용 습관을 형성하고 지속해서 복용할 수 있다.

  - ### 사용자들의 건강한 복용 습관 유지
    - 건강한 복용 습관은 의약품의 효과를 최대화하고 부작용을 최소화하는 데 중요하다. 이 애플리케이션은 약 복용 알람, 의약품 정보 제공, 의약품 상호작용 정보 등을 통해 사용자들이 건강한 복용 습관을 유지할 수 있도록 지원한다. 또한, 의약품 검색 기능을 통해 사용자들이 자신이 복용하는 의약품에 대한 정보를 쉽게 얻을 수 있어, 부작용이나 약물 간 상호작용에 대한 인식을 높일 수 있다.

<div align="center">
<img width="900" src="https://github.com/SMpanacea/FrontEnd/assets/37571367/583bf349-4c95-43b9-b8b2-7ae4ceb40be3"/>
</div>
      

## 주요 기능
  - 카메라로 알약을 촬영하여 알약을 인식하면 TTS로 시각장애인들에게 알약이 정상적으로 촬영이되었는지를 안내 후 촬영완료 후 해당하는 의약품 검색
     - [시연영상](https://youtu.be/mRD1MLe8JcM?si=AAdZGiv9YlXRTjsE)
  - 앨범에서 촬영한 이미지를 선택하여 의약품검색
    -  [시연영상](https://youtu.be/A-46IIoJ4ZQ?si=iowQideXbVzbYShC)
  - 식·의약품 바코드 촬영을 통한 정보 검색
    - [시연영상](https://youtu.be/MR6yJQLTeU0)
  - 사용모델
    - Pill detection - YOLO
    - Pill search - CNN

  - 전체 시연 영상

    [![Video Label](http://img.youtube.com/vi/BUATiiF5zXA/0.jpg)](https://youtu.be/BUATiiF5zXA)


## 기술개발 연구 결과
 - ### 시스템 구성도
   <div align="center">
     
     ![image](https://github.com/SMpanacea/FrontEnd/assets/101163897/695f2e13-e643-42c2-ba8c-039329d47129)
   
   </div>
   이 그림은 프론트엔드 개발을 위해 React Native를 사용하고, AXIOS를 활용하여 통신을 수행하며, YOLOv5와 PlayTorch를 이용하여 카메라로 촬영한 이미지를 분석한다. 백엔드는 CloudType으로 배포되며, Flask 프레임워크를 활용하고, Ray를 통해 멀티스레드 처리를 수행한다. 또한, PyTorch와 OpenCV를 활용하여 학습한 모델을 사용하여 알약 이미지를 분석하고 결과를 도출한다. 이미지 저장은 AWS S3를 활용하고, 데이터베이스로는 PostgreSQL을 사용하며, 이 또한 CloudType을 통해 배포되었다.
  
  - ###  알약 이미지  촬영을 통한 낱알 검색 기능
    <div align="center">
      
      ![image](https://github.com/SMpanacea/FrontEnd/assets/101163897/cbd71ab4-b728-4ab1-8915-0e753467878d)
    
    </div>
    본 연구에서는 식품의약품안전처가 공공데이터 포털을 통해 제공하는 알약 이미지 데이터(1.2TB)를 기반으로 총 525개의 알약 이미지 데이터를 확보하였다. 이 데이터를 활용하여 알약 이미지에 대한 학습 데이터셋을 구축하였다. 모델의 성능을 최대한 향상시키기 위해, 데이터 증강과 전처리 과정을 수행하였다.
    
    데이터 증강과정에서는 원본 낱알 촬영 이미지에서 알약의 꼭짓점 좌표를 추출하여 이미지를 자르고, 5도 간격으로 이미지를 회전시키는 방식을 적용하였다. 이러한 과정을 통해 알약 한 품목당 총 2,880장의 증강 데이터를 생성하였다.

    전처리 과정에서는 CLAHE(Contrast Limited Adaptive Histogram Equalization) 알고리즘을 사용하였다. 이 알고리즘은 이미지의 명암 대비를 개선하고 노이즈를 감소시키는 데 효과적이다. 이를 통해 학습 데이터의 품질을 높이고 모델의 성능을 향상시키는 데 기여하였다.

    이후, 이를 바탕으로 알약의 이미지를 학습하고 예측하는 딥러닝 모델을 구축하였다. 본 모델은 PyTorch 프레임워크를 사용하여 3개의 합성곱-풀링 은닉 계층과 2개의 완전 연결 계층으로 구성된 CNN 모델로 구현되었다. 이러한 방법론은 알약 이미지의 특징을 정밀하게 추출하고 분류하는 데 매우 유효하였다.

  - ### 식·의약품 검색 가능한 바코드 이미지 검색
    <div align="center">
      
      <img width="400" src="https://github.com/SMpanacea/FrontEnd/assets/101163897/979e7032-905f-4815-8b30-b01420a9435f"/>
      
    </div>
    시각장애인과의 인터뷰에서 시각장애인에게 우리 애플리케이션에서 추가해줬음 하는 기능에 대한 질문을 드렸었는데, 이때 의약품을 넘어서 식품의 점자도 명확하지 않다는 의견을 얻을 수 있었다. 따라서 의약품 검색 애플리케이션에 한정되어 있었던 우리 애플리케이션을 바코드 사진을 통해 식품과 의약품의 검색도 가능하게 기능을 추가하였다.

## 기술개발 기대효과
  - ### 시각장애인을 위한 의약품 검색의 접근성 향상
    - 시각장애인들은 이 어플리케이션을 통해 의약품 정보에 쉽게 접근할 수 있다. 텍스트, 음성, 이미지 등 다양한 형태의 검색 방법을 활용하여 의약품을 찾고 식별할 수 있다. 이를 통해 시각장애인들은 독립적으로 의약품 정보를 확인하고 약물 복용에 필요한 결정을 내릴 수 있다.

  - ### 정확한 의약품 식별과 부작용 관리
    - 약물 이미지 검색 및 바코드 인식을 통해 의약품을 정확하게 식별할 수 있다. 사용자들은 이를 통해 복용 중인 약물에 대한 자신만의 기록을 관리하고 부작용이나 약물 간 상호작용에 대한 정보를 얻을 수 있다. 이는 사용자들이 안전한 약물 복용을 유지하고 부작용을 최소화하는 역할을 한다.
 
  - ### 약물 복용 습관의 개선과 건강 관리
    -  의약품 알람 기능을 통해 정확한 복용 시간을 알려주고 사용자들의 약물 복용 습관을 개선할 수 있다. 약 복용을 잊지 않고 정해진 시간에 복용함으로써 약물의 효과를 극대화하고 건강을 유지할 수 있다. 또한, 의약품 검색과 ChatGPT와의 연결을 통해 사용자들은 약물에 대한 올바른 지식을 얻을 수 있고, 건강 상태 관리에 필요한 정보와 조언을 받을 수 있다.


## DEVELOPER
|      김가연      |          류희정         |       마기창         |       박호준         |                                                                                                               
| :------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | 
|  <img width="160px" src="https://github.com/SMpanacea/FrontEnd/assets/101163897/7458d2c6-b222-4198-8eb3-6d9d3d107140" />  |        <img width="160px" src="https://github.com/SMpanacea/FrontEnd/assets/101163897/7458d2c6-b222-4198-8eb3-6d9d3d107140" />       |      <img width="160px" src="https://github.com/ThrowsGG/ThrowsGG/assets/101163897/c3089ae3-5dc5-4ae2-b725-df2e52c876b4" />      |      <img width="160px" src="https://github.com/ThrowsGG/ThrowsGG/assets/101163897/99dad46f-ee54-4302-8252-c0627d0bac4c" />     |
|   [@KIN0-0](https://github.com/KIN0-0)    |    [@rhj7513](https://github.com/rhj7513)  | [@smreo3839](https://github.com/smreo3839)  | [@hoejun1208](https://github.com/hoejun1208)  |
| 선문대학교 컴퓨터공학부 4학년 | 선문대학교 컴퓨터공학부 4학년 | 선문대학교 컴퓨터공학부 4학년 | 선문대학교 컴퓨터공학부 4학년 |


## 📚 STACKS

### FrontEnd
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
<img src="https://img.shields.io/badge/jquery-0769AD?style=for-the-badge&logo=jquery&logoColor=white">
<img src="https://img.shields.io/badge/ajax-3888c0?style=for-the-badge&logo=ajax&logoColor=white">

### BackEnd
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"> 
<img src="https://img.shields.io/badge/jsp-007396?style=for-the-badge&logo=jsp&logoColor=white"> 
<img src="https://img.shields.io/badge/jstl-75834b?style=for-the-badge&logo=jstl&logoColor=white">
<img src="https://img.shields.io/badge/xml-ec9831?style=for-the-badge&logo=xml&logoColor=white"> 

## AI
<img src="https://img.shields.io/badge/pytorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white"> 
<img src="https://img.shields.io/badge/pytorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white">

### FrameWork
<img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white"> 

### Tool
<img src="https://img.shields.io/badge/eclipse-2C2255?style=for-the-badge&logo=Eclipse IDE&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> 
<img src="https://img.shields.io/badge/chrome-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white"> 
<img src="https://img.shields.io/badge/whale-00133c?style=for-the-badge&logo=whale&logoColor=white"> 

### DB
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 

### Server
<img src="https://img.shields.io/badge/apache-D22128?style=for-the-badge&logo=apache&logoColor=white"> <img src="https://img.shields.io/badge/apachetomcat-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=black"> 

### Environment
<img src="https://img.shields.io/badge/intellij-000000?style=for-the-badge&logo=intellijidea&logoColor=white"> <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
       
### Config
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)        

### Development
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Strapi](https://img.shields.io/badge/Strapi-2F2E8B?style=for-the-badge&logo=Strapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white)
![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=MUI&logoColor=white)

### Communication
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)
![GoogleMeet](https://img.shields.io/badge/GoogleMeet-00897B?style=for-the-badge&logo=Google%20Meet&logoColor=white)

## 상세 자료
  - 우리 논문 링크나 시연 영상 PPT 파일 등?
  - [Flask BackEnd](https://github.com/SMpanacea/BackEnd)
  - [AI Model](https://github.com/SMpanacea/MODEL)
  - [어플리케이션 시연영상](https://youtu.be/BUATiiF5zXA?si=UXur5HznLdy3JnvA)

## 참고 자료
 -  참고 블로그 기술논문 작성


