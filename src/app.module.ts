import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpresaModule } from './empresa/empresa.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [EmpresaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
