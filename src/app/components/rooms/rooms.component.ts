import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {
  

  constructor(private route: ActivatedRoute) {}
  mostrarImagenes = true;
  fontSizeh1: number = 46; // Tamaño de fuente inicial
  fontSizeh3: number = 30;
  fontSizeh2: number = 38;
  fontSizeh5: number = 26;
  fontSizeh6: number = 22;
  fontSizep: number = 14;

 
  onFontSizeChanged(delta: number) {
    this.fontSizeh1 += delta; 
    this.fontSizeh3 += delta;
    this.fontSizeh2 += delta;
    this.fontSizeh5 += delta;
    this.fontSizeh6 += delta;
    this.fontSizep += delta;
  }
  rooms = [
    { title: "Room one", bed: "1 ", bath: "2", desc: "Experience true comfort and relaxation in our stylishly designed room. Equipped with modern amenities, including a cozy bed, flat-screen TV, and high-speed internet, our room offers the perfect escape after a long day. Unwind in the tranquil ambiance, and enjoy a restful night's sleep in this cozy retreat.", url: 'assets/imgs/rooms/room1.jpg'},
    { title: "Room two", bed: "2", bath: "2", desc: "Experience true comfort and relaxation in our stylishly designed room. Equipped with modern amenities, including a cozy bed, flat-screen TV, and high-speed internet, our room offers the perfect escape after a long day. Unwind in the tranquil ambiance, and enjoy a restful night's sleep in this cozy retreat.", url: 'assets/imgs/rooms/room3.jpg'},
    { title: "Room five", bed: "2", bath: "1", desc: "Experience true comfort and relaxation in our stylishly designed room. Equipped with modern amenities, including a cozy bed, flat-screen TV, and high-speed internet, our room offers the perfect escape after a long day. Unwind in the tranquil ambiance, and enjoy a restful night's sleep in this cozy retreat.", url: 'assets/imgs/rooms/room5.jpg'},
    { title: "Room six", bed: "2", bath: "1", desc: "Experience true comfort and relaxation in our stylishly designed room. Equipped with modern amenities, including a cozy bed, flat-screen TV, and high-speed internet, our room offers the perfect escape after a long day. Unwind in the tranquil ambiance, and enjoy a restful night's sleep in this cozy retreat.", url: 'assets/imgs/rooms/room7.jpg'},
    { title: "Room eigth", bed: "1", bath: "3", desc: "Experience true comfort and relaxation in our stylishly designed room. Equipped with modern amenities, including a cozy bed, flat-screen TV, and high-speed internet, our room offers the perfect escape after a long day. Unwind in the tranquil ambiance, and enjoy a restful night's sleep in this cozy retreat.", url: 'assets/imgs/rooms/room8.jpg'},
    { title: "Room ten", bed: "1", bath: "2", desc: "Experience true comfort and relaxation in our stylishly designed room. Equipped with modern amenities, including a cozy bed, flat-screen TV, and high-speed internet, our room offers the perfect escape after a long day. Unwind in the tranquil ambiance, and enjoy a restful night's sleep in this cozy retreat.", url: 'assets/imgs/rooms/room10.jpg'},
    { title: "Room eleven", bed: "3", bath: "2", desc: "Experience true comfort and relaxation in our stylishly designed room. Equipped with modern amenities, including a cozy bed, flat-screen TV, and high-speed internet, our room offers the perfect escape after a long day. Unwind in the tranquil ambiance, and enjoy a restful night's sleep in this cozy retreat.", url: 'assets/imgs/rooms/room4.jpg'},
    { title: "Room twelve", bed: "1", bath: "3", desc: "Experience true comfort and relaxation in our stylishly designed room. Equipped with modern amenities, including a cozy bed, flat-screen TV, and high-speed internet, our room offers the perfect escape after a long day. Unwind in the tranquil ambiance, and enjoy a restful night's sleep in this cozy retreat.", url: 'assets/imgs/rooms/room2.jpg'},
    { title: "Room fifteen", bed: "1", bath: "3", desc: "Experience true comfort and relaxation in our stylishly designed room. Equipped with modern amenities, including a cozy bed, flat-screen TV, and high-speed internet, our room offers the perfect escape after a long day. Unwind in the tranquil ambiance, and enjoy a restful night's sleep in this cozy retreat.", url: 'assets/imgs/rooms/room6.jpg'},
    { title: "Room sixteen", bed: "3", bath: "1", desc: "Experience true comfort and relaxation in our stylishly designed room. Equipped with modern amenities, including a cozy bed, flat-screen TV, and high-speed internet, our room offers the perfect escape after a long day. Unwind in the tranquil ambiance, and enjoy a restful night's sleep in this cozy retreat.", url: 'assets/imgs/rooms/room15.webp'},
  ];

  onMostrarImagenesChanged(mostrar: boolean) {
    this.mostrarImagenes = mostrar;
  }
  searchTerm: string = '';
  highlightText(text: string): string {
    if (this.searchTerm.trim() !== '') {
      const pattern = new RegExp(this.searchTerm, 'gi');
      return text.replace(pattern, '<mark>$&</mark>');
    } else {
      return text;
    }
  }


}
