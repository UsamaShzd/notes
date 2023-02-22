import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Controller("notes")
export class NotesController {
  @Get()
  findAll() {
    return [];
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return id;
  }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return createNoteDto;
  }

  @Put()
  update(@Body() updateNoteDto: UpdateNoteDto) {
    return updateNoteDto;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return id;
  }
}
