// miniprogram/userinfo/pages/follow/goods/index.js
const app = getApp()
var utils = require('../../../../libs/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tourProductList: [{
      "activityAmount": 399,
      "activityEndDate": "2019-07-31",
      "activityStartDate": "2019-04-30",
      "amount": 399,
      "bannerRecommendList": [
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101815/5a244bf70b3141208533b2edea1397fe-banner1.jpg?Expires=1872469095&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=%2B612hQ5wflRTsrWtV77t3MhEmd8%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101818/8cb65217514c4a4ba1a24761b1162739-banner2.jpg?Expires=1872469098&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=sIjk0V0E9w9yJZ%2BD8YL5m6CZNMo%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101822/045bb47dc3e842cb8486e7c5b70a95a2-banner3.jpg?Expires=1872469102&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=yRxjO0RInN981DSJU7rTZqFOW7o%3D"
      ],
      "bigTitle": "出游",
      "buyPrice": 399,
      "classType": 2,
      "company": "元/人",
      "cycle": 2,
      "detailRecommendList": [
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101847/80451a275bef46f298a62206d8ebbe33-%E5%B0%8F%E4%B8%9C%E6%B1%9F_02.jpg?Expires=1872469127&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=oAl%2BW7B7KulC%2Fmd2wyTsc0S7vqw%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101851/cae9046746c44566a0d2365b4e57767a-%E5%B0%8F%E4%B8%9C%E6%B1%9F_03.jpg?Expires=1872469131&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=EMAs%2BH8YRAGVs0tGhoEZmjxFYrY%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101855/88e60c15295145b9a33b8800f9141fdc-%E5%B0%8F%E4%B8%9C%E6%B1%9F_04.jpg?Expires=1872469135&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=Ss9N%2BWxPVMQ2fOjY6UJbif%2F4Bf4%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101859/94cb029571104654a263168a2a156c35-%E5%B0%8F%E4%B8%9C%E6%B1%9F_05.jpg?Expires=1872469139&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=jfbnx%2FgND%2BIxe1MSJUTa5tKLYWM%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101903/59b6cedb2c514b56af123e63a83938f7-%E5%B0%8F%E4%B8%9C%E6%B1%9F_06.png?Expires=1872469143&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=OKCcc9ww23I%2FNxaBSvVEUV1xUmc%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101906/108e32e5afbc4e4da996808292237c0f-%E5%B0%8F%E4%B8%9C%E6%B1%9F_07.jpg?Expires=1872469146&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=rxOerGNnzsndhlj95LvgA3cToEg%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101911/a666014b58904f64ac61e65fb3a5ee63-%E5%B0%8F%E4%B8%9C%E6%B1%9F_08.jpg?Expires=1872469151&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=hX9mgezSYxQAs%2Bmc93a9FLN1c0A%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101914/fd2d0b69c93944b1bad740716bf4241a-%E5%B0%8F%E4%B8%9C%E6%B1%9F_09.jpg?Expires=1872469155&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=dKURuf0qM3JKeypFhvb9CIvJ9ls%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101919/282289cbad0d47889bf15175a21e34a3-%E5%B0%8F%E4%B8%9C%E6%B1%9F_10.jpg?Expires=1872469159&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=hCgcr3XvmHT6T%2Fo6nabRbGOkQLc%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101923/d8756af6f7e3429082d77cffde8b37a0-%E5%B0%8F%E4%B8%9C%E6%B1%9F_11.jpg?Expires=1872469163&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=veW9ZgzKM88vY0TfmPWM3WhsYok%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101927/12c2d6ceb979486ea4fa0fed28133cc6-%E5%B0%8F%E4%B8%9C%E6%B1%9F_12.jpg?Expires=1872469167&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=Dt6D%2FjhS8SydJN0BPvvcjb2bSoI%3D"
      ],
      "detailsImageUrl": "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101847/80451a275bef46f298a62206d8ebbe33-%E5%B0%8F%E4%B8%9C%E6%B1%9F_02.jpg?Expires=1872469127&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=oAl%2BW7B7KulC%2Fmd2wyTsc0S7vqw%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101851/cae9046746c44566a0d2365b4e57767a-%E5%B0%8F%E4%B8%9C%E6%B1%9F_03.jpg?Expires=1872469131&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=EMAs%2BH8YRAGVs0tGhoEZmjxFYrY%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101855/88e60c15295145b9a33b8800f9141fdc-%E5%B0%8F%E4%B8%9C%E6%B1%9F_04.jpg?Expires=1872469135&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=Ss9N%2BWxPVMQ2fOjY6UJbif%2F4Bf4%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101859/94cb029571104654a263168a2a156c35-%E5%B0%8F%E4%B8%9C%E6%B1%9F_05.jpg?Expires=1872469139&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=jfbnx%2FgND%2BIxe1MSJUTa5tKLYWM%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101903/59b6cedb2c514b56af123e63a83938f7-%E5%B0%8F%E4%B8%9C%E6%B1%9F_06.png?Expires=1872469143&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=OKCcc9ww23I%2FNxaBSvVEUV1xUmc%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101906/108e32e5afbc4e4da996808292237c0f-%E5%B0%8F%E4%B8%9C%E6%B1%9F_07.jpg?Expires=1872469146&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=rxOerGNnzsndhlj95LvgA3cToEg%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101911/a666014b58904f64ac61e65fb3a5ee63-%E5%B0%8F%E4%B8%9C%E6%B1%9F_08.jpg?Expires=1872469151&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=hX9mgezSYxQAs%2Bmc93a9FLN1c0A%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101914/fd2d0b69c93944b1bad740716bf4241a-%E5%B0%8F%E4%B8%9C%E6%B1%9F_09.jpg?Expires=1872469155&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=dKURuf0qM3JKeypFhvb9CIvJ9ls%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101919/282289cbad0d47889bf15175a21e34a3-%E5%B0%8F%E4%B8%9C%E6%B1%9F_10.jpg?Expires=1872469159&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=hCgcr3XvmHT6T%2Fo6nabRbGOkQLc%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101923/d8756af6f7e3429082d77cffde8b37a0-%E5%B0%8F%E4%B8%9C%E6%B1%9F_11.jpg?Expires=1872469163&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=veW9ZgzKM88vY0TfmPWM3WhsYok%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101927/12c2d6ceb979486ea4fa0fed28133cc6-%E5%B0%8F%E4%B8%9C%E6%B1%9F_12.jpg?Expires=1872469167&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=Dt6D%2FjhS8SydJN0BPvvcjb2bSoI%3D;",
      "endDate": "2019-07-31",
      "id": 31,
      "imageUrl": "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101815/5a244bf70b3141208533b2edea1397fe-banner1.jpg?Expires=1872469095&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=%2B612hQ5wflRTsrWtV77t3MhEmd8%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101818/8cb65217514c4a4ba1a24761b1162739-banner2.jpg?Expires=1872469098&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=sIjk0V0E9w9yJZ%2BD8YL5m6CZNMo%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101822/045bb47dc3e842cb8486e7c5b70a95a2-banner3.jpg?Expires=1872469102&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=yRxjO0RInN981DSJU7rTZqFOW7o%3D;",
      "isActivity": 1,
      "isLockTime": 0,
      "isRecommend": 0,
      "isSignUp": false,
      "monthArr": [{
          "month": "4月",
          "year": "2019-04",
          "date": "2019-04-01"
        },
        {
          "month": "5月",
          "year": "2019-05",
          "date": "2019-05-01"
        },
        {
          "month": "6月",
          "year": "2019-06",
          "date": "2019-06-01"
        },
        {
          "month": "7月",
          "year": "2019-07",
          "date": "2019-07-01"
        }
      ],
      "productNumber": 30,
      "recommendImageUrl": "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101815/5a244bf70b3141208533b2edea1397fe-banner1.jpg?Expires=1872469095&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=%2B612hQ5wflRTsrWtV77t3MhEmd8%3D",
      "remark": "东江悠游两日",
      "rendStatus": 2,
      "singlyTickerPrice": 399,
      "startDate": "2019-04-30",
      "status": 0,
      "stitle": "登寿山佛地 恋迷离仙境",
      "surplusNumber": 0,
      "ticketCount": 1,
      "title": "出游 / ",
    }, {
      "activityAmount": 399,
      "activityEndDate": "2019-07-31",
      "activityStartDate": "2019-04-30",
      "amount": 399,
      "bannerRecommendList": [
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101815/5a244bf70b3141208533b2edea1397fe-banner1.jpg?Expires=1872469095&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=%2B612hQ5wflRTsrWtV77t3MhEmd8%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101818/8cb65217514c4a4ba1a24761b1162739-banner2.jpg?Expires=1872469098&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=sIjk0V0E9w9yJZ%2BD8YL5m6CZNMo%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101822/045bb47dc3e842cb8486e7c5b70a95a2-banner3.jpg?Expires=1872469102&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=yRxjO0RInN981DSJU7rTZqFOW7o%3D"
      ],
      "bigTitle": "出游",
      "buyPrice": 399,
      "classType": 2,
      "company": "元/人",
      "cycle": 2,
      "detailRecommendList": [
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101847/80451a275bef46f298a62206d8ebbe33-%E5%B0%8F%E4%B8%9C%E6%B1%9F_02.jpg?Expires=1872469127&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=oAl%2BW7B7KulC%2Fmd2wyTsc0S7vqw%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101851/cae9046746c44566a0d2365b4e57767a-%E5%B0%8F%E4%B8%9C%E6%B1%9F_03.jpg?Expires=1872469131&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=EMAs%2BH8YRAGVs0tGhoEZmjxFYrY%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101855/88e60c15295145b9a33b8800f9141fdc-%E5%B0%8F%E4%B8%9C%E6%B1%9F_04.jpg?Expires=1872469135&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=Ss9N%2BWxPVMQ2fOjY6UJbif%2F4Bf4%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101859/94cb029571104654a263168a2a156c35-%E5%B0%8F%E4%B8%9C%E6%B1%9F_05.jpg?Expires=1872469139&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=jfbnx%2FgND%2BIxe1MSJUTa5tKLYWM%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101903/59b6cedb2c514b56af123e63a83938f7-%E5%B0%8F%E4%B8%9C%E6%B1%9F_06.png?Expires=1872469143&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=OKCcc9ww23I%2FNxaBSvVEUV1xUmc%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101906/108e32e5afbc4e4da996808292237c0f-%E5%B0%8F%E4%B8%9C%E6%B1%9F_07.jpg?Expires=1872469146&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=rxOerGNnzsndhlj95LvgA3cToEg%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101911/a666014b58904f64ac61e65fb3a5ee63-%E5%B0%8F%E4%B8%9C%E6%B1%9F_08.jpg?Expires=1872469151&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=hX9mgezSYxQAs%2Bmc93a9FLN1c0A%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101914/fd2d0b69c93944b1bad740716bf4241a-%E5%B0%8F%E4%B8%9C%E6%B1%9F_09.jpg?Expires=1872469155&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=dKURuf0qM3JKeypFhvb9CIvJ9ls%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101919/282289cbad0d47889bf15175a21e34a3-%E5%B0%8F%E4%B8%9C%E6%B1%9F_10.jpg?Expires=1872469159&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=hCgcr3XvmHT6T%2Fo6nabRbGOkQLc%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101923/d8756af6f7e3429082d77cffde8b37a0-%E5%B0%8F%E4%B8%9C%E6%B1%9F_11.jpg?Expires=1872469163&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=veW9ZgzKM88vY0TfmPWM3WhsYok%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101927/12c2d6ceb979486ea4fa0fed28133cc6-%E5%B0%8F%E4%B8%9C%E6%B1%9F_12.jpg?Expires=1872469167&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=Dt6D%2FjhS8SydJN0BPvvcjb2bSoI%3D"
      ],
      "detailsImageUrl": "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101847/80451a275bef46f298a62206d8ebbe33-%E5%B0%8F%E4%B8%9C%E6%B1%9F_02.jpg?Expires=1872469127&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=oAl%2BW7B7KulC%2Fmd2wyTsc0S7vqw%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101851/cae9046746c44566a0d2365b4e57767a-%E5%B0%8F%E4%B8%9C%E6%B1%9F_03.jpg?Expires=1872469131&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=EMAs%2BH8YRAGVs0tGhoEZmjxFYrY%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101855/88e60c15295145b9a33b8800f9141fdc-%E5%B0%8F%E4%B8%9C%E6%B1%9F_04.jpg?Expires=1872469135&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=Ss9N%2BWxPVMQ2fOjY6UJbif%2F4Bf4%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101859/94cb029571104654a263168a2a156c35-%E5%B0%8F%E4%B8%9C%E6%B1%9F_05.jpg?Expires=1872469139&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=jfbnx%2FgND%2BIxe1MSJUTa5tKLYWM%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101903/59b6cedb2c514b56af123e63a83938f7-%E5%B0%8F%E4%B8%9C%E6%B1%9F_06.png?Expires=1872469143&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=OKCcc9ww23I%2FNxaBSvVEUV1xUmc%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101906/108e32e5afbc4e4da996808292237c0f-%E5%B0%8F%E4%B8%9C%E6%B1%9F_07.jpg?Expires=1872469146&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=rxOerGNnzsndhlj95LvgA3cToEg%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101911/a666014b58904f64ac61e65fb3a5ee63-%E5%B0%8F%E4%B8%9C%E6%B1%9F_08.jpg?Expires=1872469151&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=hX9mgezSYxQAs%2Bmc93a9FLN1c0A%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101914/fd2d0b69c93944b1bad740716bf4241a-%E5%B0%8F%E4%B8%9C%E6%B1%9F_09.jpg?Expires=1872469155&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=dKURuf0qM3JKeypFhvb9CIvJ9ls%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101919/282289cbad0d47889bf15175a21e34a3-%E5%B0%8F%E4%B8%9C%E6%B1%9F_10.jpg?Expires=1872469159&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=hCgcr3XvmHT6T%2Fo6nabRbGOkQLc%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101923/d8756af6f7e3429082d77cffde8b37a0-%E5%B0%8F%E4%B8%9C%E6%B1%9F_11.jpg?Expires=1872469163&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=veW9ZgzKM88vY0TfmPWM3WhsYok%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101927/12c2d6ceb979486ea4fa0fed28133cc6-%E5%B0%8F%E4%B8%9C%E6%B1%9F_12.jpg?Expires=1872469167&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=Dt6D%2FjhS8SydJN0BPvvcjb2bSoI%3D;",
      "endDate": "2019-07-31",
      "id": 31,
      "imageUrl": "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101815/5a244bf70b3141208533b2edea1397fe-banner1.jpg?Expires=1872469095&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=%2B612hQ5wflRTsrWtV77t3MhEmd8%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101818/8cb65217514c4a4ba1a24761b1162739-banner2.jpg?Expires=1872469098&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=sIjk0V0E9w9yJZ%2BD8YL5m6CZNMo%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101822/045bb47dc3e842cb8486e7c5b70a95a2-banner3.jpg?Expires=1872469102&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=yRxjO0RInN981DSJU7rTZqFOW7o%3D;",
      "isActivity": 1,
      "isLockTime": 0,
      "isRecommend": 0,
      "isSignUp": false,
      "monthArr": [{
          "month": "4月",
          "year": "2019-04",
          "date": "2019-04-01"
        },
        {
          "month": "5月",
          "year": "2019-05",
          "date": "2019-05-01"
        },
        {
          "month": "6月",
          "year": "2019-06",
          "date": "2019-06-01"
        },
        {
          "month": "7月",
          "year": "2019-07",
          "date": "2019-07-01"
        }
      ],
      "productNumber": 30,
      "recommendImageUrl": "http://maam.oss-cn-shenzhen.aliyuncs.com/20190506101815/5a244bf70b3141208533b2edea1397fe-banner1.jpg?Expires=1872469095&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=%2B612hQ5wflRTsrWtV77t3MhEmd8%3D",
      "remark": "东江悠游两日",
      "rendStatus": 2,
      "singlyTickerPrice": 399,
      "startDate": "2019-04-30",
      "status": 0,
      "stitle": "登寿山佛地 恋迷离仙境",
      "surplusNumber": 0,
      "ticketCount": 1,
      "title": "出游 / ",
    }], //商品信息,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.initView();
  },

  /**
   * 初始化视图
   */
  initView: function() {
    var that = this;
    var queryMark1 = wx.createSelectorQuery();
    queryMark1.select(".content").boundingClientRect()
    queryMark1.exec(function(res) {
      if (!utils.isEmpty(res)) {
        var scrollHeight = wx.getSystemInfoSync().windowHeight;

        var listHeight = scrollHeight - res[0].height;
        that.setData({
          listHeight: listHeight,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})