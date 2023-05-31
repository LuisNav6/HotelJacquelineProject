import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: mapboxgl.Map = {} as mapboxgl.Map;
  constructor() { }
  inicializarMapa() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibHVpc25hdjYiLCJhIjoiY2xoZHVwMmdxMHEzbjNlcGcxMGNkbmR4eSJ9.NqQcfdV5l-XeRgpPHc4xEQ';

    // Crea la instancia de Mapbox GL
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-105.267, 21.0167],
      zoom: 9,
      accessToken: 'pk.eyJ1IjoibHVpc25hdjYiLCJhIjoiY2xoZHVwMmdxMHEzbjNlcGcxMGNkbmR4eSJ9.NqQcfdV5l-XeRgpPHc4xEQ',
      attributionControl: false
    });
  }

  agregarMarcador(lng: number, lat: number) {
    // Agrega un marcador al mapa
    const marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(this.map);
  }
}
