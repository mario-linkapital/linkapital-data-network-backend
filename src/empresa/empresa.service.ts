import { Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { PrismaService } from '../prisma.service';
import { empresa } from '@prisma/client';

@Injectable()
export class EmpresaService {
  constructor(private prisma: PrismaService) {}

  create(createEmpresaDto: CreateEmpresaDto) {
    return 'This action adds a new empresa';
  }

  findAll() {
    return this.prisma.empresa.findMany({
      skip: 1,
      take: 10,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} empresa`;
  }

  update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    return `This action updates a #${id} empresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} empresa`;
  }
}
