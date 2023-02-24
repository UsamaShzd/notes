import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop({ trim: true })
  title: string;

  @Prop({ trim: true })
  note: string;

  @Prop()
  indexed: boolean;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
