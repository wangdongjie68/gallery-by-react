require('normalize.css/normalize.css');
require('styles/App.scss');


import React from 'react';

//获取图片相关的数据
var imageDatas = require('../data/imageDatas.json');

//利用自执行函数，将图片名信息转成图片URL路径信息
imageDatas = (function genImageURL(imageDatasArr){
  for(var i = 0, j = imageDatasArr.length; i < j; i++){
    var singleImageData = imageDatasArr[i];

    singleImageData.imageURL = require('../images/' + singleImageData.filename);
  }

  return imageDatasArr;
})(imageDatas);

let yeomanImage = require('../images/yeoman.png');

//获取区间内的随机值
function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

var ImgFigure = React.createClass({

  /*
  Constant: {
    centerPos: {
      left: 0,
      right: 0
    },
    hPosRange: {  //水平方向的取值范围
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    vPosRange: {  //垂直方的取值范围
      x: [0, 0],
      topY:[0, 0]
    }
  },

  //重新布局所有图片
  rearrange: function(centerIndex){
    var imgsArrageArr = this.stage.imgsArrageArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.ceil(Math.random() * 2), //取一个或者不取
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrageArr.splice(centerIndex,1);

        //首先居中 centerIndex 的图片
        imgsArrangeCenterArr[0].pos = centerPos;

        //取出要布局上侧的图片的状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrageArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        //布局位于上侧的图片
        imgsArrangeTopArr.forEach(function(value, index){
          imgsArrangeTopArr[index].pos = {
            top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
            left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
          }
        });

        //布局左右两侧的图片
        for(var i = 0, j = imgsArrageArr.length, k = j / 2; i < j; i ++){
          var hPosRangeLORX = null;

          //前半部分布局左边，右边部分布局右边
          if(i < k){
            hPosRangeLORX = hPosRangeLeftSecX;
          } else {
            hPosRangeLORX = hPosRangeRightSecX;
          }

          imgsArrageArr[i].pos = {
            top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
            left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
          }
        }

        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
          imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.setState({
          imgsArrageArr: imgsArrageArr
        });
  },

  getInitialState: function(){
    return{
      imgsArrageArr:[
        {
          pos:{
            left: '0',
            top: '0'
          }
        }
      ]
    };
  },

  //组件加载以后，为每张图片计算其位置的范围
  componentDidMount: function(){

    //首先拿到舞台的大小
    var stageDOM = React.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

    //拿到一个imageFigure的大小
    var imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);

    //计算中心图片的位置点
    this.Constant.centerPos = {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
    }

    //计算左侧，，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfImgW - imgW;
    this.Constant.vPosRange.x[1] = halfImgW;

    this.rearrange(0);
  },

  */


  render: function(){
    return (
      <figure className="img-figure">
        <img className="img-self" src={this.props.data.imageURL}
             alt={this.props.data.title}
        />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
})

var AppComponent = React.createClass({
  render: function() {
    var controllerUnits = [],
        imgFigures = [];

        imageDatas.forEach(function(value) {
          imgFigures.push(<ImgFigure data = {value}/>);
        });

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
});

// class AppComponent extends React.Component {
//   render() {
//     var controllerUnits = [],
//         imgFigures = [];

//         imageDatas.forEach(function(value) {
//           imgFigures.push(<ImgFigure data = {value}/>);
//         });

//     return (
//       <section className="stage" ref="stage">
//         <section className="img-sec">
//           {imgFigures}
//         </section>
//         <nav className="controller-nav">
//           {controllerUnits}
//         </nav>
//       </section>
//     );
//   }
// }

AppComponent.defaultProps = {
};

export default AppComponent;
