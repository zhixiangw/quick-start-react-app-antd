import './style.scss';
import axios from 'axios'

var Axios = axios.create({
  baseURL: 'http://opapi.fengjiangdali.com',
  timeout: 2000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest: function(data) {
    var bodyFormData = new FormData();
    for(var key in data){
      bodyFormData.set(key, data[key]);
    }
    return bodyFormData
  }
});

var apiRequest = {
  getPageInfo: function() {
    return Axios({
      method: 'get',
      url: '/user/location-info'
    })
  },
  getCaptchaCode: function(param) {
    return Axios({
      method: 'post',
      url: '/user/get-image-captcha',
      data: {
        phone: param.mobile,
        type: 6
      }
    })
  },
  refreshCaptchaCode: function() {
    return Axios({
      method: 'post',
      url: '/user/refresh-image-captcha',
      data: {
        type: 6
      }
    })
  },
  upLocation: function(param) {
    return Axios({
      method: 'post',
      url: '/user/location-h5-up',
      data: {
        user_id: param.userId,
        poisition: param.poisition,
        client_info: JSON.stringify({
          clientType: getPlatform().platform,
          deviceName: '',
          osVersion: '',
          appVersion: '',
          appMarket: getUrlParamByName('appMarket') || 'h5-special',
          deviceId: ''
        }),
        from: 'webDown'
      }
    })
  },
  getVerificationCode: function(param) {
    var data = {
      phone: param.mobile,
      type: 6,
      location: 1
    }
    if (param.captchaCode) {
      data.captcha_code = param.captchaCode
    }
    return Axios({
      method: 'post',
      url: '/user/protected-send-message',
      data: data
    })
  },
  login: function(param) {
    return Axios({
      method: 'post',
      url: '/user/login',
      data: {
        phone: param.mobile,
        type: 0,
        message_code: param.verifyCode,
        client_info: JSON.stringify({
          clientType: getPlatform().platform,
          deviceName: '',
          osVersion: '',
          appVersion: '',
          appMarket: getUrlParamByName('appMarket') || 'h5-special',
          deviceId: ''
        }),
        location: 1,
        source: -1
      }
    })
  },
}

function getUrlParamByName(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = decodeURI(window.location.search).substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

function getPlatform() {
  var u = navigator.userAgent;
  return {
    IOS: u.indexOf('iPhone') > -1,
    Android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    WeiXin: u.match(/MicroMessenger/i) == 'micromessenger',
    platform: u.indexOf('iPhone') > -1 ? 'ios' : 'android'
  }
}

function isValidMobile(mobile) {
  // 简单验证手机号码
  return /^1[3|5|6|7|8|9]\d{9}$/.test(mobile)
}

function toast(text, duration) {
  var body = document.querySelector('body')
  var div = document.createElement('div')
  div.className = 'toast-container'
  var html = [
    '<div class="content">',
    text,
    '</div>'
  ].join('')
  div.innerHTML = html
  body.appendChild(div)
  setTimeout(() => {
    div.remove()
  }, duration || 1500);
}

function getPageInfo() {
  apiRequest.getPageInfo().then(function(res){
    var resp = res.data.data
    var banner = resp.top_banner
    var agreement = resp.agreement
    var agreementName = agreement.name
    var agreementContent = agreement.content
    var icp = resp.icp
    var companyName = resp.company_name
    banner && document.querySelector('.banner-content').setAttribute('src', banner)
    if (agreementName) document.querySelector('.user-agreement-modal .modal-title').innerHTML = agreementName
    if (agreementContent) document.querySelector('.user-agreement-modal .modal-content').innerHTML = agreementContent
    if (icp || companyName) document.querySelector('.login-container .icp').innerHTML = icp + ' ' + companyName
  })
  apiRequest.upLocation({ userId: 0, poisition: 0 })
}

function showCaptchaModal() {
  var modal = document.querySelector('.captcha-container')
  modal.classList.add('show')
  modal.addEventListener('touchmove', function(e){
    e.preventDefault()
  })
  __GLOBAL__INIT__DATA__.captchaCodeIsRequired = true
}

var __GLOBAL__INIT__DATA__ = {
  captchaCodeIsRequired: false, // 是否需要验证码
  mobilePhoneIsValid: false, // 手机号码是否有效
  verificationCodeIsValid: false, // 验证码是否有效
  userAgreementIsChecked: true, // 用户协议是否勾选
}

var mobileInput = document.querySelector('.mobile')
var submitBtn = document.querySelector('.code-box .btn')
var verifyCodeInput = document.querySelector('.valid-code')
var downLoadBtn = document.querySelector('.login-wrap .download')

// 手机号码输入框
mobileInput.addEventListener('input', function(e){
  var mobile = e.target.value
  if (isValidMobile(mobile)) {
    __GLOBAL__INIT__DATA__.mobilePhoneIsValid = true
    submitBtn.classList.remove('disabled')
  } else {
    submitBtn.classList.add('disabled')
  }
})

// 验证码输入框
verifyCodeInput.addEventListener('input', function(e){
  var verifyCode = e.target.value
  if (verifyCode) {
    __GLOBAL__INIT__DATA__.verificationCodeIsValid = true
  } else {
    __GLOBAL__INIT__DATA__.verificationCodeIsValid = false
  }
})

// 获取验证码按钮
submitBtn.addEventListener('click', function(e){
  if (e.target.classList.contains('disabled')) {
    return
  }
  e.target.classList.add('disabled')
  var param = { mobile: mobileInput.value }
  if (__GLOBAL__INIT__DATA__.captchaCodeIsRequired) {
    param.captchaCode = document.querySelector('.captcha-container .captcha-code').value
  }
  apiRequest.getVerificationCode(param).then(function(res){
    var userId = res.data.data && res.data.data.item && res.data.data.item.uid || 0
    var code = res.data && res.data.code
    var msg = res.data && res.data.message
    if (code == -1003) {
      toast('您是老用户，可直接下载APP')
      apiRequest.upLocation({ userId: userId, poisition: 2 })
      setTimeout(() => {
        window.location.replace('/download.html?appMarket=' + (getUrlParamByName('appMarket') || 'h5-special') + '&uid=' + userId)
      }, 1500)
      return
    }
    // 需要进行图形验证码
    if (code === -1009) {
      apiRequest.getCaptchaCode({ mobile: mobileInput.value }).then(function(res){
        var link = res.data.data && res.data.data.link
        var captchaImg = document.querySelector('.captcha-container .captcha-img img')
        link && captchaImg.setAttribute('src', link.replace('47.110.150.249', '47.110.150.249:8899'))
        showCaptchaModal()
      })
      return
    }
    toast(msg)
    if (code === 0) return (CountDown(), apiRequest.upLocation({ userId: userId, poisition: 1 }))
    submitBtn.classList.remove('disabled')
  })
})

document.querySelector('.captcha-container .captcha-img img').addEventListener('click', function(){
  apiRequest.refreshCaptchaCode().then(function(res){
    var link = res.data.data && res.data.data.link
    var captchaImg = document.querySelector('.captcha-container .captcha-img img')
    link && captchaImg.setAttribute('src', link.replace('47.110.150.249', '47.110.150.249:8899'))
  })
})

function CountDown() {
  var count = 59
  submitBtn.innerHTML = count + '秒后获取'
  var timerId = setInterval(() => {
    submitBtn.innerHTML = count + '秒后获取'
    if (count === 0) {
      clearInterval(timerId)
      submitBtn.innerHTML = '获取验证码'
      submitBtn.classList.remove('disabled')
    }
    count--
  }, 1000);
}

// 立即借款按钮
downLoadBtn.addEventListener('click', function(){
  if (
    __GLOBAL__INIT__DATA__.mobilePhoneIsValid &&
    __GLOBAL__INIT__DATA__.verificationCodeIsValid &&
    __GLOBAL__INIT__DATA__.userAgreementIsChecked
  ) {
    apiRequest.login({ mobile: mobileInput.value, verifyCode: verifyCodeInput.value }).then(function(res) {
      var msg = res.data.message
      var loginCode = res.data.code
      var userId = res.data.data && res.data.data.item && res.data.data.item.uid || 0
      toast(msg)
      if (loginCode === 0) {
        setTimeout(() => {
          window.location.replace('/download.html?appMarket=' + (getUrlParamByName('appMarket') || 'h5-special') + '&uid=' + userId)
        }, 1500);
      }
    })
  } else {
    if (!__GLOBAL__INIT__DATA__.mobilePhoneIsValid) return toast('手机号码不正确')
    if (!__GLOBAL__INIT__DATA__.verificationCodeIsValid) return toast('短信验证码不正确')
    if (!__GLOBAL__INIT__DATA__.userAgreementIsChecked) return toast('请勾选我已阅读并同意《用户注册协议》', 2000)
  }
})

// 用户注册协议勾选
document.querySelector('.user-agreement .check-btn').addEventListener('click', function(e){
  var clsList = e.target.classList
  clsList.toggle('unchecked')
  __GLOBAL__INIT__DATA__.userAgreementIsChecked = !clsList.contains('unchecked')
})

// 用户注册协议
document.querySelector('.user-agreement .tip span').addEventListener('click', function(){
  document.querySelector('.user-agreement-modal-container').classList.add('show')
})
document.querySelector('.user-agreement-modal-container .confirm-btn').addEventListener('click', function(){
  document.querySelector('.user-agreement-modal-container').classList.remove('show')
})

// 图像验证码弹窗关闭按钮
document.querySelector('.captcha-container .close-btn').addEventListener('click', function(){
  var modal = document.querySelector('.captcha-container')
  submitBtn.classList.remove('disabled')
  modal.classList.remove('show')
})
// 图形验证码弹框确定按钮
document.querySelector('.captcha-container .confirm-btn').addEventListener('click', function(){
  var code = document.querySelector('.captcha-container .captcha-code').value
  if (
    __GLOBAL__INIT__DATA__.captchaCodeIsRequired && code
  ) {
    apiRequest.getVerificationCode({ mobile: mobileInput.value, captchaCode: code }).then(function(res){
      var msg = res.data && res.data.message
      var resCode = res.data && res.data.code
      if (resCode === -1) {
        toast(msg)
        return
      }
      if (code === 0) {
        CountDown();
        var modal = document.querySelector('.captcha-container')
        modal.classList.remove('show')
      }
    })
  } else {
    toast('图形验证码不能为空')
  }
})

// 动画提示条
function getRandomMin() {
  // 1-8分钟
  return Math.floor(Math.random() * 7) + 1
}
function getMobileNumber() {
  var number = ['3', '4', '5', '7', '8', '9']
  var index = Math.floor(Math.random() * number.length)
  var last = Math.floor(Math.random() * 10)
  return '1' + number[index] + last
}
function getMobileLast() {
  var last = Math.floor(Math.random() * 10000)
  return last
}
function getPayCount() {
  // 5000-50000,以百为粒度
  var payCount = Math.floor(Math.random() * 450) + 50
  return payCount * 100
}
function generatorItems() {
  var arr = []
  for (var i=0;i<10;i++) {
    arr.push('<p>' + getRandomMin() + '分钟前，' + getMobileNumber() + '****' + getMobileLast() + '成功借款' + getPayCount() + '元。</p>')
  }
  return arr
}

var tipContainer = document.querySelector('.tip-container')
var tipWrap = document.querySelector('.tip-container-warp')
function animationStart(count) {
  if (!(count % 8)) {
    var html = generatorItems().join('')
    tipWrap.insertAdjacentHTML('beforeend', html)
  }
  tipWrap.style.cssText = `transform: translate3d(0, -${tipContainer.clientHeight * (count)}px, 0)`;
}
function init() {
  window.onload = function(){
    var items = generatorItems()
    tipWrap.innerHTML = items.join('');
    var count = 0
    setInterval(() => {
      count++
      animationStart(count)
    }, 3500);
    getPageInfo()
    document.querySelector('input.captcha-code').addEventListener('blur', function(){
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 0);
    })
  }
}
init()