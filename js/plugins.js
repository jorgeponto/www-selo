
(function() {
getUA();
}());



function getUA() {
	var ua = navigator.userAgent.toLowerCase();
	var check = function(r) {
			return r.test(ua);
		};
	var DOC = document;
	var isStrict = DOC.compatMode == "CSS1Compat";
	var isOpera = check(/opera/);
	var isChrome = check(/chrome/);
	var isWebKit = check(/webkit/);
	var isSafari = !isChrome && check(/safari/);
	var isSafari2 = isSafari && check(/applewebkit\/4/);
	var isSafari3 = isSafari && check(/version\/3/);
	var isSafari4 = isSafari && check(/version\/4/);
	var isIE = !isOpera && check(/msie/);
	var isIE7 = isIE && check(/msie 7/);
	var isIE8 = isIE && check(/msie 8/);
	var isIE6 = isIE && !isIE7 && !isIE8;
	var isGecko = !isWebKit && check(/gecko/);
	var isGecko2 = isGecko && check(/rv:1\.8/);
	var isGecko3 = isGecko && check(/rv:1\.9/);
	var isBorderBox = isIE && !isStrict;
	var isWindows = check(/windows|win32/);
	var isMac = check(/macintosh|mac os x/);
	var isAir = check(/adobeair/);
	var isLinux = check(/linux/i);
	var http_str = " ";
	var isSecure = /^https/i.test(window.location.protocol);
	var isIE7InIE8 = isIE7 && DOC.documentMode == 7;
	var isAndroid = check(/Android/i);
	var isBlackBerry = check(/BlackBerry/i);
	var ua = navigator.userAgent.toLowerCase();
	var check = function(r) {
			return r.test(ua);
		};
	
	if (isWindows) {
		osName = 'windows';
	} else if (isMac){
		osName = 'iOS';
	} else if (isLinux){
		osName = 'linux';
	} else if (isAndroid){
		osName = 'android';
	} else if (isBlackBerry){
		osName = 'blackberry';
	}else{
		osName = '';
	}
	
	if (isIE) {
		browserType = 'IE';
	} else if (isGecko) {
		browserType =  'firefox';
	} else if (isChrome) {
		browserType = 'chrome';
	}else if (isOpera) {
		browserType = 'opera';
	}else if (isSafari) {
		browserType = 'safari';
	}else {
		browserType = ' ';
	}
	
	var im = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPod/i);
		},
		iPad: function() {
			return navigator.userAgent.match(/iPad/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (
			isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
	
	iphone_type="";
	var im_str = " ";
	if (im.iPad()) {
		im_str = 'is-iPad';
	} else if (im.Android()) {
		im_str = 'is-mobile ua-android';

	} else if (im.BlackBerry()) {
		im_str = 'is-mobile ua-blackberry';

	} else if (im.iOS()) {
		im_str = 'is-mobile';

	    if (window.screen.height==480 && window.screen.width==320 && window.devicePixelRatio==2) 
	    { 
	        iphone_type="type-4";
	    } 
	    else if (window.screen.height==568 && window.screen.width==320 && window.devicePixelRatio==2) 
	    { 
	        iphone_type="type-5";
	    } 
	    else if (window.screen.height==667 && window.screen.width==375 && window.devicePixelRatio==2) 
	    { 
	        iphone_type="type-6";
	    }
	    else if (window.screen.height==736 && window.screen.width==414 && window.devicePixelRatio==3) 
	    { 
	        iphone_type="type-6p";
	    }
    
    
	} else if (im.Opera()) {
		im_str = 'is-mobile ua-opera-mini';
	} else if (im.Windows()) {
		im_str = 'is-mobile ua-ie-mobile';
	} else {
		im_str = 'is-desktop';
	}
	
	if (isSecure) {
		http_str = 'https';
	}
	
	
	$('html').addClass('os-'+osName+' ua-'+browserType+' '+im_str+' '+http_str+' '+iphone_type)
	browserDB = 'os-'+osName+' ua-'+browserType+' '+im_str+' '+iphone_type;

}
