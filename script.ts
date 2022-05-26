import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {

    // SELECT municipio, count(cnpj_basico) as total from public.estabelecimento where uf = 'AC' group by municipio

    /*const estabelecimento: object | null = await prisma.estabelecimento.findMany({
        take: 2
        where: {
            uf: 'AC',
        },
        include: {
            _count: {
                select: {
                    municipio: true,
                    cnpj_basico: true
                },
            },
        }
    })*/
    /*const estabelecimento = await prisma.estabelecimento.groupBy({
        by: ['municipio'],
        where: {
            uf: 'AC',
        },
        _count: {
            cnpj_basico: true,
        },
    })*/
    /*const empresasByMunicipio = await prisma.estabelecimento.groupBy({
        by: ['municipio'],
        where: {
            uf: 'AC',
        },
        _count: {
            cnpj_basico: true,
        },
    })*/

    /*const results = await prisma.empresa.findMany({
        take: 1,
        where: {
            estabelec: {
                some: {
                    municipio: "0001",
                }
            }
        }
    });*/
    const results = await this.prisma.empresa.findMany({
        take: 10,
        where: {
            capital_social: {
                not: 0
            },
            estabels: {
                municipio: '8501'
            }
        },
        select: {
            cnpj_basico: true,
            capital_social: true,
            razao_social: true,
            natureza_juridica: true,
            ente_federativo_responsavel: true,
            porte_empresa: true,
            qualificacao_responsavel: true,
            estabels: {
                select: {
                    cnpj_dv: true,
                    cnpj_ordem: true,
                    nome_fantasia: true,
                    cnae_fiscal_principal: true,
                    cnae_fiscal_secundaria: true,
                    data_inicio_atividade: true,
                    data_situacao_cadastral: true,
                    data_situacao_especial: true,
                    situacao_cadastral: true,
                    situacao_especial: true,
                    motivo_situacao_cadastral: true,
                    identificador_matriz_filial: true,
                    tipo_logradouro: true,
                    logradouro: true,
                    bairro: true,
                    cep: true,
                    numero: true,
                    complemento: true,
                    correio_eletronico: true,
                    ddd_1: true,
                    telefone_1: true,
                    ddd_2: true,
                    telefone_2: true,
                    ddd_fax: true,
                    fax: true,
                    municipio: true,
                    municipality: {
                        select: {
                            descricao: true
                        }
                    }
                }
            },
        },
    });
    // use `console.dir` to print nested objects
    console.dir(results, { depth: null })
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
