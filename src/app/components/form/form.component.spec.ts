import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe retornar formulario invalido por que solo se agrega el nombre', () => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges()

    const nombre = component.productForm.controls['nombre']
    nombre.setValue('carlos')

    expect(component.productForm.invalid).toBeTrue();
  });

  it('Debe retornar formulario invalido por que solo se agrega el precio', () => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges()

    const precio = component.productForm.controls['precio']
    precio.setValue('5')

    expect(component.productForm.invalid).toBeTrue();
  });

  it('Debe retornar formulario valido',() => {

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges()

    const nombre = component.productForm.controls['nombre']
    const precio = component.productForm.controls['precio']
    nombre.setValue('carlos')
    precio.setValue('5')

    const botonElement = fixture.debugElement.query(By.css('button.btn'))
    botonElement.nativeElement.click()

    expect(component.productForm.valid).toBeTrue();

  });

  it('Debe retornar formulario invalido ya que no cumple con las validaciones dadas',() => {

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges()

    const nombre = component.productForm.controls['nombre']
    const precio = component.productForm.controls['precio']
    nombre.setValue('carlos juan perez de la maria concepcion')
    precio.setValue('55')

    const botonElement = fixture.debugElement.query(By.css('button.btn'))
    botonElement.nativeElement.click()

    expect(component.productForm.invalid).toBeTrue();

  });

  it('Validacion evento click de guardado en caso que el formulario sea correcto',() => {

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges()

    const nombre = component.productForm.controls['nombre']
    const precio = component.productForm.controls['precio']
    nombre.setValue('carlos')
    precio.setValue('5')

    component.saveForm(component.productForm)
    expect(component.invalid).toBeFalse();

  });

  it('Validacion evento click de guardado en caso que el formulario no sea correcto',() => {

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges()

    const nombre = component.productForm.controls['nombre']
    const precio = component.productForm.controls['precio']
    nombre.setValue('carlos juan perez de la maria concepcion')
    precio.setValue('55')

    component.saveForm(component.productForm)
    expect(component.invalid).toBeTrue();

  });



});
