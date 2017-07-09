function initMap() {
    var uluru = {lat: 49.287823, lng: -123.113112};
    var map = new google.maps.Map(document.getElementById('map'),{
        zoom: 7,
        center: uluru
    });

    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

initMap();
