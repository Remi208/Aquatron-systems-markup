import "./markup-menu";
import $ from "jquery";
import mask from 'jquery.maskedinput/src/jquery.maskedinput';
import slick from 'slick-carousel';


document.addEventListener("DOMContentLoaded", () => {

    $("input[type='tel']").mask("+38(999)-999-99-99");

    $('.block-8__content .slider').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.my-slider-nav .counter').html(i + '<span class="total">из' + slick.slideCount + '</span>');
    });

    $('.block-8__content .slider').slick({
        nextArrow: '<div class="slick-arrow-next">Предыдущий</div>',
        prevArrow: '<div class="slick-arrow-prev">Следующий</div>',
        appendArrows: $('.my-slider-nav'),
        fade: true,
        customPaging: function (slider, i) {
            return  (i + 1) + '/' + slider.slideCount;
        }
    });

    $('.feedbacks-slider.slider-for').slick({
        nextArrow: '<div class="slick-arrow-next">Предыдущий</div>',
        prevArrow: '<div class="slick-arrow-prev">Следующий</div>',
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.feedbacks-slider.slider-nav'
      });
      $('.feedbacks-slider.slider-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.feedbacks-slider.slider-for',
        focusOnSelect: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 380,
                settings: {
                    slidesToShow: 1
                }
            }
          ]
      });

    popup();
    menu();
    slowAnchor();
    headerRebuild();

    $('#map').each(function(){
        var map_ = $(this).attr('id');
        mapInitialize(map_);
    });

});

window.addEventListener("resize", () => {
    headerRebuild();
});

var appendFlag = 0;

function headerRebuild(){
    var text = $('.header__buisiness');
    var phones = $('.header .phones-list');
    var btn = $('.btn.btn-callback');
    var logo = $('.header .logo');
    var burger = $('.nav-icon');

    var mainNav = $('.main-nav');
    var header1 = $('.header__logo-buisiness');
    var header2 = $('.header__contacts-menu');

    if(window.innerWidth <= 1024 && appendFlag == 0){

        // text.prependTo(mainNav);
        phones.appendTo(mainNav);
        btn.appendTo(mainNav);

        appendFlag++;

    } else if(window.innerWidth > 1024 && appendFlag == 1){

        // text.appendTo(header1);
        btn.prependTo(header2);
        phones.prependTo(header2);

        appendFlag--;

    }
}

function popup() {
    $('.btn-callback').click( function(event){
        event.preventDefault();
        $('.overlay').fadeIn(400,
            function(){
                $('.callback-popup')
                    .css('display', 'block')
                    .animate({opacity: 1}, 200);
            });
    });

    $('.btn-calc-price').click( function(event){
        event.preventDefault();
        $('.overlay').fadeIn(400,
            function(){
                $('.calculate-popup')
                    .css('display', 'block')
                    .animate({opacity: 1}, 200);
            });
    });

    $('.btn-item-details').click( function(event){
        event.preventDefault();
        
        var item = $(event.target.closest('.pool')).find('.title span')[0];
        var popupPhrase = $('.individual-popup .title strong')[0];

        popupPhrase.innerHTML = item.innerHTML;

        $('.overlay').fadeIn(400,
            function(){
                $('.individual-popup')
                    .css('display', 'block')
                    .animate({opacity: 1}, 200);
            });
    });

    $('.block-3 .video-block .play-content').click( function(event){
        event.preventDefault();
        $('.overlay').fadeIn(400,
            function(){
                $('.popup.video-1')
                    .css('display', 'block')
                    .animate({opacity: 1}, 200);
            });
    });

    $('.block-7 .video-block .play-content').click( function(event){
        event.preventDefault();
        $('.overlay').fadeIn(400,
            function(){
                $('.popup.video-2')
                    .css('display', 'block')
                    .animate({opacity: 1}, 200);
            });
    });

    $('.popup-close, .overlay').click( function(){
        $('.popup')
            .animate({opacity: 0}, 200,
                function(){
                    $(this).css('display', 'none');
                    $('.overlay').fadeOut(400);
                }
            );
        var vidPops = $('.video-popup');
        for(var i = 0; i < vidPops.length; i++){
            var thisPopVid = $(vidPops[i]).find('iframe');
            
            thisPopVid.clone().appendTo($(vidPops[i]).find('.content'));

            $($(vidPops[i]).find('iframe')[0]).remove();
        }
    });
}

function menu(){
    $('.nav-icon').click(function(){
        $(this).toggleClass('open');
        $(".main-nav").toggleClass('active');
    });
}

function mapInitialize(map_) {
    var coords_ = $('#'+ map_).data('coords');
    if (coords_){
        var latitude = coords_.split(',')[0];
        var longtitude = coords_.split(',')[1];
    }

    var iconBase = 'images/marker.png';

    var latlng = new google.maps.LatLng(latitude,longtitude);
    if(window.innerWidth > 767){
        var mapCoord = new google.maps.LatLng(latitude - 0.005,longtitude - 0.03);
    } else {
        var mapCoord = new google.maps.LatLng(latitude,longtitude);
    }


    var myOptions = {
        center: mapCoord,
        zoom: 14,
        scrollwheel: false,
        scaleControl: false,
        rotateControl: false,
        disableDoubleClickZoom: true
    };

    var map = new google.maps.Map(document.getElementById(map_), myOptions);

    var stylesBW = [
        {
            featureType: "all",
            stylers: [
                { saturation: 0 }
            ]
        }
    ];

    map.setOptions({styles: stylesBW});

    var marker = new google.maps.Marker({
        position: latlng,
        icon: iconBase,
        map: map
    });

}

function slowAnchor(){
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $('.nav-icon').removeClass('open');
        $(".main-nav").removeClass('active');
    
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 85
        }, 500);
    });
}