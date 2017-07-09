$(document).ready(function () {
    initNavigation();
    mainSlider();
    gallery();
    initBookingForm();

});


function mainSlider() {
    var sliderList = $('.main-slider-list');

    sliderList.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: true,
        adaptiveHeight: true
    })
};

function gallery() {
    $('.gallery a').simpleLightbox();
};

function initNavigation() {

    var toggleNav = $('.toggle-navigation');
    var navContent = $('.navigation-item');
    var dropdowns = $('.dropdown');
    var fullPage = $('#fullpage');


    dropdowns.hover(
        function () {
            $(this).children('.sub-menu').stop(true).slideDown(400);
        },
        function () {
            $(this).children('.sub-menu').stop(true).slideUp(200);
        }
    );

    toggleNav.click(function () {
        navContent.toggle();
    });

    $(window).on('resize', function (e) {
        if ($(window).width() > 860) {
            navContent.show();
        }
    });

    fullPage.fullpage({
        sectionsColor: ['#26C6DA', '#00C853', '#D500F9', "#EC407A", '#D32F2F'],
        css3: true,
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Main', 'About us', 'Our services', 'Our rooms', 'Contact us', 'Booking'],
        showActiveTooltip: true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        controlArrows: true,
        verticalCentered: true,
        scrollBar: true,
        fitToSection: true,
        animateAnchor: true,
        onLeave: function () {
            if ($(window).width() <= 860) {
                $('.navigation-item').hide();
            }
        }
    });

    $('html.fp-enabled, .fp-enabled body').css('overflow', 'hidden');
}



var dateIn = $('#dateIn');
var dateOut = $('#dateOut');


function initDataRangePicker(dateIn, dateOut) {


    dateIn.datepicker({
        minDate: new Date()
    });
    dateOut.datepicker({
        minDate: new Date(),
        maxDate: "+1M"
    });
};


function initBookingForm() {

    var bookingForm = $('#bookRoom');
    var invalidCSSClass = 'invalid';
    var button = $('.btn');

    initDataRangePicker(dateIn, dateOut);

    button.on('click', function (e) {

        e.preventDefault();

        if (dateOut.val() <= dateIn.val() || dateIn.val() === '') {

            bookingForm.addClass(invalidCSSClass);

        } else {

            bookingForm.removeClass(invalidCSSClass);

            $.ajax({
                url: 'back_end/api/date.json',
                dataType: 'json',
                success: formSuccess,
                data: setRequest()
            });
        }
    })
};


var request = {};
var roomOption;
var result = $('#result');


function setRequest() {
    request.dateIn = dateIn.val();
    request.dateOut = dateOut.val();
    request.selectRoom = roomOption = $('#selectRoom').val();

    return request;
};

function formSuccess(data) {
    result.html(prepareResult(data));
};

function prepareResult(response) {
    var formattedText = '';

    response.rooms.forEach(function (item) {
        if (item.type.toLowerCase() == roomOption.toLowerCase()) {
            formattedText += '<input type="checkbox" class="foo">' + 'Room number: ' + item.number + ', ' + item.type + ', current status: ' + item.status + ', price per room per day: ' + item.price + '</input>' + '<br>';
        }
    });

    return formattedText + '<button class="btn">BOOK NOW</button>';
};






