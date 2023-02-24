import type Note from "@/types/Note";
import type { NoteFormProps } from "@/components/NoteForm";
import { useEffect, useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import apiService from "@/services/api";
import { useRouter } from "next/router";
import NoteForm from "@/components/NoteForm";

function Update() {
  const router = useRouter();

  const [, setLoading] = useState(false);
  const [note, setNote] = useState<Note>({ _id: "", title: "", note: "" });

  const loadNote = useCallback(async () => {
    if (!router.query.noteId) return;
    try {
      setLoading(true);
      const res = await apiService.get<Note>("/notes/" + router.query.noteId);
      setNote(res.data);
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [router.query.noteId]);

  useEffect(() => {
    loadNote();
  }, [loadNote]);

  const handleSubmit: NoteFormProps["onSubmit"] = async (
    { title, note },
    { setSubmitting },
  ) => {
    try {
      setSubmitting(true);
      const res = await apiService.put<Note>("/notes/" + router.query.noteId, {
        title,
        note,
      });
      router.replace("/update/" + res.data._id);
    } catch (err) {
      alert("Failed to add new note.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <NoteForm initialValues={note} onSubmit={handleSubmit} />
    </Container>
  );
}

export default Update;
