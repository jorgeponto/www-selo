$(document).ready(function() {
	


	if(window.location.hash) {
	  $('a[href$="'+window.location.hash+'"]').click();
	}else{
	}
	
	
	
	if($(window).width() <= 950){

		if($(".blackout-overlay").length > 0){
	}else{
			$("header").prepend("<div class='blackout-overlay'></div>")
		}





		if($("#mob").length > 0){

		}else{
			$(".header-image").append("<button  id='mob'><img alt='Abrir o menu principal' class='burguer' src='img/burguer.svg' /><img alt='Fechar o menu principal' class='close' src='img/close.svg' /></button>");
		}

		$(".mobile-part li").click(function() {
			$("header .nav-wrapper .grid li").removeClass("active");
			$(this).addClass("active");
		});
	}else{
		$(".mobile-part").attr("hidden");
		$("#mob").remove();
	}


	$("#mob").click(function() {
		$(".search-container").toggleClass("showing");
		$(".blackout-overlay").toggleClass("menu-open")
		$("body").toggleClass("no-scroll");
		$(".nav-wrapper").toggleClass("mobile-show");
		$(this).toggleClass("open");
	}); 	
	$(".blackout-overlay").click(function() {
		$("#mob").click();
		
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
		e(".button-dropdown .dropdown-toggle").removeClass("active").attr("aria-expanded", false);
        if (t) {
			e(this).parents(".button-dropdown").children(".dropdown-menu").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active").attr("aria-expanded", true);

		}
	});
	
    e(document).bind("click", function (t) {
        var n = e(t.target);
		if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-menu").hide();
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
		if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-toggle").removeClass("active").attr("aria-expanded", false); 
    })
});






$(".side-btn:not('.side-link')").click(function() {

	var id = parseInt($(this).attr("id"));

	$(".side-btn").removeClass("active");
	$(".side-btn#"+id).addClass("active");

});

$(".dual-ul .side-btn").click(function() {
	$(".side-nav > ul > li").removeClass("active");
	$(this).parent().parent().prev().addClass("active")
	
});


$(window).scroll(function(){
	var tempScrollTop = $(window).scrollTop();
	headerHeight = $(".header-image").height() - 100;

	if(tempScrollTop >= headerHeight){
		$(".nav-wrapper").addClass("fixed")
		$("body").addClass("fixed-nav")

	}else{
			$(".nav-wrapper").removeClass("fixed")
			$("body").removeClass("fixed-nav")
		}

	if($("body").is("#home")){
		if ($(window).scrollTop() > headerHeight){
			$(".head-seal").addClass("fixed")
			$(".header-image").addClass("scrolling")
		}else {
			$(".head-seal").removeClass("fixed")
			$(".header-image").removeClass("scrolling")

		}
	}else{
			if ($(window).scrollTop() > 100){
					$(".head-seal").addClass("fixed")
					$(".header-image").addClass("scrolling")
			}else {
					$(".head-seal").removeClass("fixed")
					$(".header-image").removeClass("scrolling")
				}
			}

	

});


$(document).ready(function() {
	$("button.cookies-btn.deny").click(function(){
		gaOptout();
	});
	
	$("button.cookies-btn.accept").click(function(){
		createCookie()
	});
});

if (document.cookie.indexOf('aac=true') > -1) {
	$(".cookies-message").hide();
	$('header').addClass('no-cookies-msg');
	
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-35831726-1', 'auto');
ga('send', 'pageview');
	
}else if(GetAAC()==false || GetAAC()=='false'){
	$(".cookies-message").hide();
	$('header').addClass('no-cookies-msg')
}else{
	$(".cookies-message").show();
}

function gaOptout() {
	$('.cookies-message').hide();
	$('header').addClass('no-cookies-msg')
	SetAAC(false)
  
}

function createCookie(){
	document.cookie = 'aac=true; expires=Fri, 1 Jan 2037 12:00:00 UTC; path=/';
	$('.cookies-message').hide();
	$('header').addClass('no-cookies-msg');
	
	
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-35831726-1', 'auto');
ga('send', 'pageview');
	
}


function SetAAC(id){
    var aac = id;
    sessionStorage.setItem('aac', aac);
}

function GetAAC(){

    var aac = sessionStorage.getItem('aac');
    return aac;
}








	


if($(window).width() <= 950){
	$(".content-wrapper").append($(".last-nav"))
	$(".content-wrapper").css("padding-bottom", $(".last-nav").height() + 50)
}else{
	
	if($(".content-wrapper > div:first-of-type .side-nav").length >=2){
	}else{
		$(".content-wrapper > div:first-of-type").append($(".content-wrapper .last-nav"))
		$(".content-wrapper").css("padding-bottom", 0)
	}
}



$( window ).resize(function() {
	if($(window).width() <= 950){
		$(".content-wrapper").append($(".last-nav"))
		$(".content-wrapper").css("padding-bottom", $(".last-nav").height() + 50)
	}else{
		
		if($(".content-wrapper > div:first-of-type .side-nav").length >=2){
		}else{
			$(".content-wrapper > div:first-of-type").append($(".content-wrapper .last-nav"))
			$(".content-wrapper").css("padding-bottom", 0)
		}
	}

	if($(window).width() <= 950){
		$(".mobile-part").removeAttr("hidden");

		if($("#mob").length > 0){}else{


			$(".header-image").append("<button  id='mob'><img alt='Abrir o menu principal' class='burguer' src='img/burguer.svg' /><img alt='Fechar o menu principal' class='close' src='img/close.svg' /></button>");
			$("#mob").click(function() {
				$(".search-container").toggleClass("showing");
				$(".blackout-overlay").toggleClass("menu-open")
				$("body").toggleClass("no-scroll");
				$(".nav-wrapper").toggleClass("mobile-show");
				$(this).toggleClass("open");
			}); 	
			$(".blackout-overlay").click(function() {
				$("#mob").click();
				
			});
		}
		
	}else{
		$(".mobile-part").attr("hidden", "true");
		
		}

	$(".mobile-part li").click(function() {
		$("header .nav-wrapper .grid li").removeClass("active");
		$(this).addClass("active");
	});

	if($(window).width() <= 950){
		if($(".blackout-overlay").length > 0){

		}else{
			$("header").prepend("<div class='blackout-overlay'></div>")
		}
		
		if($("#mob").length > 0){}else{
			$(".header-image").append("<button  id='mob'><img alt='Abrir o menu principal' class='burguer' src='img/burguer.svg' /><img alt='Fechar o menu principal' class='close' src='img/close.svg' /></button>");
			$("#mob").click(function() {
				$(".search-container").toggleClass("showing");
				$(".blackout-overlay").toggleClass("menu-open")
				$("body").toggleClass("no-scroll");
				$(".nav-wrapper").toggleClass("mobile-show");
				$(this).toggleClass("open");
			}); 	
			$(".blackout-overlay").click(function() {
				$("#mob").click();
				
			});
		}

		
		$(".mobile-part li").click(function() {
			$("header .nav-wrapper .grid li").removeClass("active");
			$(this).addClass("active");
		});

		
		
		

	}else{
		$(".mobile-part").attr("hidden");
		$("#mob").remove() ;
	}

});













