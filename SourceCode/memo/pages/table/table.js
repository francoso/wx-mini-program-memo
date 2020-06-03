import MockData from './mockdata.js'
import {
  formatTime
} from '../../utils/util.js'
import mockdata from './mockdata.js';

Page({
  data: {
    currentDate: '',
    username: 'XXXX',
    list: '',
    memoListData:''
  },
  
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '表格',
    })
    //设置当前年月
    var memoListData = wx.getStorageSync('memoListData');
    if (memoListData) {
      this.setData({
          memoListData: memoListData
      });
  }
    this.setCurrentDate()
    this._getSalary()
    console.log("yes")
    console.log(MockData.data[0].children[0].id)
  },

  setCurrentDate(){
    //获取当前年月
    let date = new Date()
    let fmtDate = formatTime(date).substring(0, 10)
    this.setData({
      currentDate: fmtDate,
    })
    console.log(fmtDate)
  },

  //日期变化回调
  dateChange(res) {
    console.log(res)
    let value = res.detail.value
    this.setData({
      currentDate: value
    })
    //请求数据
    this._getSalary()
  },

  //模拟请求数据
  _getSalary(){
    var memoListData = wx.getStorageSync('memoListData');
    var number_0=0;
    var number_1=0;
    var number_2=0;
    var number_3=0;
    for(var i=0;i<memoListData.length;i++)
    {
      if(memoListData[i].IsAdd==0)
      {
        number_0++;
      } 
      if(memoListData[i].IsAdd==1)
      {
        number_1++;
      } 
      if(memoListData[i].IsAdd==2)
      {
        number_2++;
      } 
      if(memoListData[i].IsAdd==3)
      {
        number_3++;
      } 
    }
    console.log(number_0);
    console.log(number_1);
    console.log(number_2);
    console.log(number_3);
    var total=0;
    for(var i=0;i<memoListData.length;i++)
    {
      if(memoListData[i].IsAdd==0||memoListData[i].IsAdd==1)
      {
        total=parseInt(total)+parseInt(memoListData[i].number_1);
        console.log(total);
      }
      else if(memoListData[i].IsAdd==2||memoListData[i].IsAdd==3)
      {
        total=parseInt(total)-parseInt(memoListData[i].number_1);
        console.log(total);
      }
    }
    MockData.data[2].value=total;
    console.log(MockData.data[2].value)
    this.setData({
      list: MockData.data
    })
  },
  onPullDownRefresh: function () {
    var that = this;
    wx.stopPullDownRefresh({
        success: function () {
          wx.setNavigationBarTitle({
            title: '表格',
          })
          //设置当前年月
          var memoListData = wx.getStorageSync('memoListData');
          if (memoListData) {
            that.setData({
                memoListData: memoListData
            });
        }
          that.setCurrentDate()
          that._getSalary()
          console.log("yes")
          console.log(MockData.data[0].children[0].id)
        }
    });
},
})
