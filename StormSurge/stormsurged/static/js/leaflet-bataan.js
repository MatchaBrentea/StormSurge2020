var url_str = "https://raw.githubusercontent.com/MatchaBrentea/stormsurgefiles/master/"
var kml_docs = ["maxelev_Haiyan_2.geojson","maxelev_Haiyan_1_4_Leyte.geojson","maxelev_Haiyan_1_4_Samar.geojson","maxelev_Rammasun_1.geojson"];
var i;
var loc=[];
var notif_arr=[];
var color = ['#a8323c','#32a852','#a8a032'];
var t = 0;


var barangays = $.ajax({
url: url_str.concat(kml_docs[3]),
dataType: "json",
success: console.log("Barangay data successfully loaded."),
error: function (xhr) {
    alert(xhr.statusText)
}
})


function style(feature) {
return {
    weight: 0,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: feature.properties.fill
    };
}


$.when(barangays).done(function() {
    var map = L.map('map').setView([14.50951, 120.62290], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var sidebar = L.control.sidebar('sidebar').addTo(map);
    
    var kybarangays = L.geoJSON(barangays.responseJSON,{style:style} ).addTo(map);
   

    // setInterval(function(){
    //     var kybarangays = L.geoJSON(barangays.responseJSON,{style:style1} ).addTo(map);
    //     if(t >= 2){
    //         t = 0;
    //     }
    //     else{
    //         t += 1;
    //     }   

    //     setInterval(function(){
    //     map.removeLayer(kybarangays);
    //     },950);
    // },1000);



});