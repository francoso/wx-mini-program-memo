"use strict";
Page({
    data: {
        isNullData: true,
        memoListData: [],
        startX: 0,
        startY: 0
    },
    onPullDownRefresh: function () {
        var that = this;
        wx.stopPullDownRefresh({
            success: function () {
                that.getMemoListData();
            }
        });
    },
    onShow: function () {
        this.getMemoListData();
    },
    onLoad: function () {
        try {
            wx.setStorageSync('isEdit', false);
        }
        catch (e) { }
        this.getMemoListData();
    },
    getMemoListData: function () {
        try {
            var memoListData = wx.getStorageSync('memoListData');
            if (memoListData) {
                memoListData.forEach(function (item) {
                    item.isTouchMove = false;
                });
                this.setData({
                    memoListData: memoListData,
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
        try {
            wx.setStorageSync('isEdit', true);
            var id = event.currentTarget.dataset.item.id;
            wx.setStorageSync('id', id);
            wx.switchTab({
                url: '/pages/new/new'
            });
        }
        catch (e) { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osVUFBVSxFQUFFLElBQUk7UUFDaEIsWUFBWSxFQUFFLEVBQVc7UUFFekIsTUFBTSxFQUFFLENBQVc7UUFDbkIsTUFBTSxFQUFFLENBQVc7S0FDcEI7SUFLRCxpQkFBaUI7UUFDZixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsRUFBRSxDQUFDLG1CQUFtQixDQUFDO1lBQ3JCLE9BQU87Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3pCLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBS0QsTUFBTTtRQUNKLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUk7WUFFRixFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtTQUNuQztRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUc7UUFDZixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUtELGVBQWU7UUFFYixJQUFJO1lBQ0YsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNyRCxJQUFJLFlBQVksRUFBRTtnQkFFaEIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVM7b0JBRTdCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsT0FBUSxDQUFDO29CQUNaLFlBQVksRUFBRSxZQUFZO29CQUMxQixVQUFVLEVBQUUsS0FBSztpQkFDbEIsQ0FBQyxDQUFBO2FBQ0g7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE9BQVEsQ0FBQztvQkFDWixZQUFZLEVBQUUsRUFBUztvQkFDdkIsVUFB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LFdBQVcsR0FBRyxJQUFJLENBQUE7YUFDdkI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZO1NBQ3JDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFLRCxLQUFLLFlBQUMsS0FBVSxFQUFFLEdBQVE7UUFDeEIsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFFOUMsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FFRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL2luZGV4LmpzXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgaXNOdWxsRGF0YTogdHJ1ZSxcbiAgICBtZW1vTGlzdERhdGE6IFtdIGFzIGFueVtdLFxuICAgIC8v5byA5aeL5Z2Q5qCHXG4gICAgc3RhcnRYOiAwIGFzIG51bWJlcixcbiAgICBzdGFydFk6IDAgYXMgbnVtYmVyXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCh7XG4gICAgICBzdWNjZXNzKCkge1xuICAgICAgICB0aGF0LmdldE1lbW9MaXN0RGF0YSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93KCkge1xuICAgIHRoaXMuZ2V0TWVtb0xpc3REYXRhKCk7XG4gIH0sXG5cbiAgb25Mb2FkKCkge1xuICAgIHRyeSB7XG4gICAgICAvLyDorr7nva7nvJbovpHnirbmgIFcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpc0VkaXQnLCBmYWxzZSlcbiAgICB9IGNhdGNoIChlKSB7IH1cbiAgICB0aGlzLmdldE1lbW9MaXN0RGF0YSgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiDojrflj5blpIflv5jlvZXmlbDmja7mupBcbiAgICovXG4gIGdldE1lbW9MaXN0RGF0YSgpIHtcbiAgICAvLyDojrflj5bmnKzlnLDnvJPlrZjlpIflv5jlvZXliJfooajmlbDmja5cbiAgICB0cnkge1xuICAgICAgbGV0IG1lbW9MaXN0RGF0YSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1vTGlzdERhdGEnKTtcbiAgICAgIGlmIChtZW1vTGlzdERhdGEpIHtcblxuICAgICAgICBtZW1vTGlzdERhdGEuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgLy/pu5jorqTpmpDol4/liKDpmaRcbiAgICAgICAgICBpdGVtLmlzVG91Y2hNb3ZlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgICBtZW1vTGlzdERhdGE6IG1lbW9MaXN0RGF0YSxcbiAgICAgICAgICBpc051bGxEYXRhOiBmYWxzZVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXREYXRhISh7XG4gICAgICAgICAgbWVtb0xpc3REYXRhOiBbXSBhcyBhbnksXG4gICAgICAgICAgaXNOdWxsRGF0YTogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn6I635Y+W5aSH5b+Y5b2V5pWw5o2u5aSx6LSl77yM6K+356iN5ZCO5YaN6K+V77yBJyxcbiAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICBkdXJhdGlvbjogMTUwMFxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOeCueWHu+aWsOW7ulxuICAgKi9cbiAgb25DbGlja05ldygpIHtcbiAgICB0cnkge1xuICAgICAgLy8g6K6+572u57yW6L6R54q25oCBXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnaXNFZGl0JywgZmFsc2UpXG4gICAgICAvLyDliIfmjaLliLDmlrDlu7pcbiAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgIHVybDogJy9wYWdlcy9uZXcvbmV3J1xuICAgICAgfSlcbiAgICB9IGNhdGNoIChlKSB7IH1cbiAgfSxcblxuICAvKipcbiAgICog54K55Ye757yW6L6RXG4gICAqL1xuICBvbkNsaWNrRWRpdChldmVudDogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIOiuvue9rue8lui+keeKtuaAgVxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2lzRWRpdCcsIHRydWUpXG4gICAgICBsZXQgaWQgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbS5pZDtcbiAgICAgIC8vIOiuvue9rklkXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnaWQnLCBpZClcbiAgICAgIC8vIOWIh+aNouWIsOaWsOW7ulxuICAgICAgd3guc3dpdGNoVGFiKHtcbiAgICAgICAgdXJsOiAnL3BhZ2VzL25ldy9uZXcnXG4gICAgICB9KVxuICAgIH0gY2F0Y2ggKGUpIHsgfVxuICB9LFxuXG4gIC8qKlxuICAgKiDliKDpmaTmj5DnpLpcbiAgICovXG4gIG9uQ2xpY2tkZWxldGVNb2RhbChldmVudDogYW55KSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+WIoOmZpOaPkOekuicsXG4gICAgICBjb250ZW50OiAn5piv5ZCm56Gu5a6a5Yig6Zmk6K+l5aSH5b+Y5b2V77yBJyxcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgIHRoYXQub25DbGlja2RlbGV0ZShldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICog54K55Ye75Yig6ZmkXG4gICAqL1xuICBvbkNsaWNrZGVsZXRlKGV2ZW50OiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG4gICAgICBpZiAoaW5kZXggIT0gbnVsbCAmJiB0aGlzLmRhdGEubWVtb0xpc3REYXRhICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5kYXRhLm1lbW9MaXN0RGF0YS5zcGxpY2UoZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5zZXREYXRhISh7XG4gICAgICAgICAgbWVtb0xpc3REYXRhOiB0aGlzLmRhdGEubWVtb0xpc3REYXRhXG4gICAgICAgIH0pXG4gICAgICAgIC8v5byC5q2l5pu05paw5YiX6KGo57yT5a2YXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdtZW1vTGlzdERhdGEnLCB0aGlzLmRhdGEubWVtb0xpc3REYXRhKTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5tZW1vTGlzdERhdGEubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB3eC5jbGVhclN0b3JhZ2VTeW5jKCk7XG4gICAgICAgIH1cbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+WIoOmZpOaIkOWKnycsXG4gICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHsgfVxuICB9LFxuXG4gIC8qKlxuICAgKiDmiYvmjIfop6bmkbjliqjkvZzlvIDlp4sg6K6w5b2V6LW354K5WOWdkOagh1xuICAgKi9cbiAgdG91Y2hzdGFydChldmVudDogYW55KSB7XG4gICAgLy/lvIDlp4vop6bmkbjml7Yg6YeN572u5omA5pyJ5Yig6ZmkXG4gICAgdGhpcy5kYXRhLm1lbW9MaXN0RGF0YS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcbiAgICAgIC8v5Y+q5pON5L2c5Li6dHJ1ZeeahFxuICAgICAgaWYgKGl0ZW0uaXNUb3VjaE1vdmUpXG4gICAgICAgIGl0ZW0uaXNUb3VjaE1vdmUgPSBmYWxzZTtcbiAgICB9KTtcbiAgICAvL+abtOaWsOaVsOaNrlxuICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgbWVtb0xpc3REYXRhOiB0aGlzLmRhdGEubWVtb0xpc3REYXRhLFxuICAgICAgc3RhcnRYOiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLFxuICAgICAgc3RhcnRZOiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICog5ruR5Yqo5LqL5Lu25aSE55CGXG4gICAqL1xuICB0b3VjaG1vdmUoZXZlbnQ6IGFueSkge1xuICAgIGxldCB0aGF0ID0gdGhpcyxcbiAgICAgIGluZGV4ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4LC8v5b2T5YmN57Si5byVXG4gICAgICBzdGFydFggPSB0aGF0LmRhdGEuc3RhcnRYLC8v5byA5aeLWOWdkOagh1xuICAgICAgc3RhcnRZID0gdGhhdC5kYXRhLnN0YXJ0WSwvL+W8gOWni1nlnZDmoIdcbiAgICAgIHRvdWNoTW92ZVggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLC8v5ruR5Yqo5Y+Y5YyW5Z2Q5qCHXG4gICAgICB0b3VjaE1vdmVZID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSwvL+a7keWKqOWPmOWMluWdkOagh1xuICAgICAgLy/ojrflj5bmu5Hliqjop5LluqZcbiAgICAgIGFuZ2xlID0gdGhhdC5hbmdsZSh7IFg6IHN0YXJ0WCwgWTogc3RhcnRZIH0sIHsgWDogdG91Y2hNb3ZlWCwgWTogdG91Y2hNb3ZlWSB9KTtcblxuICAgIHRoYXQuZGF0YS5tZW1vTGlzdERhdGEuZm9yRWFjaCgodjogYW55LCBpOiBudW1iZXIpID0+IHtcbiAgICAgIHYuaXNUb3VjaE1vdmUgPSBmYWxzZVxuICAgICAgLy/mu5HliqjotoXov4czMOW6puinkiByZXR1cm5cbiAgICAgIGlmIChNYXRoLmFicyhhbmdsZSkgPiAzMCkgcmV0dXJuO1xuICAgICAgaWYgKGkgPT0gaW5kZXgpIHtcbiAgICAgICAgaWYgKHRvdWNoTW92ZVggPiBzdGFydFgpIC8v5Y+z5ruRXG4gICAgICAgICAgdi5pc1RvdWNoTW92ZSA9IGZhbHNlXG4gICAgICAgIGVsc2UgLy/lt6bmu5FcbiAgICAgICAgICB2LmlzVG91Y2hNb3ZlID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICAgIC8v5pu05paw5pWw5o2uXG4gICAgdGhhdC5zZXREYXRhISh7XG4gICAgICBtZW1vTGlzdERhdGE6IHRoYXQuZGF0YS5tZW1vTGlzdERhdGFcbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDorqHnrpfmu5Hliqjop5LluqZcbiAgICovXG4gIGFuZ2xlKHN0YXJ0OiBhbnksIGVuZDogYW55KSB7XG4gICAgbGV0IF9YID0gZW5kLlggLSBzdGFydC5YLCBfWSA9IGVuZC5ZIC0gc3RhcnQuWVxuICAgIC8v6L+U5Zue6KeS5bqmIE1hdGguYXRhbigp6L+U5Zue5pWw5a2X55qE5Y+N5q2j5YiH5YC8XG4gICAgcmV0dXJuIDM2MCAqIE1hdGguYXRhbihfWSAvIF9YKSAvICgyICogTWF0aC5QSSk7XG4gIH1cblxufSlcbiJdfQ==