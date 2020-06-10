var url_str = "https://raw.githubusercontent.com/MatchaBrentea/stormsurgefiles/master/"
var kml_docs = ["maxelev_Haiyan_1_4_Leyte.geojson","maxelev_Haiyan_1_4_Samar.geojson","maxelev_Rammasun_1.geojson"];
var i;
var loc=[];
var notif_arr=[];


var barangays = $.ajax({
url: url_str.concat(kml_docs[0]),
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
    var map = L.map('map').setView([11.2142199211672, 125.009497200035], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var sidebar = L.control.sidebar('sidebar').addTo(map);
    
    var kybarangays = L.geoJSON(barangays.responseJSON,{style:style} ).addTo(map);
    

    for (var i = 0; i < loc.length; i++) {
        marker = new L.marker([loc[i][1],loc[i][2]])
        .bindPopup(loc[i][0])
        .addTo(map);
    }

});