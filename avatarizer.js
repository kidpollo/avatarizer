/*jslint white: false, onevar: true, browser: true, devel: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: false, newcap: true, immed: true */
/*global jQuery, $, Raphael */
var Avatar = function (domID, width, height, avatarOptions){
  var self = this;
  self.init(domID, width, height, avatarOptions);
}

Avatar.prototype = {
  faceToneMappings: {
    white: {faceColor: '#F2DBC3', expresionLines: '#E2C19C', faceContour: '#EACCAE'},
    black: {faceColor: '#F2DBC3', expresionLines: '#E2C19C', faceContour: '#E4C3A4'},
    brown: {faceColor: '#F2DBC3', expresionLines: '#E2C19C', faceContour: '#E4C3A4'}
  },

  init: function(domID, width, height, avatarOptions){
    this.paper = Raphael(domID, width, height);
    this.avatarOptions = avatarOptions;
    this.width = width;
    this.height = height;
    this.xPos = width/2;
    this.yPos = height/2;
    this.drawLabel(avatarOptions.label, 26);
    this.drawFace();
    this.drawHair();
    this.drawEyes(); 
    this.drawMouth();
    this.drawNose();
  },

  drawFace: function(){
    var avatarDataSource = Avatar.avatarDataSource;
    var avatarOptions = this.avatarOptions;
    var avatarGendergroup = avatarDataSource.faceType[avatarOptions.faceType][avatarOptions.gender];
    var avatarFaceDetails = avatarGendergroup.faceExpression[avatarOptions.faceExpression]

    this.drawPaths(avatarGendergroup.facePath);
    this.drawPaths(avatarFaceDetails.faceContour);
    this.drawPaths(avatarFaceDetails.faceExpresionLines);
  },

  drawHair: function(){
    var avatarDataSource = Avatar.avatarDataSource;
    var avatarOptions = this.avatarOptions;

    this.drawPaths(avatarDataSource.hair[avatarOptions.gender][avatarOptions.hairType]);
  },

  drawEyes: function(){
    var avatarDataSource = Avatar.avatarDataSource;
    var avatarOptions = this.avatarOptions;

    this.drawPaths(avatarDataSource.eyes[avatarOptions.gender][avatarOptions.eyesType]);
  },

  drawMouth: function(){
    var avatarDataSource = Avatar.avatarDataSource;
    var avatarOptions = this.avatarOptions;

    this.drawPaths(avatarDataSource.mouth[avatarOptions.gender][avatarOptions.mouthType]);
  },

  drawNose: function(){
    var avatarDataSource = Avatar.avatarDataSource;
    var avatarOptions = this.avatarOptions;

    this.drawPaths(avatarDataSource.nose[avatarOptions.gender][avatarOptions.noseType]);
  },

  drawPaths: function(paths){
    for (var i in paths){
      var path = paths[i];
      var pathInstance;
      if(path.type == 'complex'){
        pathInstance = this.paper.path(path.path); 
      }else if( path.type == 'circle'){
        pathInstance = this.paper.circle(path.cx, path.cy, path.radius);
      }
      pathInstance.attr(path.attr)
      pathInstance.translate(this.xPos, this.yPos);
    }
  },

  drawLabel: function(labelText, dotRadius){
    var dot, label;
    dot = this.paper.circle(this.width - dotRadius, this.height - dotRadius, dotRadius );
    dot.attr({
      'stroke-width': 0,
      'fill':         '#cccccc',
      'fill-opacity': 1.0
    });
    label = this.paper.text(this.width - dotRadius, this.height - dotRadius, labelText);
    label.attr({
      'fill': '#ffffff',
      'font-size' : 20,
      'font-family' : "'League Gothic', 'Futura-CondensedMedium', 'Gill Sans MT Condensed', 'Arial Narrow', sans-serif"
    });
  }
}

Avatar.avatarDataSource = {
  faceType: {
    oblong: {
      male: {
        facePath:[{
          type: 'complex',
          path: 'M3.243,92.927c-10.84,0-21.411-2.037-26.305-5.069c-12.438-7.704-28.262-45.752-31.948-57.841 c-1.477,0.783-2.93,1.179-4.341,1.179c-1.871,0-3.572-0.685-5.057-2.035c-4.822-4.383-8.13-21.272-2.937-28.385 c1.745-2.39,3.799-2.891,5.214-2.891c1.775,0,3.521,0.81,5.001,1.922c0.124-2.485,0.324-4.943,0.601-7.348 c1.607-13.962,4.442-29.902,13.28-42.265c9.979-13.959,25.549-20.745,47.6-20.745c1.241,0,2.509,0.022,3.803,0.066 C39.8-69.391,57.985-47.435,60.744-6.99c0.061,0.895,0.092,1.796,0.124,2.696l0.038,1.044c0.042,1.06,0.078,2.084,0.106,3.081 c1.441-1.105,3.173-1.947,5.025-1.947c1.409,0,3.455,0.502,5.2,2.891c3.293,4.511,3.356,13.133,1.957,19.677 c-0.634,2.964-2.158,8.201-5.249,9.966c-1.261,0.721-2.762,1.086-4.458,1.086c0,0,0,0,0,0c-1.588,0-3.164-0.326-4.48-0.796 C55.789,41.027,40.967,77.62,27.505,87.46C20.998,92.216,9.511,92.927,3.243,92.927z',
          attr: { fill:'#F2DBC3','stroke-width': 5 },
        }],
        faceExpression:{
          young:{ 
            faceContour: [{
              type: 'complex',
              path: "M43.323,6.327C29.198-0.645,9.001,8.712,9.001,8.712c12.17-7.366,32.05-4.93,37.26-4.46 c-1.005-1.559-4.385-12.258-9.797-22.97c-15.641-30.956-60.351-26.379-71.641,1.044C-43.055,1.46-41.112,1.531-42.819,4.252 c2.353-0.268,21.881-3.691,35.348,4.46c0,0-20.437-2.438-36.187-1.485c-15.487,22.85,21.577,69.534,21.577,69.534s2,4.89,22.11,4.89 c14.89,0,22.14-3.639,22.14-3.639S60.792,14.951,43.323,6.327",
              attr: { 'stroke-width': 0, fill:'#EACCAE' }
            }],
            faceExpresionLines: [{
              type: 'complex',
              path: "M-40.203,0.681c0.002-0.001-0.031-5.313,24.598-0.246c7.679,1.58,6.887,11.671,6.609,12.149 c-1.178,2.03-3.074,3.659-5.045,4.95c-5.557,3.638-13.915,6.338-20.373,3.704c-2.503-1.022-4.631-2.663-6.269-4.724 C-46.976,8.596-40.627,0.769-40.203,0.681",
              attr: { 'stroke-width': 0, fill:'#E2C19C' }
            },{
              type: 'complex',
              path: "M67.288,8.757c-0.203-1.755-1.352-9.084-4.697-6.82c-1.671,1.129-2.812,3.624-3.697,5.402 c12-5.302,5.477,15.054,5.477,15.054C66.831,18.312,67.835,13.478,67.288,8.757",
              attr: { 'stroke-width': 0, fill:'#E2C19C' }
            },{
              type: 'complex',
              path: "M43.772,0.681C43.77,0.68,43.802-4.632,19.174,0.435c-7.68,1.58-6.888,11.671-6.61,12.149 c1.179,2.03,3.075,3.659,5.045,4.95c5.559,3.638,13.916,6.338,20.375,3.704c2.502-1.022,4.63-2.663,6.268-4.724 C50.544,8.596,44.195,0.769,43.772,0.681",
              attr: { 'stroke-width': 0, fill:'#E2C19C' }
            },{
              type: 'complex',
              path: "M-8.374,70.585c0,0,5.634,1.44,8.391,1.44c2.756,0,8.742-1.44,8.742-1.44s-1.148,5.628-7.94,5.628 C-3.042,76.213-6.792,75.716-8.374,70.585",
              attr: { 'stroke-width': 0, fill:'#E2C19C' }
            },{
              type: 'complex',
              path: "M-40.238,34.112c0,0,8.264-10.306,19.047-3.427C-10.41,37.564-30.535,25.86-40.238,34.112",
              attr: { 'stroke-width': 0, fill:'#E2C19C' }
            },{
              type: 'complex',
              path: "M18.036,34.112c0,0,8.264-10.306,19.047-3.427C47.863,37.564,27.738,25.86,18.036,34.112",
              attr: { 'stroke-width': 0, fill:'#E2C19C' }
            },{
              type: 'complex',
              path: "M-62.842,1.623c-3.348-2.263-4.494,5.064-4.697,6.821c-0.547,4.721,0.457,9.554,2.917,13.634 c0,0-6.523-20.355,5.477-15.053C-60.029,5.246-61.173,2.753-62.842,1.623",
              attr: { 'stroke-width': 0, fill:'#E2C19C' }
            }]
          },
          aged:{faceContour:[],faceExpresionLines:[]},
          old:{faceContour:[],faceExpresionLines:[]}
        }
      },
      female:{facePath:[],faceExpression:{young:{faceContour:[],faceExpresionLines:[]},aged:{faceContour:[],faceExpresionLines:[]},old:{faceContour:[],faceExpresionLines:[]}}}
    },
    round: {male:[], female:[]},
    rectangle: {male:[], female:[]},
    heart: {male:[], female:[]}
  },
  hair:{
    male:{
      type1:[{
        type: 'complex',
        path: 'M52.805-21.969v36.463c0,0,4.783-10.639,10.043-15.899c0-10.84-0.201-25.183-0.201-25.183L52.805-21.969z',
        attr: {
          fill:'#000000'
        }
      },{
        type: 'complex',
        path: 'M-49.867-21.969v36.463c0,0-4.784-10.639-10.043-15.899c0-10.84,0.201-25.183,0.201-25.183L-49.867-21.969z',
        attr: {
          fill:'#000000'
        }
      },{
        type: 'complex',
        path: 'M1.985-81.969c2.211-1.333,5.695-2.882,11.434-4.404c-5.941-0.555-12.368,1.784-16.608,3.774 c0.616-1.841,1.915-4.491,4.719-8.328c-3.142,2.092-5.515,5.544-7.102,8.474c-6.465-1.456-18.914-3.394-28.805,0.275 c9.143-0.026,14.844,0.919,18.525,2.032c-27.228,6.373-48.43,28.484-53.604,56.273c-1.906,4.215-2.518,8.4-2.605,13.004 c0,0,0.431-2.925,1.738-7.069c-0.24,2.384-0.363,4.803-0.363,7.25c0,0.868,0.032,1.729,0.064,2.59 c19.836-2.099,44.076-3.332,70.25-3.332c7.469,0,14.778,0.1,21.871,0.292c-0.6-10.045-1.35-18.612-1.35-18.612 c0.896,1.791,3.463,7.9,5.164,18.718c1.338-10.21,0.191-18.718,0.191-18.718c1.406,3.13,2.744,10.456,3.064,18.838 c15.631,0.568,30.074,1.588,42.68,2.961c0.035-0.91,0.068-1.819,0.068-2.738C71.319-49.516,40.426-81.076,1.985-81.969z',
        attr: {
          fill:'#000000'
        }
      }],
      type2:[],type3:[],type4:[]
    },
    female:{type1:[],type2:[],type3:[],type4:[]}
  },
  eyes:{
    male:{
      type1:[{
        type: 'complex',
        path: 'M-0.937,4.517C-3.85,2.349-6.786,0.468-9.833-0.994c-3.041-1.457-6.198-2.428-9.379-2.63 c-3.18-0.215-6.376,0.363-9.48,1.586c-3.118,1.209-6.096,3.031-9.168,4.991c1.881-3.122,4.511-5.837,7.767-7.807 c3.241-1.964,7.214-3.046,11.143-2.76c3.933,0.252,7.648,1.763,10.711,3.921C-5.186-1.512-2.607,1.253-0.937,4.517z',
        attr: {fill: '#000000'}
      },{
        type: 'complex',
        path: 'M9.162,4.517c1.67-3.264,4.249-6.029,7.303-8.21c3.063-2.158,6.779-3.668,10.712-3.921 C31.105-7.9,35.08-6.818,38.32-4.854c3.256,1.97,5.886,4.685,7.768,7.807c-3.072-1.96-6.051-3.781-9.169-4.991 c-3.104-1.223-6.3-1.801-9.48-1.586c-3.182,0.203-6.339,1.173-9.38,2.63C15.012,0.468,12.075,2.349,9.162,4.517z',
        attr: {fill: '#000000'}
      },{
        type: 'circle',
        radius: 6.688,
        attr: {stroke: '#000000',fill: '#000000'},
        cx:   26.725, 
        cy:   11.974
      },{
        type: 'circle',
        radius: 2.281,
        attr: {stroke: '#FFFFFF',fill: '#FFFFFF'},
        cx:   24.038, 
        cy:   10.255
      },{
        type: 'circle',
        radius: 6.688,
        attr: {stroke: '#000000',fill: '#000000'},
        cx:  -20.773, 
        cy:   11.974
      },{
        type: 'circle',
        radius: 2.281,
        attr: {stroke: '#FFFFFF',fill: '#FFFFFF'},
        cx:   -23.46, 
        cy:   10.255
      }],
      type2:[],type3:[],type4:[]
    },
    female:{type1:[],type2:[],type3:[],type4:[]}
  },
  mouth:{
    male:{
      type1:[{
        type: 'complex',
        path: 'M-7.771,68.073c2.455,0.213,4.842-0.016,7.151-0.481c2.304-0.494,4.532-1.253,6.633-2.295 c2.12-1.007,4.11-2.291,6.031-3.704c1.915-1.427,3.737-3.01,5.597-4.639c-1.214,2.156-2.78,4.11-4.591,5.833 c-1.805,1.731-3.894,3.19-6.166,4.309c-2.284,1.087-4.756,1.832-7.282,2.035C-2.906,69.335-5.499,69.099-7.771,68.073z',
        attr: {fill: '#000000'}
      }],
      type2:[],type3:[],type4:[]
    },
    female:{type1:[],type2:[],type3:[],type4:[]}
  },
  nose:{
    male:{
      type1:[{
        type: 'complex',
        path: 'M15.647,36.722c0,0-7.472,10.054-12.069,10.054c-4.599,0-12.646-10.054-12.646-10.054',
        attr: {fill: "none", stroke: "#000000", 'stroke-width': 2, 'stroke-linecap': "round", 'stroke-linejoin':"round", 'stroke-miterlimit': 10}
      }],
      type2:[],type3:[],type4:[]
    },
    female:{type1:[],type2:[],type3:[],type4:[]}
  }
}
