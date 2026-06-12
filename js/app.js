const session =

localStorage.getItem(
'flightsync_session'
)

const app =

document.getElementById(
'app'
)

if(
session
){

app.innerHTML =

`

<h1>
FLIGHTSYNC
</h1>

<p>
LIVE AIRCRAFT MONITOR
</p>
`

}
else{

window.location.replace(
'login.html'
)

}
