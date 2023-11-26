import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupHTTPRequestBody } from 'src/app/types/SignupDTO';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  form = this.formBuilder.group({
    name: ['', Validators.minLength(5)],
    birthdate: [''],
    cpf: ['', Validators.minLength(11)],
    rg: ['', Validators.minLength(5)],
    email: ['', Validators.email],
    password: ['', Validators.minLength(8)],
    confirmPassword: ['', Validators.minLength(8)],
  });
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private signupService: UserService
  ) {}

  public onSubmit(event: Event): void {
    event.preventDefault();
    const body = this.buildPayload();
    if (!this.validateBody(body)) {
      return;
    }
    this.signupService.signup(body).subscribe({
      next: ({ status, data, error }) => {
        if (status >= 200 && status < 300) {
          console.log('ok');
          this.toastr.success('Bem-vindo!', 'Sucesso');
          localStorage.setItem('user', JSON.stringify(data));
        } else {
          throw error;
        }
      },
      error: (err) => {
        this.toastr.error(err, 'Erro');
      },
    });
  }

  private buildPayload(): SignupHTTPRequestBody {
    return {
      email: this.form.get('email')?.value ?? '',
      password: this.form.get('password')?.value ?? '',
      birthdate: this.form.get('birthdate')?.value ?? '',
      cpf: this.form.get('cpf')?.value ?? '',
      name: this.form.get('name')?.value ?? '',
      rg: this.form.get('rg')?.value ?? '',
    };
  }

  private validateBody(body: SignupHTTPRequestBody): boolean {
    if (!body.email) {
      this.toastr.error('E-mail não preencido!', 'Erro');
      return false;
    } else if (!body.email.match('(.+)@(.+){2,}.(.+){2,}')) {
      this.toastr.error('E-mail inválido!', 'Erro');
      return false;
    } else if (!body.password) {
      this.toastr.error('Senha não preencida!', 'Erro');
      return false;
    }
    return true;
  }
}
