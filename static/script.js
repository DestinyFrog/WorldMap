
// Load map
var map = L.map('map')
	.setView([0, 0], 2);

// Load Tile layer
L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 20,
	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
})
	.addTo(map)

// --------

const search_input = document.getElementById('search-input')
const search_box = document.getElementById('search-box')

search_box.onsubmit = (ev) => {
	ev.preventDefault()

	const input_val = search_input.value
	setInMap( input_val )
}

async function setInMap(sign) {
	const response = await fetch(`/find/${sign}`)
	var { geometry: { type, coordinates } } = await response.json()

	if ( type == 'Polygon' ) {
		coordinates = coordinates[0].map( ([u,t]) => [t,u] )
	} else if ( type == 'MultiPolygon' ) {
		coordinates = coordinates.map( d => d[0].map( ([u,t]) => [t,u] ) )
	}

	var polygon = L.polygon(coordinates, 
		{ color: 'red' })
	
	polygon.addTo(map)
	map.fitBounds( polygon.getBounds() )
}