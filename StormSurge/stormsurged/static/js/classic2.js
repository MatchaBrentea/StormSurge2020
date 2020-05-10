var url_str = "https://raw.githubusercontent.com/MatchaBrentea/stormsurgefiles/master/"
var kml_docs = ["inundation_Haiyan.geojson"];
var i;
var loc=[];
var notif_arr=[];



map = L.map('map').setView([11.2142199211672, 125.009497200035], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var sidebar = L.control.sidebar('sidebar').addTo(map);



var allResults = [];
var triangles=[];

    
    Papa.parse('https://raw.githubusercontent.com/StormSurgeApp/StormSurgeFiles/master/kml%20files/fort.14', {
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
    var triangle=L.polygon(temp);
    triangle.addTo(map);
    triangles.push(temp);
    }

    }
    });



Papa.parse('https://raw.githubusercontent.com/MatchaBrentea/stormsurgefiles/master/timeseriesHaiyan_1_0_new.txt', {
    download: true,
    dynamicTyping: true,
    worker: true,
    complete: function(results) {
        notif_arr=results.data
         alert("done");
         console.log("done");
        // main algo
        time_series=results.data;
        var frame_num = (time_series.length - 1) / 9000;
        original_time=time_offset;

        var el = document.getElementById("startBtn");
        if (el.addEventListener)
            el.addEventListener("click", animateKML.bind(this,time_series), false);
        else if (el.attachEvent)
            el.attachEvent('onclick', animateKML.bind(this,time_series));  

        var el2 = document.getElementById("stopBtn");
        if (el2.addEventListener)
            el2.addEventListener("click", cancelAnimation, false);
        else if (el2.attachEvent)
            el2.attachEvent('onclick', cancelAnimation)
    }
});
    


function getColor(regionId,str) 
{
    if(regionId==str[0]){
        return str[1];
    }
}


var anim;
var time_offset;
var original_time;
time=0;
time_offset = new Date('2013','11' - 1 , '4', '6', '0' + 480, 0, 0)
document.getElementById("AnimationTime").innerHTML = '<p><font size=4> Typhoon Haiyan in Tacloban City </font></p>' + '<p><font size=4>'+time_offset.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })+'</font></p>'

function animateKML(time_series) 
{
    if (time>(time_series.length/triangles.length)-1){
        time = 0;
        //console.log(time,time_offset);
      } 
    for(var k=0;k<triangles.length;k++){
        var asd = {"type": "FeatureCollection",
                "features" :[
                {
                "type": "Feature",
                "geometry": {
                "type": "Polygon",
                "coordinates": [
                triangles[k]
                ]
                },
                "properties": {
                "fill": "#3ab6bd",
                "fill-opacity": 0.6274509803921569,
                "stroke-opacity": 0
                }
                }
                ]
                };
        
        function style(feature) {
            return {
                fillColor: time_series[time*triangles.length+k][0],
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }
        
        L.geoJson(asd, {style: style}).addTo(map);
        // console.log(time_series[time*triangles.length+k][0]);
        // sub.setStyle({fillColor: time_series[time*9000+k][0]})
    }
    time++;
    map.removeLayer(asd);
    anim=requestAnimationFrame(animateKML.bind(this,time_series));
    
  }    

  function cancelAnimation(){
    cancelAnimationFrame(anim);
  }
