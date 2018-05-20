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
        arrows: false
      });

    popup();
    menu();

    $('#map').each(function(){
        var map_ = $(this).attr('id');
        mapInitialize(map_);
    });
});

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
    $('.popup-close, .overlay').click( function(){
        $('.callback-popup')
            .animate({opacity: 0}, 200,
                function(){
                    $(this).css('display', 'none');
                    $('.overlay').fadeOut(400);
                }
            );
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
    var mapCoord = new google.maps.LatLng(latitude - 0.005,longtitude - 0.03)

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