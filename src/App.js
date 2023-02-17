import React, { useEffect, useRef, useState } from 'react'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import Search from '@arcgis/core/widgets/Search'
import Locate from '@arcgis/core/widgets/Locate'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import esriConfig from '@arcgis/core/config'
import Popup from "@arcgis/core/widgets/Popup";
import axios from 'axios'

const App = () => {
  esriConfig.apiKey = "AAPKa7230f4fd162434ab9a67fd27ab75dc4h-4gnScgG6JrrnKxFIux57geq-nunKFbMrHjBS1XPgsUBc07w9yAQvMtHHhmNa8c";
  var mapm=new Map({
    basemap:"dark-gray",
    
  })
  const myref=useRef(null)


  const [view,setview]=useState(null)
const[locate1,setlocate1]=useState(null)
const[search,setsearch]=useState(null)


const gett=async(lat,lon)=>{
  const json = {
    "latitude": lat,
    "longitude": lon
} // [4.309846675143643, 52.07907129081514]
const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&key=AAPKa7230f4fd162434ab9a67fd27ab75dc4h-4gnScgG6JrrnKxFIux57geq-nunKFbMrHjBS1XPgsUBc07w9yAQvMtHHhmNa8c`)
console.log('res',res);
}

if(view)
{

  view.on("click", function(event) {
    // Get the coordinates of the click on the view
    var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
    var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
gett(lat,lon)
    
    setTimeout(() => {
      view.popup.open({
        title: "Ongeldige locatie",
        content: "U meldt een locatie buiten de regio Den Haag",
        location: {  longitude: lon,
          latitude: lat
        },
      });
      console.log('bolo');
    }, 500);
   

    
  })


}


useEffect(()=>{
  setview(
    new MapView({
      container:myref.current,
      map:mapm,
      zoom:15,
      center:[75.09,21.68]
    })
  )
},[])

useEffect(()=>{
if(view)
{
const search = new Search({  //Add Search widget
  view: view,popupEnabled:false
});
setsearch(search)
view.ui.add(search, "top-right"); //Add to the map


const locate = new Locate({
  view: view,
  useHeadingEnabled: false,
  goToOverride: function(view, options) {
    options.target.scale = 10000;
    return view.goTo(options.target);
  }
});
view.ui.add(locate, "top-left");
setlocate1(locate)
}
},[view])

useEffect(()=>{
  let lng=''
  let lat=''
  if(locate1 )
  {
    locate1.on("locate", function(locateEvent){
      lat=locateEvent.position.coords.latitude
      lng=locateEvent.position.coords.longitude
console.log('hye');
if(view)
{
  view.popup.open({
    title: "Ongeldige locatie",
    content: "U meldt een locatie buiten de regio Den Haag",
    location: {  longitude: lng,
      latitude: lat
    },
  });

  console.log('hye');
}
    

     })
  }
 
 
},[locate1])

const graphicsLayer = new GraphicsLayer();
mapm.add(graphicsLayer);

const point = { //Create a point
  type: "point",
  longitude:75.08680339729631 ,
  latitude: 21.68682268820199
};



const simpleMarkerSymbol = {
  type: "simple-marker",
  color: [226, 119, 40],  // Orange
  outline: {
      color: [255, 255, 255], // White
      width: 1
  }
};

const pointGraphic = new Graphic({
  geometry: point,
  symbol: simpleMarkerSymbol
});
graphicsLayer.add(pointGraphic)


useEffect(()=>{
  let late=''
  let long=''
if(search)
{


  search.on("select-result", function (evt) {
    const geometry = evt.result.feature.geometry;
    late=geometry.latitude
    long=geometry.longitude
    
    if( view)
{
  console.log('hey-',late,'-',long);
  view.popup.open({
    title: "Ongeldige locatie",
    content: "U meldt een locatie buiten de regio Den Haag",
    location: {  longitude: long,
      latitude: late
    },
  });
}
  });
}



},[search])

  return (
  <div ref={myref} style={{height:"700px",width:"80%"}}>
   
  </div>
  )
}

export default App