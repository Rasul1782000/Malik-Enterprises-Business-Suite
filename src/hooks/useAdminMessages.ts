import { useState, useEffect, useCallback } from "react";
import { ContactMessage } from "../types";

export function useAdminMessages(pollIntervalMs = 5000) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    try {
      const res = await fetch("/api/contact/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        setError(null);
      } else {
        setError("Unable to retrieve inquiry transmissions.");
      }
    } catch (err) {
      setError("Network error contacting API server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
    const interval = setInterval(fetchSubmissions, pollIntervalMs);
    return () => clearInterval(interval);
  }, [fetchSubmissions, pollIntervalMs]);

  return {
    messages,
    loading,
    error,
    refetch: fetchSubmissions
  };
}
