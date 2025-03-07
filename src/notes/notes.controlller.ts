import { Controller, Get, Post, Body, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body, @Request() req) {
    return this.notesService.createNote(body.title, body.content, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.notesService.findAll(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.notesService.remove(id);
  }
}
