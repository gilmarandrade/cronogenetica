/*
 * Dna animado 1 
 * 
 * Permite zoom, scroll infinito e pausar
 */

function aumentarZoom() {
    var containerTimeline = $("#container-timeline");
    var zoom = containerTimeline.data('zoom');

    containerTimeline.removeClass('z' + zoom);
    zoom++;
    containerTimeline.data('zoom', zoom);
    containerTimeline.addClass('z' + zoom);

    if (zoom == 4) {
        $('#zoomin').attr('disabled', true);
    }
    $('#zoomout').attr('disabled', false);

    $(window).resize();
}
function diminuirZoom() {
    var containerTimeline = $("#container-timeline");
    var zoom = containerTimeline.data('zoom');

    containerTimeline.removeClass('z' + zoom);
    zoom--;
    containerTimeline.data('zoom', zoom);
    containerTimeline.addClass('z' + zoom);

    if (zoom == 0) {
        $('#zoomout').attr('disabled', true);
    }
    $('#zoomin').attr('disabled', false);

    $(window).resize();
}

function play() {
    $('#container-dna').toggleClass('play');
    $('#play').toggleClass('play');
}

function expandir() {

    $("#container-ferramentas form").each(function() {
        $(this).fadeOut();
        $('body').off("click");
    });

    var ferramenta = $(this);
    var form = $(this).next();
    form.children("input").focus();
    form.fadeIn();

    $('body').on("click", function() {
        var input = form.children("input").is(":focus");
        var button = form.children("button").is(":focus");
        var tool = ferramenta.is(":focus");

        if (input == false && button == false && tool == false) {
            form.fadeOut();
            $('body').off("click");
        }
    });
}

function toggleMenu(){
    $('#site-header').toggleClass('aberto');
    $('#container-ferramentas').toggleClass('aberto');
}

function initTimeline() {
    $(window).resize(init);
    $(window).scroll(scrollDna);
    $('#toggle-menu').click(toggleMenu);
    $('#pesquisar').click(expandir);
    $('#data').click(expandir);
    $('#zoomin').click(aumentarZoom);
    $('#zoomout').click(diminuirZoom);
    $('#play').click(play);


    init();
}

function scrollDna(evento) {
    var ScrollAtual = $(this).scrollTop();
    var ScrollAnterior = $('#container-timeline').data('scroll');
    var vel = 12;//3 6 12 24 48  1 2 10 11
    if (ScrollAtual > ScrollAnterior) {//scroll down
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

    $('#container-timeline').data('scroll', ScrollAtual);
}
function fecharPopup() {
    $('#container-dna').removeClass('paused');
    $("#cortina-detalhes").fadeOut('slow');
    $("#container-detalhes").slideUp('slow');
    $('body').css('overflow-y', 'scroll');
}
function abrirPopup() {
    $('#container-dna').addClass('paused');
    $("#cortina-detalhes").fadeIn('slow');
    $("#container-detalhes").slideDown('slow');
    $('body').css('overflow-y', 'hidden');
}
function init() {
    console.log("init");
    var containerDna = $('#container-dna');
    var dna = $('#dna');

    containerDna.addClass('paused');

    var sequenciaHeight = $('.sequencia').height();
    var windowHeight = $(window).height();
    var totalSeq = Math.round(windowHeight / sequenciaHeight) + 3;

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


    $("#cortina-detalhes").height(windowHeight);
    $("#container-detalhes").height(windowHeight - 70);
    $("#cortina-detalhes").on('click', fecharPopup);
    $("#fechar").on('click', fecharPopup);
    $('.evento').on('click', abrirPopup);
}
