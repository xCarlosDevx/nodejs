const profile = document.getElementById('profile');
const login = document.getElementById('login')
const userName = document.getElementById('navbarDropdownMenuLink');
const clienteData = document.getElementById('cliente');
let user = JSON.parse(localStorage.getItem('user_with_token'));

// ! = 0, null, undefined, false
// ~! = 1, !null, !undefined, true
if (user) {
  login.style.display = "none"
  userName.innerText = `${user.user.nombre}`
} else {
  profile.style.display = 'none'
}
if(clienteData){
    clienteData.value = `${user.user.nombre} ${user.user.apellido}`
}
function logout() {
  localStorage.removeItem("user_with_token");
  location.reload();
}