import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import type { Users } from './users.interface';
import type {Request} from 'express';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Post()
  createUser(@Body() body: { name: string; email: string }): Users {
    return this.users.createUser(body.name, body.email);
  }

  @Get()
  getAllUsers(@Req() req: Request): Users[] {
    console.log("Request ID: ", req.requestId)
    return this.users.getAllUsers();
  }

  @Get('search')
  getUserWithEmail(@Query('email') email: string): Users {
    return this.users.getUserEmail(email);
  }

  @Get(':id')
  getUserWithId(@Param('id') id: string): Users {
    return this.users.getUserId(id);
  }
}
