"use strict";
Page({
    data: {},
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh({
            success: function () {
            }
        });
    },
    onShow: function () {
        try {
            wx.setNavigationBarTitle({
                title: '关于该程序'
            });
            wx.setStorageSync('isEdit', false);
        }
        catch (e) { }
    },
    onClickDisclaimer: function () {
        wx.showModal({
            title: '制作人的话',
            content: '做个程序不容易，求老师给分高点',
            showCancel: true
        });
    }
});
