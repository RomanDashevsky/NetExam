export default function () {

    $(window).scroll(function () {

        if ($(this).scrollTop() != 0) {
            $('#scrollUpBtn').fadeIn();
        } else {
            $('#scrollUpBtn').fadeOut();
        }

    });

    $('#scrollUpBtn').click(function () {
        $('body,html').animate({scrollTop: 0}, 800);
    });

}
