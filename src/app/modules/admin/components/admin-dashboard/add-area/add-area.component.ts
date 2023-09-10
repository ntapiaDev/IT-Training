import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.scss']
})
export class AddAreaComponent {
  @ViewChild('container') container?: ElementRef;

  form: FormGroup;

  height = 0;
  maxHeight = 0;
  isOpen = false;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.maxHeight = this.container?.nativeElement.offsetHeight;
  }

  submit() {
    console.log(this.form.value);
    this.toastr.success('Domaine ajouté avec succès!');
    this.isOpen = false;
  }
}
