import { Module } from "@nestjs/common";
import { NotesController } from "./notes.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Note, NoteSchema } from "./schemas/Note.schema";
import { NotesService } from "./notes.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Note.name,
        schema: NoteSchema,
      },
    ]),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
