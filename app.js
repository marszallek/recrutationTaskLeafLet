const app = new Vue({
    el: '#app',
    data: {
        map: null,
        tileLayer: null,
        markers: [],
        index: 1
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            this.map = L.map('map').setView([54.51, 18.53], 12),
            this.tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoibWFyc3phbGxlayIsImEiOiJjanV0d3pvcngwOWJ2M3luNGR4cXZxMmR4In0.xuzEdqouG0Ik7kdgG4oLRQ'
            });
            this.tileLayer.addTo(this.map);
            this.markers.map((x) => x);
        },
        addMarker(event) {
            let lat = this.map.mouseEventToLatLng(event).lat;
            let long = this.map.mouseEventToLatLng(event).lng;
            this.markers.push(
                L.marker([lat, long], {draggable: true, title: `${this.index++}`}).addTo(this.map),    
            );
        },
    },
});