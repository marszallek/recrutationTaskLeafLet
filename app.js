const app = new Vue({
    el: '#app',
    data: {
        map: null,
        tileLayer: null,
        markers: [],
        northSouth: 'N',
        eastWest: 'W',
        index: 1,
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            this.map = L.map('map', {
                doubleClickZoom: false,
                zoomControl: false,
                maxBounds: [[90, 180],[-90, -180]],
                }).setView([54, 19], 5),
            this.tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery ù <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 20,
                minZoom: 1,
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
                L.marker([lat, long], {draggable: true, title: `${this.index++}`}).addTo(this.map)    
            );
        },
        converterNS(coordinate){
            let degrees = parseInt(coordinate);
            let minutes = coordinate - parseInt(coordinate);
            minutes = Math.round(minutes*600)/10;
            degrees = Math.abs(degrees);
            minutes = Math.abs(minutes);
            coordinate < 0 ? this.northSouth = 'S' : this.northSouth= 'N'
            return `${degrees}∞ ${minutes}'`
        },
        converterEW(coordinate){
            let degrees = parseInt(coordinate);
            let minutes = coordinate - parseInt(coordinate);
            minutes = Math.round(minutes*600)/10;
            if(degrees > 180 && minutes > 0) { degrees = degrees - 360};
            if(degrees < -180 && minutes < 0) { degrees = degrees + 360};
            degrees < 0 ? this.eastWest = 'W' : this.eastWest= 'E';
            degrees = Math.abs(degrees);
            minutes = Math.abs(minutes);            
            return `${degrees}∞ ${minutes}'`
        },
    },
});