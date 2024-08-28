import { Injectable, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {

  }
  openModal(component: any, initialState?: object) {
    this.modalRef = this.modalService.show(component, { initialState });
    return this.modalRef;
  }
  closeModal() {
    if(this.modalRef) {
      this.modalRef.hide();
    }
  }
}
