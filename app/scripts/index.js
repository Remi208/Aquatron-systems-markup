import "./markup-menu";
var $ = require("jquery");

document.addEventListener("DOMContentLoaded", () => {
    popup();
    menu();
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