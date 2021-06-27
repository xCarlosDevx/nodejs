//Cuerpo y informacion del formulario//
const loginForm = document.querySelector('.login-form');
const email = document.getElementById('email')
const tokenElement = document.getElementById('token')
const password = document.getElementById('password');
//Listener al evento de precionar el submit dentro del formulario//
loginForm.addEventListener("submit", (e) => {

    e.preventDefault();
    // || = (Or) si ninguno de estos campos tiene valor hara la siguiente validacion ! = (no) //
    if (!email.value || !password.value) {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Falta campos por llenar`.toUpperCase(),
            confirmButtonColor:"#000"
        })

    } else if (password.value.length < 6) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `La clave tiene que tener al menos mas de 6 caracteres`.toUpperCase(),
            confirmButtonColor:"#000"
        })
    }
    else {
        // Variable "User" sera igual a todos los datos que introduzca el usuario//
        let user = {
            email: email.value,
            password: password.value,
        }
        try {
            // Request antigua para realizar peticiones al servidor  XHR //
            let xhr = new XMLHttpRequest()
            // Abrir la Api creada anteriormente //
            xhr.open("POST", '/api/usuarios/signin')
            // Encabezado que vendra de json tipo texto, traduce el json a string //
            xhr.setRequestHeader('content-type', 'application/json')
            xhr.onload = function () {
                var responseObject = JSON.parse(this.response);
                console.log(responseObject);
                if (responseObject.msg) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${responseObject.msg}`.toUpperCase(),
                    })
                }
                if (responseObject.token) {
                    tokenElement.innerText = responseObject.user
                    localStorage.setItem('user_with_token', JSON.stringify(responseObject));
                    window.location.href = "/"
                }
            }
            // Traduce el String nuevamente en JSon //
            xhr.send(JSON.stringify(user))
        } catch (error) {
            console.log(error)
        }
    }
})