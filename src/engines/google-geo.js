
(function() {
    function languages(langs) {
        if (!langs.reduce) {
            return languageMap[langs];
        }
        return langs.reduce(function(a, e) {
            if (e === 'en-US' && langs.indexOf('en-US') > -1) {
                return a;
            }
            return a + (window.languageMap[e] ? (window.languageMap[e].int + ', ') : (e + ', '))
        }, '');
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
            var el = document.getElementById("location");

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var geolocation = JSON.parse(xhttp.responseText).location;
            document.data.location = geolocation;

            var xhttp2 = new XMLHttpRequest();
            xhttp2.onreadystatechange = function() {
                if (xhttp2.readyState == 4 && xhttp2.status == 200) {
                    var locationName = JSON.parse(xhttp2.responseText).results;
                    
                    document.data.addr = locationName;
                    document.data.lang = languages(navigator.languages || navigator.language || navigator.userLanguage);
                    document.data.time = new Date();
                }
            };

            xhttp2.open("POST", 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + geolocation.lat + ',' + geolocation.lng + '&sensor=true', true);
            xhttp2.send();
        }
        if (xhttp.readyState == 4) {
            document.data.inprogress--;
        }
    };


    var keys = [
        'AIzaSyBaaivVXLW8bNtLJhnBLIshQY5SQiLkGzA'
    ];

    var index = Math.round((keys.length - 1) * Math.random());
    var key = keys[index];
    xhttp.open("POST", "https://www.googleapis.com/geolocation/v1/geolocate?key=" + key, true);
    xhttp.send();


}())
