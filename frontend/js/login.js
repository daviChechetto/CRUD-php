const UI = {
    botaoEntrar: $("#botaoEntrar"),
    
}

function piscar() {

}

UI.botaoEntrar.on('click', function () {
    const username = $("#username").val();
    const password = $("#password").val();

    userLogin(username, password);

    piscar();

    setTimeout(function () {
        window.location.href = "index.html";
    }, 1000);
});