import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService, Job } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f8fafc;
    }
  `]
})
export class AppComponent {
  private apiService = inject(ApiService);
  
  // App state
  activeTab = signal<'home' | 'services' | 'careers' | 'contact'>('home');
  apiConnected = signal<boolean>(true);
  
  // Job list cached
  jobs = signal<Job[]>([]);
  loadingJobs = signal<boolean>(false);
  
  // Selected single elements
  expandedJobId = signal<string | null>(null);
  selectedApplyJob = signal<Job | null>(null);

  // Form binds - Angular Form Controls or basic bindings
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  applyForm = {
    name: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    coverLetter: '',
    resumeFile: null as File | null
  };

  // Submit Feedbacks
  contactSuccess = signal<string | null>(null);
  contactError = signal<string | null>(null);
  contactReceipt = signal<string | null>(null);

  applySuccess = signal<string | null>(null);
  applyError = signal<string | null>(null);
  applyReceipt = signal<string | null>(null);
  isSubmitting = signal<boolean>(false);

  constructor() {
    this.fetchJobs();
  }

  fetchJobs() {
    this.loadingJobs.set(true);
    this.apiService.getJobs().subscribe({
      next: (data) => {
        this.jobs.set(data);
        this.apiConnected.set(true);
        this.loadingJobs.set(false);
      },
      error: () => {
        // Fallback or error simulation
        this.jobs.set([
          {
            id: 'job-1',
            title: 'Plastics Manufacturing Engineer',
            department: 'Production',
            location: 'Multan, Pakistan',
            type: 'Full-time',
            experience: '3-5 Years',
            description: 'Oversee extrusion manufacturing lines at Multan Industrial Estate.',
            requirements: ['Polymer degree', 'Injection extrusion knowledge']
          }
        ]);
        this.apiConnected.set(false);
        this.loadingJobs.set(false);
      }
    });
  }

  setTab(tab: 'home' | 'services' | 'careers' | 'contact') {
    this.activeTab.set(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleJobExpand(jobId: string) {
    this.expandedJobId.set(this.expandedJobId() === jobId ? null : jobId);
  }

  openApplyForm(job: Job) {
    this.selectedApplyJob.set(job);
    this.applySuccess.set(null);
    this.applyError.set(null);
  }

  handleFileDrop(event: any) {
    event.preventDefault();
    if (event.dataTransfer?.files?.length) {
      this.applyForm.resumeFile = event.dataTransfer.files[0];
    }
  }

  handleFileSelect(event: any) {
    if (event.target?.files?.length) {
      this.applyForm.resumeFile = event.target.files[0];
    }
  }

  submitContact() {
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
      this.contactError.set('Please fill out all mandatory inputs');
      return;
    }
    
    this.isSubmitting.set(true);
    this.apiService.submitContact(this.contactForm).subscribe({
      next: (res) => {
        this.contactSuccess.set(res.message);
        this.contactReceipt.set(res.referenceId);
        this.contactError.set(null);
        this.isSubmitting.set(false);
        this.contactForm = { name: '', email: '', subject: '', message: '' };
      },
      error: () => {
        this.contactError.set('Laravel API gateway is offline. Ensure database migrations are seeded.');
        this.isSubmitting.set(false);
      }
    });
  }

  submitApplication() {
    if (!this.selectedApplyJob() || !this.applyForm.name || !this.applyForm.email || !this.applyForm.resumeFile) {
      this.applyError.set('Please fill out mandatory fields and upload a CV.');
      return;
    }

    this.isSubmitting.set(true);
    const formData = new FormData();
    formData.append('jobId', this.selectedApplyJob()!.id);
    formData.append('name', this.applyForm.name);
    formData.append('email', this.applyForm.email);
    formData.append('phone', this.applyForm.phone);
    formData.append('portfolioUrl', this.applyForm.portfolioUrl);
    formData.append('coverLetter', this.applyForm.coverLetter);
    formData.append('resume', this.applyForm.resumeFile!);

    this.apiService.submitApplication(formData).subscribe({
      next: (res) => {
        this.applySuccess.set(res.message);
        this.applyReceipt.set(res.applicationId);
        this.applyError.set(null);
        this.isSubmitting.set(false);
        this.applyForm = { name: '', email: '', phone: '', portfolioUrl: '', coverLetter: '', resumeFile: null };
      },
      error: () => {
        this.applyError.set('Backend validation error. Resume must be valid PDF/Docx.');
        this.isSubmitting.set(false);
      }
    });
  }
}
