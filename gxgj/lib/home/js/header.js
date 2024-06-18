$(window).ready(function() {
var langType = localStorage.getItem("langType")? localStorage.getItem("langType"):"langfan"
if(langType == 'langjian'){
document.body.innerHTML=t2s(document.body.innerHTML);
 $("#header .logo,#header_nei .logo,#header_nei.on .logo").css({"background":"url(/gxgj/lib/home/images/logo-jt.png) no-repeat center","background-size":"100%"})
 $(".flogo img,#mobileHeader .logo img").attr("src","/gxgj/lib/home/images/logo-jt.png")
}else {
document.body.innerHTML=s2t(document.body.innerHTML);
 $("#header .logo,#header_nei .logo,#header_nei.on .logo").css({"background":"url(/gxgj/lib/home/images/logo-jt.png) no-repeat center","background-size":"100%"})
$(".flogo img,#mobileHeader .logo img").attr("src","/gxgj/lib/home/images/logo-jt.png");

}
$(document).off("click",".languageBtn").on("click",".languageBtn",function(){
    var type = $(this).attr("type")
    if(type == 'langjian'){
       // console.log("简体字")
       document.body.innerHTML=t2s(document.body.innerHTML);
      $("#header .logo,#header_nei .logo,#header_nei.on .logo").css({"background":"url(/gxgj/lib/home/images/logo-jt.png) no-repeat center","background-size":"100%"})
    $(".flogo img,#mobileHeader .logo img").attr("src","/gxgj/lib/home/images/logo-jt.png")
    }else {
        //console.log("繁体字")
       document.body.innerHTML=s2t(document.body.innerHTML);
      $("#header .logo,#header_nei .logo,#header_nei.on .logo").css({"background":"url(/gxgj/lib/home/images/logo-ft.png) no-repeat center","background-size":"100%"});
     $(".flogo img,#mobileHeader .logo img").attr("src","/gxgj/lib/home/images/logo-ft.png")
    }
    window.localStorage.setItem("langType",type)
})


	$('#header.periodical .ri li> a').removeClass('on')
	$(".nav li").hover(function() {
		$(".nav .nav_er").stop().hide();
		$(this).find(".nav_er").stop().show();
		$(this).find(".div_dl").find('a').addClass('on wow translate1 animated');
	}, function() {
		$(this).find(".div_dl").find('a').removeClass('on wow translate1 animated');

	});

	$("#header .ri>ul").hover(function() {}, function() {
		$("#header .ri>ul li .nav_er").stop().hide();
		// $("#header .ri>ul li.on .nav_er").stop().show();
	});


	//导航判断
	$("#header .nav a").each(function() {
		var urlstr = location.href;
		var thisHref = $(this).attr('href');
		var nav_name = thisHref.replace(/(.*\/)*([^.]+).*/ig, "$2").replace(/\d+/g, '');
		if ((urlstr + '/').indexOf(nav_name) > -1 && $(this).attr('href') != '') {
			$(this).addClass('on');
			$('.nav a.indexOn').removeClass('on');
			$(this).parent('li').addClass('on');
			return false;
		}
	});
	$('#header .ri').hover(function() {
		$('#header .ri li >a.on').addClass('removeBefore')
	}, function() {
		$('#header .ri li >a.on').removeClass('removeBefore')
	})


	$('#header').hover(function() {
		$('#header').addClass('hover')
	}, function() {
		$('#header').removeClass('hover')
	})
         $(document).off("click",".goTop").on("click",".goTop",function(){
		$("body,html").animate({
			scrollTop: 0
		})
	})

	// 导航
        $(document).off("click",".fastmap").on("click",".fastmap",function(){
		$(".header-pop-s1").addClass("open-header-pop");
	});
       $(document).off("click",".header-pop-s1 .close").on("click",".header-pop-s1 .close",function(){
		$(".header-pop-s1").removeClass("open-header-pop");
	});

	$('.search-popup .searchform > div .input').on('focusin', function() {
		$(this).parents('.searchform').addClass('focus');
	}).on('focusout', function() {
		if (!$(this).val()) {
			$(this).parents('.searchform').removeClass('focus').addClass('focusout').delay(450).queue(function(next) {
				$(this).removeClass('focusout');
				next();
			});
		}
	});
	// 搜索
      $(document).off("click",".search").on("click",".search",function(){
		$('body').toggleClass('skrollr');
		$(".act").addClass('active');
		$(this).addClass("on")
		// $('.search-popup').toggleClass('active');
		$('.search-popup').slideDown();
		$('.subscribe-popup').removeClass('active');
	})
       $(document).off("click","#header .head_ri .act").on("click","#header .head_ri .act",function(){
		$(this).removeClass('active');
		$('.search-popup').slideUp();
		$("#header .head_ri .search").removeClass("on")
	})
	$('.search-popup .searchform > div .input').on('focusin', function() {
		$(this).parents('.searchform').addClass('focus');
	}).on('focusout', function() {
		if (!$(this).val()) {
			$(this).parents('.searchform').removeClass('focus').addClass('focusout').delay(450).queue(function(next) {
				$(this).removeClass('focusout');
				next();
			});
		}
	});
$(document).off("click",".flsmclick").on("click",".flsmclick",function(){
     $(".fzlm-contain").addClass("fzlm-contain-show");
   console.log("1111")
})
$(document).off("click",".fzlm-close").on("click",".fzlm-close",function(){
     $(".fzlm-contain").removeClass("fzlm-contain-show");
})



});
