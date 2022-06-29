import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Error } from '../../models/error';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  productForm: FormGroup;
  errores: Error[] = [];
  invalid: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.formControl();
  }

  get error(): any {
    return this.productForm.controls;
  }

  /**
   * @author Jhonathan Lopez
   * @fecha 22/06/2022
   * Metodo que se realizar las validaciones del formulario reactivo
   */
  formControl(): void {
    this.productForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(5),
      ]),
      precio: new FormControl('', [
        Validators.required,
        Validators.max(20),
        Validators.min(5),
      ]),
    });

  }

  /**
   * @author Jhonathan Lopez
   * @fecha 22/06/2022
   * Metodo que se encarga de validar y guardar el formulario
   * @param productFormRest formulario
   */
  saveForm(productFormRest: FormGroup) {
    if (productFormRest.valid) {
      this.invalid = false;
      this.productForm.reset();
      alert('Tu formulario cumple con todas las validaciones puedes continuar');

    } else {

      this.errores = [];
      this.invalid = true;

      Object.keys(productFormRest.controls).forEach((key) => {
        const controlErrors: ValidationErrors =
          this.productForm.get(key).errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach((keyError) => {
            const error = new Error();
            (error.campo = key), (error.error = keyError);

            this.errores.push(error);
          });
        }
      });
    }

  }

}
