import { useState, useEffect } from 'react';
import { 
  GoogleMap, 
  useLoadScript, 
  Marker,
} from '@react-google-maps/api';

import{
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";


const MapContainer = () => {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyDM3gz1YEc-seFi_xEHBwz_zsTb9yveZDk",
    libraries: ["places"]
  });

  if(!isLoaded) return (<div> <h1>Loading...</h1> </div>);
  return <Map />;
}


function Map(){

  const [addr,setAddr] = useState("");
  const [lat,setLat] = useState(43.783164958352664);
  const [lng,setLng] = useState(-79.18745570448675);

  useEffect(() => {
    async function fetchAddr(){
      await fetch("/api/customers/getDefaultAddress/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res => {
        return res.json();
      }).then(data => {
        setAddr(data.address);
      })
      
      if (addr != "Please log in to see your address" && addr !=""){
        try{
          const results = await getGeocode({ address: addr });
          const { lat, lng } = await getLatLng(results[0]);
          setLat(lat);
          setLng(lng);
          setAddr("");
        } catch(e) {
          console.log(e);
        }
      }
    }
    
    fetchAddr();
  }, [addr])
  

  const center = {lat: lat, lng: lng};
  
  const options = {
    disableDefaultUI: true,
    clickableIcons: false,
  }

  return (
    <GoogleMap 
      zoom={14} 
      center={center} 
      mapContainerClassName='map-container'
      options={options}
      >
      < Marker position={center} />
    </GoogleMap>
  )
}

export default MapContainer