(function() {
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

$(document).ready(function() {

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

  $('.form-control').on("focus", function() {
    $(this).parent('.input-group').addClass("input-group-focus");
  }).on("blur", function() {
    $(this).parent(".input-group").removeClass("input-group-focus");
  });

  // remove class has-error for checkbox validation
  $('input[type="checkbox"][required="true"], input[type="radio"][required="true"]').on('click', function() {
    if ($(this).hasClass('error')) {
      $(this).closest('div').removeClass('has-error');
    }
  });

});

$(document).on('click', '.navbar-toggler', function() {
  $toggle = $(this);

  if (mobile_menu_visible == 1) {
    $('html').removeClass('nav-open');

    $('.close-layer').remove();
    setTimeout(function() {
      $toggle.removeClass('toggled');
    }, 400);

    mobile_menu_visible = 0;
  } else {
    setTimeout(function() {
      $toggle.addClass('toggled');
    }, 430);

    var $layer = $('<div class="close-layer"></div>');

    if ($('body').find('.main-panel').length != 0) {
      $layer.appendTo(".main-panel");

    } else if (($('body').hasClass('off-canvas-sidebar'))) {
      $layer.appendTo(".wrapper-full-page");
    }

    setTimeout(function() {
      $layer.addClass('visible');
    }, 100);

    $layer.click(function() {
      $('html').removeClass('nav-open');
      mobile_menu_visible = 0;

      $layer.removeClass('visible');

      setTimeout(function() {
        $layer.remove();
        $toggle.removeClass('toggled');

      }, 400);
    });

    $('html').addClass('nav-open');
    mobile_menu_visible = 1;

  }

});

// activate collapse right menu when the windows is resized
$(window).resize(function() {
  md.initSidebarsCheck();

  // reset the seq for charts drawing animations
  seq = seq2 = 0;

  setTimeout(function() {
    md.initDashboardPageCharts();
  }, 500);
});

md = {
  misc: {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
  },

  checkSidebarImage: function() {
    $sidebar = $('.sidebar');
    image_src = $sidebar.data('image');

    if (image_src !== undefined) {
      sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>';
      $sidebar.append(sidebar_container);
    }
  },

  showNotification: function(from, align) {
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


  initSliders: function() {
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

  initSidebarsCheck: function() {
    if ($(window).width() <= 991) {
      if ($sidebar.length != 0) {
        md.initRightMenu();
      }
    }
  },

  checkFullPageBackgroundImage: function() {
    $page = $('.full-page');
    image_src = $page.data('image');

    if (image_src !== undefined) {
      image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
      $page.append(image_container);
    }
  },

    initDashboardPageCharts: function () {

        //var rmb, amb, rvc, avc, allovc, ca, cr, an, ln, un, rn, sn, h = 0;
        var h = 0;
        var xx = [];
        var rmba = [], amba = [], rvca = [], avca = [], allovca = [], caa = [], cra = [], ana = [], lna = [], una = [], rna = [], sna = [];
        var mytimer = setInterval(myvar, 1000);
        function myvar() {
            var xmlhttp1 = new XMLHttpRequest();
            var url1 = "http://hadoop1.example.com:8088/ws/v1/cluster/metrics";

            xmlhttp1.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var myArr1 = JSON.parse(this.responseText);
                    //console.log(myArr1.clusterMetrics.availableVirtualCores);
                    myFunction12(myArr1);
                }
            };
            xmlhttp1.open("GET", url1, true);
            xmlhttp1.send();

            function myFunction12(arr1) {
                var rmb = arr1.clusterMetrics.reservedMB;
                var amb = arr1.clusterMetrics.allocatedMB;
                var rvc = arr1.clusterMetrics.reservedVirtualCores;
                var avc = arr1.clusterMetrics.availableVirtualCores;
                var allovc = arr1.clusterMetrics.allocatedVirtualCores;
                var ca = arr1.clusterMetrics.containersAllocated;
                var cr = arr1.clusterMetrics.containersReserved;
                var an = arr1.clusterMetrics.activeNodes;
                var ln = arr1.clusterMetrics.lostNodes;
                var un = arr1.clusterMetrics.unhealthyNodes;
                var rn = arr1.clusterMetrics.rebootedNodes;
                var sn = arr1.clusterMetrics.shutdownNodes;
                //console.log(avc);
                rmba.push(rmb);
                amba.push(amb);
                rvca.push(rvc);
                avca.push(avc);
                allovca.push(allovc);
                caa.push(ca);
                cra.push(cr);
                ana.push(an);
                lna.push(ln);
                una.push(un);
                rna.push(rn);
                sna.push(sn);
                console.log(avca);
                h++;
                xx.push(h);
                if (h == 15) {
                    clearTimeout(mytimer);
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
                series: [rmba],
				
            };

            optionsDailySalesChart = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: 50,
				axisX: {
				  axisTitle: "Time (mins)",
				  
				},
				axisY: {
				  axisTitle: "Goals",
				},

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

        if ($('#dailySalesChart2').length != 0) {


            dataCompletedTasksChart = {
                labels: xx,
                series: [amba]
                //looping
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

            var completedTasksChart = new Chartist.Line('#dailySalesChart2', dataCompletedTasksChart, optionsCompletedTasksChart);

            //md.startAnimationForLineChart(completedTasksChart);
        }

        if ($('#dailySalesChart3').length != 0) {


            var dataWebsiteViewsChart = {
                labels: xx,
                series: [rvca]
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

            //md.startAnimationForBarChart(websiteViewsChart);
        }

        if ($('#dailySalesChart4').length != 0) {

            dataDailySalesChart = {
                labels: xx,
                series: [avca]
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
                series: [allovca]
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
                series: [caa]
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

            //md.startAnimationForBarChart(websiteViewsChart);
        }

        if ($('#dailySalesChart7').length != 0) {

            dataDailySalesChart = {
                labels: xx,
                series: [cra]
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
                series: [ana]
            };

            optionsCompletedTasksChart = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: 5,
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

        if ($('#dailySalesChart9').length != 0) {


            var dataWebsiteViewsChart = {
                labels: xx,
                series: [lna]
            };
            var optionsWebsiteViewsChart = {
                axisX: {
                    showGrid: false
                },
                low: 0,
                high: 5,
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
            var websiteViewsChart = Chartist.Line('#dailySalesChart9', dataWebsiteViewsChart, optionsWebsiteViewsChart);

            //md.startAnimationForBarChart(websiteViewsChart);
        }

        if ($('#dailySalesChart10').length != 0) {

            dataDailySalesChart = {
                labels: xx,
                series: [una]
            };

            optionsDailySalesChart = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: 5,
                chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
            }

            var dailySalesChart = new Chartist.Line('#dailySalesChart10', dataDailySalesChart, optionsDailySalesChart);

            //md.startAnimationForLineChart(dailySalesChart);
        }

        if ($('#dailySalesChart11').length != 0) {


            dataCompletedTasksChart = {
                labels: xx,
                series: [rna]
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

            var completedTasksChart = new Chartist.Line('#dailySalesChart11', dataCompletedTasksChart, optionsCompletedTasksChart);

            //md.startAnimationForLineChart(completedTasksChart);
        }

        if ($('#dailySalesChart12').length != 0) {


            var dataWebsiteViewsChart = {
                labels: xx,
                series: [sna]
            };
            var optionsWebsiteViewsChart = {
                axisX: {
                    showGrid: false
                },
                low: 0,
                high: 5,
                chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            };
            /*var responsiveOptions = [
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 0,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
            ];*/
            var websiteViewsChart = Chartist.Line('#dailySalesChart12', dataWebsiteViewsChart, optionsWebsiteViewsChart);

            //md.startAnimationForBarChart(websiteViewsChart);
        }
    }
  },

  initMinimizeSidebar: function() {

    $('#minimizeSidebar').click(function() {
      var $btn = $(this);

      if (md.misc.sidebar_mini_active == true) {
        $('body').removeClass('sidebar-mini');
        md.misc.sidebar_mini_active = false;
      } else {
        $('body').addClass('sidebar-mini');
        md.misc.sidebar_mini_active = true;
      }
        
      var simulateWindowResize = setInterval(function() {
        window.dispatchEvent(new Event('resize'));
      }, 180);
        
      setTimeout(function() {
        clearInterval(simulateWindowResize);
      }, 1000);
    });
  },

  checkScrollForTransparentNavbar: debounce(function() {
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


  initRightMenu: debounce(function() {
    $sidebar_wrapper = $('.sidebar-wrapper');

    if (!mobile_menu_initialized) {
      $navbar = $('nav').find('.navbar-collapse').children('.navbar-nav');

      mobile_menu_content = '';

      nav_content = $navbar.html();

      nav_content = '<ul class="nav navbar-nav nav-mobile-menu">' + nav_content + '</ul>';

      navbar_form = $('nav').find('.navbar-form').get(0).outerHTML;

      $sidebar_nav = $sidebar_wrapper.find(' > .nav');
        
      $nav_content = $(nav_content);
      $navbar_form = $(navbar_form);
      $nav_content.insertBefore($sidebar_nav);
      $navbar_form.insertBefore($nav_content);

      $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function(event) {
        event.stopPropagation();

      });
        
      window.dispatchEvent(new Event('resize'));

      mobile_menu_initialized = true;
    } else {
      if ($(window).width() > 991) {
        $sidebar_wrapper.find('.navbar-form').remove();
        $sidebar_wrapper.find('.nav-mobile-menu').remove();

        mobile_menu_initialized = false;
      }
    }
  }, 200),

  startAnimationForLineChart: function(chart) {

    chart.on('draw', function(data) {
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
  startAnimationForBarChart: function(chart) {

    chart.on('draw', function(data) {
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


function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};
