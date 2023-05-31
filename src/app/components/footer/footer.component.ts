import { Component } from '@angular/core';
import {faThumbsUp, faClockFour} from '@fortawesome/free-regular-svg-icons';
import {faPiggyBank, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  faThumbsUp = faThumbsUp;
  faClockFout = faClockFour;
  faPiggyBank = faPiggyBank;
  faFacebook = faFacebook;
  faEnvelope = faEnvelope;
  faInstagram = faInstagram;
}
