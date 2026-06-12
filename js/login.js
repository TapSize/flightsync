import { supabase } from "./supabase.js"


const form =
document.getElementById(
'loginForm'
)

const error =
document.getElementById(
'error'
)

form.addEventListener(

'submit',

async(e)=>{

e.preventDefault()


const login =
document
.getElementById(
'login'
)
.value
.trim()

const password =
document
.getElementById(
'password'
)
.value
.trim()

if(
!login
||
!password
){

error.innerText=
'Введіть логін та пароль'

return

}

error.innerText=''

document
.querySelector(
'.connect'
)
.innerText=
'Завантаження'

try{

const{

data,

error:dbError

}

=

await supabase

.auth

.signInWithPassword({

email:
login,

password:
password

})

if(
dbError
){

document
.querySelector(
'.connect'
)
.innerText=
'УВІЙТИ'

error.innerText=
'Невірний логін або пароль'

return

}

localStorage.setItem(

'flightsync_session',

JSON.stringify({

authid:
data.user.id,

email:
data.user.email

})

)

window.location.href=
'map.html'

}

catch(e){

console.error(
e
)

document
.querySelector(
'.connect'
)
.innerText=
'УВІЙТИ'

error.innerText=
'Помилка входу №003'

}

}

)
