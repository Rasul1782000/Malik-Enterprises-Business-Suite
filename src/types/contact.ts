export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSubmissionState {
  isSubmitting: boolean;
  successMsg: string | null;
  errorMsg: string | null;
  referenceId: string | null;
}
