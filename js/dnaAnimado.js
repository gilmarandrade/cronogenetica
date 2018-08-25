/*
 * Dna animado 1 
 * 
 * Permite zoom, scroll infinito e pausar
 */

function aumentarZoom() {
    var containerDna = $('#container-dna');
    var zoom = containerDna.data('zoom');

    containerDna.removeClass('zoom' + zoom);
    zoom++;
    containerDna.data('zoom', zoom);
    containerDna.addClass('zoom' + zoom);

    if (zoom == 4) {
        $('#zoomin').attr('disabled', true);
    }
    $('#zoomout').attr('disabled', false);

    $(window).resize();
}
function diminuirZoom() {
    var containerDna = $('#container-dna');
    var zoom = containerDna.data('zoom');

    containerDna.removeClass('zoom' + zoom);
    zoom--;
    containerDna.data('zoom', zoom);
    containerDna.addClass('zoom' + zoom);

    if (zoom == 0) {
        $('#zoomout').attr('disabled', true);
    }
    $('#zoomin').attr('disabled', false);

    $(window).resize();
}

function play() {
    $('#container-dna').toggleClass('paused');
}

function init() {
    $(window).resize(initDnaAnimado);
    $(window).scroll(scrollDna);
    $('#play').click(play);
    $('#zoomin').click(aumentarZoom);
    $('#zoomout').click(diminuirZoom);

    initDnaAnimado();
}

function scrollDna(event) {
    var NextScroll = $(this).scrollTop();
    var CurrentScroll = $('body').data('scroll');
    var vel = 12;//3 6 12 24 48  1 2 10 11
    if (NextScroll > CurrentScroll) {//scroll down
        $('.sequencia').each(function() {
            var n = parseInt($(this).css("top")) - vel;
            if (n < 0) {
                n = $('#container-dna').height() - vel;
                $(this).css('top', n);
            } else {
                $(this).css('top', n);
            }
        });
    } else {//scroll up
        $('.sequencia').each(function() {
            var n = parseInt($(this).css("top")) + vel;
            if (n > $('#container-dna').height()) {
                n = 0 + vel;
                $(this).css('top', n);
            } else {
                $(this).css('top', n);
            }
        });
    }

    $('body').data('scroll', NextScroll);
}
function initDnaAnimado() {
    console.log("init");
    var containerDna = $('#container-dna');
    var dna = $('#dna');

    containerDna.addClass('paused');

    var sequenciaHeight = $('.sequencia').height();
    var windowHeight = $(window).height();
    var totalSeq = Math.round(windowHeight / sequenciaHeight) + 3;

    /*
    console.log("windowHeight: " + windowHeight);
    console.log("docume: " + $(document).width() + "x" + $(document).height());
    console.log("sequenciaHeight " + sequenciaHeight);
    console.log(totalSeq);
    */

    containerDna.height(totalSeq * sequenciaHeight);
    containerDna.css("top", -(totalSeq * sequenciaHeight - windowHeight) / 2 + "px");
    dna.empty();

    for (i = 0, positionTop = 0; i < totalSeq; i++, positionTop += sequenciaHeight) {
        dna.append('<div class="sequencia" style="top:' + positionTop + 'px;"><div class="helice"><div class="esfera1"></div><div class="esfera2"></div><div class="haste"></div></div><div class="helice"><div class="esfera1"></div><div class="esfera2"></div><div class="haste"></div></div><div class="helice"><div class="esfera1"></div><div class="esfera2"></div><div class="haste"></div></div><div class="helice"><div class="esfera1"></div><div class="esfera2"></div><div class="haste"></div></div><div class="helice"><div class="esfera1"></div><div class="esfera2"></div><div class="haste"></div></div></div>');
    }

    t = 0;
    $("#dna .helice").each(function() {
        $(this).css("animation-delay", t + "s");
        t += 0.1;
    });
    containerDna.removeClass('paused');
}