(function() {
    var imageAddr = "https://upload.wikimedia.org/wikipedia/commons/2/2d/Snake_River_%285mb%29.jpg";
    var downloadSize = 5245329; //bytes

    function InitiateSpeedDetection() {
        window.setTimeout(MeasureConnectionSpeed, 1);
    };

    if (window.addEventListener) {
        window.addEventListener('load', InitiateSpeedDetection, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', InitiateSpeedDetection);
    }

    function MeasureConnectionSpeed() {
        var startTime, endTime;
        var download = new Image();
        download.onload = function() {
            endTime = (new Date()).getTime();
            showResults();
        }

        download.onerror = function(err, msg) {
            document.data.inprogress--;
        }

        startTime = (new Date()).getTime();
        var cacheBuster = "?nnn=" + startTime;
        download.src = imageAddr + cacheBuster;

        function showResults() {
            var duration = (endTime - startTime) / 1000;
            var bitsLoaded = downloadSize * 8;
            var speedBps = (bitsLoaded / duration).toFixed(2);
            var speedKbps = (speedBps / 1024).toFixed(2);
            var speedMbps = (speedKbps / 1024).toFixed(2);
            
            document.data.networkSpeed = speedMbps + ' Mbps';
            document.data.inprogress--;
        }
    }
    MeasureConnectionSpeed();

    document.data.network={};
    for (var key in navigator.connection) {
        //if (Object.prototype.hasOwnProperty.call(navigator.connection, key)) {
            document.data.network[key] = navigator.connection[key];
        //}
    }
}());
