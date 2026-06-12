import { supabase } from "./supabase.js"
const session =
JSON.parse(
localStorage.getItem(
'flightsync_session'
))

if(!session){

window.location.href =
'login.html'

}

document.getElementById(
'userName'
).innerText=

session.email
??

'USER'

document.getElementById(
'userId'
).innerText=

'ID '+

(
session.authid
?.slice(
0,
8
)
??

'----'
)

document.getElementById(
'userRole'
).innerText=

'AUTHORIZED'

function updateClock()
{

    const now =
    new Date()

    document.getElementById('currentTime').innerText =now.toLocaleTimeString('en-GB',
    {
        hour12:false
    })

}

updateClock()

setInterval(
updateClock,
1000
)

document.getElementById('logout').onclick=()=>{
    localStorage.removeItem(
    'flightsync_session'
    )

    window.location.href =
    'login.html'

}

const map =

L.map(
'map',
{
zoomControl:false
}
)

.setView(
[
49.0,
31.0
],
6
)

L.tileLayer(

'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

{
maxZoom:19
}

)

.addTo(
map
)

async function loadAircraft(){

aircraftLayer.clearLayers()

const{data,error}=

await supabase
.from('aircrafts')

.select('*')

.eq(

'is_online',

true

)

if(
error
){

console.error(
error
)

return

}
document
.getElementById(
'aircraftCounter'
)

.innerText=

`AIRCRAFTS ONLINE: ${data.length}`
data.forEach(

ac=>{

let color=
'#FFFFFF'


if(
ac.aircraft_type
===
'H125'
){

color=
'#4DB8FF'

}


if(

ac.aircraft_type
===
'DA40'

||

ac.aircraft_type
===
'DA42'

){

color=
'#4DB8FF'

}

const marker=

L.marker(

[

ac.latitude,

ac.longitude

],

{

icon:

L.divIcon({

className:'',

iconSize:[80,40],

html:`

<div
style="

transform:
rotate(${ac.magnetic_heading}deg);

color:${color};

font-size:16px;

"

>

➤

</div>

<div
style="

position:absolute;


bottom:40px;

transform:
translateX(-50%);

display:flex;

flex-direction:column;

align-items:center;

white-space:nowrap;

color:#2DC5F3;
-webkit-text-stroke:0.1px black;

font-size:5x;

font-weight:1000;

line-height:1.15;

text-align:center;


"

>

<div>
${ac.aircraft_type}
${ac.tail_number}
</div>

<div>
${ac.captain_name}
</div>

<div>
V=${ac.gps_speed}
H=${ac.gps_altitude}
HDG=${ac.magnetic_heading}°
</div>

</div>

`

})

}

)

marker.addTo(
aircraftLayer
)

}

)

}

document
.getElementById(
'online'
)

.onclick=

async()=>{

aircraftVisible=

!aircraftVisible

if(
aircraftVisible
){

aircraftLayer
.addTo(
map
)
document
.getElementById(
'aircraftCounter'
)
.style.display='block'
await loadAircraft()


aircraftInterval=

setInterval(

loadAircraft,

3000

)

}

else{

clearInterval(

aircraftInterval

)
document
.getElementById(
'aircraftCounter'
)
.style.display='none'
map.removeLayer(

aircraftLayer

)

}

}

document
.getElementById(
'zones'
)

.onclick=()=>{

alert(
'ZONES COMING SOON'
)

}
const layerMenu =
document.createElement(
'div'
)

layerMenu.className =
'layer-menu'

layerMenu.innerHTML =

`

<div class="layer-option" data-layer="osm">
OpenStreetMap
</div>

<div class="layer-option" data-layer="dark">
Dark Map
</div>

<div class="layer-option" data-layer="sat">
SAT Map
</div>
`

document.body.appendChild(
layerMenu
)

const osmLayer =

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
)

const darkLayer =

L.tileLayer(
'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
)

const satLayer =

L.tileLayer(
'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
)

let activeBase =
osmLayer

document
.getElementById(
'map_layers'
)

.onclick=(e)=>{

e.stopPropagation()

const rect =

e.target
.getBoundingClientRect()

layerMenu.style.left =

`${rect.left}px`

layerMenu.classList.toggle(
'show'
)

}

layerMenu
.querySelectorAll(
'.layer-option'
)

.forEach(

item=>{

item.onclick=()=>{

map.removeLayer(
activeBase
)

if(
item.dataset.layer==='osm'
){

activeBase=
osmLayer

}

if(
item.dataset.layer==='dark'
){

activeBase=
darkLayer

}

if(
item.dataset.layer==='sat'
){

activeBase=
satLayer

}

activeBase.addTo(
map
)

layerMenu.classList.remove(
'show'
)

}

}

)

document
.addEventListener(

'click',

()=>{

layerMenu.classList.remove(
'show'
)

}
)
const zonesMenu =
document.createElement(
'div'
)

zonesMenu.className =
'layer-menu'

zonesMenu.innerHTML=
`

<div class="zone-row">
CTR
<button data-zone="ctr">OFF</button>
</div>

<div class="zone-row">
UKD
<button data-zone="ukd">OFF</button>
</div>

<div class="zone-row">
UKR
<button data-zone="ukr">OFF</button>
</div>

<div class="zone-row">
UKT
<button data-zone="ukt">OFF</button>
</div>

<div class="zone-row">
UKP
<button data-zone="ukp">OFF</button>
</div>

<div class="zone-row">
Regions
<button data-zone="regions">OFF</button>
</div>

`

document.body.appendChild(
zonesMenu
)

const ZONE_STYLE={

ctr:{
color:'#00B7FF',
weight:2,
fillOpacity:0.08,
dashed:false,
dash:'10 8'
},

ukd:{
color:'#6e0c15',
weight:2,
fillOpacity:0.08,
dashed:false,
dash:'10 8'
},

ukr:{
color:'#FF4040',
weight:2,
fillOpacity:0.08,
dashed:false,
dash:'10 8'
},

ukt:{
color:'#e378b3',
weight:2,
fillOpacity:0.08,
dashed:false,
dash:'10 8'
},

ukp:{
color:'#6e0c15',
weight:2,
fillOpacity:0.08,
dashed:false,
dash:'10 8'
},

regions:{
color:'#7d7d7d',
weight:1,
fillOpacity:0.03,
dashed:true,
dash:'3 6'
}

}

function createZoneLayer(
file,
zone
){

const s=
ZONE_STYLE[zone]

return omnivore.kml(

file,

null,

L.geoJson(
null,

{

style:{

color:
s.color,

weight:
s.weight,

fillColor:
s.color,

fillOpacity:
s.fillOpacity,

opacity:1,

dashArray:
s.dashed
?
s.dash
:
null

}

}

)

)

}

const zoneLayers={

ctr:
createZoneLayer(
'source/UKRAINE_CTR.kml',
'ctr'
),

ukd:
createZoneLayer(
'source/UKRAINE_UKD.kml',
'ukd'
),

ukr:
createZoneLayer(
'source/UKRAINE_UKR.kml',
'ukr'
),

ukt:
createZoneLayer(
'source/UKRAINE_UKT.kml',
'ukt'
),

ukp:
createZoneLayer(
'source/UKRAINE_UKP.kml',
'ukp'
),

regions:
createZoneLayer(
'source/UKRAINE_REGIONS.kml',
'regions'
)

}



const zoneState={}

document
.getElementById(
'zones'
)

.onclick=(e)=>{

e.stopPropagation()

const rect=
e.target
.getBoundingClientRect()

zonesMenu.style.left=
`${rect.left}px`

zonesMenu.classList.toggle(
'show'
)

}

zonesMenu
.querySelectorAll(
'button'
)

.forEach(

btn=>{

btn.onclick=(e)=>{

e.stopPropagation()

const key=
btn.dataset.zone

if(
zoneState[key]
){

map.removeLayer(
zoneLayers[key]
)

btn.innerText=
'OFF'

zoneState[key]=false

}

else{

zoneLayers[key]
.addTo(
map
)

btn.innerText=
'ON'

zoneState[key]=true

}

}

}

)

document
.addEventListener(

'click',

()=>{

zonesMenu.classList.remove(
'show'
)

}
)
const airportsLayer =
L.layerGroup()

let airportsVisible =
false

let airportsLoaded =
false
let aircraftLayer=
L.layerGroup()

let aircraftVisible=
false

let aircraftInterval=
null
function createAirportIcon(){

return L.divIcon({

className:'',

iconSize:[18,18],

iconAnchor:[9,9],

html:`

<div
style="

width:18px;
height:18px;

border-radius:50%;

border:
2px solid #4DB8FF;

background:
rgba(8,14,22,.88);

box-shadow:

0 0 0 2px rgba(77,184,255,.08),
0 0 12px rgba(77,184,255,.25);

position:relative;

"

>

<div
style="

position:absolute;

left:50%;
top:50%;

width:4px;
height:4px;

border-radius:50%;

background:#4DB8FF;

transform:
translate(-50%,-50%);

"

> </div>

</div>

`

})

}


async function loadAirports(){
const AIRPORT_CHARTS={

UKBB:'1leLiNIzT_PeC0MNvAIDbhy8f7VJaNn65',
UKDE:'1aleX6gIenD7YwIBgyk8E7fpp4VNzSI8g',
UKHH:'1pmmWin0o3JtWpXuGdv9m4SuuU8sQft7m',
UKHS:'1GfcqiSCNxQqHVTqOSIZo2Yad59DkPUVa',
UKKK:'1w5fgmRxxwTi7EugQA7OwA1lQCD-DTGZ9',
UKKT:'18J4rc38hdUDIxX_J6YINTO7FURcPK77S',
UKLL:'1kKCDRlxZ0wOYuyDiKyR83h33r_KET17v',
UKLT:'1Zs5Xr6FLNu6WJN8s9MHlHUrVW3kZygFe',
UKOO:'1jCyTbJyK6OZymewmCu2T8CZj_gy4cDDI',
UKBE:'1XpzgrDAdG3JgwK7q6T57cQIonamffzpf',
UKDR:'1C-h6WcYLHqKblcBWh8R2k3bbXFMWXC3n',
UKHK:'1h0U1v4mV7TliK3fTFd0S4SZVfDjcu--f',
UKKE:'1gKers4XjUi5mHGYaihIyjkkMO6-44F2i',
UKKM:'1dOJ3UyLPNo6wm2apupgIyMG1DFFVlr5t',
UKKV:'1_AmZovvWAocmDEziUtl60cok9vUa2Ur6',
UKLN:'11fIYJxp4F0uI_pNfT7gdsM0SoZkyTSnJ',
UKLU:'1FO5GUCgDCTn0yhyVb4li8orKuoAciKOD',
UKWW:'1x9r8UaSBRTNzO3u4y_OH7oNSAf0hlMf-',
UKDD:'1f-ppFXu2fR9SS24AwoPYiVkgY9bhcwNI',
UKHD:'1WIHsZ2zVwIFb1PPw5aKvgj3dbGVZHI5k',
UKHP:'1It2_Nk8Gz6YxF5kg9LoZiPm2MXRtvYn6',
UKKG:'1tEUzZCQFkRn1CjKkcUMZNpWJHI7HLAnN',
UKKO:'1XKA5dtTpP1ak9fvKVDaoTBsKQmRNa9Uh',
UKLI:'1npS4NlwwDSXhSKs3LAgpo9rTmCNiNmzw',
UKLR:'1agaF3Yz-ANs4rGlra5k6RVYMl9HzX6P9',
UKOH:'107pkWHhsrxY03yzXGH_v9Aq-iFFU8tjL'

}

if(
airportsLoaded
){

return

}

try{

const response =

await fetch(
'source/airports.geojson'
)

const data =
await response.json()

L.geoJSON(

data,

{

pointToLayer(
feature,
latlng
){

return L.marker(

latlng,

{

icon:
createAirportIcon()

}

)

},

onEachFeature(
feature,
layer
){

layer.on(

'click',

()=>{

    const icao =

    feature.properties.ident
    document
    .getElementById(
    'airportTitle'
    )

    .innerText=`AIRPORT: ${icao}`

    const menu =

    document
    .getElementById(
    'airportMenu'
    )

    const frame =

    document
    .getElementById(
    'airportChart'
    )

    menu.style.display='block'

    frame.src=''

    const chart = AIRPORT_CHARTS[icao]

    if(chart)
    {

    setTimeout(()=>{frame.src=`https://drive.google.com/file/d/${chart}/preview`})
    }
})}})


.addTo(
airportsLayer
)


airportsLoaded=
true

}

catch(e){

console.error(
'Airport load error',
e
)

}

}

document
.getElementById(
'airports'
)

.onclick=

async()=>{

if(
!airportsLoaded
){

await loadAirports()

}

airportsVisible=
!airportsVisible

if(
airportsVisible
){

airportsLayer.addTo(
map
)

}

else{

map.removeLayer(
airportsLayer
)

}

}
window.onload=()=>{

document
.getElementById(
'airportMenuClose'
)

.onclick=()=>{

document
.getElementById(
'airportMenu'
)
.style.display='none'

}

}
