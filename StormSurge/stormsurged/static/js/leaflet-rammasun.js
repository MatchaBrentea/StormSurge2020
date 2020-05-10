var url_str = "https://raw.githubusercontent.com/MatchaBrentea/stormsurgefiles/master/"
var kml_docs = ["maxelev_Haiyan_2.geojson","maxelev_Haiyan_1_4_Leyte.geojson","maxelev_Haiyan_1_4_Samar.geojson","maxelev_Rammasun_1.geojson"];
var i;
var loc=[];
var notif_arr=[];



map = L.map('map').setView([14.50951, 120.62290], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var sidebar = L.control.sidebar('sidebar').addTo(map);


var allResults = [];
var triangles = [];


// Papa.parse('https://raw.githubusercontent.com/StormSurgeApp/StormSurgeFiles/master/fort.14', {
// download: true,
// dynamicTyping: true,

// complete: function(results) {

//     data=results.data;
//     NE=data[1][0];
//     NP=data[1][1];
//     var j;
//     for(j=0;j<NE;j++){
//     var temp = [
//         [data[data[NP+2+j][2]+1][2], data[data[NP+2+j][2]+1][1]],
//         [data[data[NP+2+j][3]+1][2], data[data[NP+2+j][3]+1][1]],
//         [data[data[NP+2+j][4]+1][2], data[data[NP+2+j][4]+1][1]]
//     ];
//     var triangle=L.polygon(temp);
//     // triangle.addTo(map);
//     triangles.push(temp);
//     }

// }
// });


Papa.parse('https://raw.githubusercontent.com/StormSurgeApp/StormSurgeFiles/master/kml%20files/timeseriesRammasun_1_0_new.txt', {
    download: true,
    dynamicTyping: true,
    complete: function(results) {
        notif_arr=results.data
        console.log("done");
        // main algo
        time_series=results.data;
        var frame_num = (time_series.length - 1) / 9000;
        original_time=time_offset;
        var el = document.getElementById("startBtn");
        if (el.addEventListener)
            el.addEventListener("click", animateKML.bind(this,time_series,time_offset), false);
        else if (el.attachEvent)
            el.attachEvent('onclick', animateKML.bind(this,time_series,time_offset));  

        var el2 = document.getElementById("stopBtn");
        if (el2.addEventListener)
            el2.addEventListener("click", cancelAnimation, false);
        else if (el2.attachEvent)
            el2.attachEvent('onclick', cancelAnimation)
    }
});
    

var anim;
var time_offset;
var original_time;
time=0;

time_offset = new Date('2014','10' - 1 , '14', '0', '0' + 480, 0, 0)

document.getElementById("AnimationTime").innerHTML = '<p><font size=4> Typhoon Rammasun in Bataan </font></p>' + '<p><font size=4>'+time_offset.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })+'</font></p>'

var barangays = $.ajax({
    url: url_str.concat(kml_docs[3]),
    dataType: "json",
    success: console.log("Barangay data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
    })

    function style() {
        return {
            weight: 0,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: 'white'
            };
        }

var triangle;

function animateKML(time_series,time_offset) 
{

    Papa.parse('https://raw.githubusercontent.com/StormSurgeApp/StormSurgeFiles/master/fort.14', {
        download: true,
        dynamicTyping: true,

        complete: function(results) {

            data=results.data;
            NE=data[1][0];
            NP=data[1][1];
            var j;
            for(j=0;j<NE;j++){
            var temp = [
                [data[data[NP+2+j][2]+1][2], data[data[NP+2+j][2]+1][1]],
                [data[data[NP+2+j][3]+1][2], data[data[NP+2+j][3]+1][1]],
                [data[data[NP+2+j][4]+1][2], data[data[NP+2+j][4]+1][1]]
            ];
            // triangle=L.polygon(temp);
            // triangle.addTo(map);
            triangles.push(temp);
            }

        }
        });

    if (time>(time_series.length/triangles.length)-1){
        time = 0;
        time_offset.setMinutes(time_offset.getMinutes()- 1440)
      } 

    for(var k=0;k<triangles.length;k++){

        setInterval(function(){
            // function style() {
            //     return {
            //         weight: 0,
            //         opacity: 1,
            //         color: 'white',
            //         dashArray: '3',
            //         fillOpacity: 0.7,
            //         fillColor: time_series[time*triangles.length+k][0]
            //         };
            //     }
            // var kybarangays = L.geoJSON(barangays.responseJSON,{style:style} ).addTo(map);

            // console.log(triangles[k]);
            triangle=L.polygon(triangles[k]);
            triangle.addTo(map);
        },2000);

        // console.log(time_series[time*triangles.length+k][0])
    }

    time++;
    time_offset.setMinutes(time_offset.getMinutes()+ 5)

    document.getElementById("AnimationTime").innerHTML = '<p><font size=4> Typhoon Rammasun in Bataan </font></p>' + '<p><font size=4>'+time_offset.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })+'</font></p>'
    // map.removeLayer(triangle);

    anim=requestAnimationFrame(animateKML.bind(this,time_series,time_offset));
    
    
  }    

  function cancelAnimation(){
    cancelAnimationFrame(anim);
  }
