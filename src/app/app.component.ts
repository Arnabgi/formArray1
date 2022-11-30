import { Component, OnInit } from '@angular/core';
import { FormGroup,FormArray,FormBuilder, Validators } from '@angular/forms';
import  *  as  data  from  './data.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  detailsForm!: FormGroup;
  jsonData : any;
  constructor(
    private builder: FormBuilder
  ){}
  
  ngOnInit(): void {
    this.initForm();
    this.viewDetails();
  }

  initForm(){
    this.detailsForm = this.builder.group({
      id : ['',Validators.required],
      name: ['',Validators.required],
      desc: ['',Validators.required],
      result:['',Validators.required],
      area_details: this.builder.array([
        this.builder.group({
          area_id: ['',Validators.required],
          title: ['',Validators.required],
          factor: ['',Validators.required],
        })
      ])
    });
  }

  get area_details() : FormArray{
    return this.detailsForm.get('area_details') as FormArray;
  }

  AddDetails(){
    console.log(this.detailsForm.value);
  }

  viewDetails(){
    this.jsonData = data;
    console.log("jsonData.........",this.jsonData);
    this.detailsForm.setControl('area_details',this.setAreaDetailsForm(this.jsonData));
  }

  setAreaDetailsForm(jsonData:any) : FormArray{
    const arrayData : FormArray = new FormArray<any>([]);
    if(jsonData.area_test.length){
      jsonData.forEach((element:any) => {
        console.log("element....",element);
        this.builder.group({
          area_id: element.area_test.id,
          title: element.area_test.title_area,
          factor: element.area_test.factor
        })
      });
    }
    return arrayData;
  }

  addRow(){
    const add = this.builder.group({
      area_id: [''],
      title: [''],
      factor: ['']
    })
    this.area_details.push(add);
  }

  removeRow(i:any){
    this.area_details.removeAt(i);
  }
}
