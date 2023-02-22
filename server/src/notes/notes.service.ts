import { Model, FilterQuery } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Note, NoteDocument } from "./schemas/Note.schema";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>,
  ) {}

  findById(id: string) {
    return this.noteModel.findById(id);
  }

  findAll(query: FilterQuery<NoteDocument>, skip = 0, limit = 10) {
    return this.noteModel.find(query).skip(skip).limit(limit);
  }

  create(note: CreateNoteDto) {
    const newNote = new this.noteModel(note);
    return newNote.save();
  }

  async update(id: string, note: UpdateNoteDto) {
    const updated = await this.noteModel.findByIdAndUpdate(id, note, {
      new: true,
    });

    if (updated) {
      throw new NotFoundException(`Note #${id} was not found.`);
    }

    return updated;
  }

  delete(id: string) {
    return this.noteModel.findByIdAndRemove(id);
  }
}
