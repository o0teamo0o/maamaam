//获取应用实例
const app = getApp()

/**
 * 距离现在几天的日期：负数表示今天之前的日期，0表示今天，整数表示未来的日期 
 * 如-1表示昨天的日期，0表示今天，2表示后天 
 */
function fromToday(days, delimiter) {
  var today = new Date();
  today.setDate(today.getDate() + days);
  var monty = today.getMonth() + 1;
  if (monty < 10) {
    monty = "0" + monty;
  }
  var day = today.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  var date = today.getFullYear() + delimiter + monty + delimiter + day;
  return date;
}

/**
 * 距离现在几天的日期：负数表示今天之前的日期，0表示今天，整数表示未来的日期 
 * 如-1表示昨天的日期，0表示今天，2表示后天 
 */
function fromCustomDate(dateStr, days, delimiter) {
  var today = new Date(dateStr);
  today.setDate(today.getDate() + days);
  var monty = today.getMonth() + 1;
  if (monty < 10) {
    monty = "0" + monty;
  }
  var day = today.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  var date = today.getFullYear() + delimiter + monty + delimiter + day;
  return date;
}

/**
 * 将日期格式化成指定格式的字符串
 * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
 * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
 * @returns 返回格式化后的日期字符串
 */
function formatDate(date, fmt) {
  date = date == undefined ? new Date() : date;
  date = typeof date == 'number' ? new Date(date) : date;
  fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
  var obj = {
    'y': date.getFullYear(), // 年份，注意必须用getFullYear
    'M': date.getMonth() + 1, // 月份，注意是从0-11
    'd': date.getDate(), // 日期
    'q': Math.floor((date.getMonth() + 3) / 3), // 季度
    'w': date.getDay(), // 星期，注意是0-6
    'H': date.getHours(), // 24小时制
    'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
    'm': date.getMinutes(), // 分钟
    's': date.getSeconds(), // 秒
    'S': date.getMilliseconds() // 毫秒
  };
  var week = ['天', '一', '二', '三', '四', '五', '六'];
  for (var i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function(m) {
      var val = obj[i] + '';
      if (i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
      for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
      return m.length == 1 ? val : val.substring(val.length - m.length);
    });
  }
  return fmt;
}

/**
 * 根据日期字符串获取星期几
 * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
 * @returns {String}
 */
function getWeek(dateString) {
  var dateArray = dateString.split("-");
  var date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
  //var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
  //return "星期" + weeks[date.getDay()];
  return "周" + "日一二三四五六".charAt(date.getDay());
};

/**
 * 获取两个时间段之间的月份数组
 */
function getMonthBetween(start, end) {
  var result = [];
  var s = start.split("-");
  var e = end.split("-");
  var min = new Date();
  var max = new Date();
  min.setFullYear(s[0], s[1] - 1);
  max.setFullYear(e[0], e[1] - 1);

  var curr = min;
  while (curr <= max) {
    var monthInfo = {};
    var month = curr.getMonth() + 1;
    monthInfo.month = month + "月";
    monthInfo.year = curr.getFullYear() + "-" + (month < 10 ? ("0" + month) : month);
    monthInfo.date = curr.getFullYear() + "-" + (month < 10 ? ("0" + month) : month) + "-01";
    result.push(monthInfo);
    curr.setMonth(curr.getMonth() + 1);
  }
  return result;
}

/**
 * 获取两个时间段之间的所有日期
 */
function getDateBetween(start, end) {
  var result = [];
  var beginDay = start.split("-");
  var endDay = end.split("-");
  var diffDay = new Date();
  var dateList = new Array;
  var i = 0;
  diffDay.setDate(beginDay[2]);
  diffDay.setMonth(beginDay[1] - 1);
  diffDay.setFullYear(beginDay[0]);
  result.push(start);
  while (i == 0) {
    var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
    diffDay.setTime(countDay);
    dateList[2] = diffDay.getDate();
    dateList[1] = diffDay.getMonth() + 1;
    dateList[0] = diffDay.getFullYear();
    if (String(dateList[1]).length == 1) {
      dateList[1] = "0" + dateList[1]
    };
    if (String(dateList[2]).length == 1) {
      dateList[2] = "0" + dateList[2]
    };
    result.push(dateList[0] + "-" + dateList[1] + "-" + dateList[2]);
    if (dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]) {
      i = 1;
    }
  };
  return result;
};

function getDateMillisecondTransformation(str) {    
  var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = oYear + '-' + addZero(oMonth) + '-' + addZero(oDay); // + ' ' + addZero(oHour) + ':' + addZero(oMin) + ':' + addZero(oSen);    
  return oTime;
}

//补零操作
function addZero(num) {    
  if (parseInt(num) < 10) {        
    num = '0' + num;    
  }    
  return num;
}

module.exports = {
  fromToday: fromToday,
  fromCustomDate: fromCustomDate,
  formatDate: formatDate,
  getWeek: getWeek,
  getMonthBetween: getMonthBetween,
  getDateBetween: getDateBetween,
  getDateMillisecondTransformation: getDateMillisecondTransformation
}