// A URL base da nossa API no backend
const apiUrl = 'http://localhost/crud/backend/users.json';


$('body').append(`<div id="perseguidor"><div class="circulo"></div></div>`)

$(window).on('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;


    $("#perseguidor").css({
        'transform': `translate(${mouseX - 8}px, ${mouseY - 8}px)`
    });
})

$("a, button").hover( function(){
    $("#perseguidor").toggleClass('esconder')
})


// O código jQuery vai começar aqui!