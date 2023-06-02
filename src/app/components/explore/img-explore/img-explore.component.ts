import { Component } from '@angular/core';

@Component({
  selector: 'app-img-explore',
  templateUrl: './img-explore.component.html',
  styleUrls: ['./img-explore.component.scss']
})
export class ImgExploreComponent {
  images = [
    { url: 'assets/imgs/beach/beach17.jpg' },
    { url: 'assets/imgs/beach/beach15.jpg' },
    { url: 'assets/imgs/beach/beach16.jpg' },
    { url: 'assets/imgs/beach/beach13.jpg' },
    { url: 'assets/imgs/beach/beach14.jpg' },
    { url: 'assets/imgs/beach/beach12.jpg' },
    { url: 'assets/imgs/beach/beach11.jpg' },
    { url: 'assets/imgs/beach/beach10.jpg' },  
    { url: 'assets/imgs/beach/beach8.jpg' },
    { url: 'assets/imgs/beach/beach2.jpg' },
    { url: 'assets/imgs/beach/beach6.jpg' },
    { url: 'assets/imgs/beach/beach5.jpg' },
    { url: 'assets/imgs/beach/beach7.jpg' },
    { url: 'assets/imgs/beach/beach3.jpg' },
    { url: 'assets/imgs/beach/beach4.jpg' },
    { url: 'assets/imgs/beach/beach1.jpg' },
    { url: 'assets/imgs/beach/beach9.jpg' },
  ];

  constructor() {
    this.shuffle(this.images); // Mezcla las imágenes al crear el componente
  }

  shuffle(array: any[]) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  onImageLoad(event: Event) {
    (event.target as HTMLImageElement).classList.add('loaded');
  }
}
