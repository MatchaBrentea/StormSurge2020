
function text(){
    var request = new XMLHttpRequest();
    
    var today = new Date();   
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var apiKey = 'ddb86e90de561fbfbe516e1654093998';
    var apiSecret=  '493c73fae59a955b07ae33254188bec7';
    var from = 'SMSLSurge';
    var to = ['09298146675', '09088860685'];
    var text = "STORM SURGE WARNING!%0a%0aStorm Surge Detected at Tacloban City!"
                +"Detected at "+date+" on "+time+"%0a%0a"
                +"%0aPlease be advised of the details of the storm surge generated at https://raw.githubusercontent.com/MatchaBrentea/stormsurgefiles/master/HaiyanTacloban.notifications"
                +"%0a%0aStay Safe and God Bless!";

    var arr_len = to.length;
    for(var i=0; i<=arr_len-1;i++){
        var url = `https://api.promotexter.com/sms/send?apiKey=${apiKey}&apiSecret=${apiSecret}&from=${from}&to=${to[i]}&text=${text}`;

        request.open('POST', `${url}`);

        request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
        }
        };

        request.send();   
        // alert(`${url}`);
    }

    alert("Early Warning SMS Sent!");
    }

