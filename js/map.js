(function(window, document, undefined) {
    // initial zoom value to pass to Google Maps API when generating static maps
    var GOOGLE_MAPS_INITIAL_ZOOM = 8;
    var searchForm = document.getElementById('search-form');
    var map = null;

    searchForm.addEventListener('submit', function(event) {
        // clear autocomplete suggestions if they exist
        var suggestions = document.getElementById('suggestions');
        if (suggestions) {
            suggestions.innerHTML = '';
        }

        var mapExists = (map !== null);
        event.preventDefault();

        if (!mapExists) {
            // create image element to hold map
            map = document.createElement('img');
            map.id = 'map';
        }

        var zoomLevel = GOOGLE_MAPS_INITIAL_ZOOM;
        var searchTerm = search.value;

        // zoom out every one second by means of asynchronous recursion
        (function zoomOut() {
            if (zoomLevel === 0) {
                // we've finished zooming
                return;
            }

            // update source address based off zoom level
            map.src = 'http://maps.google.com/maps/api/staticmap?center=' +
                searchTerm + '&size=640x395&maptype=roadmap&sensor=false' +
                '&zoom=' + zoomLevel;

            // decrement zoom in preparation for next recursive call
            zoomLevel--;

            // callback in one second
            setTimeout(zoomOut, 1000);
        })();

        map.alt = 'Map of ' + searchTerm;

        if (!mapExists) {
            // add map to DOM if it was just created
            searchForm.parentNode.appendChild(map);
        }
    });
})(this, this.document);
