import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
import { FindAllQueryDto } from "./dto/find-all-query.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { NotesService } from "./notes.service";
import { FilterQuery } from "mongoose";
import { NoteDocument } from "./schemas/note.schema";

@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Get()
  async findAll(@Query() query: FindAllQueryDto) {
    const { offset = 0, limit = 10, search = "" } = query;

    let searchQuery: FilterQuery<NoteDocument> = {};
    if (search) {
      searchQuery = {
        $or: [
          { title: { $regex: search, $options: "xi" } },
          { note: { $regex: search, $options: "xi" } },
        ],
      };
    }

    return await this.notesService.findAll(
      searchQuery,
      offset || 0,
      limit || 10,
    );
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.notesService.findById(id);
  }

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    const note = await this.notesService.create(createNoteDto);
    return note;
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateNoteDto: UpdateNoteDto) {
    const note = await this.notesService.update(id, updateNoteDto);
    return note;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const note = await this.notesService.delete(id);
    return note;
  }
}
