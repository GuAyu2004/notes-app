import { Controller, Get, Post, Body, Delete, Param, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
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
    // console.log(req)
    console.log("start")

    console.log(req.user)
    console.log("end")
    console.log("Fetching notes for user ID:", req.user.sub); // Debugging
      return this.notesService.findAll(req.user.sub); // ✅ Ensure only logged-in user's notes are fetched
  }
  @UseGuards(AuthGuard)

  
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.notesService.remove(id);
  }
}
