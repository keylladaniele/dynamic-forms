import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormConfigService } from '../../services/form-config.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  form!: FormGroup;
  fields: any[] = [];
  catType: string = 'domestic';

  constructor(private fb: FormBuilder, private formConfig: FormConfigService) {
    this.loadForm();
  }

  loadForm() {
    this.fields = this.formConfig.getFormConfig(this.catType);
    const formControls: any = {};

    this.fields.forEach((field) => {
      formControls[field.name] = [
        '',
        field.required ? Validators.required : null,
      ];
    });

    this.form = this.fb.group(formControls);
  }

  changeCatType(catType: string) {
    this.catType = catType;
    this.loadForm();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      const firstInvalidField = Object.keys(this.form.controls).find(
        (controlName) => this.form.controls[controlName].invalid
      );

      if (firstInvalidField) {
        const invalidElement = document.getElementById(firstInvalidField);
        invalidElement?.focus();
      }

      this.form.markAllAsTouched();
      return;
    }

    console.log('Formulário enviado:', this.form.value);

    this.showSuccessAlert();  
  }


  clearError(fieldName: string): void {
    this.form.controls[fieldName].markAsUntouched();
  }

  showSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Formulário enviado com sucesso!',
      text: 'Os dados foram salvos corretamente.',
      confirmButtonText: 'OK',
      confirmButtonColor: "#9333ea",
    }).then(() => {
      this.form.reset();
    });
  }

}
