import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormDetails} from '../../../interfaces/FormDetails';
import {ApiService} from '../../../services/api.service';
import {ValidationFormsService} from '../../../services/validation-forms.service';
import {FormTemplateComponent} from '../form-template/form-template.component';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-quick-register-form',
  standalone: true,
  imports: [
    FormTemplateComponent,
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './quick-register-form.component.html',
  styleUrl: './quick-register-form.component.css'
})
export class QuickRegisterFormComponent {
  registerForm: FormGroup;
  registerFormDetails: Map<string, FormDetails>;
  isSuccessTextAfterRegisterVisible: boolean = false;
  connectionProblemVisible: boolean = false;
  errorText: string = "";
  @Input() answersOfLevelTest: string = "";
  isRegisterErrorVisible: boolean = false;
//  @Output() changeTypeFormEvent = new EventEmitter<string>();
//  showRegistrationErrors: boolean = false;
//  changeTypeForm = new EventEmitter<string>();
  ngOnInit(){
    console.log('quick-reg-form.ngOnInit: answersOfLevelTest='+this.answersOfLevelTest);
  }
  constructor(private fb: FormBuilder,
              private apiService: ApiService,
              validationFormsService: ValidationFormsService) {
    this.registerFormDetails = new Map<string, FormDetails>([
      ['name', {
        type: 'text',
        title: "YOUR_NAME_TITLE",
        autocomplete: "name",
        placeholder: "Enter your name",
        comment: ""
      }],
      ['email', {
        type: 'text',
        title: "EMAIL_TITLE_FOR_LOGIN",
        autocomplete: "email",
        placeholder: "Enter email",
        comment: ""
      }],
      ['password', {
        type: 'password',
        title: "PASSWORD_TITLE",
        autocomplete: "new-password",
        placeholder: "Enter password",
        comment: ""
      }],
      ['confirmPassword', {
        type: 'password',
        title: "CONFIRM_PASSWORD_TITLE",
        autocomplete: "new-password",
        placeholder: "Password again",
        comment: ""
      }],
    ])
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), validationFormsService.nicknameValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, validationFormsService.passwordValidator, validationFormsService.passwordMatchValidator]],
      confirmPassword: ['', [Validators.required, validationFormsService.confirmPasswordMatchValidator]]
    });
  }

  onRegisterSubmit() {
    this.isRegisterErrorVisible = true;
    console.log('onRegisterSubmit: this.answersOfLevelTest='+this.answersOfLevelTest);
    if (this.registerForm.valid) {
      this.apiService.quickReg({
        name: this.registerForm.get("name")?.value,
        password: this.registerForm.get("password")?.value,
        username: this.registerForm.get("email")?.value,
        email: this.registerForm.get("email")?.value,
        code: this.answersOfLevelTest
      })
        .subscribe({
          next: value => {
            this.isSuccessTextAfterRegisterVisible = true
          },
          error: value => {
            console.error("error=" + JSON.stringify(value));
            if (value.status == 0) {
              this.connectionProblemVisible = true;
            } else if (value.error === "USERNAME_ALREADY_EXISTS") {
              console.log("USERNAME_ALREADY_EXISTS was fixed");
              this.registerForm.get('username')?.setErrors({'error': value.error});
            } else if (value.error === "EMAIL_ALREADY_EXISTS") {
              this.registerForm.get('email')?.setErrors({'error': value.error});
            } else {
              this.errorText = value.error;
            }
          }
          // , complete: () => console.log('complete')
        });
    } else {
      //this.showRegistrationErrors = true;
    }
  }
}
