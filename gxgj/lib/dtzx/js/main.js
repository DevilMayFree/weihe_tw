var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
console.log(viewportWidth)
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 判断现在浏览器所处环境
if (isMobileDevice() && viewportWidth < 450) {
    var swiper2 = new Swiper(".mySwiper2", {
        loop: false,
        speed: 800,
        direction: 'vertical',
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        },
    });
    // console.log('当前处于手机设备');
} else {
    if (viewportWidth <= 800) {
        var swiper = new Swiper(".mySwiper", {
            loop: false,
            spaceBetween: 20,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
        });
    } else {
        var swiper = new Swiper(".mySwiper", {
            loop: false,
            spaceBetween: 20,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
        });
    }
    var swiper2 = new Swiper(".mySwiper2", {
        loop: false,
        speed: 900,
        spaceBetween: 20,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        },
    });


    // console.log('当前处于PC设备');
}
// 当前页
var currentSlide = 0
// 总页数
var totalSlides = swiper2.slides.length;
// 点击让页面全屏
$('.full_screen img').on('click', function () {
    if (toggleFullScreen()) {
        $('.full_screen img').attr("src", "/gxgj/lib/dtzx/image/reduce.png");
    } else {
        $('.full_screen img').attr("src", "/gxgj/lib/dtzx/image/full.png");
    }
})

// 全屏
function toggleFullScreen() {
    if (!document.fullscreenElement) {  // 如果当前没有元素处于全屏模式
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen(); // 请求全屏
        } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
            document.documentElement.msRequestFullscreen();
        }
        return true
    } else { // 如果已经有元素处于全屏模式
        if (document.exitFullscreen) {
            document.exitFullscreen(); // 退出全屏
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
        return false
    }
}

// 点击跳转到第一页
$('.start img').on('click', function () {
    if (swiper2.activeIndex == 0) return
    var sped = currentSlide > 10 ? 2000 : 1000
    swiper2.slideTo(0, sped, function () {
    })

})
// 点击跳转到尾页
$('.end img').on('click', function () {
    if (swiper2.activeIndex == totalSlides) return
    var sped = currentSlide > 20 ? 1000 : 2000
    swiper2.slideTo(totalSlides, sped, function () {
    })
})

let timer = null
var play = true
// 自动播放
$('.play img').on('click', function () {
    if (swiper2.activeIndex == totalSlides) return
    if (play) {
        $('.play img').attr("src", "/gxgj/lib/dtzx/image/pause.png");
        if (timer === null) {
            timer = setInterval(function () {
                if (swiper2.activeIndex == totalSlides) {
                    clearInterval(timer);
                    timer = null; // 将 timer 重置为 null，表示当前没有活动的定时器  
                    $('.play img').attr("src", "/gxgj/lib/dtzx/image/play.png");
                    play = true;
                } else {
                    swiper2.slideTo(swiper2.activeIndex + 1, 700, function () { })
                }

            }, 3000);
        }
        play = false;
    } else {
        // 清除定时器  
        clearInterval(timer);
        timer = null; // 将 timer 重置为 null，表示当前没有活动的定时器  
        $('.play img').attr("src", "/gxgj/lib/dtzx/image/play.png");
        play = true;
    }



})

let flag = true
// 打开缩略图
$('.thumbnail img').on('click', function () {
    if (flag) {
        $('.mySwiper').css({
            "transform": " translateY(0)"
        })
        $('.swiper_box ').css({
            "margin-top": "-20px",
            "transform": "scale(0.8)",
        })
        if (viewportWidth < 1300) {
            $(".operation").css({
                "margin": "-45px auto 0",
            })
        } else {
            $(".operation").css({
                "margin": "-60px auto 0",
            })
        }

    } else {
        $('.mySwiper').css({
            "transform": " translateY(100%)"
        })
        $('.swiper_box ').css({
            "margin-top": "40px",
            "transform": "scale(1)",
        })
        if (viewportWidth < 1300) {
            $(".operation").css({
                "margin": "18px auto 0",
            })
        } if (viewportWidth < 1080) {
            $(".operation").css({
                "margin": "4px auto 0",
            })
            $('.swiper_box ').css({
                "margin-top": "30px",
                "transform": "scale(1)",
            })
        } else {
            $(".operation").css({
                "margin": "30px auto 0",
            })
        }

    }
    flag = !flag
})


let flag2 = true
// 禁止页面滚动
window.addEventListener('mousewheel', function (event) {
    if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault();
    } else {
        if (event.deltaY > 0) {
            if (flag2) {
                flag2 = false
                setTimeout(() => {
                    $('.swiper-button-next').trigger('click');
                    flag2 = true
                }, 150)
            }
        } else {
            if (flag2) {
                flag2 = false
                setTimeout(() => {
                    $('.swiper-button-prev').trigger('click');
                    flag2 = true
                }, 150)
            }
        }
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('keydown', function (event) {
    if ((event.ctrlKey === true || event.metaKey === true)
        && (event.which === 61 || event.which === 107
            || event.which === 173 || event.which === 109
            || event.which === 187 || event.which === 189)) {
        event.preventDefault();
    }
}, false);
//firefox
window.addEventListener('DOMMouseScroll', function (event) {
    if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault();
    }
}, { passive: false });

if (viewportWidth > 2400) {
    $('.thumbnail img').trigger('click');
}