import { Component } from '@angular/core';
import { VARIABLE } from './shared/models/Constants';

export interface Field
{
  dataType?: string;
  name?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spring-boot-snipset';
  packageName: string = "";
  entityName: string = "";
  detectMethod: string = "auto";
  fields: Field[] = [];
  numberOfField: number = 0;
  inputText: string = "";
  generatedFile: string = "";
  entityFile: string = "";
  daoFile: string = '';
  serviceFile: string = '';
  controllerFile: string = '';

  updateFieds() : void
  {
    while(this.fields.length > this.numberOfField)
      this.fields.pop();

    while(this.fields.length < this.numberOfField)
    {
      let field: Field = {dataType: "String", name: "name" + this.fields.length}
      this.fields.push(field);
    }
  }

  extractField(): void
  {
    let newFields: Field[] = [];
    let splits = this.inputText.split(" ");
    for(let i = 0; i < splits.length; i++)
    {
      let value = splits[i].trim();
      if(value === "private" || value === "public")
      {
        let dataType = splits[i + 1].trim();
        let name = splits[i + 2].trim().replace(";","");
        let field: Field = {dataType: dataType, name: name};
        newFields.push(field);
      }
    }

    this.fields = [...newFields];
    this.numberOfField = this.fields.length;
    this.detectMethod = "manual";
  }

  capitalizeFirstLetter(str: string): string
  {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  lowerCaseFirstLetter(str: string): string
  {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }


  generatedAll(): void
  {
    this.generatedFile = "dao";

    this.generateEntity();
    this.generateDAO();
    this.generateService();
    this.generateController();
  }

  generateEntity(): void
  {
    this.entityFile = VARIABLE.ENTITY;
    if(this.fields.length < 1)
      return;

    this.entityFile = this.entityFile.replaceAll("{0}", this.packageName);
    this.entityFile = this.entityFile.replaceAll("{1}", this.entityName);
    this.entityFile = this.entityFile.replaceAll("{2}", this.lowerCaseFirstLetter(this.entityName));

    let idFieldName = this.fields[0].name;
    let idFieldDataType = this.fields[0].dataType;

    this.entityFile = this.entityFile.replaceAll("{3}", `${idFieldDataType} ${idFieldName}`);

    let method = "";
    if(this.fields.length > 1)
    {
      for(let i = 1; i < this.fields.length; i++)
      {
        let field = this.fields[i];
        let lowerCaseName = this.lowerCaseFirstLetter(field.name!);
        let upperCaseName = this.capitalizeFirstLetter(field.name!);
        let upperCaseEntityName = this.capitalizeFirstLetter(this.entityName);

        method += `\t@Column;\n`
        method += `\tprivate ${field.dataType} ${lowerCaseName};\n\n`
      }
    }

    this.entityFile = this.entityFile.replaceAll("{4}", method);
  }

  generateDAO(): void
  {
    this.daoFile = VARIABLE.DAO;
    if(this.fields.length < 1)
      return;

    this.daoFile = this.daoFile.replaceAll("{0}", this.packageName);
    this.daoFile = this.daoFile.replaceAll("{1}", this.entityName);
    let method = "";
    if(this.fields.length > 1)
    {
      for(let i = 1; i < this.fields.length; i++)
      {
        let field = this.fields[i];

        if(!this.isPrimitive(field.dataType!))
          continue;

        let lowerCaseName = this.lowerCaseFirstLetter(field.name!);
        let upperCaseName = this.capitalizeFirstLetter(field.name!);
        let upperCaseEntityName = this.capitalizeFirstLetter(this.entityName);

        method += `\tpublic ${upperCaseEntityName} findBy${upperCaseName}(${field.dataType} ${lowerCaseName});\n`
        method += `\tpublic List<${upperCaseEntityName}> findAllBy${upperCaseName}(${field.dataType} ${lowerCaseName});\n\n`
      }

    }

    this.daoFile = this.daoFile.replaceAll("{2}", method);

    let fieldIdType = this.fields[0].dataType!;

    switch(fieldIdType)
    {
      case "int":
        fieldIdType = "Integer";
        break;
      case "float":
        fieldIdType = "Float";
        break;
      case "double":
        fieldIdType = "Double";
        break;
      case "boolean":
        fieldIdType = "Boolean";
        break;
      default:
        break;
    }

    this.daoFile = this.daoFile.replaceAll("{3}", fieldIdType);
  }

  private isPrimitive(dataType: string): boolean
  {
    switch(dataType)
    {
      case "float":
      case "Float":
      case "double":
      case "Double":
      case "int":
      case "Integer":
      case "Int":
      case "String":
      case "char":
      case "Char":
        return true;
      default:
        return false;
    }
  }

  generateService(): void
  {
    this.serviceFile = VARIABLE.SERVICE;
    if(this.fields.length < 1)
      return;

    this.serviceFile = this.serviceFile.replaceAll("{0}", this.packageName);
    this.serviceFile = this.serviceFile.replaceAll("{1}", this.entityName);
    this.serviceFile = this.serviceFile.replaceAll("{2}", this.lowerCaseFirstLetter(this.entityName));

    let method = "";
    if(this.fields.length > 1)
    {
      for(let i = 1; i < this.fields.length; i++)
      {
        let field = this.fields[i];
        let lowerCaseName = this.lowerCaseFirstLetter(field.name!);
        let upperCaseName = this.capitalizeFirstLetter(field.name!);
        let upperCaseEntityName = this.capitalizeFirstLetter(this.entityName);
        let lowerCaseEntityName = this.lowerCaseFirstLetter(this.entityName);

        if(this.validFieldDataType(field.dataType!))
          method += `\t\told${upperCaseEntityName}.set${upperCaseName}(ObjectUtils.isEmpty(${lowerCaseEntityName}.get${upperCaseName}()) ? old${upperCaseEntityName}.get${upperCaseName}() : ${lowerCaseEntityName}.get${upperCaseName}());\n`
        else
          method += `\t\told${upperCaseEntityName}.set${upperCaseName}(${lowerCaseEntityName}.get${upperCaseName}());\n`;
      }


    }

    this.serviceFile = this.serviceFile.replaceAll("{3}", method);

    let idFieldName = this.fields[0].name;
    let idFieldDataType = this.fields[0].dataType;

    this.serviceFile = this.serviceFile.replaceAll("{4}", this.capitalizeFirstLetter(idFieldName!));
    this.serviceFile = this.serviceFile.replaceAll("{5}", this.lowerCaseFirstLetter(idFieldName!));
    this.serviceFile = this.serviceFile.replaceAll("{6}", idFieldDataType!);
  }

  private validFieldDataType(dataType: string): boolean
  {
    switch(dataType)
    {
      case "float":
      case "Float":
      case "double":
      case "Double":
      case "int":
      case "Integer":
      case "Int":
        return false;
      default:
        return true;
    }
  }

  generateController(): void
  {
    this.controllerFile = VARIABLE.CONTROLLER;
    if(this.fields.length < 1)
      return;

    this.controllerFile = this.controllerFile.replaceAll("{0}", this.packageName);
    this.controllerFile = this.controllerFile.replaceAll("{1}", this.entityName);
    this.controllerFile = this.controllerFile.replaceAll("{2}", this.lowerCaseFirstLetter(this.entityName));

    let idFieldName = this.fields[0].name;
    let idFieldDataType = this.fields[0].dataType;

    this.controllerFile = this.controllerFile.replaceAll("{3}", this.capitalizeFirstLetter(idFieldName!));
    this.controllerFile = this.controllerFile.replaceAll("{4}", this.lowerCaseFirstLetter(idFieldName!));
    this.controllerFile = this.controllerFile.replaceAll("{5}", idFieldDataType!);
  }
}
