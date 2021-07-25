<template>
  <MglMap

    :accessToken="accessToken"
    :mapStyle.sync="mapStyle"
    @load="onMapLoaded"
    showed=True
  >
  <MglAttributionControl />
      <MglNavigationControl position="top-right" />
      <MglGeolocateControl position="top-right" />
      <MglMarker :coordinates="coordinates">
      <v-icon slot="marker">{{mdiFerry}}</v-icon>
      <MglPopup>
        <VCard>
          <div>{{coordinates}}</div>
        </VCard>
      </MglPopup>
    </MglMarker>
     </MglMap>

</template>
<style>
</style>
<script>
import Mapbox from "mapbox-gl";
import { MglMap,MglAttributionControl,
  MglNavigationControl,
  MglGeolocateControl,
  MglFullscreenControl,MglMarker,MglPopup } from "vue-mapbox";
import { mdiFerry } from '@mdi/js';

export default {
  components: {
    MglMap,MglNavigationControl,
    MglGeolocateControl,MglAttributionControl,MglMarker,MglPopup,mdiFerry 
  },
  data() {
    return {
      accessToken: 'pk.eyJ1Ijoic2FydGhha2cwNCIsImEiOiJja3I5MzVkcjY0MXpkMzFxaHExYWh4aWxsIn0.bxQQ8FvYgfDC5hMef4TeKw', // your access token. Needed if you using Mapbox maps
      mapStyle:'mapbox://styles/mapbox/streets-v11', // your map style
      coordinates: [-111.549668, 39.014],
      mdiFerry
    };
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
  methods: {
    onMapLoaded(event) {
      // in component
      this.map = event.map;
      
      // or just to store if you want have access from other components
      this.$store.map = event.map;
    }
  }
};
</script>
