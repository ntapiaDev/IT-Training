import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.scss']
})
export class AddThemeComponent {
  @Input() isOpen = false;
  @Output() closeEvent = new EventEmitter<boolean>();
  @ViewChild('container') container?: ElementRef;

  form: FormGroup;

  height = 0;
  maxHeight = 0;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      domaine_id: [0, Validators.required]
    });
  }

  ngAfterViewInit() {
    this.maxHeight = this.container?.nativeElement.offsetHeight;
  }

  toggle() {
    this.closeEvent.emit(this.isOpen);
  }

  submit() {
    console.log(this.form.value);
    this.toastr.success('Thème ajouté avec succès!');
  }
}
