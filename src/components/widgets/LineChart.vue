<template>
  <div class="line-chart">
    <div id="charts">
      <div id="main3" :style="{width:'400px',height:'300px'}"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts"
import mock from "../../mock.js"
export default {
  props: {
    chartType: {
      type: String,
      default: 'firstType'
    },
    chartData: {
      type: Object,
      default () {
        return null;
      }
    }
  },
  data() {
    return {}
  },
  mounted() {
    var myChart3 = echarts.init(document.getElementById('main3'));

    function fmtMoney(s, n) {
      var n = n > 0 && n <= 20 ? n : 2;
      var s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
      var t = "";
      for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length && l[i + 1] != '-' ? "," : "");
      }
      return t.split("").reverse().join("") + "." + r;
    }

    if (this.chartType == 'firstType') {
      if (this.chartData) {
        var ret = this.chartData;
        var labels = ret.data.labels;
        var data = ret.data.data;
        var min = 0;
        var max = ret.max_value;
      } else {
        var ret = mock.testData;
        var labels = ret.data.labels;
        var data = ret.data.data;
        var min = ret.min;
        var max = ret.max;
      }
      var option = {
        title: {
          text: '预期获利'
        },
        tooltip: {
          trigger: 'axis',
          // formatter:"{b}年预期收益<br />{a0}收益: ${c0}<br />{a1}收益: ${c1}<br />{a2}收益: ${c2}<br />{a3}收益: ${c3}<br />{a4}收益: ${c4}"
          backgroundColor: 'rgba(255,2552,255,0.9)',
          borderColor: '#b6ccdc',
          textStyle: {
            color: '#303030'
          },
          extraCssText: 'box-shadow: 0 0 5px #b6ccdc',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: '#000',
              width: '2'
            }
          },
          formatter: function(params, ticket, callback) {
            var html = new Array();
            if (params instanceof Array) {
              html += '<h2 style="margin-top: 10px;margin-bottom: 10px;color: #333;font-size: 15px">' + params[0].name + '年<h2>';
              var last = 0;
              var arr = new Array();
              for (var i = 0; i < params.length; i++) {
                var n = parseFloat(params[i].data) + last;
                last = n;
                n = fmtMoney(n, 0);
                n = "$" + n;
                arr.push('<p style="margin-top: 10px;margin-bottom: 10px;color: #333;font-size: 15px"><span style="display: inline-block;width: 200px;">' + params[i].seriesName + '收益</span><span>' + n + '</span></p>');
              }
            }
            return html + arr.reverse().join("");
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: labels
        }],
        yAxis: [{
          min: min,
          max: max,
          position: "right",
          type: 'value',
          axisLabel: {
            formatter: '${value}'
          },
          splitLine: {
            lineStyle: {
              opacity: 0.3
            }
          }
        }],
        series: [{
          name: '95%可能',
          type: 'line',
          smooth: true,
          stack: '总量',
          showSymbol: false,
          lineStyle: {
            normal: {
              color: "#969797",
              opacity: 1
            }
          },
          areaStyle: {
            normal: {
              color: "#fff"
            }
          },
          data: data[0]
        }, {
          name: '75%可能',
          type: 'line',
          smooth: true,
          stack: '总量',
          showSymbol: false,
          lineStyle: {
            normal: {
              color: "#969797",
              opacity: 0
            }
          },
          areaStyle: {
            normal: {
              color: "#E9F6F8"
            }
          },
          data: data[1]
        }, {
          name: '50%可能',
          type: 'line',
          smooth: true,
          stack: '总量',
          showSymbol: false,
          lineStyle: {
            normal: {
              color: "#133B65",
              opacity: 1
            }
          },
          areaStyle: {
            normal: {
              color: "#DAF0F2"
            }
          },
          data: data[2]
        }, {
          name: '25%可能',
          type: 'line',
          smooth: true,
          stack: '总量',
          showSymbol: false,
          lineStyle: {
            normal: {
              opacity: 0
            }
          },
          areaStyle: {
            normal: {
              color: "#DAF0F2"
            }
          },
          data: data[3]
        }, {
          name: '5%可能',
          type: 'line',
          smooth: true,
          stack: '总量',
          showSymbol: false,
          lineStyle: {
            normal: {
              color: "#5390c3",
              opacity: 1
            }
          },
          areaStyle: {
            normal: {
              color: "#E9F6F8"
            }
          },
          data: data[4]
        }]
      };
      myChart3.setOption(option);
    }
    if (this.chartType == 'secondType') {
      var userData = mock.userData;
      var xData = [];
      var yData = [];
      var y1Data = [];
      for (var i = 0; i < userData.length; i++) {
        xData.push(userData[i].x);
        yData.push(userData[i].y);
        y1Data.push(userData[i].y1);
      }
      var option = {
        // title: {
        //     text: '收益图（美金）'
        // },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,2552,255,0.9)',
          borderColor: '#b6ccdc',
          textStyle: {
            color: '#303030'
          },
          extraCssText: 'box-shadow: 0 0 5px #b6ccdc',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: '#000',
              width: '2'
            }
          },
          formatter: function(params, ticket, callback) {
            var html = '';
            if (params instanceof Array) {
              var date = new Date(params.name);
              html += '<h2 style="margin-top: 10px;margin-bottom: 10px;color: #333;font-size: 15px">' + params[0].name + '<h2>';
              html += '<p style="margin-top: 10px;margin-bottom: 10px;color: #333;font-size: 15px"><span style="display: inline-block;width: 200px;">账户价值</span><span>$' + fmtMoney(params[0].data, 2) + '</span></p>';
              html += '<p style="margin-top: 10px;margin-bottom: 10px;color: #2881ef;font-size: 15px"><span style="display: inline-block;width: 200px;">净存入值</span><span>$' + fmtMoney(params[1].data, 2) + '</span></p>';

              var a = parseFloat(params[0].data - params[1].data);
              var d = fmtMoney(parseFloat(params[0].data - params[1].data), 2);
              if (a > 0) {
                d = '<span style="color:#f00">$' + d + '</span>';
              } else {
                d = '<span style="color:#789336">$' + d + '</span>';
              }


              html += '<p style="margin-top: 10px;margin-bottom: 10px;color: #333;font-size: 15px"><span style="display: inline-block;width: 200px;">累计收益</span><span>' + d + '</span></p>';
            } else {
              if (params.componentType == "markLine") {
                html += '<h2>您的投资金额：$' + params.value + '</h2>';
              } else {
                html += '<h2>您的投资金额：$' + params.data.coord[1][1] + '</h2>';
              }
            }
            return html;
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        dataZoom: [{
          type: 'slider',
          show: true,
          backgroundColor: '#eee',
          fillerColor: 'rgba(40,129,239,0.2)',
          xAxisIndex: [0],
          start: 0,
          end: 100,
          showDataShadow: true,
          bottom: '0',
          //handleIcon:'image:../../images/table_arrow.png',
          handleSize: '100%'
        }, {
          type: 'inside',
          xAxisIndex: [0],
          start: 0,
          end: 100
        }],
        grid: {
          left: '5%', //设置图表主题距离容器左侧距离
          right: '10%', //设置图表主题距离容器右侧距离
          bottom: '15%', //设置图表主题距离容器底侧距离
          containLabel: false
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          splitLine: false, //去除网格线
          data: xData
        }],
        yAxis: [{
          type: 'value',
          position: 'right'
        }],
        series: [{
          name: 'Balance',
          type: 'line',
          lineStyle: {
            normal: {
              color: '#000', //设置折线的颜色
              width: 1, //设置折线的宽度
              z: 1
            },
          },
          itemStyle: {
            normal: {
              opacity: 0 //隐藏拐点
            },
          },
          areaStyle: {
            normal: {
              color: 'rgba(65,159,228,0.4)', //设置覆盖区域的颜色
              z: 1
            }
          },
          smooth: true,
          showSymbol: false,
          hoverAnimation: false,
          data: yData
        }, {
          name: 'Balance',
          type: 'line',
          lineStyle: {
            normal: {
              color: '#419FE4', //设置折线的颜色
              width: 1, //设置折线的宽度
              z: 1
            },
          },
          itemStyle: {
            normal: {
              opacity: 0 //隐藏拐点
            },
          },
          areaStyle: {
            normal: {
              color: 'rgba(65,159,228,0.4)', //设置覆盖区域的颜色
              z: 1
            },
          },
          smooth: true,
          showSymbol: false,
          hoverAnimation: false,
          data: y1Data
        }]
      };
      myChart3.setOption(option);
    }
    if (this.chartType == 'thirdType') {
      var userData = mock.thirdData;
      var xData = [];
      var userDataY = [];
      for (var i = 0; i < userData.length; i++) {
        xData.push(userData[i].x);
        userDataY.push(userData[i].y);
      }
      var option = {
        title: {
          text: '截止至上一个美股交易日',
          x: 'right',
          y: 'bottom',
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: 'orange'
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,2552,255,0.9)',
          borderColor: '#b6ccdc',
          textStyle: {
            color: '#303030'
          },
          extraCssText: 'box-shadow: 0 0 5px #b6ccdc',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: '#000',
              width: '1'
            }
          },
          formatter: function(params, ticket, callback) {
            var html = '';
            if (params instanceof Array) {
              var date = new Date(params.name);
              html += '<h2 style="margin-top: 10px;margin-bottom: 10px;color: #333;font-size: 15px">' + params[0].name + '<h2>';
              for (var i = 0; i < params.length; i++) {
                var n = parseFloat(params[i].data)
                if (n > 0) {
                  n = '<span style="color:#f00">' + n + '%</span>';
                } else if (n == 0) {
                  n = n + '%';
                } else {
                  n = '<span style="color:#789336">' + n + '%</span>';
                }
                html += '<p style="margin-top: 10px;margin-bottom: 10px;color: #333;font-size: 15px"><span style="display: inline-block;width: 200px;">' + params[i].seriesName + '</span><span>' + n + '</span></p>';
                // html += '<p style="font-size: 15px;margin: 10px 0;"><span>(截止至上一个美股交易日)</span></p>';
              }
            }
            return html;
          }
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: [{
              name: '您的帐户',
              icon: "circle",
              textStyle: {
                color: '#30b9cb'
              }
            },
            // {
            //     name: '标普500',
            //     icon: "circle",
            //     textStyle: {
            //         color: '#97d158'
            //     }
            // },
            // {
            //     name: '恒生指数',
            //     icon: "circle",
            //     textStyle: {
            //         color: '#f7d649'
            //     }
            // }
          ]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        dataZoom: [{
          type: 'slider',
          show: false,
          backgroundColor: '#fff',
          fillerColor: 'rgba(40,129,239,0.2)',
          xAxisIndex: [0],
          start: 0,
          end: 100,
          showDataShadow: true,
          bottom: '0',
          handleSize: '100%'
        }, {
          type: 'inside',
          xAxisIndex: [0],
          start: 0,
          end: 100
        }],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: xData

        }],
        yAxis: [{
          // interval: 1,
          type: 'value',
          position: "right",
          axisLabel: {
            // interval: 1,
            formatter: function(value) {
              return value.toFixed(1) + "%";
            }
          },
          splitLine: {
            lineStyle: {
              opacity: 0.3
            }
          }
        }],
        series: [{
            name: '您的帐户',
            type: 'line',
            smooth: false,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: "#30b9cb"
              }
            },
            lineStyle: {
              normal: {
                color: '#30b9cb'
              }
            },
            data: userDataY //[0.00, 0.18, -1.07, -3.44, -4.49, -4.38, -3.60, -5.99, -4.44, -6.48, -6.35, -7.53, -7.01, -5.09, -6.51, -5.23, -6.25, -5.75, -3.45, -3.47, -5.20, -4.62, -4.46, -6.27, -7.52, -7.50, -7.57, -8.76, -6.88, -5.30, -3.75, -4.13, -4.17, -2.77, -3.99, -3.54, -2.36, -2.58, -3.33, -1.06, -0.60, -0.20, 0.13, 0.22, -0.86, -0.36, -0.27, 1.34, 1.22, 1.06, 1.66, 2.31, 2.72, 2.87, 2.83, 2.16, 2.13, 2.20, 3.15, 3.61, 3.37, 4.08, 3.75, 2.73, 3.86, 2.63, 2.92, 2.69, 3.65, 4.70, 4.71, 4.61, 5.35, 5.69, 5.80, 5.24, 5.25, 5.08, 5.25, 5.47, 4.53, 3.98, 4.81, 3.92, 3.35, 3.35, 3.73, 3.83, 5.12, 4.15, 4.19, 3.30, 4.32, 3.37, 3.41, 3.06, 3.72, 3.59, 4.93, 5.64, 5.68, 6.14, 5.95, 6.18, 6.51, 6.20, 6.75, 6.92, 7.28, 7.14, 6.15, 5.35, 5.15, 5.02, 5.34, 4.96, 5.64, 5.94, 5.78, 7.15, 3.36, 1.54, 3.36, 5.11, 6.54]
          },
          // {
          //     name: '标普500',
          //     type: 'line',
          //     smooth: false,
          //     showSymbol: false,
          //     itemStyle: {
          //         normal: {
          //             color: "#97d158"
          //         }
          //     },
          //     lineStyle: {
          //         normal: {
          //             color: '#97d158'
          //         }
          //     },
          //     data: sp//data.data[0]
          // },
          // {
          //     name: '恒生指数',
          //     type: 'line',
          //     smooth: false,
          //     showSymbol: false,
          //     itemStyle: {
          //         normal: {
          //             color: "#f7d649"
          //         }
          //     },
          //     lineStyle: {
          //         normal: {
          //             color: '#f7d649'
          //         }
          //     },
          //     data: hsi//data.data[1]
          // }
        ]
      };
      myChart3.setOption(option);
    }

  }

}
</script>
<style scoped>
.line-chart {
  #charts {
    width: 100%;
    text-align: center;
  }
}
</style>
