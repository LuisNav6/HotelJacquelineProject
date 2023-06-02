import { Component, AfterViewInit } from '@angular/core';
import { MapService } from 'src/app/shared/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit{
  constructor(private mapService : MapService){}

  ngAfterViewInit(){
    this.mapService.inicializarMapa();
  }

   agregarMarcador() {
    this.mapService.agregarMarcador(-105.267, 21.0167);
  }
}
