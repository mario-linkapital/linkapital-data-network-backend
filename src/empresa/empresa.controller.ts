import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";
import { EmpresaService } from "./empresa.service";
import { CreateEmpresaDto } from "./dto/create-empresa.dto";
import { UpdateEmpresaDto } from "./dto/update-empresa.dto";
import { map } from "rxjs";
import axios from "axios";

@Controller("empresa")
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {
  }

  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.create(createEmpresaDto);
  }

  @Get()
  findAll() {
    return this.empresaService.findAll();
  }

  @Get("/rede/cnpj")
  getRedeData() {
    const axios = require("axios");
    let response = [];
    const getData = async () => {
      try {
        response = await axios.post("https://www.redecnpj.com.br/rede/grafojson/cnpj/1/07003744000109", []);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };
    getData().then(r => console.log(r));
    return response;
  }

  @Get("/uf/:municipio")
  getMunicipiosByUf(@Param("municipio") municipio: string) {
    //return this.empresaService.municipioByUf(+municipio);
  }

  @Get("/filter/actividade")
  getFilterActividade() {
    return this.empresaService.filterActividade();
  }

  @Get("/group/uf")
  groupByUf() {
    return this.empresaService.groupByUf();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.empresaService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresaService.update(+id, updateEmpresaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.empresaService.remove(+id);
  }
}
