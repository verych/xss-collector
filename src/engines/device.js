document.data.device = {};
(function() {
    var el = document.getElementById("device");
    var browser = document.getElementById("browser");
    var os = document.getElementById("os");
    var parser = new UAParser();
    if (parser.getDevice() && parser.getDevice().name) {
        document.data.device.name = JSON.stringify(parser.getDevice());
    }

    document.data.device.cpu = navigator.platform;
    if (parser.getCPU() && parser.getCPU().name) {
        document.data.device.cpuData =parser.getCPU();
    }
    document.data.device.hardwareConcurrency = (navigator.hardwareConcurrency ? navigator.hardwareConcurrency + ' Cores' : '');


    document.data.device.os = parser.getOS().name + ' ' + parser.getOS().version;
    document.data.device.browser = parser.getBrowser().name + ' ' + parser.getBrowser().version;



    function updateBatteryStatus(battery) {
        
        document.data.device.battery = (battery.charging ? 'charging' : 'not charging');
        document.data.device.batteryLevel =  (Math.round(battery.level * 10000) / 100) + '%';
        if (!battery.charging) {
            document.data.device.batteryChargingRemain = (battery.dischargingTime === Infinity ? 'Infinity' : (Math.round(100 * battery.dischargingTime / 3600) / 100) + 'h');
        } else {
            document.data.device.batteryChargingTime = (battery.chargingTime === Infinity ? 'Infinity' : (Math.round(100 * battery.chargingTime / 3600) / 100) + 'h');
        }
    }

    navigator.getBattery().then(function(battery) {
        // Update the battery status initially when the promise resolves ...
        updateBatteryStatus(battery);
    });
    window.addEventListener('devicelight', function(event) {
        document.data.device.ambient = 'Ambient Light: ' + event.value;
    });


    /* GPU */
    var canvas = document.createElement('canvas');

    canvas.id = "CursorLayer";
    canvas.width = 1;
    canvas.height = 1;
    canvas.style.zIndex = 0;
    canvas.style.position = "absolute";
    //var body = document.getElementsByTagName("body")[0];
    //body.appendChild(canvas);

    var gpu = {};
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {}
    if (gl) {
        var extension = gl.getExtension('WEBGL_debug_renderer_info');

        if (extension != undefined) {
            gpu.Vendor = "Vendor: " + gl.getParameter(extension.UNMASKED_VENDOR_WEBGL);
            gpu.Renderer = "Renderer: " + gl.getParameter(extension.UNMASKED_RENDERER_WEBGL);
        } else {
            gpu.Vendor = "Vendor: " + gl.getParameter(gl.VENDOR);
            gpu.Renderer = "Renderer: " + gl.getParameter(gl.RENDERER);
        }
    }
    gpu.Display = 'Display: ' + window.screen.width + ' x ' + window.screen.height + ' - ' + window.screen.colorDepth + 'bits/pixel';

    document.data.gpu = gpu;

    document.data.plugins = [];
    for(var ii=0; ii<navigator.plugins.length;ii++){
        document.data.plugins.push({
            name: navigator.plugins[ii].name,
            filename: navigator.plugins[ii].filename,
            description: navigator.plugins[ii].description
            
        });
    }
    //document.data.plugins = navigator.plugins;
    document.data.inprogress--;

}())
