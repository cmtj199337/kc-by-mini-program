const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
// 将日期格式化成yyyy-M-d
Date.prototype.FormatYearNo0 = function () {
  var date = this
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  var d = date.getDate()
  return y + '-' + m + '-' + d
}

// 将日期格式化成yyyy-M-d hh:mm
Date.prototype.FormatYear = function () {
  var date = this
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  var h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  var min = date.getMinutes()
  min = min < 10 ? ('0' + min) : min
  return y + '-' + m + '-' + d + ' ' + h + ':' + min
}

// 将日期格式化成M-d
Date.prototype.FormatMonthNo0 = function () {
  var date = this
  var m = date.getMonth() + 1
  var d = date.getDate()
  return m + '-' + d
}

Date.prototype.dateDiff = function (interval, objDate2) {
  // interval必选项
  // y-年
  // q-季度
  // m-月
  // d-日
  // w-周
  // h-小时
  // n-分钟
  // s-秒
  // ms-毫秒
  let d = this
  let i = {}
  let t = d.getTime()
  let t2 = objDate2.getTime()
  i['y'] = objDate2.getFullYear() - d.getFullYear()
  i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4) - Math.floor(d.getMonth() / 4)
  i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth()
  i['ms'] = objDate2.getTime() - d.getTime()
  i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000))
  i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000)
  i['h'] = parseInt(t2 / 3600000 - t / 3600000)
  i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000)
  i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000)
  return i[interval]
}

// 返回星期数
Date.prototype.getWeekDay = function () {
  let day = this.getDay()
  let weekDay = ''

  switch (day) {
    case 0:
      weekDay = '日'
      break
    case 1:
      weekDay = '一'
      break
    case 2:
      weekDay = '二'
      break
    case 3:
      weekDay = '三'
      break
    case 4:
      weekDay = '四'
      break
    case 5:
      weekDay = '五'
      break
    case 6:
      weekDay = '六'
      break
  }
  return weekDay
}

// 活动列表日期友好显示：xx月xx日 xx:xx
Date.prototype.FormatDate1 = function () {
  var date = this
  // var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  var h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  var min = date.getMinutes()
  min = min < 10 ? ('0' + min) : min
  return m + '月' + d + '日 ' + h + ':' + min
}


const time1 = n => {
 // console.log(n)
  let date = new Date(n)
  //console.log(date)
  return date.getFullYear() + '-'
  + (date.getMonth() + 1) + '-'
  + date.getDay()
}
 const compareDate = (d1, d2) => {
    d1 = d1.replace(/-/g, '/').replace(/\.[0-9]*$/g, '')
    d2 = d2.replace(/-/g, '/').replace(/\.[0-9]*$/g, '')
    return ((new Date(d1)) > (new Date(d2)))
  }


  const dateToText = (startTime, endTime, registerStartTime, registerEndTime) => {
    let currDate = new Date()
    currDate = currDate.Format('yyyy-MM-dd hh:mm:ss')
    var statusIndex, takeIndex;
   //
    const arrIconStatus = [['预告', '进行中', '往期'], ['报名中', '进行中', '往期'], ['报名截止', '进行中', '往期']]
    const arrbuttonStatus = [['即将报名', '报名截止', '已结束'], ['立即报名', '立即报名', '已结束'], ['报名截止', '报名截止', '已结束']]
    if (compareDate(currDate, startTime) === false) {
      statusIndex = 0// statusText = '未开始'
    } else if (compareDate(currDate, startTime) === true && compareDate(currDate, endTime) === false) {
      statusIndex = 1// statusText = '进行中'
    } else {
      statusIndex = 2// statusText = '已结束'
    }
    if (compareDate(currDate, registerStartTime) === false) {
      takeIndex = 0// takeText = '报名前'
    } else if (compareDate(currDate, registerStartTime) === true && compareDate(currDate, registerEndTime) === false) {
      takeIndex = 1// takeText = '报名中'
    } else {
      takeIndex = 2// takeText = '报名结束'
    }
    return {
      statusText: arrIconStatus[takeIndex][statusIndex],
      takeText: arrbuttonStatus[takeIndex][statusIndex]
    }
  }

  // 将日期格式化成yyyy年MM月dd日
  Date.prototype.FormatDateStr = function () {
    var date = this
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '年' + m + '月' + d + '日'
  }

  // 活动列表日期友好显示：xx-xx xx:xx
  Date.prototype.FormatDate2 = function () {
    var date = this
    // var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    var h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    var min = date.getMinutes()
    min = min < 10 ? ('0' + min) : min
    return m + '-' + d + ' ' + h + ':' + min
  }

const friendlyACtivityDate = (time) => {
 
  let friendlyDate = ''
  if (time === '' || time === undefined) {
    return friendlyDate
  } else {
    time = time.split('.', 1)[0]
    time = time.replace(new RegExp(/(-)/g), '/')
  }

  let currTimeStr = new Date().Format('yyyy/MM/dd hh:mm:ss') // 当前时间字符串
  let now = new Date(currTimeStr) // 当前时间对象
  // let createDate = new Date(time)
  let yearDiff = new Date(time).dateDiff('y', now)
  let dayDiff = new Date(time).dateDiff('d', now) // 天数之差
  let weeksDiff = new Date(time).dateDiff('w', now) // 星期之差
  let curr = new Date(time).Format('hh:mm')
  let week = new Date(time).getWeekDay()

  if (Math.abs(yearDiff) === 0) {
    if (Math.abs(dayDiff) < 2) {
      if (dayDiff === 1) {
        friendlyDate = '昨天' + curr
      } else if (dayDiff === 0) {
        friendlyDate = '今天' + curr
      } else if (dayDiff === -1) {
        friendlyDate = '明天' + curr
      }
    } else {
      if (Math.abs(weeksDiff) === 0) {
        friendlyDate = '本周' + week + curr
      } else if (weeksDiff === -1) {
        friendlyDate = '下周' + week + curr
      } else {
        friendlyDate = new Date(time).FormatDate1()
      }
    }
  } else {
    friendlyDate = new Date(time).FormatDateStr()
  }
 // 
  return friendlyDate
}

const cutTwo = (time) => {
  time = time.split('.', 1)[0]
  time = time.replace(new RegExp(/(-)/g), '/')
  let date = new Date(time)
  let h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  let min = date.getMinutes()
  min = min < 10 ? ('0' + min) : min
  return h + ' : ' + min
}

const commentTime = (time) => {
  
  let friendlyDate = ''
  if (!time) {
    return friendlyDate
  } else {
    time = time.split('.', 1)[0]
    time = time.replace(new RegExp(/(-)/g), '/')
  }
  
  let currTimeStr = new Date().Format('yyyy/MM/dd hh:mm:ss') // 当前时间字符串
  let now = new Date(currTimeStr) // 当前时间对象
  let yearDiff = new Date(time).dateDiff('y', now)
  let hoursDiff = new Date(time).dateDiff('h', now)
  let minutesDiff = new Date(time).dateDiff('n', now)
  
  if (Math.abs(yearDiff) === 0) {
    // 今年
    if (hoursDiff >= 48) {
      // 超过48小时
      friendlyDate = new Date(time).FormatMonthNo0()
      console.log('1111111111111111111111111111111111111')
    } else if (hoursDiff >= 24) {
      friendlyDate = '昨天'
    } else {
      if (minutesDiff <= 5) {
        // 5分钟以前
        friendlyDate = '刚刚'
      } else if (minutesDiff < 60) {
        friendlyDate = minutesDiff + '分钟前'
      } else {
        friendlyDate = Math.floor(minutesDiff / 60) + '小时前'
      }
    }
  } else {
    // 今年之前
    friendlyDate = new Date(time).FormatYearNo0()
  }
  return friendlyDate
}

const datenoyear = (time) => {
  let friendlyDate = ''
  if (time === '' || time === undefined) {
    return friendlyDate
  } else {
    time = time.split('.', 1)[0]
    time = time.replace(new RegExp(/(-)/g), '/')
  }
  let createDate = new Date(time)
  friendlyDate = createDate.FormatDate2()
  return friendlyDate
}

const dateYear = (time) => {
  let friendlyDate = ''
  if (time === '' || time === undefined) {
    return friendlyDate
  } else {
    time = time.split('.', 1)[0]
    time = time.replace(new RegExp(/(-)/g), '/')
  }
  let createDate = new Date(time)
  friendlyDate = createDate.FormatYear()
  return friendlyDate
}

module.exports = {
  formatTime: formatTime,
  time1: time1,
  dateToText: dateToText,
  compareDate: compareDate,
  friendlyACtivityDate: friendlyACtivityDate,
  cutTwo: cutTwo,
  commentTime: commentTime,
  datenoyear: datenoyear,
  dateYear: dateYear
}