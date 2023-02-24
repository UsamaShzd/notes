import type { NoteFormProps } from "@/components/NoteForm";
import type Note from "@/types/Note";
import NoteForm from "@/components/NoteForm";
import Container from "react-bootstrap/Container";
import apiService from "@/services/api";
import { useRouter } from "next/router";
function Add() {
  const router = useRouter();

  const handleSubmit: NoteFormProps["onSubmit"] = async (
    values,
    { setSubmitting },
  ) => {
    try {
      setSubmitting(true);
      const res = await apiService.post<Note>("/notes", values);
      router.replace("/update/" + res.data._id);
    } catch (err) {
      alert("Failed to add new note.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <NoteForm onSubmit={handleSubmit} />
    </Container>
  );
}

export default Add;
