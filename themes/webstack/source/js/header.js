function search() {
    $(".search-icon").css("opacity", "1");
    var listIndex = -1;
    var hotList = 0;
    var searchData = {
        "thisSearch": "https://www.baidu.com/s?wd=",
        "thisSearchIcon": "url('/images/search_icon.png')",
        "hotStatus": true,
        "data": [{
            name: "百度",
            img: "url('/images/search_icon.png') -80px 0px",
            position: "0px 0px",
            url: "https://www.baidu.com/s?wd="
        }, {
            name: "谷歌",
            img: "url('/images/search_icon.png')  -105px 0px",
            position: "-40px 0px",
            url: "https://www.google.com/search?q="
        }, {
            name: "必应",
            img: "url('/images/search_icon.png')  -80px -25px",
            position: "0px -40px",
            url: "https://cn.bing.com/search?q="
        }, {
            name: "好搜",
            img: "url('/images/search_icon.png') -105px -25px",
            position: "-40px -40px",
            url: "https://www.so.com/s?q="
        }, {
            name: "搜狗",
            img: "url('/images/search_icon.png') -80px -50px",
            position: "0px -80px",
            url: "https://www.sogou.com/web?query="
        }, {
            name: "淘宝",
            img: "url('/images/search_icon.png') -105px -50px",
            position: "-40px -80px",
            url: "https://s.taobao.com/search?q="
        }, {
            name: "京东",
            img: "url('/images/search_icon.png') -80px -75px",
            position: "0px -120px",
            url: "http://search.jd.com/Search?keyword="
        }, {
            name: "天猫",
            img: "url('/images/search_icon.png') -105px -75px",
            position: "-40px -120px",
            url: "https://list.tmall.com/search_product.htm?q="
        }, {
            name: "1688",
            img: "url('/images/search_icon.png') -80px -100px",
            position: "0px -160px",
            url: "https://s.1688.com/selloffer/offer_search.htm?keywords="
        }, {
            name: "知乎",
            img: "url('/images/search_icon.png') -105px -100px",
            position: "-40px -160px",
            url: "https://www.zhihu.com/search?type=content&q="
        }, {
            name: "微博",
            img: "url('/images/search_icon.png') -80px -125px",
            position: "0px -200px",
            url: "https://s.weibo.com/weibo/"
        }, {
            name: "B站",
            img: "url('/images/search_icon.png') -105px -125px",
            position: "-40px -200px",
            url: "http://search.bilibili.com/all?keyword="
        }, {
            name: "豆瓣",
            img: "url('/images/search_icon.png') -80px -150px",
            position: "0px -240px",
            url: "https://www.douban.com/search?source=suggest&q="
        }, {
            name: "优酷",
            img: "url('/images/search_icon.png') -105px -150px",
            position: "-40px -240px",
            url: "https://so.youku.com/search_video/q_"
        }, {
            name: "GitHub",
            img: "url('/images/search_icon.png') -80px -175px",
            position: "0px -280px",
            url: "https://github.com/search?utf8=✓&q="
        }]
    };
    var localSearchData = localStorage.getItem("searchData");
    if (localSearchData) {
        searchData = JSON.parse(localSearchData)
    }
    function filterChildren(element) {
        var thisText = $(element).contents().filter(function (index, content) {
            return content.nodeType === 3
        }).text().trim();
        return thisText
    }
    function getHotkeyword(value) {
        $.ajax({
            type: "GET",
            url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
            async: true,
            data: {
                wd: value
            },
            dataType: "jsonp",
            jsonp: "cb",
            success: function (res) {
                $("#box ul").text("");
                hotList = res.s.length;
                if (hotList) {
                    $("#box").css("display", "block");
                    for (var i = 0; i < hotList; i++) {
                        $("#box ul").append("<li><span>" + (i + 1) + "</span> " + res.s[i] + "</li>");
                        $("#box ul li").eq(i).click(function () {
                            var thisText = filterChildren(this);
                            $("#txt").val(thisText);
                            window.open(searchData.thisSearch + thisText);
                            $("#box").css("display", "none")
                        });
                        if (i === 0) {
                            $("#box ul li").eq(i).css({
                                "border-top": "none"
                            });
                            $("#box ul span").eq(i).css({
                                "color": "#fff",
                                "background": "#f54545"
                            })
                        } else {
                            if (i === 1) {
                                $("#box ul span").eq(i).css({
                                    "color": "#fff",
                                    "background": "#ff8547"
                                })
                            } else {
                                if (i === 2) {
                                    $("#box ul span").eq(i).css({
                                        "color": "#fff",
                                        "background": "#ffac38"
                                    })
                                }
                            }
                        }
                    }
                } else {
                    $("#box").css("display", "none")
                }
            },
            error: function (res) {
                console.log(res)
            }
        })
    }
    $("#txt").keyup(function (e) {
        if ($(this).val()) {
            if (e.keyCode == 38 || e.keyCode == 40 || !searchData.hotStatus) {
                return
            }
            getHotkeyword($(this).val())
        } else {
            $(".search-clear").css("display", "none");
            $("#box").css("display", "none")
        }
    });
    $("#txt").keydown(function (e) {
        if (e.keyCode === 40) {
            listIndex === (hotList - 1) ? listIndex = 0 : listIndex++;
            $("#box ul li").eq(listIndex).addClass("current").siblings().removeClass("current");
            var hotValue = filterChildren($("#box ul li").eq(listIndex));
            $("#txt").val(hotValue)
        }
        if (e.keyCode === 38) {
            if (e.preventDefault) {
                e.preventDefault()
            }
            if (e.returnValue) {
                e.returnValue = false
            }
            listIndex === 0 || listIndex === -1 ? listIndex = (hotList - 1) : listIndex--;
            $("#box ul li").eq(listIndex).addClass("current").siblings().removeClass("current");
            var hotValue = filterChildren($("#box ul li").eq(listIndex));
            $("#txt").val(hotValue)
        }
        if (e.keyCode === 13) {
            window.open(searchData.thisSearch + $("#txt").val());
            $("#box").css("display", "none");
            $("#txt").blur();
            $("#box ul li").removeClass("current");
            listIndex = -1
        }
    });
    $("#txt").focus(function () {
        $(".search-box").css("box-show", "inset 0 1px 2px rgba(27,31,35,.075), 0 0 0 0.2em rgba(3,102,214,.3)");
        if ($(this).val() && searchData.hotStatus) {
            getHotkeyword($(this).val())
        }
    });
    $("#txt").blur(function () {
        setTimeout(function () {
            $("#box").css("display", "none")
        }, 250)
    });
    for (var i = 0; i < searchData.data.length; i++) {
        $(".search-engine-list").append('<li><span style="background:' + searchData.data[i].img + '"/></span>' +
            searchData.data[i].name + "</li>")
    }
    $(".search-icon, .search-engine").hover(function () {
        $(".search-engine").css("display", "block")
    }, function () {
        $(".search-engine").css("display", "none")
    });
    $("#hot-btn").click(function () {
        $(this).toggleClass("off");
        searchData.hotStatus = !searchData.hotStatus;
        localStorage.searchData = JSON.stringify(searchData)
    });
    searchData.hotStatus ? $("#hot-btn").removeClass("off") : $("#hot-btn").addClass("off");
    $(".search-engine-list li").click(function () {
        var index = $(this).index();
        searchData.thisSearchIcon = searchData.data[index].position;
        $(".search-icon").css("background-position", searchData.thisSearchIcon);
        searchData.thisSearch = searchData.data[index].url;
        $(".search-engine").css("display", "none");
        localStorage.searchData = JSON.stringify(searchData)
    });
    $(".search-icon").css("background-position", searchData.thisSearchIcon);
    $("#search-btn").click(function () {
        var textValue = $("#txt").val();
        if (textValue) {
            window.open(searchData.thisSearch + textValue);
            $("#box ul").html("")
        } else {
            layer.msg("请输入关键词！", {
                time: 500
            }, function () {
                $("#txt").focus()
            })
        }
    })
}

//夜间模式切换
function switchNightMode() {
    var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
    if (night == '0') {
        document.body.classList.add('night');
        document.cookie = "night=1;path=/"
        console.log(' ');
    } else {
        document.body.classList.remove('night');
        document.cookie = "night=0;path=/"
        console.log(' ');
    }
}

//检测用户访问隐私链接密码
function handleClick(menuName, url) {
    if (menuName === "Humsun") {
        // 弹出密码输入框，进行验证
        var password = prompt("请输入密码：", "");
        if (password != null) {
            // 这里假设密码是 "Sakura"，你可以根据实际情况修改
            if (password === "hsdynam") {
                window.open("http://www.hsdynam.com:808/", '_blank');
            } else {
                alert("密码错误，IP已被记录，无法跳转！若非本站点管理员请不要随意点击尝试，多次失败可能会被拉黑IP，导致后续无法使用该导航页！");
            }
        }
    }
    else if (menuName === "Gemini"){
        // 弹出密码输入框，进行验证
        var password = prompt("请输入密码：", "");
        if (password != null) {
            // 这里假设密码是 "Sakura"，你可以根据实际情况修改
            if (password === "Sakura") {
                window.open("https://gemini.sakurachu.cn/", '_blank');
            } else {
                alert("密码错误，IP已被记录，无法跳转！若非本站点管理员请不要随意点击尝试，多次失败可能会被拉黑IP，导致后续无法使用该导航页！");
            }
        }
    }
    else {
        // 不是 "Test" 菜单直接跳转
        window.open(url, '_blank');
    }
}


function showTime() {
    var t = null;
    t = setTimeout(time, 1000);//開始运行
    function time() {
        clearTimeout(t);//清除定时器
        dt = new Date();
        var year = dt.getFullYear();
        var month = dt.getMonth() + 1;//(0-11,0代表1月)
        var date = dt.getDate();//获取天
        var num = dt.getDay();//获取星期
        var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var hour = dt.getHours();//获取时
        var minute = dt.getMinutes();//获取分
        var second = dt.getSeconds();//获取秒
        //分秒时间是一位数字，在数字前补0。
        date = extra(date);
        month = extra(month);
        minute = extra(minute);
        second = extra(second);
        document.getElementById("time-day").innerHTML = year + " 年 " + month + " 月 " + date + " 日 ";
        document.getElementById("time-time").innerHTML = hour + "：" + minute + "：" + second ;
        document.getElementById("time-weekday").innerHTML = weekday[num];
        t = setTimeout(time, 1000); //设定定时器，循环运行
    }

}
//补位函数。
function extra(x) {
    //如果传入数字小于10，数字前补一位0。
    if (x < 10) {
        return "0" + x;
    }
    else {
        return x;
    }
}