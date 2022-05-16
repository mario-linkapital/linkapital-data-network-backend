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

    const results = await prisma.empresa.findMany({
        take: 1,
        include: {
            estabels: true
        },
        where: {

            estabels: {
                some: {
                    municipio: "0001",
                }
            }
        }
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
