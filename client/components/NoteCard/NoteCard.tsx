import type Note from "@/types/Note";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Star, StarFill } from "react-bootstrap-icons";
import Link from "next/link";

export type NoteCardProps = {
  note: Note;
  handleIndex?: () => void;
  handleDelete?: () => void;
};

function NoteCard({ note, handleIndex, handleDelete }: NoteCardProps) {
  return (
    <Card className="shadow-sm position-relative">
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text className="mt-2 .text-truncate d-block">
          {note.note}
        </Card.Text>
        <div className="d-flex justify-content-end">
          <Link href={`/${note._id}`}>
            <Button variant="outline-primary">Edit</Button>
          </Link>
          <Button
            variant="outline-danger"
            className="ms-2"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Card.Body>

      <Button
        className="position-absolute top-0 end-0 border-radius-10"
        variant="text"
        onClick={handleIndex}
      >
        {note.indexed ? <StarFill /> : <Star />}
      </Button>
    </Card>
  );
}

export default NoteCard;
