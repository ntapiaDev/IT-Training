import { Component, OnDestroy, OnInit, HostListener } from "@angular/core";
import { SlideInterface } from "./types/slide.interface";
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    animations: [
      trigger('slideAnimation', [
        transition(':increment', [
          style({opacity: 0}),
          animate('1000ms ease-in-out', style({ opacity: 1})),
        ]),
        transition(':decrement', [
          style({opacity: 1}),
          animate('1000ms ease-in-out', style({ opacity: 0})),
        ]),
      ]),
    ],
  })
  

export class CarouselComponent implements OnInit, OnDestroy{
    currentIndex: number = 0;
    ClickMessage: string ='';
    isOpen = true;
    isMove = true;
    slide: any;
    isMouseOver = false;

    private autoScrollInterval: any;
  
    ngOnInit() {
        // Démarrez le défilement automatique au chargement du composant
        this.startAutoScroll();
      }
      ngOnDestroy() {
        // Assurez-vous d'arrêter le défilement automatique lorsque le composant est détruit
        this.stopAutoScroll();
      }
      startAutoScroll(): void {
        // // Démarrez le défilement automatique toutes les 5 secondes (ajustez la valeur selon vos préférences)
        // this.autoScrollInterval = setInterval(() => {
        //   this.goToNext();
        // }, 5000); // 5000 millisecondes = 5 secondes

        if (!this.isMouseOver) {
          // Démarrez le défilement automatique toutes les 5 secondes (ajustez la valeur selon vos préférences)
          this.autoScrollInterval = setInterval(() => {
            this.goToNext();
          }, 5000); // 5000 millisecondes = 5 secondes
        }
      }
      
      stopAutoScroll(): void {
        // Arrêtez le défilement automatique en effaçant l'intervalle
        clearInterval(this.autoScrollInterval);
      }


    slides: SlideInterface[] = [
        { id: 0, "url": '/assets/CPF.jpg', "title": 'CPF', "subtitle":"Particuliers - Entreprises ", "description": `CPF : Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
        consequatur, hic neque excepturi adipisci natus`},
        { id: 1, "url": '/assets/FNE.jpg', "title": 'FNE', "subtitle":"Entreprises", "description": `Dispositif FNE - Formation : Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
        consequatur, hic neque excepturi adipisci natus?`},
        { id: 2, "url": '/assets/OPCO.jpg', "title": 'OPCO',"subtitle":"Entreprises", "description": `Action collectives - OPCO : Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
        consequatur, hic neque excepturi adipisci natus?`},
        { id: 3, "url": '/assets/POEI.jpg', "title": 'POEI',"subtitle":"Particulier - Entreprises", "description": `Reconversion professionnelle - POEI : Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
        consequatur, hic neque excepturi adipisci natus?`},
      ];

    goToNext(): void {
        const isLastSlide = this.currentIndex === this.slides.length - 1;
        const newIndex =  isLastSlide ? 0 : this.currentIndex + 1;
        this.currentIndex = newIndex;
    }
    goToPrevious(): void {
        const isFirstSlide = this.currentIndex === 0;
        const newIndex = isFirstSlide 
        ? this.slides.length - 1
        : this.currentIndex - 1;
        this.currentIndex = newIndex;
    }
    goToSlide(slideIndex: number): void {
        this.currentIndex = slideIndex;
    }
    goToImg(slideIndex: number): void{
        this.currentIndex = slideIndex;
    }

    getCurrentSliderUrl(): string {
        return `url('${this.slides[this.currentIndex].url}')`
    }
    getCurrentSliderTitle(): string {
        return `${this.slides[this.currentIndex].title}`
    }

    toggleAutoScroll(enabled: boolean): void {
      if (enabled) {
        this.startAutoScroll();
      } else {
        this.stopAutoScroll();
      }
    }
   
    @HostListener('mouseenter')
onMouseEnter(): void {
  this.isMouseOver = true;
  this.toggleAutoScroll(false); // Désactive le défilement automatique
}

@HostListener('mouseleave')
onMouseLeave(): void {
  this.isMouseOver = false;
  this.toggleAutoScroll(true); // Réactive le défilement automatique
}

}
