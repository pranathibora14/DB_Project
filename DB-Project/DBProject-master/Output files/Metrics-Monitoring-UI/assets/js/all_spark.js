(function () {
    isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

    if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        $('.sidebar .sidebar-wrapper, .main-panel, .main').perfectScrollbar();

        $('html').addClass('perfect-scrollbar-on');
    } else {
        $('html').addClass('perfect-scrollbar-off');
    }
})();


var breakCards = true;

var searchVisible = 0;
var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var mobile_menu_visible = 0,
    mobile_menu_initialized = false,
    toggle_initialized = false,
    bootstrap_nav_initialized = false;

var seq = 0,
    delays = 80,
    durations = 500;
var seq2 = 0,
    delays2 = 80,
    durations2 = 500;

$(document).ready(function () {

    $('body').bootstrapMaterialDesign();

    $sidebar = $('.sidebar');

    md.initSidebarsCheck();

    window_width = $(window).width();

    // check if there is an image set for the sidebar's background
    md.checkSidebarImage();

    //    Activate bootstrap-select
    if ($(".selectpicker").length != 0) {
        $(".selectpicker").selectpicker();
    }

    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();

    $('.form-control').on("focus", function () {
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function () {
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    // remove class has-error for checkbox validation
    $('input[type="checkbox"][required="true"], input[type="radio"][required="true"]').on('click', function () {
        if ($(this).hasClass('error')) {
            $(this).closest('div').removeClass('has-error');
        }
    });

});

$(document).on('click', '.navbar-toggler', function () {
    $toggle = $(this);

    if (mobile_menu_visible == 1) {
        $('html').removeClass('nav-open');

        $('.close-layer').remove();
        setTimeout(function () {
            $toggle.removeClass('toggled');
        }, 400);

        mobile_menu_visible = 0;
    } else {
        setTimeout(function () {
            $toggle.addClass('toggled');
        }, 430);

        var $layer = $('<div class="close-layer"></div>');

        if ($('body').find('.main-panel').length != 0) {
            $layer.appendTo(".main-panel");

        } else if (($('body').hasClass('off-canvas-sidebar'))) {
            $layer.appendTo(".wrapper-full-page");
        }

        setTimeout(function () {
            $layer.addClass('visible');
        }, 100);

        $layer.click(function () {
            $('html').removeClass('nav-open');
            mobile_menu_visible = 0;

            $layer.removeClass('visible');

            setTimeout(function () {
                $layer.remove();
                $toggle.removeClass('toggled');

            }, 400);
        });

        $('html').addClass('nav-open');
        mobile_menu_visible = 1;

    }

});

// activate collapse right menu when the windows is resized
$(window).resize(function () {
    md.initSidebarsCheck();

    // reset the seq for charts drawing animations
    seq = seq2 = 0;

    setTimeout(function () {
        md.initSparkPageCharts();
    }, 500);
});

md = {
    misc: {
        navbar_menu_visible: 0,
        active_collapse: true,
        disabled_collapse_init: 0,
    },

    checkSidebarImage: function () {
        $sidebar = $('.sidebar');
        image_src = $sidebar.data('image');

        if (image_src !== undefined) {
            sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>';
            $sidebar.append(sidebar_container);
        }
    },

    showNotification: function (from, align) {
        type = ['', 'info', 'danger', 'success', 'warning', 'rose', 'primary'];

        color = Math.floor((Math.random() * 6) + 1);

        $.notify({
            icon: "add_alert",
            message: "Welcome to <b>Material Dashboard Pro</b> - a beautiful admin panel for every web developer."

        }, {
                type: type[color],
                timer: 3000,
                placement: {
                    from: from,
                    align: align
                }
            });
    },


    initSliders: function () {
        // Sliders for demo purpose
        var slider = document.getElementById('sliderRegular');

        noUiSlider.create(slider, {
            start: 40,
            connect: [true, false],
            range: {
                min: 0,
                max: 100
            }
        });

        var slider2 = document.getElementById('sliderDouble');

        noUiSlider.create(slider2, {
            start: [20, 60],
            connect: true,
            range: {
                min: 0,
                max: 100
            }
        });
    },

    initSidebarsCheck: function () {
        if ($(window).width() <= 991) {
            if ($sidebar.length != 0) {
                md.initRightMenu();
            }
        }
    },

    checkFullPageBackgroundImage: function () {
        $page = $('.full-page');
        image_src = $page.data('image');

        if (image_src !== undefined) {
            image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    },

    initSparkPageCharts: function () {
		var mdata = localStorage.getItem("otp");
		//localStorage.clear();
		var value1 = JSON.parse(mdata).key1;
		var value2 = JSON.parse(mdata).key2;
		var value11 = value1.toString();
		console.log(value1);
		console.log(value2);
		var str = " --- Application ID --- "
		var strr = str.bold();
		var str1 = " --- Port Number --- "
		var str12 = str1.bold();
		document.getElementById("idd").innerHTML += strr + value2.bold() + str12 + value11.bold();
        var h = 0;
        var xx = [];
        var rdda = [], dska = [], ata = [], fta = [], cta = [], tsra = [], tswa = [];
        //var mema = [], onha = [], ofha = [];
        var mytimer = setInterval(myvar, 30);
        var getJSON = function (url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'json';
            xhr.onload = function () {
                var status = xhr.status;
                if (status === 200) {
                    callback(null, xhr.response);
                } else {
                    callback(status, xhr.response);
                }
            };
            xhr.send();
        };
        function myvar() {
            var url1 = "http://hadoop1.example.com:"+value1+"/api/v1/applications/"+value2+"/allexecutors";
			console.log(url1);
            getJSON(url1,function (err, data) {
                    if (err !== null) {
                        console.log('Something went wrong: ' + err);
                    } else {
                        console.log(data[0]);
                        myFunction10(data[0]);
                    }
                });
            function myFunction10(arr1) {
                var rdd = arr1.rddBlocks;
                //var mem = arr1.memoryUsed;
                var dsk = arr1.diskUsed;
                var at = arr1.activeTasks;
                var ft = arr1.failedTasks;
                var ct = arr1.completedTasks;
                var tsr = arr1.totalShuffleRead;
                var tsw = arr1.totalShuffleWrite;
				var out = "";
				var i = arr1.totalTasks;
				var j = arr1.totalInputBytes;
				var k = arr1.memoryMetrics.totalOnHeapStorageMemory;
				var l = arr1.memoryMetrics.totalOffHeapStorageMemory;
            
            document.getElementById("ii").innerHTML = i;
            document.getElementById("qq").innerHTML = j;
            document.getElementById("ww").innerHTML = k;
            document.getElementById("ee").innerHTML = l;

                var x = arr1.memoryUsed;
                document.getElementById("zz").innerHTML = x;

                var onh = arr1.memoryMetrics.usedOnHeapStorageMemory;
                document.getElementById("onn").innerHTML = onh;

                var ofh = arr1.memoryMetrics.usedOffHeapStorageMemory;
                document.getElementById("off").innerHTML = ofh;
                //console.log(avc);
                rdda.push(rdd);
                //mema.push(mem);
                dska.push(dsk);
                ata.push(at);
                fta.push(ft);
                cta.push(ct);
                tsra.push(tsr);
                tswa.push(tsw);
                //onha.push(onh);
                //ofha.push(ofh);
                //console.log(mem);
                console.log(cta);
                h++;
                //console.log("rdd is");
               // console.log(rdd);
                //console.log(h);
                xx.push(h);
                if (h == 15) {
                    clearInterval(mytimer);
                }
            }

            if ($('#dailySalesChart1').length != 0) {

                /*var s = []
                var i;
                for (i = 0; i < x.length; i++) {
                    s.push(i + 1);
                }*/
                dataDailySalesChart = {
                    labels: xx,
                    series: [rdda]
                };

                optionsDailySalesChart = {
                    lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: 50,
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                }
                var dailySalesChart = new Chartist.Line('#dailySalesChart1', dataDailySalesChart, optionsDailySalesChart);

                //md.startAnimationForLineChart(dailySalesChart);
            }
            /*if ($('#dailySalesChart2').length != 0) {


                var dataWebsiteViewsChart = {
                    labels: xx,
                    series: [mema]
                };
                var optionsWebsiteViewsChart = {
                    axisX: {
                        showGrid: false
                    },
                    low: 0,
                    high: 1000,
                    chartPadding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0
                    }
                };
                var responsiveOptions = [
                    ['screen and (max-width: 640px)', {
                        seriesBarDistance: 5,
                        axisX: {
                            labelInterpolationFnc: function (value) {
                                return value[0];
                            }
                        }
                    }]
                ];
                var websiteViewsChart = Chartist.Line('#dailySalesChart2', dataWebsiteViewsChart, optionsWebsiteViewsChart);

                md.startAnimationForLineChart(websiteViewsChart);
            }*/
            if ($('#dailySalesChart3').length != 0) {


                var dataWebsiteViewsChart = {
                    labels: xx,
                    series: [dska]
                };
                var optionsWebsiteViewsChart = {
                    axisX: {
                        showGrid: false
                    },
                    low: 0,
                    high: 1000,
                    chartPadding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0
                    }
                };
                /*var responsiveOptions = [
                    ['screen and (max-width: 640px)', {
                        seriesBarDistance: 5,
                        axisX: {
                            labelInterpolationFnc: function (value) {
                                return value[0];
                            }
                        }
                    }]
                ];*/
                var websiteViewsChart = Chartist.Line('#dailySalesChart3', dataWebsiteViewsChart, optionsWebsiteViewsChart);

                //md.startAnimationForLineChart(websiteViewsChart);
            }

            if ($('#dailySalesChart4').length != 0) {

                dataDailySalesChart = {
                    labels: xx,
                    series: [ata]
                };

                optionsDailySalesChart = {
                    lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: 50,
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                }

                var dailySalesChart = new Chartist.Line('#dailySalesChart4', dataDailySalesChart, optionsDailySalesChart);

                //md.startAnimationForLineChart(dailySalesChart);
            }

            if ($('#dailySalesChart5').length != 0) {


                dataCompletedTasksChart = {
                    labels: xx,
                    series: [fta]
                };

                optionsCompletedTasksChart = {
                    lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: 1000,
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                }

                var completedTasksChart = new Chartist.Line('#dailySalesChart5', dataCompletedTasksChart, optionsCompletedTasksChart);

                //md.startAnimationForLineChart(completedTasksChart);
            }

            if ($('#dailySalesChart6').length != 0) {


                var dataWebsiteViewsChart = {
                    labels: xx,
                    series: [cta]
                };
                var optionsWebsiteViewsChart = {
                    axisX: {
                        showGrid: false
                    },
                    low: 0,
                    high: 1000,
                    chartPadding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0
                    }
                };
                /*var responsiveOptions = [
                    ['screen and (max-width: 640px)', {
                        seriesBarDistance: 5,
                        axisX: {
                            labelInterpolationFnc: function (value) {
                                return value[0];
                            }
                        }
                    }]
                ];*/
                var websiteViewsChart = Chartist.Line('#dailySalesChart6', dataWebsiteViewsChart, optionsWebsiteViewsChart);

                //md.startAnimationForLineChart(websiteViewsChart);
            }

            if ($('#dailySalesChart7').length != 0) {

                dataDailySalesChart = {
                    labels: xx,
                    series: [tsra]
                };

                optionsDailySalesChart = {
                    lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: 50,
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                }

                var dailySalesChart = new Chartist.Line('#dailySalesChart7', dataDailySalesChart, optionsDailySalesChart);

                //md.startAnimationForLineChart(dailySalesChart);
            }

            if ($('#dailySalesChart8').length != 0) {


                dataCompletedTasksChart = {
                    labels: xx,
                    series: [tswa]
                };

                optionsCompletedTasksChart = {
                    lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: 1000,
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                }

                var completedTasksChart = new Chartist.Line('#dailySalesChart8', dataCompletedTasksChart, optionsCompletedTasksChart);

                //md.startAnimationForLineChart(completedTasksChart);
            }

            /*if ($('#dailySalesChart9').length != 0) {


                var dataWebsiteViewsChart = {
                    labels: xx,
                    series: [onha]
                };
                var optionsWebsiteViewsChart = {
                    axisX: {
                        showGrid: false
                    },
                    low: 0,
                    high: 1000,
                    chartPadding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0
                    }
                };
                var responsiveOptions = [
                    ['screen and (max-width: 640px)', {
                        seriesBarDistance: 5,
                        axisX: {
                            labelInterpolationFnc: function (value) {
                                return value[0];
                            }
                        }
                    }]
                ];
                var websiteViewsChart = Chartist.Line('#dailySalesChart9', dataWebsiteViewsChart, optionsWebsiteViewsChart);

                md.startAnimationForLineChart(websiteViewsChart);
            }

            if ($('#dailySalesChart10').length != 0) {

                dataDailySalesChart = {
                    labels: xx,
                    series: [ofha]
                };

                optionsDailySalesChart = {
                    lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: 50,
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                }

                var dailySalesChart = new Chartist.Line('#dailySalesChart10', dataDailySalesChart, optionsDailySalesChart);

                md.startAnimationForLineChart(dailySalesChart);
            }*/
            /*if ($('#dailySalesChart11').length != 0)
            {
                dataDailySalesChart = {
                    labels: xx,
                    series: [mema]
                };

                optionsDailySalesChart = {
                    lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: 50,
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                }
                var dailySalesChart = new Chartist.Line('#dailySalesChart11', dataDailySalesChart, optionsDailySalesChart);

                md.startAnimationForLineChart(dailySalesChart);
            }*/
        }
    },

    initMinimizeSidebar: function () {

        $('#minimizeSidebar').click(function () {
            var $btn = $(this);

            if (md.misc.sidebar_mini_active == true) {
                $('body').removeClass('sidebar-mini');
                md.misc.sidebar_mini_active = false;
            } else {
                $('body').addClass('sidebar-mini');
                md.misc.sidebar_mini_active = true;
            }

            // we simulate the window Resize so the charts will get updated in realtime.
            var simulateWindowResize = setInterval(function () {
                window.dispatchEvent(new Event('resize'));
            }, 180);

            // we stop the simulation of Window Resize after the animations are completed
            setTimeout(function () {
                clearInterval(simulateWindowResize);
            }, 1000);
        });
    },

    checkScrollForTransparentNavbar: debounce(function () {
        if ($(document).scrollTop() > 260) {
            if (transparent) {
                transparent = false;
                $('.navbar-color-on-scroll').removeClass('navbar-transparent');
            }
        } else {
            if (!transparent) {
                transparent = true;
                $('.navbar-color-on-scroll').addClass('navbar-transparent');
            }
        }
    }, 17),


    initRightMenu: debounce(function () {
        $sidebar_wrapper = $('.sidebar-wrapper');

        if (!mobile_menu_initialized) {
            $navbar = $('nav').find('.navbar-collapse').children('.navbar-nav');

            mobile_menu_content = '';

            nav_content = $navbar.html();

            nav_content = '<ul class="nav navbar-nav nav-mobile-menu">' + nav_content + '</ul>';

            navbar_form = $('nav').find('.navbar-form').get(0).outerHTML;

            $sidebar_nav = $sidebar_wrapper.find(' > .nav');

            // insert the navbar form before the sidebar list
            $nav_content = $(nav_content);
            $navbar_form = $(navbar_form);
            $nav_content.insertBefore($sidebar_nav);
            $navbar_form.insertBefore($nav_content);

            $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function (event) {
                event.stopPropagation();

            });

            // simulate resize so all the charts/maps will be redrawn
            window.dispatchEvent(new Event('resize'));

            mobile_menu_initialized = true;
        } else {
            if ($(window).width() > 991) {
                // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
                $sidebar_wrapper.find('.navbar-form').remove();
                $sidebar_wrapper.find('.nav-mobile-menu').remove();

                mobile_menu_initialized = false;
            }
        }
    }, 200),

    startAnimationForLineChart: function (chart) {

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    },
    startAnimationForBarChart: function (chart) {

        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    },
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};
