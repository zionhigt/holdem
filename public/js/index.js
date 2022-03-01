let currentUserId = null;

const loginForm = document.querySelector('#loginContainer form');
const hideLoginForm = function() {
    const formContainer = document.querySelector('#loginContainer');
    formContainer.classList.add("d-none");
}
const showMenu = function() {
    const menuContainer = document.querySelector("#menuContainer");
    menuContainer.classList.remove("d-none");
}
const showFrameGame = function () {
    const framesGame = document.querySelectorAll(".frame-game");
    framesGame.forEach(function(frameGame) {
        frameGame.classList.remove("d-none");
    });
}
const showUsers = function() {
    const usersContainer = document.querySelector("#usersContainer");
    usersContainer.classList.remove("d-none");
}

const loginFormCB = function(event) {
    event.preventDefault();
    const loginFormData = new FormData(event.target);
    loginFormData.append("socketToken", socketToken);
    API.signin(loginFormData)
    .then(resp => {
        if(resp.userId) {
            currentUserId = resp.userId;
            hideLoginForm();
            showUsers();
            showFrameGame();
            console.log(document.cookie)
            socket.emit(socketToken, resp);
        }
    })
    .catch(err => {
        console.error(err);
    });

}

loginForm.addEventListener("submit", loginFormCB);


// setInterval(() => {
//     refreshGame();
// }, 1000);