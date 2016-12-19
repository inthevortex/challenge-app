// site.js

(site = function() {

    var request = new XMLHttpRequest();
    var access_token, resp;

    populateList = function(response) {
        var resp = response,
            select = document.getElementById("selector");

        for (var i = 0, at = resp[i].vehicle_id; i < resp.length; i++) {
            var option = document.createElement("option");
            option.textContent = "Vehicle ID:" + at.toString();
            select.appendChild(option);
        };
    };

    getToken = function(callback) {
        request.open('POST', 'https://private-anon-5e477a5a98-timdorr.apiary-mock.com/oauth/token');

        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                //console.log('Headers:', this.getAllResponseHeaders());
                //console.log('Body:', this.responseText);
                callback.call(this.responseText);
                access_token = JSON.parse(this.responseText).access_token;
            }
        };

        request.send();
        getList();
    };

    getList = function() {
        request.open('GET', 'https://private-anon-5e477a5a98-timdorr.apiary-mock.com/api/1/vehicles');

        request.setRequestHeader('Authorization', `Bearer ${access_token}`);

        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                //console.log('Headers:', this.getAllResponseHeaders());
                //console.log('Body:', this.responseText);
                resp = JSON.parse(this.responseText).response;
                populateList(resp);
            }
        };

        request.send();
    };

    $("#selector").on("click", function() {
        getToken();
    });

    var $aboutcontact = $("#aboutcontact, #form");

    $("#toggle").on("click", function() {
        $aboutcontact.toggleClass("achide");
    })

})().module.exports;