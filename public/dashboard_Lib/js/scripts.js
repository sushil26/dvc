var jQuery_1_10_2 = $.noConflict(true);
function initializeJS() {

    //tool tips
    jQuery_1_10_2('.tooltips').tooltip();

    //popovers
    jQuery_1_10_2('.popovers').popover();

    //custom scrollbar
        //for html
    jQuery_1_10_2("html").niceScroll({styler:"fb",cursorcolor:"#007AFF", cursorwidth: '6', cursorborderradius: '10px', background: '#F7F7F7', cursorborder: '', zindex: '1000'});
        //for sidebar
    jQuery_1_10_2("#sidebar").niceScroll({styler:"fb",cursorcolor:"#007AFF", cursorwidth: '3', cursorborderradius: '10px', background: '#F7F7F7', cursorborder: ''});
        // for scroll panel
    jQuery_1_10_2(".scroll-panel").niceScroll({styler:"fb",cursorcolor:"#007AFF", cursorwidth: '3', cursorborderradius: '10px', background: '#F7F7F7', cursorborder: ''});
    
    //sidebar dropdown menu
    jQuery_1_10_2('#sidebar .sub-menu > a').click(function () {
        var last = jQuery_1_10_2('.sub-menu.open', jQuery_1_10_2('#sidebar'));        
        jQuery_1_10_2('.menu-arrow').removeClass('arrow_carrot-right');
        jQuery_1_10_2('.sub', last).slideUp(200);
        var sub = jQuery_1_10_2(this).next();
        if (sub.is(":visible")) {
            jQuery_1_10_2('.menu-arrow').addClass('arrow_carrot-right');            
            sub.slideUp(200);
        } else {
            jQuery_1_10_2('.menu-arrow').addClass('arrow_carrot-down');            
            sub.slideDown(200);
        }
        var o = (jQuery_1_10_2(this).offset());
        diff = 200 - o.top;
        if(diff>0)
            jQuery_1_10_2("#sidebar").scrollTo("-="+Math.abs(diff),500);
        else
            jQuery_1_10_2("#sidebar").scrollTo("+="+Math.abs(diff),500);
    });

    // sidebar menu toggle
    jQuery_1_10_2(function() {
        function responsiveView() {
            var wSize = jQuery_1_10_2(window).width();
            if (wSize <= 768) {
                jQuery_1_10_2('#container').addClass('sidebar-close');
                jQuery_1_10_2('#sidebar > ul').hide();
               
            }

            if (wSize > 768) {
                jQuery_1_10_2('#container').removeClass('sidebar-close');
                jQuery_1_10_2('#sidebar > ul').show();
            }
       
        }
        jQuery_1_10_2(window).on('load', responsiveView);
        jQuery_1_10_2(window).on('resize', responsiveView);
    });

    jQuery_1_10_2('.toggle-nav').click(function () {
        if (jQuery_1_10_2('#sidebar > ul').is(":visible") === true) {
            jQuery_1_10_2('#main-content').css({
                'margin-left': '0px'
            });
            jQuery_1_10_2('#sidebar').css({
                'margin-left': '-180px'
            });
            jQuery_1_10_2('#sidebar > ul').hide();
            jQuery_1_10_2("#container").addClass("sidebar-closed");
        } else {
            jQuery_1_10_2('#main-content').css({
                'margin-left': '180px'
            });
            jQuery_1_10_2('#sidebar > ul').show();
            jQuery_1_10_2('#sidebar').css({
                'margin-left': '0'
            });
            jQuery_1_10_2("#container").removeClass("sidebar-closed");
        }
    });

    //bar chart
    if (jQuery_1_10_2(".custom-custom-bar-chart")) {
        jQuery_1_10_2(".bar").each(function () {
            var i = jQuery_1_10_2(this).find(".value").html();
            jQuery_1_10_2(this).find(".value").html("");
            jQuery_1_10_2(this).find(".value").animate({
                height: i
            }, 2000)
        })
    }

}

jQuery_1_10_2(document).ready(function(){
    initializeJS();
});