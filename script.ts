import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {

    // SELECT municipio, count(cnpj_basico) as total from public.estabelecimento where uf = 'AC' group by municipio

    /*const estabelecimento: object | null = await prisma.estabelecimento.findMany({
        take: 2,
        where: {
            uf: 'AC',
        },
        select: {
            _count: {
                select: {
                    municipio: true,
                    cnpj_basico: true
                },
            },
        }
    })*/
    const estabelecimento = await prisma.estabelecimento.groupBy({
        by: ['municipio'],
        where: {
            uf: 'AC',
        },
        _count: {
            cnpj_basico: true,
        },
    })
    // use `console.dir` to print nested objects
    console.dir(estabelecimento, { depth: null })
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })