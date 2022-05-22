import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [
    './modal.component.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit {
  @Input() id: string = '';
  @Input() width: string = '';
  @Input() height: string = '';
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'bg') {
        this.close();
      }
    });

    this.element.style.display = 'none';
    this.element.querySelector('.modal-body').style.width = this.width;
    this.element.querySelector('.modal-body').style.height = this.height;
    // this.element.style.width = this.width;
    // this.element.style.height = this.height;
    this.modalService.add(this);
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
  }
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
}
