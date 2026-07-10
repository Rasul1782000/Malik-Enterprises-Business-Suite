import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
}

export interface ContactResponse {
  success: boolean;
  message: string;
  referenceId: string;
}

export interface CareerResponse {
  success: boolean;
  message: string;
  applicationId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Configured to proxy to the Laravel 11 local endpoint
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves active corporate job openings from Laravel API
   */
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs`);
  }

  /**
   * Dispatches contact forms securely to Laravel API
   * Handles sanitization, validation, and storage triggers
   */
  submitContact(payload: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Observable<ContactResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<ContactResponse>(
      `${this.apiUrl}/contact`,
      JSON.stringify(payload),
      { headers }
    );
  }

  /**
   * Submits a full job candidate packet including the resume binary
   * Uses multipart/form-data for secure upload transfers
   */
  submitApplication(formData: FormData): Observable<CareerResponse> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.post<CareerResponse>(
      `${this.apiUrl}/careers/apply`,
      formData,
      { headers }
    );
  }
}
