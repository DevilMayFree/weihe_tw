$(function() {
	new WOW().init();
	
	$(".newstleul li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".newsqhtb").hide().eq(index).show();
	});
	$(".newsqhtb").addClass("wow fadeInUp animated");
	
	var esgSwiper = new Swiper(".esgSwiper", {
		loop: true,
	  effect : 'fade',
		grabCursor: true,
		parallax: true,
		pagination: {
			el: ".esgtions",
			clickable :true,
		},
	});
	
})
