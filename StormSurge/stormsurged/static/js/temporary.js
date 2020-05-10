var final_str;
    var color='#ffffff';
    var intro = '{"type": "FeatureCollection",\n"features" :[\n';
    var outro = ']\n}';
    var output;

    Papa.parse('https://raw.githubusercontent.com/StormSurgeApp/StormSurgeFiles/master/fort.14', {
        download: true,
        dynamicTyping: true,

        complete: function(results) {
        
        data=results.data;
        NE=data[1][0];
        NP=data[1][1];
        var j;
        for(j=0;j<NE;j++){
            final_str+='{\n"id":'+j;
            final_str+= '\n"type": "Feature",\n';
            final_str+='"geometry": {\n';
            final_str+='"type": "Polygon",\n';
            final_str+='"coordinates": [\n';
            final_str+='[\n';
            final_str+= '[\n'+String(data[data[NP+2+j][2]+1][1])+',\n'+String(data[data[NP+2+j][2]+1][2])+'\n],\n';
            final_str+= '[\n'+String(data[data[NP+2+j][3]+1][1])+',\n'+String(data[data[NP+2+j][3]+1][2])+'\n],\n';
            final_str+= '[\n'+String(data[data[NP+2+j][4]+1][1])+',\n'+String(data[data[NP+2+j][4]+1][2])+'\n]\n';
            final_str+= ']\n]\n},\n';
            final_str+= '"properties": {\n';
            final_str+= '"fill": "'+color+'",\n';
            final_str+= '"fill-opacity": 0.6274509803921569,\n';
            final_str+= '"stroke-opacity": 0\n';
            final_str+= '}\n},\n';
        }
        
            output = String(intro) + String(final_str) + String(outro);

        function download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
         }

         download("inundation_rammasum.geojson",String(output));
         alert("File Loading Done!");
        }
    });