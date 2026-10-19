import { useEffect, useRef, useState } from "react";
import { AlertCircle, Trash2, X } from "lucide-react";
import "./feedback.css";

export default function useAdminFeedback() {
  const [feedback, setFeedback] = useState(null);
  const dialogRef = useRef(null);
  const resolveRef = useRef(null);

  const finish = (accepted = false) => {
    const resolve = resolveRef.current;
    resolveRef.current = null;
    dialogRef.current?.close();
    setFeedback(null);
    resolve?.(accepted);
  };

  useEffect(() => {
    if (feedback && !dialogRef.current.open) dialogRef.current.showModal();
  }, [feedback]);

  useEffect(() => () => {
    resolveRef.current?.(false);
    resolveRef.current = null;
  }, []);

  const showNotice = (message) => setFeedback({ message, confirm: false });
  const askConfirmation = (message) => new Promise((resolve) => {
    resolveRef.current?.(false);
    resolveRef.current = resolve;
    setFeedback({ message, confirm: true });
  });

  const feedbackDialog = (
    <dialog ref={dialogRef} className="admin_feedback_dialog"
      aria-label={feedback?.confirm ? "Confirm deletion" : "Action notice"}
      aria-describedby="admin-feedback-message"
      onCancel={(event) => { event.preventDefault(); finish(false); }}
      onClose={() => { if (resolveRef.current) finish(false); }}>
      {feedback && <>
        <header className="admin_feedback_heading">
          <span className="admin_feedback_icon">{feedback.confirm ? <Trash2 /> : <AlertCircle />}</span>
          <h2>{feedback.confirm ? "Confirm deletion" : "Please check"}</h2>
          <button type="button" aria-label="Close popup" onClick={() => finish(false)}><X /></button>
        </header>
        <p id="admin-feedback-message">{feedback.message}</p>
        <footer className="admin_feedback_actions">
          {feedback.confirm ? <>
            <button type="button" autoFocus onClick={() => finish(false)}>Cancel</button>
            <button type="button" className="admin_feedback_delete" onClick={() => finish(true)}>Delete</button>
          </> : <button type="button" autoFocus onClick={() => finish(false)}>OK</button>}
        </footer>
      </>}
    </dialog>
  );

  return { showNotice, askConfirmation, feedbackDialog };
}
