import { Loader } from "@googlemaps/js-api-loader";
import { useRef, useEffect, useState } from "react";
import { splitObject } from "../utils";
import MAPS_CONFIG from "../maps.config";

interface Props {
  markersList: any[];
}

declare global {
  interface Window {
    google: any;
  }
}

function Map({ markersList }: Props) {
  const mapRef = useRef(null);

  const centerPoint = { lat: -23.550440605180558, lng: -46.63391353481892 };

  const [globalMap, setGlobalMap] = useState<any>();
  const [google, setGoogle] = useState<any>();
  const [currentMarkers, setCurrentMarkers] = useState<any>([]);

  useEffect(() => {
    initMap(mapRef.current);
  }, []);

  useEffect(() => {
    if (google != undefined) {
      return buildMarkers(markersList);
    }
  }, [google, markersList]);

  useEffect(() => {
    if (currentMarkers.length > 0) {
      updateMap(currentMarkers, globalMap);
    }
  }, [currentMarkers]);

  async function initMap(mapRef: any) {
    const loader = new Loader({
      apiKey: "AIzaSyCmP7sBC0YPWnlYa35qz2mwcwFKW5lvRDQ",
    });

    let mapObject;

    loader.load().then(() => {
      const googleObject = window.google;
      mapObject = new googleObject.maps.Map(mapRef, {
        center: centerPoint,
        zoom: 8,
      });

      setGlobalMap(mapObject);
      setGoogle(googleObject);
    });
  }
  function createInfoHTML(info: any) {
    const fields = splitObject(info.fields);
    let infoHTML = `<h3 style="font-weight:bold;font-size: 16px;margin-bottom:10px;">${info.title}</h3>`;
    infoHTML += fields
      .map((field: any) => {
        const [fieldName, fieldValue] = Object.entries(field)[0];
        return `<p style="margin-bottom: 4px;"><strong style="margin-right: 5px;">${fieldName}: </strong>${fieldValue}</p>`;
      })
      .reduce((field: any, acc: any) => (acc += field));
    return infoHTML;
  }

  function createInfoWindow(marker: any, info: any) {
    const infoWindowHTML = createInfoHTML(info);
    const infowindow = new google.maps.InfoWindow({
      content: infoWindowHTML,
    });

    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(globalMap, marker);
    });
  }

  function getMarkerIcon(markerData: any) {
    const { field, value, color } = MAPS_CONFIG.markers.flag;
    const defaultColor = MAPS_CONFIG.markers.defaultColor;
    return markerData[field] == value
      ? `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color.replace(
          "#",
          ""
        )}`
      : `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${defaultColor.replace(
          "#",
          ""
        )}`;
  }

  function createMarker(markerData: any) {
    const position = { lat: markerData.lat, lng: markerData.long };
    const { name: title, ...fields } = markerData;
    const marker = new google.maps.Marker({
      position: position,
      icon: getMarkerIcon(markerData),
    });

    createInfoWindow(marker, { title, fields });
    return marker;
  }

  function toggleMarker(marker: any, map: any | null) {
    marker.setMap(map);
  }

  function drawMap(markers: any[], map: any) {
    markers.map((marker: any) => toggleMarker(marker, map));
  }

  function cleanMap() {
    currentMarkers.map((marker: any) => {
      toggleMarker(marker, null);
    });
  }

  function updateMap(markers: any[], map: any) {
    cleanMap();
    drawMap(markers, map);
  }

  function buildMarkers(markersData: any[]) {
    cleanMap();
    const markers = markersData.map((marker: any) => createMarker(marker));

    setCurrentMarkers(markers);
  }

  return <div id="map" ref={mapRef} />;
}

export default Map;
