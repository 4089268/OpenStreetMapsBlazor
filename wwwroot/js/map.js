/**
 * @typedef {Object} Position
 * @property {number|string} lat - The latitude coordinate.
 * @property {number|string} lon - The longitude coordinate.
 */

/**
 * @typedef {Object} CircleOptions
 * @property {string} borderColor
 * @property {string} fillColor
 * @property {number} fillOpacity
 * @property {number} radius
 */


/**
 * 
 * @param {string} elementID - id of the container for the map
 * @param {Position} centerPosition - center position of the map
 */
function initMap(elementID, centerPosition){

    // create map component
    document.MAP = L.map(elementID).setView([ centerPosition.lat, centerPosition.lon ], 10);

    // se the layers
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(document.MAP);

}

/**
 * Adds a marker to the map.
 * 
 * @param {Position} position - The position of the marker.
 */
function addMarker( position ){
    var marker = L.marker([ position.lat, position.lon ]).addTo( document.MAP );
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

    // save the marker
    if(!document.MARKERS){
        document.MARKERS = [];
    }
    document.MARKERS.push( marker);
}

/**
 * 
 * @param {Position} position 
 * @param {CircleOptions} options 
 */
function addCircle( position, options){
    var circle = L.circle([ position.lat, position.lon], {
        color: options.borderColor,
        fillColor: options.fillColor,
        fillOpacity: options.fillOpacity,
        radius: options.radius
    }).addTo( document.MAP );

    circle.bindPopup("I am a circle.");
    
    // save the circle
    if(!document.CIRCLES){
        document.CIRCLES = [];
    }
    document.CIRCLES.push(circle);
}