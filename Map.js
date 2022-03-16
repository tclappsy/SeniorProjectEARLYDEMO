import React, {useEffect, useRef, useState} from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

mapboxgl.accessToken = "pk.eyJ1IjoiaWFua3JlbXBhIiwiYSI6ImNrdWU5czV3azFpYW8ycm84bzg0c3h1ajIifQ.8y2j2_cuaGGr2MUgxts3sA"

function Map(props) {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [zoom, setZoom] = useState(14);



  useEffect(() => {
    //Runs only on the first render
    if ("geolocation" in navigator) {
      console.log("Location Services: Available");
    } else {
      console.log("Location Services: Not Available");
    }

    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
    });

  }, []);

  useEffect(() => {

    
    if(lng && lat !== null)
    {

      var directions = new Directions({
        accessToken: mapboxgl.accessToken,
        controls: {inputs: false, markers: false}
        })
    
        //adds search box to map
        var searchbox = new MapboxGeocoder
          ({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          marker: false,
          proximity: {
            longitude: lng,
            latitude: lat
          }
        });
    

    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current, //tells Mapbox GL JS to render the map inside a specific DOM element.
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [lng, lat],
      zoom: zoom
    });

    // const marker = new mapboxgl.Marker()
    //   marker.setLngLat([lng, lat]) //creates marker on starting point
    //   marker.addTo(map.current);

    map.current.addControl(directions, 'top-left');
    map.current.addControl(searchbox)

    map.current.on('load', function() {
      directions.setOrigin([lng, lat])
    })

    searchbox.on('result', function(e) {
      console.log("Clicked Cords: ", e.result.center)
      directions.setDestination(e.result.center)
    })

    if(props !== null){
      // directions.setDestination(props.prop)
      console.log("Sent Search: ", props.prop)
      searchbox.query(props.prop)
      }


  }

  });

  
  useEffect(() => { //updates coords displayed on screen
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

  });

    
      return (
        <div>
         
          <div className="sidebar">
              Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>

          <div ref={mapContainer} className="map-container" />
          
      
        </div>

        
      )


}

export default Map