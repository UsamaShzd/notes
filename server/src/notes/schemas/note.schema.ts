import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop()
  title: string;

  @Prop()
  note: number;

  @Prop()
  indexed: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
