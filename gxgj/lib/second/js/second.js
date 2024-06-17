$(function() {
	new WOW().init();
	
	$(".gywm-contain ul li").click(function () {
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active")
        $(".ldzc-inner>div").eq(index).addClass("active").siblings().removeClass("active")
    })


$("#header .ri li a").each(function(){
        $this = $(this);
    if($this[0].href == String(window.location)){
    $(this).addClass("indexOn on");
  }
})

$(".Pnav-menu ul li a").each(function(){
        $this = $(this);
    if($this[0].href == String(window.location)){
    $(this).parent().addClass("active");
  }
})

$(".qyjs-content ul li").hover(function(){
  $(this).addClass("active").siblings().removeClass("active");
})

var swiper = new Swiper('.swiper-container-ppkh', {
    	speed: 700,
       loop:true,
    	slidesPerView: 'auto',
    	centeredSlides: true,
		allowTouchMove: false,
    	on: {
    		init: function() {
    			this.slides.removeClass('init');
    		},
    	},
       pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    	navigation: {
    		nextEl: '.swiper-ppkh-next',
    		prevEl: '.swiper-ppkh-prev',
    	},

    });
//投资项目

 $(".tzxmtop-content ul li").mouseover(function(e){
//e.stopPropagation();
  $(this).addClass("active").siblings().removeClass("active");

})
 $(".tzxmtop-content ul li").mouseout(function(){
  $(this).removeClass("active");
})

// $(document).click(function(){
 // $(".tzxmtop-content ul li").removeClass("active");
//})

})


$(function() {
			//    导航判断
			$(".mobile-menu-pop .nav a").each(function() {
				//var urlstr = location.href;
				var urlstr = window.location.pathname;
				var thisHref = $(this).attr('href');
				// var nav_name = thisHref.replace(/(.*\/)*([^.]+).*/ig, "$2").replace(/\d+/g, '');
				var nav_name = $(this).attr('href');

				if (urlstr.indexOf("news") >= 0) {
					urlstr = "/news_13.html"
				}

				if (('/' + nav_name).indexOf(urlstr) >= 0 && $(this).attr('href') != '') {

					$(this).addClass('active');
					$(this).parents("dl").addClass('open').find("dd").show()
					return false;
				}
			});

			var mobileHeader = $("#mobileHeader")
			var meunBtn = $(".meun-btn")

			meunBtn.click(function() {
				if (mobileHeader.hasClass("open")) {
					mobileHeader.removeClass("open")
					// headMenu.stop().fadeOut()
				} else {
					mobileHeader.addClass("open")
					// headMenu.stop().fadeIn()
				}
			})


			var navDl = $(".mobile-menu-pop .nav dl")
			var navDt = $(".mobile-menu-pop .nav dt")
			var navDd = $(".mobile-menu-pop .nav dd")

			 $(document).off("click",".mobile-menu-pop .nav dt").on("click",".mobile-menu-pop .nav dt",function(){
				var thisDl = $(this).parents("dl")
				if ($(this).parents("dl").hasClass("open")) {
					thisDl.removeClass("open")
					$(this).next("dd").stop().slideUp()
				} else {
					navDl.removeClass("open")
					thisDl.addClass("open")
					navDd.stop().slideUp()
					$(this).next("dd").stop().slideDown()
				}
			})

			//  头部固定
			headeFixed();
			$(window).scroll(function() {
				headeFixed()
			});

			function headeFixed() {
				var t = $(window).scrollTop();
				if (t < 10) {
					$("#mobileHeader").removeClass("nFixed");
				} else {
					$("#mobileHeader").addClass("nFixed");
				}
			}
		})
$(".xxct-item-pic a").attr("href","javascript:void(0);")