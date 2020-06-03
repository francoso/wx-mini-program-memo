"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../utils/util");
var util_2 = require("../../utils/util");
//此处要修改，主要是把content换成表格形式。
Page({
    data: {
        array:[
            {name: '流动资产', value:0,checked:"ture"},
            {name: '非流动资产', value:1,checked:""},
            {name: '流动负债', value:2,checked:""},
            {name: '非流动负债', value:3,checked:""},
        ],
        id: '',
        time: '',
        title: '',
        content: '',
        number_1: 0,
        memoListData: [],
        isEdit: false,
        IsAdd:0
    },
    listenerRadioGroup: function(e) {
        var memoListData = wx.getStorageSync('memoListData');
        if (memoListData) {
            var id = wx.getStorageSync('id');
            for (var i = 0; i < memoListData.length; i++) {
                if (memoListData[i].id == id) {
                    this.setData({
                        IsAdd: e.detail.value,
                    });
                    break;
                }
            }
        }
        console.log(e.detail.value)
      },
    onLoad: function () {
        this.setData({
            time: util_1.formatTime(new Date(), "-")
        });
        try {
            var memoListData = wx.getStorageSync('memoListData');
            if (memoListData) {
                this.setData({
                    memoListData: memoListData
                });
            }
        }
        catch (e) { }
    },
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh({
            success: function () {
            }
        });
    },
    onShow: function () {
        try {
            var isEdit = wx.getStorageSync('isEdit');
            var memoListData = wx.getStorageSync('memoListData');
            if (isEdit) {
                wx.setNavigationBarTitle({
                    title: '负债资产表 - 编辑'
                });
                if (memoListData) {
                    var id = wx.getStorageSync('id');
                    for (var i = 0; i < memoListData.length; i++) {
                        if (memoListData[i].id == id) {
                            this.setData({
                                id: id,
                                time: util_1.formatTime(new Date(), "-"),
                                title: memoListData[i].title,
                                content: memoListData[i].content,
                                number_1:memoListData[i].number_1,
                                memoListData: memoListData,
                                isEdit: true
                            });
                            break;
                        }
                    }
                }
                ;
                wx.setTabBarItem({
                    index: 1,
                    text: '编辑',
                    iconPath: 'assets/imgs/tabBarEdit.png',
                    selectedIconPath: 'assets/imgs/tabBarEditSelected.png'
                });
            }
            else {
                wx.setNavigationBarTitle({
                    title: '负债资产表 - 编辑'
                });
                this.setData({
                    id: '',
                    time: util_1.formatTime(new Date(), "-"),
                    title: '',
                    content: '',
                    number_1:0,
                    memoListData: memoListData ? memoListData : [],
                    isEdit: false
                });
                wx.setTabBarItem({
                    index: 1,
                    text: '记录',
                    iconPath: 'assets/imgs/tabBarNew.png',
                    selectedIconPath: 'assets/imgs/tabBarNewSelected.png'
                });
            }
        }
        catch (e) { }
    },
    onHide: function () {
        try {
            wx.setTabBarItem({
                index: 1,
                text: '记录',
                iconPath: 'assets/imgs/tabBarNew.png',
                selectedIconPath: 'assets/imgs/tabBarNewSelected.png'
            });
        }
        catch (e) { }
    },
    memoTitle: function (e) {
        this.setData({
            title: e.detail.value
        });
    },
    memoContent: function (e) {
        this.setData({
            content: e.detail.value
        });
    },
    memoNumber_1:function(e){
        this.setData({
            number_1:e.detail.value
        });
    },
    cancel: function () {
        try {
            this.setData({
                id: '',
                time: '',
                title: '',
                content: '',
                number_1:0,
                memoListData: [],
                IsAdd:0,
            });
            wx.setStorageSync('isEdit', false);
            this.data.isEdit = false;
            wx.setTabBarItem({
                index: 1,
                text: '记录',
                iconPath: 'assets/imgs/tabBarNew.png',
                selectedIconPath: 'assets/imgs/tabBarNewSelected.png'
            });
            wx.switchTab({
                url: '/pages/index/index'
            });
        }
        catch (e) { }
    },
    deleteModal: function () {
        var that = this;
        wx.showModal({
            title: '删除提示',
            content: '是否确定删除该记录！',
            success: function (res) {
                if (res.confirm) {
                    that.delete();
                }
                else if (res.cancel) {
                }
            }
        });
    },
    delete: function () {
        var _this = this;
        if (this.data.id != "") {
            try {
                if (this.data.memoListData != null) {
                    var index = this.data.memoListData.findIndex(function (item) { return item.id == _this.data.id; });
                    this.data.memoListData.splice(index, 1);
                    wx.setStorageSync('memoListData', this.data.memoListData);
                    if (this.data.memoListData.length == 0) {
                        wx.clearStorageSync();
                    }
                    wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 1000
                    });
                    setTimeout(function () {
                        wx.switchTab({
                            url: '/pages/index/index'
                        });
                    }, 800);
                }
            }
            catch (e) { }
        }
    },
    save: function () {
        var id = this.data.id ? this.data.id : util_2.randomNumber();
        var time = this.data.time;
        var title = this.data.title;
        var content = this.data.content;
        var number_1 = this.data.number_1;
        var IsAdd = this.data.IsAdd;
        if (title == '') {
            wx.showToast({
                title: '请输入标题',
                icon: 'none',
                duration: 1000
            });
        }
        else {
            if (this.data.id != '') {
                for (var i = 0; i < this.data.memoListData.length; i++) {
                    if (this.data.memoListData[i].id == id) {
                        this.data.memoListData[i].id = id;
                        this.data.memoListData[i].time = time;
                        this.data.memoListData[i].title = title;
                        this.data.memoListData[i].content = content;
                        this.data.memoListData[i].number_1 = number_1;
                        this.data.memoListData[i].IsAdd=IsAdd;
                        break;
                    }
                }
            }
            else {
                this.data.memoListData.unshift({
                    'id': id,
                    "time": time,
                    "title": title,
                    "content": content,
                    "number_1":number_1,
                    "IsAdd":IsAdd
                });
            }
            try {
                wx.setStorageSync('memoListData', this.data.memoListData);
                wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 1000
                });
                setTimeout(function () {
                    wx.switchTab({
                        url: '/pages/index/index'
                    });
                }, 800);
            }
            catch (e) {
                wx.showToast({
                    title: "保存失败，请稍后再试！",
                    icon: 'none',
                    duration: 2000
                });
            }
        }
    }
});
