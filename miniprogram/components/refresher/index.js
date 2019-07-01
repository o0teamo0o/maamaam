const defaultStyle = 'transition: transform .4s; transform: translate3d(0px, 0px, 0px) scale(1);'

Component({
    externalClasses: ['wux-class'],
    data: {
        className: 'wux-refresher--hidden',
        lClassName: 'wux-loader--hidden',
        style: defaultStyle,
        noData: false, // 是否没有更多数据
        windowHeight: 0,  // 窗口高度
        newContentHeight: 0,  // 新节点内容高度
        oldContentHeight: 0,   // 旧节点内容高度
        isLoading: false,   // 判断是否正在加载
    },
    properties: {
        pullingIcon: {
            type: String,
            value: 'wux-refresher__icon--arrow-down',
        },
        pullingText: {
            type: String,
            value: '下拉刷新',
        },
        refreshingIcon: {
            type: String,
            value: 'wux-refresher__icon--refresher',
        },
        refreshingText: {
            type: String,
            value: '正在刷新',
        },
        distance: {
            type: Number,
            value: 30,
        },
        scrollTop: {
            type: Number,
            value: 0,
            observer: function (n) {
                let that = this

                // 获取节点高度
                const query = wx.createSelectorQuery();
                query.select(`#${this.id}`).boundingClientRect(function (res) {
                    that.setData({
                        newContentHeight: res.height
                    })
                }).exec()
                
                if (this.data.windowHeight) {

                    // 到临界点时触发上拉加载 
                    // 防止节点高度一致时引发重复加载
                    if (
                        n > this.data.newContentHeight - this.data.windowHeight - this.data.distance &&
                        this.data.isLoading === false &&
                        this.data.noData === false && this.data.newContentHeight !== this.data.oldContentHeight
                    ) {

                        this.setData({
                            lClassName: 'wux-loader--visible',
                            isLoading: true,
                            oldContentHeight: this.data.newContentHeight
                        })

                        this.triggerEvent('loadmore')

                    } else if (
                        this.data.isLoading === false &&
                        this.data.noData === false
                    ) {

                        // 隐藏上拉加载动画
                        this.hide()

                    } else if(this.data.isLoading === true) {

                        // 如果在加载中，保持内容的高度一致，以此来防止临界点重复加载
                        this.setData({
                            oldContentHeight: this.data.newContentHeight
                        })
                        
                    }

                    this.deactivate()
                }
            }
        },
        isShowLoadingText: {
            type: Boolean,
            value: false
        },
        loadingText: {
            type: String,
            value: '正在加载'
        },
        loadNoDataText: {
            type: String,
            value: '没有更多数据'
        },
        disablePullingRotation: {
            type: Boolean,
            value: false,
        }
    },
    methods: {
        /**
         * 显示
         */
        activate() {
            this.setData({
                style: defaultStyle,
                className: 'wux-refresher--visible',
            })
        },
        /**
         * 隐藏
         */
        deactivate() {
            if (this.activated) this.activated = false

            this.setData({
                style: defaultStyle,
                className: 'wux-refresher--hidden',
            })
        },
        /**
         * 正在刷新 (且清除loading状态)
         */
        refreshing() {
            this.setData({
                style: 'transition: transform .4s; transform: translate3d(0, 50px, 0) scale(1);',
                className: 'wux-refresher--active wux-refresher--refreshing',
                noData: false,
                isLoading: false,
                newContentHeight: 0,
                oldContentHeight: 0,
                lClassName: 'wux-loader--hidden'
            })
        },
        /**
         * 刷新后隐藏动画
         */
        tail() {
            this.setData({
                className: 'wux-refresher--active wux-refresher--refreshing wux-refresher--refreshing-tail',
            })
        },
        /**
         * 加载后隐藏动画
         */
        hide() {
            this.setData({
                lClassName: 'wux-loader--hidden',
            })
        },
        /**
         * 正在下拉或上拉
         * @param {Number} diffY 距离
         */
        move(diffY) {
            const style = `transition-duration: 0s; transform: translate3d(0, ${diffY}px, 0) scale(1);`
            const className = diffY < this.data.distance ? 'wux-refresher--visible' : 'wux-refresher--active'

            this.setData({
                style,
                className,
            })
        },
        /**
         * 判断是否正在刷新
         */
        isRefreshing() {
            return this.data.className.indexOf('wux-refresher--refreshing') !== -1
        },
        /**
         * 获取触摸点坐标
         */
        getTouchPosition(e) {
            return {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY,
            }
        },
        /**
         * 创建定时器
         */
        requestAnimationFrame(callback) {
            let currTime = new Date().getTime()
            let timeToCall = Math.max(0, 16 - (currTime - this.lastTime))
            let timeout = setTimeout(() => {
                callback.bind(this)(currTime + timeToCall)
            }, timeToCall)
            this.lastTime = currTime + timeToCall
            return timeout
        },
        /**
         * 清空定时器
         */
        cancelAnimationFrame(timeout) {
            clearTimeout(timeout)
        },
        /**
         * 下拉刷新完成后的函数
         */
        finishPullToRefresh() {
            setTimeout(() => {
                this.requestAnimationFrame(this.tail)
                setTimeout(() => this.deactivate(), 200)
            }, 200)
        },
        /**
         * 上拉加载完成后的函数
         */
        finishLoadmore(bool) {
            if (bool === true) {
                setTimeout(() => {
                    this.setData({
                        noData: true,
                        isLoading: false,
                        lClassName: 'wux-loader--end'
                    })
                }, 200)
            } else {
                setTimeout(() => {
                    this.setData({
                        isLoading: false
                    })
                    this.requestAnimationFrame(this.hide)
                    setTimeout(() => this.deactivate(), 200)
                }, 200)
            }
        },
        /**
         * 手指触摸动作开始
         */
        bindtouchstart(e) {
            if (this.isRefreshing() || this.data.isLoading) return false

            const p = this.getTouchPosition(e)

            this.start = p
            this.diffX = this.diffY = 0

            this.activate()
        },
        /**
         * 手指触摸后移动
         */
        bindtouchmove(e) {
            if (!this.start || this.isRefreshing() || this.data.isLoading) return false

            const p = this.getTouchPosition(e)

            this.diffX = p.x - this.start.x
            this.diffY = p.y - this.start.y

            if (this.diffY < 0) return false

            this.diffY = Math.pow(this.diffY, 0.8)

            if (!this.activated && this.diffY > this.data.distance) {
                this.activated = true
                this.triggerEvent('pulling')
            } else if (this.activated && this.diffY < this.data.distance) {
                this.activated = false
            }

            this.move(this.diffY)
        },
        /**
         *  手指触摸动作结束
         */
        bindtouchend(e) {
            this.start = false

            if (this.diffY <= 0 || this.isRefreshing()) return false

            this.deactivate()

            if (Math.abs(this.diffY) >= this.data.distance) {
                this.refreshing()
                this.triggerEvent('refresh')
            }
        },
    },
    created() {
        this.lastTime = 0
        this.activated = false
    },
    attached() {
        let that = this
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowHeight: res.windowHeight
                })
            }
        });
    }
})