import { Injectable } from "@nestjs/common";
import { CreateEmpresaDto } from "./dto/create-empresa.dto";
import { UpdateEmpresaDto } from "./dto/update-empresa.dto";
import { PrismaService } from "../prisma.service";
import { empresa } from "@prisma/client";

@Injectable()
export class EmpresaService {
  constructor(private prisma: PrismaService) {
  }

  create(createEmpresaDto: CreateEmpresaDto) {
    return "This action adds a new empresa";
  }

  findAll() {
    return this.prisma.empresa.findMany({
      skip: 1,
      take: 10
    });
  }

  filterActividade() {
    const distinctScores = this.prisma.cnae.findMany({
      distinct: ["codigo", "descricao"],
      select: {
        codigo: true,
        descricao: true
      },
    });

    return distinctScores;
  }

  groupByUf() {

    const a = this.prisma.estabelecimento.groupBy({
      by: ["uf"],
      _count: {
        uf: true
      },
      orderBy: {
        _count: {
          uf: "desc"
        }
      }
    });
    return a;
  }

  municipioByUf(municipio: number) {
// SELECT municipio, count(cnpj_basico) as total from public.estabelecimento where uf = 'AC' group by municipio

    const muni = this.prisma.estabelecimento.groupBy({
      by: ["municipio"],
      where: {
        uf: {
          equals: `${municipio}`
        }
      }
    });
    return muni;
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
