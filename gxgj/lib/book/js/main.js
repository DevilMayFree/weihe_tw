//判断手机类型
window.onload = function () {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
        //屏蔽ios下上下弹性
        $(window).on('scroll.elasticity', function (e) {
            e.preventDefault();
        }).on('touchmove.elasticity', function (e) {
            e.preventDefault();
        });
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
    }
    //预加载
    loading();
}

var date_start;
var date_end;
date_start = getNowFormatDate();

const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');


let page_ = null
let total_ = null
//加载页面
function loading() {
    var numbers = 0;
    var length = loading_img_url.length;

    for (var i = 0; i < length; i++) {
        var img = new Image();
        img.src = loading_img_url[i];
        img.onerror = function () {
            numbers += (1 / length) * 100;
        }
        img.onload = function () {
            numbers += (1 / length) * 100;
            $('.number').html(parseInt(numbers) + "%");
            // console.log(numbers);
            if (Math.round(numbers) == 100) {
                //$('.number').hide();
                date_end = getNowFormatDate();
                var loading_time = date_end - date_start;
                //预加载图片
                $(function progressbar() {
                    //拼接图片
                    $('.shade').hide();
                    var tagHtml = "";
                    for (var i = 0; i < length; i++) {
                        if (i == 0) {
                            // style="background:url(' + loading_img_url[i] + ') no-repeat;background-size:100% 100%;"
                            tagHtml += ' <div id="first" ><img src="' + loading_img_url[i] + '" alt="" style="width:100%;height:100%;"/></div>';
                        } else if (i == length - 1) {
                            tagHtml += ' <div id="end" ><img src="' + loading_img_url[i] + '" alt="" style="width:100%;height:100%;"/></div>';
                        } else {
                            tagHtml += ' <div ><img src="' + loading_img_url[i] + '" alt="" style="width:100%;height:100%;"/></div>';
                        }
                    }
                    $(".flipbook").append(tagHtml);
                    var w = $(".graph").width();
                    $(".flipbook-viewport").show();
                });
                // 配置turn.js
                // 宽高大概按A4纸比例缩放，可自行调节
                function loadApp() {
                    // 大屏幕双页
                    if ($(window).width() > 1024 && $(window).height() > 700) {
                        var w = $('.flipbook-viewport').parent().width();
                        var h = $(window).height();
                        if (w == 0) { w = ((2482 * 2) / 3368) * h; }
                        var w1 = ((2482 * 2) / 3368) * h;
                        var h1 = (3368 / (2482 * 2)) * w;
                        if (w1 > w) {
                            h = h1;
                        } else {
                            w = w1;
                        }
                        $('.flipbook-viewport').width(w).height(h);
                        $('.flipboox').width(w).height(h);
                        $(window).resize(function () {
                            var w = $('.flipbook-viewport').parent().width();
                            var h = $(window).height();
                            if (w == 0) { w = ((2482 * 2) / 3368) * h; }
                            var w1 = ((2482 * 2) / 3368) * h;
                            var h1 = (3368 / (2482 * 2)) * w;
                            if (w1 > w) {
                                h = h1;
                            } else {
                                w = w1;
                            }
                            $('.flipbook-viewport').width(w).height(h);
                            $('.flipboox').width(w).height(h);
                        });

                        $('.flipbook').turn({
                            // Width
                            width: w,
                            // Height
                            height: h,
                            // Elevation
                            elevation: 50,
                            display: 'double',
                            // Enable gradients
                            gradients: true,
                            // Auto center this flipbook
                            autoCenter: true,
                            duration: 800,
                            when: {
                                turning: function (e, page, view) {
                                    document.querySelector('audio').play()
                                    page_ = page
                                    var total = $(".flipbook").turn("pages");//总页数
                                    total_ = total
                                    progressBar.style.width = `${(page / total) * 100}%`;
                                    if (page % 2 == 0) {
                                        $('.pagenumber').text(page + '-' + (page + 1) + '/' + loading_img_url.length);
                                    } else {
                                        $('.pagenumber').text((page - 1) + '-' + page + '/' + loading_img_url.length);
                                    }
                                    if (page == 1) {
                                        $(".btnImg").css("display", "none");
                                        $(".previousPage").css("display", "none");
                                        $(".mark").css("display", "block");
                                        $('.pagenumber').text(page + '/' + loading_img_url.length);
                                    } else {
                                        $(".previousPage").css("display", "block");
                                        $(".btnImg").css("display", "block");
                                        $(".mark").css("display", "none");
                                    }
                                    if (page == loading_img_url.length) {
                                        $(".nextPage").css("display", "none");
                                        $('.pagenumber').text(page + '/' + loading_img_url.length);
                                    } else {
                                        $(".nextPage").css("display", "block");
                                    }
                                },
                                turned: function (e, page, view) {

                                    page_ = page
                                    var total = $(".flipbook").turn("pages");//总页数
                                    total_ = total
                                    if (page == 1) {
                                        $(".return").css("display", "none");
                                        $(".btnImg").css("display", "none");
                                        $('.pagenumber').text(page + '/' + loading_img_url.length);
                                    } else {
                                        $(".return").css("display", "block");
                                        $(".btnImg").css("display", "block");
                                    }
                                    if (page == 2) {
                                        $(".catalog").css("display", "block");
                                    } else {
                                        $(".catalog").css("display", "none");
                                    }
                                }
                            }
                        });
                    } else { // 小屏幕单页
                        var w = $('.flipbook-viewport').parent().width();
                        var h = $(window).height();
                        if (w == 0) { w = (2482 / 3368) * h; }
                        var w1 = (2482 / 3368) * h;
                        var h1 = (3368 / 2482) * w;
                        if (w1 > w) {
                            h = h1;
                        } else {
                            w = w1;
                        }
                        $('.flipbook-viewport').width(w).height(h);
                        $('.flipboox').width(w).height(h);
                        $(window).resize(function () {
                            var w = $('.flipbook-viewport').parent().width();
                            var h = $(window).height();
                            if (w == 0) { w = (2482 / 3368) * h; }
                            var w1 = (2482 / 3368) * h;
                            var h1 = (3368 / 2482) * w;
                            if (w1 > w) {
                                h = h1;
                            } else {
                                w = w1;
                            }
                            $('.flipbook-viewport').width(w).height(h);
                            $('.flipboox').width(w).height(h);
                        });
                        $('.flipbook').turn({
                            // Width
                            width: w,
                            // Height
                            height: h,
                            // Elevation
                            elevation: 50,
                            display: 'single',
                            // Enable gradients
                            gradients: true,
                            // Auto center this flipbook
                            autoCenter: true,
                            when: {
                                turning: function (e, page, view) {
                                    document.querySelector('audio').play()
                                    page_ = page
                                    var total = $(".flipbook").turn("pages");//总页数
                                    total_ = total
                                    progressBar.style.width = `${(page / total) * 100}%`;
                                    if (page == 1) {
                                        $(".previousPage").css("display", "none");
                                    } else {
                                        $(".previousPage").css("display", "block");
                                    }
                                    if (page == loading_img_url.length) {
                                        $(".nextPage").css("display", "none");
                                    } else {
                                        $(".nextPage").css("display", "block");
                                    }
                                    $('.pagenumber').text(page + '/' + loading_img_url.length);
                                },
                                turned: function (e, page, view) {
                                    page_ = page
                                    var total = $(".flipbook").turn("pages");//总页数
                                    total_ = total
                                    if (page == 1) {
                                        $(".return").css("display", "none");
                                        $(".btnImg").css("display", "none");
                                        $('.pagenumber').text(page + '/' + loading_img_url.length);
                                    } else {
                                        $(".return").css("display", "block");
                                        $(".btnImg").css("display", "block");
                                    }
                                    if (page == 2) {
                                        $(".catalog").css("display", "block");
                                    } else {
                                        $(".catalog").css("display", "none");
                                    }
                                }
                            }
                        });
                    }
                }
                yepnope({
                    test: Modernizr.csstransforms,
                    yep: ['/gxgj/lib/book/js/turn.js'],
                    complete: loadApp
                });
            }
            ;
        }
    }
}

// 自动播放
var play = true
var timer = null; // 将 timer 变量定义在外部作用域  
$('.play').on('click', function () {
    if (page_ === total_) return
    if (play) {
        $('.play img').attr('src', '/gxgj/lib/book/image/stop.png')
        // 检查 timer 是否已存在（即是否已设置了定时器）  
        if (timer === null) {
            timer = setInterval(function () {
                if (page_ === total_) {
                    clearInterval(timer);
                    timer = null; // 将 timer 重置为 null，表示当前没有活动的定时器  
                    $('.play img').attr('src', '/gxgj/lib/book/image/play.png')
                    play = true;
                } else {
                    $('.nextPage').trigger('click');
                }

            }, 3000);
        }
        play = false;
    } else {
        // 清除定时器  
        clearInterval(timer);
        timer = null; // 将 timer 重置为 null，表示当前没有活动的定时器  
        $('.play img').attr('src', '/gxgj/lib/book/image/play.png')
        play = true;
    }
});



// $(".flipbook").bind("first", function (event) {
//     alert("page1")
// })

// $(".flipbook").bind("last", function (event) {
//     alert("page_last")
// })

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "";
    var seperator2 = "";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + "" + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}


// 到尾页/首頁
$('.start').on('click', function () {
    $('.flipbook').turn("page", 1)

})
$('.end').on('click', function () {
    $('.flipbook').turn("page", total_)

})
$(document).ready(function () {
    let flag = true
    window.addEventListener('wheel', function (event) {
        // event.deltaY 是鼠标滚轮滚动的距离，正值表示向下滚动，负值表示向上滚动  
        if (event.deltaY > 0) {
            if (flag) {
                flag = false
                setTimeout(() => {
                    $('.nextPage').trigger('click');
                    flag = true
                }, 150)
            }
        } else {
            if (flag) {
                flag = false
                setTimeout(() => {
                    $('.previousPage').trigger('click');
                    flag = true
                }, 150)
            }
        }
        // 阻止默认行为，防止页面滚动  
        event.preventDefault();
    });

});

progressContainer.addEventListener('click', (e) => {
    const x = e.offsetX; // 获取点击处相对于容器的x坐标
    const progressWidth = progressContainer.offsetWidth; // 获取进度条容器的宽度
    const newWidth = x / progressWidth * 100; // 计算新的宽度百分比
    progressBar.style.width = `${newWidth}%`; // 更新进度条宽度

    let page = Math.round(total_ * Math.round(newWidth) * 0.01)
    if (page < 1) {
        console.log(page);
        page = 1

    }
    $('.flipbook').turn("page", page)
});
