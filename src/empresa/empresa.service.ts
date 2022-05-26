/* eslint-disable prettier/prettier */
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
    const result = this.prisma.cnae.findMany({
      select: {
        codigo: true,
        descricao: true
      },
    });

    return result;
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
    return a
  }

  async empresasBymunicipio(municipioId: string) {

    const results = await this.prisma.estabelecimento.findMany({
      take: 100,
      where: {
        municipio: {
          equals: municipioId
        }
      },
      include: {
        municipalitities: true,
        company: true
      }
    });
    return results;
  }

  async companiesByFilters(municipioId: string, activity: string, registerCondition: string/*, partnerOption: string, porte: string, identifyOption: string, openDateMin: string, openDateMax: string, socialCapitalMin: string, socialCapitalMax: string*/) {

    const results = await this.prisma.estabelecimento.findMany({
      take: 100,
      where: {
        municipio: {
          contains: municipioId
        },
        AND: {
          cnae_fiscal_principal: {
            equals: activity
          },
          situacao_cadastral: {
            equals: registerCondition
          },
        },
      },
      include: {
        municipalitities: true,
        company: true
      }
    });
    return results;
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
