import { Injectable } from "@nestjs/common";
import { CreateEmpresaDto } from "./dto/create-empresa.dto";
import { UpdateEmpresaDto } from "./dto/update-empresa.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class EmpresaService {
  constructor(private prisma: PrismaService) {
  }

  create(createEmpresaDto: CreateEmpresaDto) {
    return "This action adds a new empresa";
  }

  getAllCompanies() {
    return this.prisma.empresa.findMany({
      skip: 1,
      take: 10
    });
  }

  filterActivities() {
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

  async companiesByMunicipality(municipalityId: string) {

    const results = await this.prisma.estabelecimento.findMany({
      take: 10,
      where: {
        municipio: {
          equals: municipalityId
        }
      },
      include: {
        municipalities: true,
        company: true,
        pais_estabel: true
      }
    });
    return results;
  }

  async companiesByFilters(municipalityId: string, activities: string[], registerCondition: string[], partnerOption: string, porte: string, identifyOption: string, 
    openDateMin: string, openDateMax: string, socialCapitalMin: string, socialCapitalMax: string) {

    const results = await this.prisma.estabelecimento.findMany({
      where: {
        municipio: {
          contains: municipalityId
        },
        AND: {
          cnae_fiscal_principal: {
            in: activities
          },
          situacao_cadastral: {
            in: registerCondition
          },
        }
      },
      include: {
        municipalities: true,
        actividades_princ: true,
        actividades_sec: true,
        pais_estabel: true,
        motiv_estabel: true,
        company: {
          include: {
            simple: true,
            natju: true,
          }
        },
      },
    });
    return results;
  }

  async partnersByCompany(companyCNPJ: string) {

    const results = await this.prisma.socios.findMany({
      where: {
        cnpj_basico: {
          equals: companyCNPJ
        }
      },
      include: {
        pais_socio: true,
        qual_socio: true,
        ceaf_socio: true,
        //qual_representante_legal: true,
      }
    });
    return results;
  }

  async penalitiesCepimByCompany(companyCNPJ: string) {

    const results = await this.prisma.cepim.findMany({
      where: {
        cnpj: {
          equals: companyCNPJ
        }
      },
    });
    return results;
  }

  async penalitiesCeisByCompany(cnpj_cpf: string) {

    const results = await this.prisma.ceis.findMany({
      where: {
        cpf_cnpj: {
          equals: cnpj_cpf
        }
      },
    });
    return results;
  }

  async penalitiesCnepByCompany(cnpj_cpf: string) {

    const results = await this.prisma.cnep.findMany({
      where: {
        cpf_cnpj: {
          equals: cnpj_cpf
        }
      },
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
