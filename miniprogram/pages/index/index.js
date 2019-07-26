//index.js
const app = getApp()
var utils = require('../../libs/util.js');
var DataUtl = require('../../libs/dateUtil.js');
import Notify from '../../components/notify/notify.js';
import Dialog from '../../components/dialog/dialog.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.globalData.navHeight,
    currentTabIndex: 0,
    listData: [{}, {}, {}],
    integralData: [{
      "url": "icon_integral_questionnaire.png",
      "title": "【系统】用户爱好兴趣问卷【系统】用户爱好兴趣问卷",
      "star": 3,
    }, {
      "url": "icon_integral_package.png",
      "title": "免费领取限量保险大礼包",
      "star": 2,
    }, {
      "url": "icon_integral_public.png",
      "title": "关注“慢漫陪着你”公众号",
      "star": 2,
    }],
    // integralData: [],
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
    }], //商品信息
    goodsProductList: [{
      "activityAmount": 0,
      "activityEndDate": "2019-07-31",
      "activityStartDate": "2019-04-30",
      "amount": 13.5,
      "bannerRecommendList": [
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101148/99eaa9f6b945486ab80d7dea0514f56d-banner.jpg?Expires=1874542308&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=H36SiA1xryuqwhquw7EPdtW78Hg%3D"
      ],
      "bigTitle": "小聚",
      "buyPrice": 13.5,
      "classType": 0,
      "company": "元/两支",
      "cycle": 10,
      "detailRecommendList": [
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101202/18d72e971147442aa29451caa84ad75f-%E6%B2%B9%E7%93%B6_04.jpg?Expires=1874542322&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=Dn0s9zQnYzgQy9Y5t0W6qYW3vzc%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101209/d6c14a8203064f9bb8905411d7d489e9-%E6%B2%B9%E7%93%B6_05.jpg?Expires=1874542329&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=9enOHq5sv2rpRnDcXp65Rtt%2FeNY%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101217/439c6301d50c4b9c8d413bfc39eb2fad-%E6%B2%B9%E7%93%B6_06.jpg?Expires=1874542337&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=WOejc4AehSdik3ihQkReeD5jWJY%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101224/26fdc567253540cf8ccd3a415e94aa9b-%E6%B2%B9%E7%93%B6_07.jpg?Expires=1874542344&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=wQJUBEeasrdxXQWZMtlh4HKU2sE%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101231/a51d2f69017e40ba8ee722d1955a11ee-%E6%B2%B9%E7%93%B6_08.jpg?Expires=1874542351&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=a0hoZTiC6LpooDgUm11R1Bpd4o4%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101238/4aab3f2caf754755abf7d16f8dda58d1-%E6%B2%B9%E7%93%B6_09.jpg?Expires=1874542358&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=HzmQC1Z%2F8U6BxLmFhVaVCYRakvc%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101244/c3f60ca0a8c14313940424da63e12459-%E6%B2%B9%E7%93%B6_10.jpg?Expires=1874542364&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=CDdbmrnM2LJkniw%2Bo%2Bcz2Y4EbbY%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101253/316c24068e5c46d4a4b764ffb0775710-%E6%B2%B9%E7%93%B6_11.jpg?Expires=1874542373&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=DAh8EzwCsIgO7vyQLlXvGo8s0YQ%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101300/8f60335b3c094f29b19303141b869939-%E6%B2%B9%E7%93%B6_12.jpg?Expires=1874542380&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=SykYL0x4u7uPFP97AuQqYTGQ46A%3D",
        "http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101305/c29bc8cb481742b4b05f4cc2f267e8dd-%E6%B2%B9%E7%93%B6_13.jpg?Expires=1874542386&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=He4HLTq4yhLt26KW7f1XDyWSSrw%3D"
      ],
      "detailsImageUrl": "http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101202/18d72e971147442aa29451caa84ad75f-%E6%B2%B9%E7%93%B6_04.jpg?Expires=1874542322&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=Dn0s9zQnYzgQy9Y5t0W6qYW3vzc%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101209/d6c14a8203064f9bb8905411d7d489e9-%E6%B2%B9%E7%93%B6_05.jpg?Expires=1874542329&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=9enOHq5sv2rpRnDcXp65Rtt%2FeNY%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101217/439c6301d50c4b9c8d413bfc39eb2fad-%E6%B2%B9%E7%93%B6_06.jpg?Expires=1874542337&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=WOejc4AehSdik3ihQkReeD5jWJY%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101224/26fdc567253540cf8ccd3a415e94aa9b-%E6%B2%B9%E7%93%B6_07.jpg?Expires=1874542344&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=wQJUBEeasrdxXQWZMtlh4HKU2sE%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101231/a51d2f69017e40ba8ee722d1955a11ee-%E6%B2%B9%E7%93%B6_08.jpg?Expires=1874542351&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=a0hoZTiC6LpooDgUm11R1Bpd4o4%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101238/4aab3f2caf754755abf7d16f8dda58d1-%E6%B2%B9%E7%93%B6_09.jpg?Expires=1874542358&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=HzmQC1Z%2F8U6BxLmFhVaVCYRakvc%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101244/c3f60ca0a8c14313940424da63e12459-%E6%B2%B9%E7%93%B6_10.jpg?Expires=1874542364&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=CDdbmrnM2LJkniw%2Bo%2Bcz2Y4EbbY%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101253/316c24068e5c46d4a4b764ffb0775710-%E6%B2%B9%E7%93%B6_11.jpg?Expires=1874542373&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=DAh8EzwCsIgO7vyQLlXvGo8s0YQ%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101300/8f60335b3c094f29b19303141b869939-%E6%B2%B9%E7%93%B6_12.jpg?Expires=1874542380&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=SykYL0x4u7uPFP97AuQqYTGQ46A%3D;http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101305/c29bc8cb481742b4b05f4cc2f267e8dd-%E6%B2%B9%E7%93%B6_13.jpg?Expires=1874542386&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=He4HLTq4yhLt26KW7f1XDyWSSrw%3D;",
      "endDate": "2019-07-31",
      "id": 31,
      "imageUrl": "http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101148/99eaa9f6b945486ab80d7dea0514f56d-banner.jpg?Expires=1874542308&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=H36SiA1xryuqwhquw7EPdtW78Hg%3D;",
      "isActivity": 0,
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
      "recommendImageUrl": "http://maam.oss-cn-shenzhen.aliyuncs.com/20190530101148/99eaa9f6b945486ab80d7dea0514f56d-banner.jpg?Expires=1874542308&OSSAccessKeyId=LTAI4Ow2Nr41We1R&Signature=H36SiA1xryuqwhquw7EPdtW78Hg%3D",
      "remark": "不漏油 不挂油 【限时包邮】",
      "singlyTickerPrice": 13.5,
      "startDate": "2019-04-30",
      "status": 0,
      "stitle": "【厨房神器】玻璃油瓶",
      "surplusNumber": 0,
      "ticketCount": 1,
      "title": "小聚 / ",
    }], //商品信息
    integralExchangeData: [{
        name: '大脸猫爱吃鱼大脸猫爱吃鱼大脸猫爱吃鱼大脸猫爱吃鱼',
        heart_num: '1',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'https://image.fkgou.com/uploadfile/product/152013/2017/12/13/1513131668.jpg',
        price: "19.9",
        integral: 5800
      },
      {
        name: '大脸猫爱吃鱼',
        heart_num: '2',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'https://image.fkgou.com//image.php/shop/data/upload/media/fe27be6c8c0091aa6eb9ab4188e2477e/131109/131109/image/20180512/1526095940498360.jpg',
        price: "688.8",
        integral: 68888
      },
      {
        name: '大脸猫爱吃鱼',
        heart_num: '3',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'https://image.fkgou.com//image.php/shop/data/upload/media/fe27be6c8c0091aa6eb9ab4188e2477e/154825/156113/image/20181015/1539612872672902.jpg',
        price: "9.9",
        integral: 680
      }, {
        name: '大脸猫爱吃鱼',
        heart_num: '4',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://img4.imgtn.bdimg.com/it/u=2748975304,2710656664&fm=26&gp=0.jpg',
        price: "388.0",
        integral: 1500
      },
      {
        name: '大脸猫爱吃鱼',
        heart_num: '5',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'https://image.fkgou.com//image.php/shop/data/upload/media/fe27be6c8c0091aa6eb9ab4188e2477e/155287/155287/image/20181031/1540974543645385.jpg',
        price: "10.5",
        integral: 9999
      },
      {
        name: '大脸猫爱吃鱼',
        heart_num: '6',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'https://image.fkgou.com//image.php/shop/data/upload/media/fe27be6c8c0091aa6eb9ab4188e2477e/260026/155848/image/20181218/1545100742724187.jpg',
        price: "199.9",
        integral: 4600
      },
      {
        name: '大脸猫爱吃鱼',
        heart_num: '7',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://img4.imgtn.bdimg.com/it/u=2748975304,2710656664&fm=26&gp=0.jpg',
        price: "100.0",
        integral: 7000
      }, {
        name: '大脸猫爱吃鱼',
        heart_num: '8',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        url: 'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg',
        price: "69.9",
        integral: 1500
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 抢红包提醒事件
   */
  onRedDialogClose: function(e) {
    if (e.detail) {

    }
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