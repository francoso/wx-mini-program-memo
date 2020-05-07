"use strict";
Page({
    data: {
        isListMode: false,
        isNullData: true,
        memoListData: [],
        pageSize: 20,
        count: 0,
        startX: 0,
        startY: 0
    },
    touchStartTime: 0,
    touchEndTime: 0,
    onPullDownRefresh: function () {
        var that = this;
        wx.stopPullDownRefresh({
            success: function () {
                that.data.count = 0;
                that.setData({
                    count: that.data.count
                });
                that.getMemoListData();
            }
        });
    },
    onReachBottom: function () {
        var memoListData = wx.getStorageSync('memoListData');
        if (memoListData != null) {
            if (this.data.count == Math.ceil(memoListData.length / this.data.pageSize)) {
                wx.showToast({
                    title: '没有更多数据了！',
                    icon: 'none',
                    duration: 1500
                });
            }
            else {
                this.data.count++;
                this.getMemoListData();
            }
        }
    },
    onShow: function () {
        try {
            this.data.count = 0;
            this.setData({
                count: this.data.count
            });
            this.getMemoListData();
            wx.setStorageSync('isEdit', false);
        }
        catch (e) { }
    },
    onLoad: function () {
        this.data.count = 0;
        this.setData({
            count: this.data.count
        });
        this.getMemoListData();
    },
    getMemoListData: function () {
        try {
            var memoListData = wx.getStorageSync('memoListData');
            if (memoListData) {
                memoListData.forEach(function (item) {
                    item.isTouchMove = false;
                });
                var memoListDataTemp = [];
                var total = memoListData.length;
                var pageNum = (this.data.count + 1) * this.data.pageSize;
                if (pageNum > total) {
                    pageNum = total;
                    this.data.count = Math.ceil(total / this.data.pageSize);
                }
                for (var i = 0; i < pageNum; i++) {
                    memoListDataTemp.push(memoListData[i]);
                }
                this.setData({
                    count: this.data.count,
                    memoListData: memoListDataTemp,
                    isNullData: false
                });
            }
            else {
                this.setData({
                    memoListData: [],
                    isNullData: true
                });
            }
        }
        catch (e) {
            wx.showToast({
                title: '获取备忘录数据失败，请稍后再试！',
                icon: 'none',
                duration: 1500
            });
        }
    },
    touchStart: function (event) {
        this.touchStartTime = event.timeStamp;
    },
    touchEnd: function (event) {
        this.touchEndTime = event.timeStamp;
    },
    onClickNew: function () {
        try {
            wx.setStorageSync('isEdit', false);
            wx.switchTab({
                url: '/pages/new/new'
            });
        }
        catch (e) { }
    },
    onClickEdit: function (event) {
        if (this.touchEndTime - this.touchStartTime < 350) {
            try {
                wx.setStorageSync('isEdit', true);
                var id = event.currentTarget.dataset.item.id;
                wx.setStorageSync('id', id);
                wx.switchTab({
                    url: '/pages/new/new'
                });
            }
            catch (e) { }
        }
    },
    onClickLongDelete: function (event) {
        this.onClickdeleteModal(event);
    },
    onClickdeleteModal: function (event) {
        var that = this;
        wx.showModal({
            title: '删除提示',
            content: '是否确定删除该备忘录！',
            success: function (res) {
                if (res.confirm) {
                    that.onClickdelete(event);
                }
                else if (res.cancel) {
                }
            }
        });
    },
    onClickdelete: function (event) {
        try {
            var index = event.currentTarget.dataset.index;
            if (index != null && this.data.memoListData != null) {
                this.data.memoListData.splice(event.currentTarget.dataset.index, 1);
                this.setData({
                    memoListData: this.data.memoListData
                });
                wx.setStorageSync('memoListData', this.data.memoListData);
                if (this.data.memoListData.length == 0) {
                    wx.clearStorageSync();
                    this.data.isNullData = true;
                    this.data.count = 0;
                    this.setData({
                        isNullData: this.data.isNullData,
                        count: this.data.count
                    });
                }
                wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 1000
                });
            }
        }
        catch (e) { }
    },
    onClickToggleMode: function () {
        this.data.isListMode = !this.data.isListMode;
        this.setData({
            isListMode: this.data.isListMode
        });
    },
    touchstart: function (event) {
        this.data.memoListData.forEach(function (item) {
            if (item.isTouchMove)
                item.isTouchMove = false;
        });
        this.setData({
            memoListData: this.data.memoListData,
            startX: event.changedTouches[0].clientX,
            startY: event.changedTouches[0].clientY
        });
    },
    touchmove: function (event) {
        var that = this, index = event.currentTarget.dataset.index, startX = that.data.startX, startY = that.data.startY, touchMoveX = event.changedTouches[0].clientX, touchMoveY = event.changedTouches[0].clientY, angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
        that.data.memoListData.forEach(function (v, i) {
            v.isTouchMove = false;
            if (Math.abs(angle) > 30)
                return;
            if (i == index) {
                if (touchMoveX > startX)
                    v.isTouchMove = false;
                else
                    v.isTouchMove = true;
            }
        });
        that.setData({
            memoListData: that.data.memoListData
        });
    },
    angle: function (start, end) {
        var _X = end.X - start.X, _Y = end.Y - start.Y;
        return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    }
});
