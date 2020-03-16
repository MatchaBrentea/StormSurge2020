var url_str = "https://raw.githubusercontent.com/MatchaBrentea/stormsurgefiles/master/"
var kml_docs = ["maxelev_Haiyan_1_4_Leyte.geojson","maxelev_Haiyan_1_4_Samar.geojson","maxelev_Rammasun_1.geojson"];
var i;
var loc=[];
var notif_arr=[];

var bar = $(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/MatchaBrentea/stormsurgefiles/master/tacloban_notif_coord.csv",
        dataType: "text",
        success: function(data) {processData(data);}
    });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines=[];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
            }
            lines.push(tarr);
        }
    }
    
    for (var i=0; i<=lines.length;i++){
        var to_input = "<h1>STORM SURGE WARNING</h1>"
        + "<p style = 'color:red';''font-weight='bold'>"+(lines[i][0].substring(5,lines[i][0].length))
        + ", Tacloban City, 6500 Leyte, Philippines</p>"
        + "Expect a surge as early as "
        + ((parseFloat((lines[i][4].substring(4,lines[i][4].length))))/60).toString()
        + " hours from now which can reach max height of "
        + (lines[i][3].substring(6,lines[i][3].length))
        + " meter(s) at "
        + (lines[i][0].substring(5,lines[i][0].length))
        + ". A contact your local government units for for their corresponding evacuation procedure"
        loc.push([to_input]);
        loc[i].push(lines[i][1].substring(7,lines[i][1].length));
        loc[i].push(lines[i][2].substring(7,lines[i][2].length));
    }

    
}



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