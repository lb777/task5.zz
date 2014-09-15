$(document).ready ( function(){
//размер шрифта третьей колонки в зависимости от её ширины
    function fontSize() {
        var width = 800; // ширина, от которой идет отсчет (можно было бы взять за основу ширину блока #size, но тогда изменения шрифа были бы не видны)
        var fontSize = 12; // минимальный размер шрифта
        var bodyWidth = $('.section').width();
        var multiplier = bodyWidth / width;
        if ($('.section').width() >= width) fontSize = Math.floor(fontSize * multiplier);
        $('.right').css({fontSize: fontSize+'px'});
    }
    $(function() { fontSize(); });
    $(window).resize(function() { fontSize(); });

//Высота блока .wrapper в зависимости от высоты браузера
    function heightSize() {
        var a=$("header").height();
        var b=100;
        var c=a+b;
        var first=$(window).height();
        var second=$('body').height();
        var wrapper=first - c;

        if (first > second) {
            $('.wrapper').css('min-height', wrapper + 'px');
        }
    }

    $(function() { heightSize(); });
    $(window).resize(function() { heightSize(); });

//показать/скрыть форму обратной связи
    function hidden(){
        $('.call').css('display', 'none');
    }
    $(".background-fon-call").click( hidden );
    $(".close").click( hidden );

    $('header > span').bind('click', function() {
        $('.call').css('display', 'block');
    });
//Скрипт плейсхолдера для отображения в старых браузерах. В ie8 input[type="tel"] не работает из-за скрипата маски.
    $("FORM").placeholderLebnik();

//скрипт слайдера времени
    $(function() {
        $( "#slider-range" ).slider({
            range: true,
            step: 15,
            min: 600,          //т.к.слайдер умеет считать только в десятиричной системы
            max: 1140,         // устанавливаем максимально и минимально время в минутах (10:00 будет 600 , 19:00 будет 1140)
            values: [ 795, 960 ], //значение по умолчанию
            slide: function( event, ui ) {
                var valHourMin = Math.floor( ui.values[ 0 ] / 60 );
                var valHourMax = Math.floor( ui.values[ 1 ] / 60 );
                var valMinuteMin = ( ui.values[ 0 ] - valHourMin*60 );
                var valMinuteMax = ( ui.values[ 1 ] - valHourMax*60 );
                var valMinTime =  (valHourMin < 10 ? "0"+valHourMin : valHourMin) + ":" + ( valMinuteMin == 0 ? "00" : valMinuteMin);
                var valMaxTime = (valHourMax < 10 ? "0"+valHourMax : valHourMax) + ":" + ( valMinuteMax == 0 ? "00" : valMinuteMax);
                $( "#amountMin" ).val( valMinTime);
                $( "#amountMax" ).val( valMaxTime);
            }
        });
        var valuesOne = $( "#slider-range" ).slider( "values", 0 );
        var valuesTwo = $( "#slider-range" ).slider( "values", 1 );
        var valuesHourMin = Math.floor( valuesOne / 60 );
        var valuesHourMax = Math.floor( valuesTwo / 60 );
        var valuesMinuteMin = ( valuesOne - valuesHourMin*60 );
        var valuesMinuteMax = ( valuesTwo - valuesHourMax*60 );
        var valuesMinTime =  (valuesHourMin < 10 ? "0"+valuesHourMin : valuesHourMin) + ":" + ( valuesMinuteMin == 0 ? "00" : valuesMinuteMin);
        var valuesMaxTime = (valuesHourMax < 10 ? "0"+valuesHourMax : valuesHourMax) + ":" + ( valuesMinuteMax == 0 ? "00" : valuesMinuteMax);
        $( "#amountMin" ).val(valuesMinTime);
        $( "#amountMax" ).val(valuesMaxTime);
    });
});