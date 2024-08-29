$(function() {
	var inW = $(window).innerWidth()
	// 首頁pc 滚动逻辑
	function pcIndexFun() {
		var poxTime = 1000;
		var poxOut = false;
		var poxPrev = null
		var poxActive = 0
		var poxSlide = $("#pox-slide .pox")
		var poxOwu = $("#pox-slide .pox-owu")
		var poxBor = $("#pox-slide .pox-bor")
		var poxSharesPos = $(".pox-shares-pos")
		poxSlide.removeClass('pox-active-up pox-active-down pox-out')
		poxSlide.eq(1).addClass("pox-out")
		poxSlide.eq(0).addClass("pox-start")

		function poxAnimtion(delta) {
			if (poxOut) {
				return
			}
			if (delta === -1) {
				if (poxActive >= poxSlide.length - 1) {
					return
				}
				poxPrev = poxActive
				poxActive++
				poxBor.removeClass("pox-active-up pox-active-down").addClass("pox-active-down")
				poxSlide.removeClass('pox-active-up pox-active-down').addClass("pox-active-up")
				poxSlide.removeClass('pox-active-up pox-active-down pox-out pox-start')
				poxSlide.eq(poxPrev).addClass("pox-out")
				poxSlide.eq(poxActive).addClass("pox-active-down")
				poxOut = true
				setTimeout(function() {
					poxOut = false
					poxBor.removeClass("pox-active-up pox-active-down")
				}, poxTime)
				poxTransitionStart(poxActive)
			} else if (delta === 1) {
				if (poxActive <= 0) {
					return
				}
				poxPrev = poxActive
				poxActive--
				poxBor.removeClass("pox-active-up pox-active-down").addClass("pox-active-up")
				poxSlide.removeClass('pox-active-up pox-active-down').addClass("pox-active-up")
				poxSlide.removeClass('pox-active-up pox-active-down pox-out pox-start')
				poxSlide.eq(poxPrev).addClass("pox-out")
				poxSlide.eq(poxActive).addClass("pox-active-up")
				poxOut = true
				setTimeout(function() {
					poxOut = false
					poxBor.removeClass("pox-active-up pox-active-down")
				}, poxTime)
				poxTransitionStart(poxActive)
			}
		}
		$('#pox-slide').mousewheel(function(event, delta) {
			poxAnimtion(delta)
		});

		document.addEventListener('keydown', function(e) {
			var keyCode = e.keyCode
			if (keyCode === 38) {
				poxAnimtion(1)
			} else if (keyCode === 40) {
				poxAnimtion(-1)
			}
		})


		var newsSlideBtnKi = true
		var newsSlideNext = $(".news-slide .next")
		var newsSlidePrev = $(".news-slide .prev")
		newsSlideNext.show()
		newsSlidePrev.hide()
		var newsSlide = new Swiper('.news-slide', {
			slidesPerView: "auto",
			spaceBetween: 50,
			speed: 600,
			navigation: {
				nextEl: ".news-slide-next",
				prevEl: ".news-slide-prev"
			},
			on: {
				toEdge: function() {
					if (newsSlideBtnKi) {
						newsSlideNext.stop().hide()
						newsSlidePrev.stop().show()
						newsSlideBtnKi = false
					} else {
						newsSlideNext.stop().show()
						newsSlidePrev.stop().hide()
						newsSlideBtnKi = true

					}
				}
			},
		})

		// 切换开始
		$("#pox-slide").addClass("pox-ki1")

		function poxTransitionStart(i) {
			$("#pox-slide").removeClass("pox-ki1 pox-ki2 pox-ki3 pox-ki4 ").addClass("pox-ki" + (i + 1))

			if (i >= $("#pox-slide .pox").length - 1) {
				$("#indexHeader .menu-ri .icon").stop().fadeOut()
			} else {
				$("#indexHeader .menu-ri .icon").stop().fadeIn()
			}

			if (i === 0) {
				poxSharesPos.removeClass('ash');
				if ($("#indexSlide").hasClass("idx1")) {
					$("#indexHeader").addClass("type2")
				}
			} else {
				poxSharesPos.addClass('ash');
				$("#indexHeader").removeClass("type2")
			}

			if (i === 2) {
				$(".pox-shares-pos").stop().fadeOut()
			} else {
				$(".pox-shares-pos").stop().fadeIn()
			}
			if (i === 6) {
				$("#pox-slide .pox-6").css({
					"top": "-240px",
					"transition": "all 0.6s",
					"-webkit-transition": "all 0.6s"
				})
			} else {
				$("#pox-slide .pox-6").css({
					"top": "0",
					"transition": "all 0.6s",
					"-webkit-transition": "all 0.6s"
				})
			}
		}

		// touch.on('#pox-slide', 'swipeup', function(ev) {
		// 	poxAnimtion(-1)
		// })

		// touch.on('#pox-slide', 'swipedown', function(ev) {
		// 	poxAnimtion(1)
		// })

	}
	// 首頁移动端 滚动逻辑
	function mobileIndexFun() {

		$(".swiper-no-swiping").removeClass("swiper-no-swiping")

		var poxSharesPos = $(".pox-shares-pos")

		var swiper = new Swiper("#pox-slide", {
			direction: "vertical",
			// pagination: {
			//     el: ".swiper-pagination",
			//     clickable: true,
			// },
			on: {
				slideChangeTransitionStart: function() {
					var i = this.realIndex
					if (i === 0) {
						poxSharesPos.removeClass('ash');
					} else {
						poxSharesPos.addClass('ash');
					}

					if (i >= 3) {
						$(".mobileMouseIcon").fadeOut();
					} else {
						$(".mobileMouseIcon").fadeIn();
					}
				},
			},
		});
	}
	var newsSlideBtnKi = true
	var newsSlideNext = $(".news-slide .next")
	var newsSlidePrev = $(".news-slide .prev")
	newsSlideNext.show()
	newsSlidePrev.hide()
	var newsSlide = new Swiper('.news-slide', {
		slidesPerView: "auto",
		spaceBetween: 20,
		speed: 600,
		navigation: {
			nextEl: ".news-slide-next",
			prevEl: ".news-slide-prev"
		}
	})
	if (inW >= 1100) {
		pcIndexFun()
	} else {
		mobileIndexFun()
	}
})
$(function() {
	var interleaveOffset = 0.5; //视差比值
	var swiperOptions = {
		loop: true,
		speed: 1000,
               paginationClickable: true,
               observer: true,
                  observeParents: true,
                autoplay: {
			delay: 5E3,
			stopOnLastSlide: !1,
			disableOnInteraction: !1
		},
 effect: 'fade',
                noSwiping: true,
		grabCursor: true,
		watchSlidesProgress: true,
		mousewheelControl: true,
		keyboardControl: true,
		navigation: {
			nextEl: ".index-slide .next",
			prevEl: ".index-slide .prev"
		},
              

		pagination: {
			el: '.index-slide .swiper-pagination',
		},
		on: {
   init: function () {
                var docW = $(window).width();
                var svideo = document.getElementById("v-list");
                var videoSrc = '/gxgj/lib/home/images/banner-video3.mp4'
                if (docW >= 1200) {
                    if (this.realIndex != 1) {
						if(svideo){
                            svideo.pause();
						}
                        $('.banner-video').attr('src', '')
                    } else {
                        $('.banner-video').attr('src', videoSrc)
                        svideo.play();

                    }
                }
            },
            slideChangeTransitionEnd: function () {
                var docW = $(window).width();
                var svideo = document.getElementById("v-list");
                var videoSrc = '/gxgj/lib/home/images/banner-video3.mp4'
                if (docW >= 1200) {
                    if (this.realIndex != 1) {
						if(svideo){
							svideo.pause();
						}
                        $('.banner-video').attr('src', '')
                    } else {
                        $('.banner-video').attr('src', videoSrc)
                        svideo.play();
                    }
                }
            },
			progress: function() {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					var slideProgress = swiper.slides[i].progress;
					var innerOffset = swiper.width * interleaveOffset;
					var innerTranslate = slideProgress * innerOffset;
					swiper.slides[i].querySelector(".slide-inner").style.transform =
						"translate3d(" + innerTranslate + "px, 0, 0)";
				}
			},
			touchStart: function() {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = "";
				}
			},
			setTransition: function(speed) {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = speed + "ms";
					swiper.slides[i].querySelector(".slide-inner").style.transition =
						speed + "ms";
				}


			},
			slideChangeTransitionStart: function() {
				$("#indexSlide").removeClass("idx1 idx2 idx3 idx4").addClass("idx" + (this.realIndex + 1))
				if ($("#indexHeader").has(".pox-ki1") && this.realIndex == 0) {
					$("#indexHeader").addClass("type2")
				} else {
					$("#indexHeader").removeClass("type2")
				}
			},
                   
		}
	};

	var indexSlide = new Swiper("#indexSlide", swiperOptions);
	// ========


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
                       $(document).off("click",".meun-btn").on("click",".meun-btn",function(){
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