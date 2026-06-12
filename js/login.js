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

error.innerText =
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

const {
data,
error:dbError
}
=

await supabase

.from(
'users'
)

.select('*')

.eq(
'userlogin',
login
)

.eq(
'userpassword',
password
)

.maybeSingle()
console.log(
'LOGIN:',
data
)

console.log(
'ERROR:',
dbError
)
if(
dbError
||
!data
){

document
.querySelector(
'.connect'
)
.innerText=
'УВІЙТИ'

error.innerText=
'Невірний логін та пароль'

return

}

localStorage.setItem(

'flightsync_session',

JSON.stringify({

userid:
data.userid,

username:
data.username,

userlogin:
data.userlogin,

userrole:
data.userrole

})

)

window.location.href=
'map.html'

}

catch(e){

console.error(e)

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
