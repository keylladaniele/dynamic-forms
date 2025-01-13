import { Injectable } from '@angular/core';
import { FormField } from '../models/form-field.model';

@Injectable({
  providedIn: 'root',
})
export class FormConfigService {
  getFormConfig(catType: string): FormField[] {
    switch (catType) {
      case 'domestic':
        return [
          { name: 'name', label: 'Nome do Gato', type: 'text', required: true },
          { name: 'age', label: 'Idade (em anos)', type: 'number', required: true },
          { name: 'breed', label: 'Raça', type: 'text', required: false },
        ];
      case 'wild':
        return [
          { name: 'name', label: 'Nome do Gato', type: 'text', required: true },
          { name: 'location', label: 'Habitat', type: 'text', required: true },
          { name: 'endangered', label: 'Espécie em Extinção', type: 'checkbox', required: false },
        ];
      default:
        return [];
    }
  }
}
