import { Component } from '@angular/core';

interface Jobs{
  id: number,
  url: string;
  title: string;
  subtitle: string;
  description: string;
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {

  jobs: Jobs[] = [
    { id: 0, url: '/assets/CPF.jpg', title: 'Info - 20/04/2023', subtitle:"Chef de projets", description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
    consequatur, hic neque excepturi adipisci natus`},
    { id: 1, url: '/assets/FNE.jpg', title: 'Info - 20/04/2023', subtitle:"Développeur web", description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
    consequatur, hic neque excepturi adipisci natus?`},
    { id: 2, url: '/assets/OPCO.jpg', title: 'Info - 20/04/2023',subtitle:"Expert comptable ", description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
    consequatur, hic neque excepturi adipisci natus?`},
  ]
}
