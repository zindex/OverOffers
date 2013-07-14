$(function(){
    //// select2 plugin
    $('.choice-select').select2({});
    $('#period').select2({ minimumResultsForSearch: '10' })


    //	Responsive carousel
    $('#foo').carouFredSel({
        responsive: true,
        width: '100%',
        scroll: 1,
        prev: '#slider .prev',
        next: '#slider .next',
        items: {
            //	height: '30%',	//	optionally resize item-height
            visible: {
                min: 3,
                max: 9
            }
        }
    });
//    $('.carousel-close').click(function (e) {
//        $(this).parents('#slider').slideUp('slow');
//        e.preventDefault();
//    });
    $('.view-more').click(function (e) {
        $('#slider').slideToggle(300);
        $(this).toggleClass('view-more_active');
        $('#foo').carouFredSel({
            responsive: true,
            width: '100%',
            scroll: 1,
            prev: '#slider .prev',
            next: '#slider .next',
            items: {
                //	height: '30%',	//	optionally resize item-height
                visible: {
                    min: 3,
                    max: 9
                }
            }
        });
        e.preventDefault();
    });

    //// datepicker plugin
    $('.datepicker').datepicker();
    $('.add-on').click(function(){
        $(this).prevAll('.datepicker').datepicker('show');
    });

    //// stats tab plugin
    $('#stats a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    //// twitter bootstrap tabs
    $('#periods a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('.tabset a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });


    //// custom placeholder
    $('.form-box .clear').click(function(event){
        $(this).nextAll('.custom-placeholder input').val('');
        $(this).parent('.control-group').removeClass('focus');
        event.preventDefault();
    });
    $('.custom-placeholder input').each(function (){
        if($(this).val() != '') {
            $(this).prev('.input-text').hide();
        }
        $(this).bind({
            'focus': function(){

            },
            keydown: function(){
                if ($(this).val() == ''){
                    $(this).prev('.input-text').hide();
                    $(this).parent('.control-group').addClass('focus');
                }
            },
            'blur': function(){
//            if ($(this).val() == '')
//                $(this).nextAll('.b-label').show();
            }
        });
        $('.input-text').click(function(){
            $(this).nextAll('.custom-placeholder input').focus();
        })
    });


    //// twitter bootstrap tooltip
    $('body').tooltip({
        selector: '[rel=tooltip]'
    });

    //// twitter bootstrap tooltip title change
    $('.opener').bind('click',clickHandler);
    function clickHandler(event) {
        $(this).parents('.product').toggleClass('active');
        if ($(this).parents('.product').hasClass('active')) {
            $(this).attr('data-original-title', 'свернуть ссылки')
        } else {
            $(this).attr('data-original-title', 'развернуть ссылки')
        }
        event.preventDefault();
    }
    
    //showing add sub ID input 
    $('.add-link').click(function(e){
        $(this).parents('.listing ').nextAll('.add-form').eq(0).show();

        e.preventDefault();
    });

    /// fixed navbar on scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() > $('.main-cnt').position().top) {
            $('.navbar').addClass('navbar-fixed');
        } else {
            $('.navbar').removeClass('navbar-fixed');
        }
    });

    /// scroll to top
    $('.btn-top').click(function (e) {
        $('html:not(:animated),body:not(:animated)').animate({ scrollTop: 0}, 300 );
        e.preventDefault();
    });

    //payment placeholder
    $('input.b-payment').each(function(){
        var input = $(this),
            placeholder = input.attr('placeholder');

        input.attr('placeholder','');



        $(input).val(placeholder);
        input.css({
            'color':'#999',
            'font-size':'12px',
            'text-align':'left'
        });

        $(input).focus(function(){
            if (input.val() == placeholder) {
                input.val('');
                input.css({
                    'color':'#444',
                    'font-size':'24px',
                    'text-align':'right'
                });
            }
        });

        $(input).blur(function(){
            if (input.val() == '' || input.val() == placeholder) {
                input.val(placeholder);
                input.css({
                    'color':'#999',
                    'font-size':'12px',
                    'text-align':'left'
                });
            }
        });
    });

    //toggle graph-states
    $('.jsSelectorParent').each(function(){
        var graph = $(this).nextAll('.jsGraphHolder:visible').eq(0),
            prev = $('.selector__prev',this),
            next = $('.selector__next',this),
            that = this;

        prev.click(function(e){
            if (graph.prev('.jsGraphHolder').length){
                graph.hide();
                graph.prev('.jsGraphHolder').show();

                $('.jsSelectorItem:visible',that).eq(0).hide().prev('.jsSelectorItem').eq(0).show();
                graph = graph.prev('.jsGraphHolder');
            }
            $(window).trigger('resize');

            e.preventDefault();
        });

        next.click(function(e){
            if (graph.next('.jsGraphHolder').length){
                graph.hide();
                graph.next('.jsGraphHolder').show();

                $('.jsSelectorItem:visible',that).eq(0).hide().next('.jsSelectorItem').eq(0).show();
                graph = graph.next('.jsGraphHolder')
            }
            $(window).trigger('resize');


            e.preventDefault();
        });
    });

    fixGraphHolder();
    $(window).resize(function(){
        fixGraphHolder();
    });
});


//// resize background image login-page
$(function() {
    var bgImage = $('#bg-image');
    function resizeImg() {
        var imgwidth = bgImage.width(),
            imgheight = bgImage.height(),
            winwidth = $(window).width(),
            winheight = $(window).height(),
            widthratio = winwidth / imgwidth,
            heightratio = winheight / imgheight,
            widthdiff = heightratio * imgwidth,
            heightdiff = widthratio * imgheight;

        if(heightdiff>winheight) {
            bgImage.css({
                width: winwidth+'px',
                height: heightdiff+'px'
            });
        } else {
            bgImage.css({
                width: widthdiff+'px',
                height: winheight+'px'
            });
        }

        $('#bg-image').show();

    }
    resizeImg();
    $(window).resize(function() {
        resizeImg();
    });

});



//// Data Table plugin
(function() {
    $(function() {
        var get_track_link, t_id, update_track_links;
        if ($('#start').size()) {
            $('#start').datepicker({
                defaultDate: '-1w',
                changeMonth: true,
                dateFormat: 'yy-mm-dd',
                onClose: function(selectedDate) {
                    $('#period').val('custom');
                    return $('#end').datepicker('option', 'minDate', selectedDate);
                }
            });
            $('#end').datepicker({
                defaultDate: '-1w',
                changeMonth: true,
                dateFormat: 'yy-mm-dd',
                onClose: function(selectedDate) {
                    $('#period').val('custom');
                    return $('#start').datepicker('option', 'maxDate', selectedDate);
                }
            });
            $('#period').change(function() {
                var end_str, from, period, start_str, today;
                period = $(this).val();
                today = Date.create();
                if (period === '7days') {
                    from = 6..daysBefore(today);
                } else if (period === '30days') {
                    from = 29..daysBefore(today);
                } else if (period === '1year') {
                    from = 1..yearsBefore(today);
                } else {
                    return;
                }
                start_str = from.format('{yyyy}-{MM}-{dd}');
                end_str = today.format('{yyyy}-{MM}-{dd}');
                $('#start').val(start_str);
                return $('#end').val(end_str);
            });
            $('#start').datepicker('option', 'maxDate', $('#end').val());
            $('#end').datepicker('option', 'minDate', $('#start').val());
        }
        $('#next').click(function() {
            var curr_page, total_pages;
            total_pages = $(this).closest('.news-nav').attr('data-pages');
            total_pages = parseInt(total_pages);
            curr_page = $(this).closest('.news-nav').attr('data-page');
            curr_page = parseInt(curr_page);
            curr_page++;
            $(this).closest('.news-nav').attr('data-page', curr_page);
            if (curr_page > 1) {
                $('#prev i').removeClass('hide');
            } else {
                $('#prev i').addClass('hide');
            }
            if (curr_page >= total_pages) {
                $('#next i').addClass('hide');
            } else {
                $('#next i').removeClass('hide');
            }
            $.get('/news/' + curr_page + '/', function(html) {
                return $('.news-list').html(html);
            }, 'html');
            return false;
        });
        $('#prev').click(function() {
            var curr_page, total_pages;
            total_pages = $(this).closest('.news-nav').attr('data-pages');
            total_pages = parseInt(total_pages);
            curr_page = $(this).closest('.news-nav').attr('data-page');
            curr_page = parseInt(curr_page);
            curr_page--;
            $(this).closest('.news-nav').attr('data-page', curr_page);
            if (curr_page > 1) {
                $('#prev i').removeClass('hide');
            } else {
                $('#prev i').addClass('hide');
            }
            if (curr_page >= total_pages) {
                $('#next i').addClass('hide');
            } else {
                $('#next i').removeClass('hide');
            }
            $.get('/news/' + curr_page + '/', function(html) {
                return $('.news-list').html(html);
            }, 'html');
            return false;
        });
        if ($('#offers-table').size()) {
            $('#offers-table').dataTable({
                aoColumns: [
                    {
                        sType: 'numeric'
                    }, {
                        bSortable: false
                    }, null, {
                        bSortable: false
                    }, null, {
                        sType: 'numeric'
                    }, {
                        sType: 'numeric'
                    }
                ],
                iDisplayLength: 50,
                sPaginationType: 'full_numbers'
            });
        }
        if ($('#show-creative').size()) {
            $('#show-creative').click(function() {
                $('#ad-creative-table').toggleClass('hide');
                if ($('#ad-creative-table').hasClass('hide')) {
                    $('#show-creative').text('Show creative');
                } else {
                    $('#show-creative').text('Hide creative');
                }
                return false;
            });
        }
        t_id = null;
        get_track_link = function(subid, cb) {
            var data;
            data = {};
            data['offer_id'] = $('#tracking').attr('data-offer');
            if ($('#landing').val() !== '0') data['url_id'] = $('#landing').val();
            if ($('#shortlink:checked').size()) data['tiny_url'] = 1;
            if (subid) data['subid'] = subid;
            return $.get('/offer/tracking/', data, function(data) {
                if (data.result) {
                    if (t_id) clearTimeout(t_id);
                    $('#saved-tip').removeClass('hide');
                    t_id = setTimeout(function() {
                        return $('#saved-tip').addClass('hide');
                    }, 5000);
                    return cb(data['url']);
                }
            }, 'json');
        };
        update_track_links = function() {
            get_track_link(false, function(link) {
                return $('#tracking').val(link);
            });
            return false;
        };
        if ($('#landing').size()) {
            $('#generate-tracking').click(update_track_links);
            $('#landing').change(function() {
                return $('#preview-link').attr('href', $('#landing option:selected').attr('data-preview'));
            });
        }
        if ($('#add-sub-id').size()) {
            $('#add-sub-id').click(function() {
                $('<input type="text" id="subid" placeholder="Enter SubID"> <a href=""#" class="btn btn-primary" id="save-subid">Ok</a>').insertAfter($('#add-sub-id'));
                $('#add-sub-id').hide();
                return $('#save-subid').click(function() {
                    var num, subid;
                    subid = $('#subid').val();
                    if (subid && (subid.search(/[^\w]/) === -1)) {
                        $('#add-sub-id').show();
                        $('#subid').remove();
                        $('#save-subid').remove();
                        num = $('.tracking-link').size();
                        if (num >= 5) $('#add-sub-id').remove();
                        $('<br><input class="input-xxlarge tracking-link" data-subid="' + subid + '" id="tracking-"' + num + '" type="text" value="" disabled>').insertAfter($('#generate-tracking'));
                        get_track_link(subid, function(link) {
                            return $('*[data-subid=' + subid + ']').val(link);
                        });
                    }
                    return false;
                });
            });
        }
        if ($('#revenue-chart').size()) {
            new Morris.Line({
                element: 'revenue-chart',
                data: revenue,
                xkey: 'date',
                ykeys: ['value'],
                labels: ['Value']
            });
        }
        if ($('#accept-btn').size()) {
            return $('#accept-btn').click(function() {
                if ($('#accept:checked').size()) {
                    $('#accept-btn').remove();
                    $('#accept').remove();
                    $('#urls').removeClass('hide');
                }
                return false;
            });
        }
    });

}).call(this);

function fixGraphHolder(){
    $('.graph-holder').each(function(){
       $(this).css('width',$(this).parents('.tab-content').width());

    });
}