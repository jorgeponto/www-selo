$(document).ready(function() {
	
	if(window.location.hash) {
	  $('a[href$="'+window.location.hash+'"]').click();
	  
	}else{
	}
	
	
	
	
// MOBILE

	if($(window).width() <= 1000){
		$('.caroussel .caroussel-img.gold ul').append($('.caroussel .caroussel-img.gold ul li:first'));
		$('.caroussel .caroussel-img.silver ul').append($('.caroussel .caroussel-img.silver ul li:first'));
		$('.caroussel .caroussel-img.bronze ul').append($('.caroussel .caroussel-img.bronze ul li:first'));
		
		$(".header-image").append("<button id='mob'><svg class='burguer' style='width:25px;height:25px;' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 33.29112 27.43386'><line x1='1.93908' y1='1.86183' x2='31.35204' y2='1.86183' style='fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:3px'/><line x1='1.93908' y1='13.71693' x2='31.35204' y2='13.71693' style='fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:3px'/><line x1='1.93908' y1='25.57204' x2='31.35204' y2='25.57204' style='fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:3px'/></svg><svg class='close' style='width:25px;height:25px;' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 33.29112 27.43386'><line x1='6.24651' y1='3.31788' x2='27.04461' y2='24.11599' style='fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:3px'/><line x1='6.24651' y1='24.11599' x2='27.04461' y2='3.31788' style='fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:3px'/></svg></button>");
		
		$(".caroussel").addClass("mobile");
		
		$(" .mobile-part").removeAttr("hidden");
		
		$("header .nav-wrapper .grid li").click(function() {
			$("header .nav-wrapper .grid li").removeClass("active");
			
			if($(this).hasClass("button-dropdown")){
				
				console.log(123456)
			}else{
				$(this).addClass("active");
			}
		});
		
		$(".mobile-part li").click(function() {
			$("header .nav-wrapper .grid li").removeClass("active");
			$(this).addClass("active");
		});
		
		$("#mob").click(function() {
			$(".search-container").toggleClass("showing");
			$(".nav-wrapper").toggleClass("mobile-show");
			$(this).toggleClass("open")
			
		});
		
// 		GOLD MOBILE
		$(".caroussel.mobile .caroussel-img.gold .caroussel-controls .after").click(function() {
			$('.caroussel.mobile .caroussel-img.gold ul').prepend($('.caroussel .caroussel-img.gold ul li:last'))
			$('.caroussel.mobile .caroussel-content.gold').append($('.caroussel .caroussel-content.gold li:first'))
		});
		$(".caroussel.mobile .caroussel-img.gold ul li").click(function() {
			id = $(this).attr("id");
			liIndex = $(this).index();
			liIndex_prev = $(this).index() ;
			liIndex_next = $(this).index() + 1;
			
			if($(this).index()==5){ // next
				$('.caroussel.mobile .caroussel-img.gold ul').append($('.caroussel.mobile .caroussel-img.gold ul li:first'))
				$('.caroussel.mobile .caroussel-content.gold').prepend($('.caroussel.mobile .caroussel-content.gold li:last'))
				
			}
			
			if($(this).index()==3){ // prev
				$('.caroussel.mobile .caroussel-img.gold ul').prepend($('.caroussel.mobile .caroussel-img.gold ul li:last'))
				$('.caroussel.mobile .caroussel-content.gold').append($('.caroussel.mobile .caroussel-content.gold li:first'))
			}

		});
// 		SILVER MOBILE
		$(".caroussel.mobile .caroussel-img.silver .caroussel-controls .after").click(function() {
			$('.caroussel.mobile .caroussel-img.silver ul').prepend($('.caroussel .caroussel-img.silver ul li:last'))
			$('.caroussel.mobile .caroussel-content.silver').append($('.caroussel .caroussel-content.silver li:first'))
		});
		$(".caroussel.mobile .caroussel-img.silver ul li").click(function() {
			id = $(this).attr("id");
			liIndex = $(this).index();
			liIndex_prev = $(this).index() ;
			liIndex_next = $(this).index() + 1;
			
			if($(this).index()==5){ // next
				$('.caroussel.mobile .caroussel-img.silver ul').append($('.caroussel.mobile .caroussel-img.silver ul li:first'))
				$('.caroussel.mobile .caroussel-content.silver').prepend($('.caroussel.mobile .caroussel-content.silver li:last'))
				
			}
			
			if($(this).index()==3){ // prev
				$('.caroussel.mobile .caroussel-img.silver ul').prepend($('.caroussel.mobile .caroussel-img.silver ul li:last'))
				$('.caroussel.mobile .caroussel-content.silver').append($('.caroussel.mobile .caroussel-content.silver li:first'))
			}

		});
// 		BRONZE MOBILE
		$(".caroussel.mobile .caroussel-img.bronze .caroussel-controls .after").click(function() {
			$('.caroussel.mobile .caroussel-img.bronze ul').prepend($('.caroussel .caroussel-img.bronze ul li:last'))
			$('.caroussel.mobile .caroussel-content.bronze').append($('.caroussel .caroussel-content.bronze li:first'))
		});
		$(".caroussel.mobile .caroussel-img.bronze ul li").click(function() {
			id = $(this).attr("id");
			liIndex = $(this).index();
			liIndex_prev = $(this).index() ;
			liIndex_next = $(this).index() + 1;
			
			
			if($(this).index()==5){ // next
				$('.caroussel.mobile .caroussel-img.bronze ul').append($('.caroussel.mobile .caroussel-img.bronze ul li:first'))
				$('.caroussel.mobile .caroussel-content.bronze').prepend($('.caroussel.mobile .caroussel-content.bronze li:last'))
				
			}
			
			if($(this).index()==3){ // prev
				$('.caroussel.mobile .caroussel-img.bronze ul').prepend($('.caroussel.mobile .caroussel-img.bronze ul li:last'))
				$('.caroussel.mobile .caroussel-content.bronze').append($('.caroussel.mobile .caroussel-content.bronze li:first'))
			}

		});
		
		var sideNavHeightBottom = $(".content-wrapper .side-nav:not(:first-of-type)").height();
		$(".content-wrapper").css("padding-bottom", sideNavHeightBottom + 50)
	}else{
/*
		
	var sideNavHeight = $(".content-wrapper .side-nav:first-of-type ul").height();
	$(".content-wrapper .side-nav:not(:first-of-type) ").css("top", sideNavHeight)
*/
	

	// GOLD
	
	$(".caroussel:not(.mobile) .caroussel-img.gold .caroussel-controls .after").click(function() {
		$('.caroussel:not(.mobile) .caroussel-img.gold ul').prepend($('.caroussel .caroussel-img.gold ul li:last'))
		$('.caroussel:not(.mobile) .caroussel-content.gold').append($('.caroussel .caroussel-content.gold li:first'))
	});
	
	$(".caroussel:not(.mobile) .caroussel-img.gold ul li").click(function() {
		id = $(this).attr("id");
		liIndex = $(this).index() + 1;
		liLength = $(".caroussel-img ul li").length;
		for(i = liIndex; i < liLength; i++){
			$('.caroussel:not(.mobile) .caroussel-img.gold ul').prepend($('.caroussel .caroussel-img.gold ul li:last'))
			$('.caroussel:not(.mobile) .caroussel-content.gold').append($('.caroussel .caroussel-content.gold li:first'))
		}
		
	});
	
	
	
	
	// SILVER
	
	$(".caroussel .caroussel-img.silver .caroussel-controls .after").click(function() {
		$('.caroussel:not(.mobile) .caroussel-img.silver ul').prepend($('.caroussel .caroussel-img.silver ul li:last'))
		$('.caroussel:not(.mobile) .caroussel-content.silver').append($('.caroussel .caroussel-content.silver li:first'))
	});
	
	$(".caroussel .caroussel-img.silver ul li").click(function() {
		id = $(this).attr("id");
		liIndex = $(this).index() + 1;
		liLength = $(".caroussel-img ul li").length;
		for(i = liIndex; i < liLength; i++){
			$('.caroussel .caroussel-img.silver ul').prepend($('.caroussel .caroussel-img.silver ul li:last'))
			$('.caroussel .caroussel-content.silver').append($('.caroussel .caroussel-content.silver li:first'))
		}
	});
	
	// BRONZE
	
	$(".caroussel .caroussel-img.bronze .caroussel-controls .after").click(function() {
		$('.caroussel .caroussel-img.bronze ul').prepend($('.caroussel .caroussel-img.bronze ul li:last'))
		$('.caroussel .caroussel-content.bronze').append($('.caroussel .caroussel-content.bronze li:first'))
	});
	
	$(".caroussel .caroussel-img.bronze ul li").click(function() {
		id = $(this).attr("id");
		liIndex = $(this).index() + 1;
		liLength = $(".caroussel-img ul li").length;
		for(i = liIndex; i < liLength; i++){
			$('.caroussel-img.bronze ul').prepend($('.caroussel-img.bronze ul li:last'))
			$('.caroussel-content.bronze').append($('.caroussel-content.bronze li:first'))
		}
	});

}


$(".caroussel .caroussel-filter li").click(function() {
		$(".caroussel-filter li").removeClass("active");
		$(this).addClass("active");
		id = $(this).attr("data-class");
		
		$(".caroussel .caroussel-img").removeClass("active");
		$(".caroussel .caroussel-img." + id).addClass("active")
		
		$(".caroussel .caroussel-content").removeClass("active");
		$(".caroussel .caroussel-content." + id).addClass("active")
	});	
	

});

jQuery(document).ready(function (e) {
    function t(t) {
        e(t).bind("click", function (t) {
            t.preventDefault();
            e(this).parent().fadeOut()
        })
    }
    e(".dropdown-toggle").click(function () {
        var t = e(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
        e(".button-dropdown .dropdown-menu").hide();
        e(".button-dropdown .dropdown-toggle").removeClass("active");
        if (t) {
            e(this).parents(".button-dropdown").children(".dropdown-menu").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active")
        }
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
        if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-menu").hide();
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
        if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-toggle").removeClass("active");
    })
});


$(".side-btn").click(function() {
	
	var id= $(this).attr("id");
	//window.location.hash=id; 
	
	if(id == "1"){
		id = "2";
	}
	if($("body").attr("id") == "bronze"){
		if(id == "7"){
			id = "8";
		}
	}
	if($("body").attr("id") == "prata"){
		if(id == "7"){
			id = "8";
		}
	}
	
	$(".side-btn").removeClass("active");
	$("#"+id).addClass("active");
	$(this).addClass("active");
	$(".content-info").removeClass("active");
	$(".content-info[data-info='topic_" + id + "']").addClass("active")
	

});

$(".dual-ul .side-btn").click(function() {
	$(".side-nav > ul > li").removeClass("active");
	$(this).parent().parent().prev().addClass("active")
	
});


$(window).scroll(function(){
	var tempScrollTop = $(window).scrollTop();
	headerHeight = $(".header-image").height();
// 	console.log(headerHeight)

	
	
// 	NAV BRANCA
	if(tempScrollTop >= headerHeight){
		$(".nav-wrapper").addClass("fixed")
// 		$("#content-web").css("padding-top", "65px");
	}else{
		$(".nav-wrapper").removeClass("fixed")
	}
	
	
	
// 	HEADER PRETO

if($("body").is("#home")){
	if ($(window).scrollTop() > headerHeight){
	    $(".head-seal").addClass("fixed")
	}
	else {
	    $(".head-seal").removeClass("fixed")
	}
	
	
	
	
}else{
	if ($(window).scrollTop() > 100){
	    $(".head-seal").addClass("fixed")
	}
	else {
	    $(".head-seal").removeClass("fixed")
	}
}

/*
if(!$(".head-seal").hasClass("fixed")){
	if(tempScrollTop > 0){
		console.log("Scroll from Top: " + tempScrollTop.toString());
		
		$(".head-seal").addClass("fixed")
// 		$(".header-image .grid h2").css("bottom", "0").css("margin-bottom", "7px");
		
	}else{
		$(".head-seal").removeClass("fixed")
// 		$(".header-image .grid h2").removeAttr("style");
	}
}else{
	if(tempScrollTop < 50){
		$(".head-seal").removeClass("fixed")
	}
}
*/
	

	
});
if (window.DeviceOrientationEvent) {
    window.addEventListener('orientationchange', function() { location.reload(); }, false);
}





	


