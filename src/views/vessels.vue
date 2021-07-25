<template>
<v-main>

    <div>
      <v-card width="300" class="float-left" id='zaa' overlay>
        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            MEDU8894300
          </div>

          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :color="message.color"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ message.from }}</strong> @{{ message.time }}
                </div>
                <div>{{ message.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
<v-card width="220px" class="float-right" id='legend'>
Legend:
<table>
<tr>  
<td>
<img src='../assets/grey.png' height="25vh">
</td>
<td>
Active Container
</td>
</tr>
<tr>
<td>
<img src='../assets/red.png' height="25vh">
</td>
<td>
Running Late
</td>
</tr><tr>
<td>
<img src='../assets/green.png' height="25vh">
</td>
<td>
On Time
</td>
</tr><tr>
<td>
<img src='../assets/white1.png' height="25vh">
</td>
<td>
Shipped
</td>
</tr><tr>
<td>
<img src='../assets/tornado.png' height="25vh">
</td>
<td>
Storm
</td>
</tr>
</table>
</v-card>
    <mapbox
      access-token="pk.eyJ1Ijoic2FydGhha2cwNCIsImEiOiJja3I5MzVkcjY0MXpkMzFxaHExYWh4aWxsIn0.bxQQ8FvYgfDC5hMef4TeKw"
      :map-options="{
        style: 'mapbox://styles/mapbox/light-v9',
        center: [-96, 37.8],
        zoom: 3,
      }"
      :geolocate-control="{
        show: true,
        position: 'top-left',
      }"
      @map-load="loaded"
      @map-zoomend="zoomend"
      @map-click:points="clicked"
      @geolocate-error="geolocateError"
      @geolocate-geolocate="geolocate"
      @map-legend="legend"
    />
  </div>

  </v-main>
</template>
 <style>
 #zaa{
  z-index: 2;
  position:absolute;
  margin-left:0;
}
#legend{
  z-index:2;  
  background-color:white;
  color:grey;
  font-family:serif;
  position:relative;
  margin-left:75vw;
}
td{
  padding:1vw;
}
 </style>
<script>
import Mapbox from 'mapbox-gl-vue'
 
export default {
  components: { Mapbox },
  data:()=>({
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
      messages: [
        {
          from: 'BOSTON, MA, US',
          message: `Gate In Full`,
          time: '30/04/2021',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'BOSTON, MA, US',
          message: 'Loaded',
          time: '07/05/2021',
          color: 'green',
        },
        {
          from: 'FREEPORT, GRAND BAHAMA, BS',
          message: 'Transshipment Discharged',
          time: '	16/05/2021',
          color: 'deep-purple lighten-1',
        },
      ],
      items: [
          { title: 'Home', icon: 'mdi-home-city', to:'/' },
          { title: 'My Account', icon: 'mdi-account', to:'/vessels' },
          { title: 'Users', icon: 'mdi-account-group-outline', to:'' },
        ],
  }),
  methods: {
    loaded(map) {
      map.loadImage('../assets/red.png',function (error, image) {
if (error) throw error;
map.addImage('custom-marker', image);
      }),
      map.addSource('route', {
'type': 'geojson',
'data': {
'type': 'Feature',
'properties': {},
'geometry': {
'type': 'LineString',
'coordinates': [
[-71.038887,42.364506],
[-68.29101562500001,37.71859032558816],
[-68.30800781250001,37.26530995561875],

[-69.25781250000001,34.52466147177175],
[-69.16992187500001,33.211116472416855],
[-69.26992187500001,33.261116472416855],
[-78.6429, 26.5333],
]
}
}
});
map.addLayer({
'id': 'route',
'type': 'line',
'source': 'route',
'layout': {
'line-join': 'round',
'line-cap': 'round'
},
'paint': {
'line-color': '#888',
'line-width': 8
}
});
      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-71.038887,42.364506],
                },
                properties: {
                  title: 'Boston Harbor',
                  icon: 'harbor',
                },
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-78.6429, 26.5333],
                },
                properties: {
                  title: 'Bahamas Freeport grand',
                  icon: 'harbor',
                },
              },
            ],
          },
        },
        layout: {
          'icon-image': '{icon}-15',
          'text-field': '{title}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top',
        },
      })
    },
    legend(map,e){
    L.mapbox.legendControl({ position: 'topright' }).addLegend('<strong>My walk from the White House to the hill!</strong>').addTo(e);
    console.log('legend loaded')
    },
    zoomend(map, e) {
      console.log('Map zoomed')
    },
    clicked(map, e) {
      const title = e.features[0].properties.title
      console.log(title)
    },
    geolocateError(control, positionError) {
      console.log(positionError)
    },
    geolocate(control, position) {
      console.log(
        `User position: ${position.coords.latitude}, ${position.coords.longitude}`
      )
    },
  },
}
</script>
 
<style>
#map {
  position:absolute;
  width: 100%;
  height: 85vh;
}
</style>