import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';

class QueryDTO {
  @ApiProperty({
    required: false,
    type: [Number],
  })
  readonly parameter?: number[];
}

@Controller('company')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.create(createEmpresaDto);
  }

  @Get()
  findAll() {
    return this.empresaService.getAllCompanies();
  }

  @Get('/rede/cnpj')
  getRedeData() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const axios = require('axios');
    let response = [];
    const getData = async () => {
      try {
        response = await axios.post(
          'https://www.redecnpj.com.br/rede/grafojson/cnpj/1/07003744000109',
          [],
        );
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };
    getData().then((r) => console.log(r));
    return response;
  }

  @Get('/uf/:municipality')
  getMunicipalitiesByUf(@Param('municipality') municipality: string) {
    //return this.empresaService.municipioByUf(+municipio);
  }

  @Get('/companiesByMunicipality/:municipality')
  getEmpresasByMunicipio(@Param('municipality') municipio: string) {
    return this.empresaService.companiesByMunicipality(municipio);
  }

  @Get('/companiesByFilters/:municipality/')
  @ApiQuery({
    name: 'activities',
    required: true,
    explode: false,
    type: String,
    style: 'form',
    isArray: true,
  })
  @ApiQuery({
    name: 'registerCondition',
    required: true,
    explode: false,
    type: String,
    style: 'form',
    isArray: true,
  })
  @ApiQuery({
    name: 'partnerOption',
    required: false,
    explode: false,
    type: String,
    style: 'form',
    isArray: false,
  })
  @ApiQuery({
    name: 'porte',
    required: false,
    explode: false,
    type: String,
    style: 'form',
    isArray: false,
  })
  @ApiQuery({
    name: 'identifyOption',
    required: false,
    explode: false,
    type: String,
    style: 'form',
    isArray: false,
  })
  @ApiQuery({
    name: 'openDateMin',
    required: false,
    explode: false,
    type: String,
    style: 'form',
    isArray: false,
  })
  @ApiQuery({
    name: 'openDateMax',
    required: false,
    explode: false,
    type: String,
    style: 'form',
    isArray: false,
  })
  @ApiQuery({
    name: 'socialCapitalMin',
    required: false,
    explode: false,
    type: String,
    style: 'form',
    isArray: false,
  })
  @ApiQuery({
    name: 'socialCapitalMax',
    required: false,
    explode: false,
    type: String,
    style: 'form',
    isArray: false,
  })
  getCompaniesByFilters(
    @Param('municipality') municipality: string,
    @Query('activities') activities: string,
    @Query('registerCondition') registerCondition: string,
    @Query('registerCondition') partnerOption: string,
    @Query('porte') porte: string,
    @Query('identifyOption') identifyOption: string,
    @Query('openDateMin') openDateMin: string,
    @Query('openDateMax') openDateMax: string,
    @Query('socialCapitalMin') socialCapitalMin: string,
    @Query('socialCapitalMax') socialCapitalMax: string,
  ) {
    return this.empresaService.companiesByFilters(
      municipality,
      activities?.split(','),
      registerCondition?.split(','),
      partnerOption,
      porte,
      identifyOption,
      openDateMin,
      openDateMax,
      socialCapitalMin,
      socialCapitalMax,
    );
  }

  @Get('/partners/:companyCNPJ')
  getPartnersByCompany(@Param('companyCNPJ') company: string) {
    return this.empresaService.partnersByCompany(company);
  }

  @Get('/filter/activities')
  getFilterActivities() {
    return this.empresaService.filterActivities();
  }

  @Get('/group/uf')
  groupByUf() {
    return this.empresaService.groupByUf();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresaService.update(+id, updateEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaService.remove(+id);
  }
}
