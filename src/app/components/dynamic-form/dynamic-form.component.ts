import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormConfigService } from '../../services/form-config.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
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

  onSubmit() {
    if (this.form.valid) {
      alert('Formulário enviado com sucesso! 🎉');
      console.log(this.form.value);
    } else {
      alert('Preencha os campos obrigatórios.');
    }
  }

  changeCatType(catType: string) {
    this.catType = catType;
    this.loadForm();
  }

}
