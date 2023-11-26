import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import {
  LoginHTTPRequestBody,
  LoginHTTPResponse,
} from 'src/app/types/LoginDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(body: LoginHTTPRequestBody): Observable<LoginHTTPResponse> {
    return from(
      new Promise<LoginHTTPResponse>((resolve, reject) =>
        resolve({ status: 200, data: { id: 'uuid', email: body.email } })
      )
    );
  }
}
