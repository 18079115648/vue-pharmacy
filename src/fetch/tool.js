import wx from 'weixin-js-sdk'

/** 
*   Toast公共方法
*/

export function loadJssdk(lineLink, imgUrl, shareTitle, descContent) {
    wx.onMenuShareTimeline({
        title: shareTitle, // 分享标题
        link: lineLink, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareAppMessage({
        desc: descContent, // 分享描述
        title: shareTitle, // 分享标题
        link: lineLink, // 分享链接
        imgUrl: imgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareQQ({
        desc: descContent, // 分享描述
        title: shareTitle, // 分享标题
        link: lineLink, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}

export function getCookie(name) {
    var strCookie = document.cookie;

    var arrCookie = strCookie.split("; ");

    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) return arr[1];
    }

    return "";
}

export function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var param=window.location.hash.split('?')[1];
    if(!param){
    	return null
    }
    var r = window.location.hash.split('?')[1].match(reg)
    if (r != null) return unescape(r[2])
    return null
}


//获取经纬度，并保存
export function getLocation() {
    var lat=GetQueryString('lat');
    var lng=GetQueryString('lng');
    if(!(lat==null || lat==undefined)){
		localStorage.setItem('lat', lat)
		 console.log('纬度保存')
	}
    if(!(lng==null || lng==undefined)){
		localStorage.setItem('lng', lng)
		 console.log('经度保存')
	}
}


//数组产品去重
export function unique(obj,name,id) {
     var res = [];
	 var json = {};
	 for(var i = 0; i < obj.length; i++){
		 if(!json[obj[i][id]]){
		 	var item={};
		 	item.id=obj[i][id];
		 	item.value=obj[i][name];
		 	json[obj[i][id]] = 1;
		    res.push(item);
		    
		 }
	 }
	 return res;
}





