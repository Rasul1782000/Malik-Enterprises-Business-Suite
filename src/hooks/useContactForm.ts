import React, { useState } from "react";
import { ContactFormData, ContactSubmissionState } from "../types";

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submissionState, setSubmissionState] = useState<ContactSubmissionState>({
    isSubmitting: false,
    successMsg: null,
    errorMsg: null,
    referenceId: null
  });

  const setField = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    setSubmissionState({
      isSubmitting: false,
      successMsg: null,
      errorMsg: null,
      referenceId: null
    });
  };

  const clearSuccess = () => {
    setSubmissionState((prev) => ({ ...prev, successMsg: null, referenceId: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setSubmissionState((prev) => ({
        ...prev,
        errorMsg: "All contact form fields are required."
      }));
      return;
    }

    try {
      setSubmissionState({
        isSubmitting: true,
        errorMsg: null,
        successMsg: null,
        referenceId: null
      });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmissionState({
          isSubmitting: false,
          successMsg: data.message || "Your inquiry has been logged successfully.",
          errorMsg: null,
          referenceId: data.referenceId || null
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        setSubmissionState({
          isSubmitting: false,
          successMsg: null,
          errorMsg: data.error || "Failed to deliver message. Please check your inputs.",
          referenceId: null
        });
      }
    } catch (err) {
      setSubmissionState({
        isSubmitting: false,
        successMsg: null,
        errorMsg: "Failed to connect to the server. Please try again later.",
        referenceId: null
      });
    }
  };

  return {
    formData,
    submissionState,
    setField,
    resetForm,
    clearSuccess,
    handleSubmit
  };
}
