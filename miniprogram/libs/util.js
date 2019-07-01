//获取应用实例
const app = getApp()

/**
 * 判断是否为空
 */
function isEmpty(str) {
  if (Object.prototype.toString.call(str) === '[object Undefined]') { //空
    return true
  } else if (
    Object.prototype.toString.call(str) === '[object String]' ||
    Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
    return str.length == 0 ? true : false
  } else if (Object.prototype.toString.call(str) === '[object Object]') {
    return JSON.stringify(str) == '{}' ? true : false
  } else {
    return true
  }

}

/**
 * 返回一个使用key切割str后的数组，key仍在数组中
 */
function getHilightStrArray(str, key) {
  return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
}

/**
 * 是否存在字符串
 */
function isExistStr(str, ele) {
  if (str.indexOf(ele) == -1) {
    return false;
  } else {
    return true;
  }
}


/**
 * 加法得到金额数据（保留精度问题）
 * @num1 数字1
 * @num2 数字2
 * @decimal 保留小数点位数
 * @returns {String}
 */
function numberAdd(num1, num2, decimal) {
  var r1, r2, m;
  try {
    r1 = num1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = num2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))

  var val = (num1 * m + num2 * m) / m;
  var m = val.toString();
  var num = m.split(".");
  if (num.length > 1) {
    var l = num[1];
    if (l.length < 2) {
      m = m + "0";
    }
  }
  if (decimal == 0) {
    return m;
  } else if (decimal == 1) {
    return keepDecimalFull(m, 10);
  } else if (decimal == 2) {
    return keepDecimalFull(m, 100);
  } else if (decimal == 3) {
    return keepDecimalFull(m, 1000);
  } else if (decimal == 4) {
    return keepDecimalFull(m, 10000);
  } else if (decimal == 5) {
    return keepDecimalFull(m, 100000);
  } else if (decimal == 6) {
    return keepDecimalFull(m, 1000000);
  } else {
    return m;
  }
}

/**
 * 减法得到金额数据（保留精度问题）
 * @num1 数字1
 * @num2 数字2
 * @decimal 保留小数点位数
 * @returns {String}
 */
function numberSub(num1, num2, decimal) {
  return numberAdd(num1, -num2, decimal);
}

/**
 * 乘法得到金额数据（保留精度问题）
 * @num1 数字1
 * @num2 数字2
 * @decimal 保留小数点位数
 */
function numberMultiply(num1, num2, decimal) {
  var m = 0,
    s1 = num1.toString(),
    s2 = num2.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {}
  try {
    m += s2.split(".")[1].length
  } catch (e) {}

  var val = Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  var m = val.toString();
  var num = m.split(".");
  if (num.length > 1) {
    var l = num[1];
    if (l.length < 2) {
      m = m + "0";
    }
  }
  if (decimal == 0) {
    return m;
  } else if (decimal == 1) {
    return keepDecimalFull(m, 10);
  } else if (decimal == 2) {
    return keepDecimalFull(m, 100);
  } else if (decimal == 3) {
    return keepDecimalFull(m, 1000);
  } else if (decimal == 4) {
    return keepDecimalFull(m, 10000);
  } else if (decimal == 5) {
    return keepDecimalFull(m, 100000);
  } else if (decimal == 6) {
    return keepDecimalFull(m, 1000000);
  } else {
    return m;
  }
}

/**
 * 除法得到金额数据（保留精度问题）
 * @num1 数字1
 * @num2 数字2
 * @decimal 保留小数点位数
 */
function numberDivision(num1, num2, decimal) {
  var t1 = 0,
    t2 = 0,
    r1, r2;
  try {
    t1 = num1.toString().split(".")[1].length
  } catch (e) {}
  try {
    t2 = num2.toString().split(".")[1].length
  } catch (e) {}
  r1 = num1.toString().replace(".", "")
  r2 = num2.toString().replace(".", "")

  var m = (r1 / r2) * Math.pow(10, t2 - t1);

  if (decimal == 0) {
    return m;
  } else if (decimal == 1) {
    return keepDecimalFull(m, 10);
  } else if (decimal == 2) {
    return keepDecimalFull(m, 100);
  } else if (decimal == 3) {
    return keepDecimalFull(m, 1000);
  } else if (decimal == 4) {
    return keepDecimalFull(m, 10000);
  } else if (decimal == 5) {
    return keepDecimalFull(m, 100000);
  } else if (decimal == 6) {
    return keepDecimalFull(m, 1000000);
  } else {
    return m;
  }
}


/**
 * 四舍五入保留2位小数（不够位数，则用0替补）
 */
function keepDecimalFull(num, decimal) {
  var result = parseFloat(num);
  if (isNaN(result)) {
    alert('传递参数错误，请检查！');
    return false;
  }
  result = Math.round(num * decimal) / decimal;
  var s_x = result.toString();
  var pos_decimal = s_x.indexOf('.');
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += '.';
  }
  while (s_x.length <= pos_decimal + 2) {
    s_x += '0';
  }
  return s_x;
}

/**
 * 米/千米距离变换
 */
function distanceTransform(distance) {
  if (isEmpty(distance)) {
    return;
  }
  if (distance < 1000) {
    return distance + "米";
  } else {
    return (Math.round(distance / 100) / 10) + "公里";
  }
}

/**
 * 获取两地经纬度距离
 */
function distanceFrom(lat1, lng1, lat2, lng2) {
  var lat = [lat1, lat2]
  var lng = [lng1, lng2]
  var R = 6378137;
  var dLat = (lat[1] - lat[0]) * Math.PI / 180;
  var dLng = (lng[1] - lng[0]) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat[0] * Math.PI / 180) * Math.cos(lat[1] * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return Math.round(d);
}

/**
 * 秒转成时分秒
 */
function formatSeconds(value) {
  var theTime = parseInt(value); // 秒 
  var theTime1 = 0; // 分 
  var theTime2 = 0; // 小时 
  // alert(theTime); 
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    // alert(theTime1+"-"+theTime); 
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }
  var result = ""; // + parseInt(theTime) + "秒";
  if (theTime1 > 0) {
    result = "" + parseInt(theTime1) + "分钟" + result;
  }
  if (theTime2 > 0) {
    result = "" + parseInt(theTime2) + "小时" + result;
  }
  return result;
}

/**
 * 格式化手机号码
 */
function phoneFormat(phone) {
  if (phone.length <= 3) {
    return phone;
  }
  return phone.slice(0, 3) + (phone.slice(3) == "" ? "" : (" " + phoneFormatMethd(phone.slice(3))));
}

/**
 * 格式化手机号码
 */
function phoneFormatMethd(phone4) {
  return phone4.slice(0, 4) + (phone4.slice(4) == "" ? "" : (" " + phoneFormatMethd(phone4.slice(4))));
}　　　　　　

/**
 * 去除字符串所有空格
 */
function globalTrim(str, is_global) {
  var result;
  result = str.replace(/(^\s+)|(\s+$)/g, "");
  if (is_global.toLowerCase() == "g") {
    result = result.replace(/\s/g, "");
  }
  return result;
}

/**
 * 时间毫秒值转换成时间字符串
 */
function timeStampToStr(timestamp) {
  var time = new Date(timestamp) //先将时间戳转为Date对象，然后才能使用Date的方法
  var year = time.getFullYear(),
    month = time.getMonth() + 1, //月份是从0开始的
    day = time.getDate(),
    hour = time.getHours(),
    minute = time.getMinutes(),
    second = time.getSeconds()
  //add0()方法在后面定义
  return year + '-' + add0(month) + '-' + add0(day);
};

/**
 * 时间毫秒值转换成时间字符串
 */
function timeStampToStr2(timestamp) {
  var time = new Date(timestamp) //先将时间戳转为Date对象，然后才能使用Date的方法
  var year = time.getFullYear(),
    month = time.getMonth() + 1, //月份是从0开始的
    day = time.getDate(),
    hour = time.getHours(),
    minute = time.getMinutes(),
    second = time.getSeconds()
  //add0()方法在后面定义
  return year + '-' + add0(month) + '-' + add0(day) + " " + add0(hour) + ":" + add0(minute) + ":" + add0(second);
};

/**
 * 时间毫秒值转换成时间字符串
 */
function timeStampToStr3(timestamp) {
  var time = new Date(timestamp); //先将时间戳转为Date对象，然后才能使用Date的方法
  var year = time.getFullYear(),
    month = time.getMonth() + 1; //月份是从0开始的
  //add0()方法在后面定义
  return year + '年' + add0(month) + '月';
};

/**
 * 补领方法
 */
function add0(m) {
  return m < 10 ? '0' + m : m
};

/**
 * 根据出生日期算出年龄
 */
function getAge(currentDate, strBirthday) {
  var returnAge;
  var strBirthdayArr = strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];

  var d = new Date(currentDate);
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();

  if (nowYear == birthYear) {
    returnAge = 0; //同年 则为0岁
  } else {
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay; //日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        var monthDiff = nowMonth - birthMonth; //月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge; //返回周岁年龄
};

/**
 * 检查身份证
 */
function checkIdcard(idcard) {
  var Errors = new Array(
    "验证通过!",
    "身份证号码位数不对!",
    "身份证号码出生日期超出范围或含有非法字符!",
    "身份证号码校验错误!",
    "身份证地区非法!"
  );
  var area = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  }

  var idcard, Y, JYM;
  var S, M;
  var idcard_array = new Array();
  var ereg;
  idcard_array = idcard.split("");
  //地区检验   
  if (area[parseInt(idcard.substr(0, 2))] == null) return true;
  //身份号码位数及格式检验   
  switch (idcard.length) {
    //15位身份号码检测  
    case 15:
      if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性   
      } else {
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性   
      }
      if (ereg.test(idcard)) return false;
      else return true;
      break;
      //18位身份号码检测  
    case 18:
      if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式   
      } else {
        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式   
      }
      if (ereg.test(idcard)) { //测试出生日期的合法性   
        //计算校验位   
        S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 +
          (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 +
          (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 +
          (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 +
          (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 +
          (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 +
          (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 +
          parseInt(idcard_array[7]) * 1 +
          parseInt(idcard_array[8]) * 6 +
          parseInt(idcard_array[9]) * 3;
        Y = S % 11;
        M = "F";
        JYM = "10X98765432";
        M = JYM.substr(Y, 1); //判断校验位   
        if (M == idcard_array[17]) return false; //检测ID的校验位   
        else return true;
      } else return true;
      break;
    default:
      return true;
      break;
  }

}

/**
 * 获取身份证年月日
 */
function getIDCardBirthday(idCardStr) {
  if (idCardStr.length == 15) {
    return isValidityBrithBy15IdCard(idCardStr);
  } else {
    return isValidityBrithBy18IdCard(idCardStr);
  }
}

/**  
 * 验证18位数身份证号码中的生日是否是有效生日  
 * @param idCard 18位书身份证字符串  
 * @return  
 */
function isValidityBrithBy18IdCard(idCard18) {
  var year = idCard18.substring(6, 10);
  var month = idCard18.substring(10, 12);
  var day = idCard18.substring(12, 14);
  var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
  // 这里用getFullYear()获取年份，避免千年虫问题   
  if (temp_date.getFullYear() != parseFloat(year) ||
    temp_date.getMonth() != parseFloat(month) - 1 ||
    temp_date.getDate() != parseFloat(day)) {
    return false;
  } else {
    return year + "-" + month + "-" + day;
  }
}

/**  
 * 验证15位数身份证号码中的生日是否是有效生日  
 * @param idCard15 15位书身份证字符串  
 * @return  
 */
function isValidityBrithBy15IdCard(idCard15) {
  var year = idCard15.substring(6, 8);
  var month = idCard15.substring(8, 10);
  var day = idCard15.substring(10, 12);
  var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
  // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
  if (temp_date.getYear() != parseFloat(year) ||
    temp_date.getMonth() != parseFloat(month) - 1 ||
    temp_date.getDate() != parseFloat(day)) {
    return false;
  } else {
    return year + "-" + month + "-" + day;
  }
}

/**  
 * 通过身份证判断是男是女  
 * @param idCard 15/18位身份证号码   
 * @return '2'-女、'1'-男  
 */
function maleOrFemalByIdCard(idCard) {
  idCard = trim(idCard.replace(/ /g, "")); // 对身份证号码做处理。包括字符间有空格。   
  if (idCard.length == 15) {
    if (idCard.substring(14, 15) % 2 == 0) {
      return 2;
    } else {
      return 1;
    }
  } else if (idCard.length == 18) {
    if (idCard.substring(14, 17) % 2 == 0) {
      return 2;
    } else {
      return 1;
    }
  } else {
    return null;
  }
}

/**
 * 去掉字符串头尾空格 
 */
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 格式化身份证
 */
function formatidcard(idcard) {
  // 15位身份证举例：130503 670401 001的含义; 13为河北，05为邢台，03为桥西区，出 生日期为1967年4月1日，顺序号为001。
  if (idcard.length == 15) {
    return idcard.replace(/(\d{6})\d{6}(\d{3})/, "$1******$2");
  } else {
    return idcard.replace(/(\d{5})\d{9}(\d{3})/, "$1*********$2");
  }
}

/**
 * 数字前面自动补零
 */
function prefixInteger(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}

module.exports = {
  isEmpty: isEmpty,
  getHilightStrArray: getHilightStrArray,
  isExistStr: isExistStr,
  numberAdd: numberAdd,
  numberSub: numberSub,
  numberMultiply: numberMultiply,
  numberDivision: numberDivision,
  distanceTransform: distanceTransform,
  formatSeconds: formatSeconds,
  distanceFrom: distanceFrom,
  phoneFormat: phoneFormat,
  timeStampToStr: timeStampToStr,
  getAge: getAge,
  checkIdcard: checkIdcard,
  getIDCardBirthday: getIDCardBirthday,
  maleOrFemalByIdCard: maleOrFemalByIdCard,
  formatidcard: formatidcard,
  prefixInteger: prefixInteger,
  timeStampToStr2: timeStampToStr2,
  timeStampToStr3: timeStampToStr3,
}