// import "reflect-metadata";

const requiredMetadataKey = Symbol("required");

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  console.log("required", target, propertyKey, parameterIndex);
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  console.log("validate", target, propertyName, descriptor)
  // let method = descriptor.value;
  // descriptor.value = function () {
  //   let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
  //   if (requiredParameters) {
  //     for (let parameterIndex of requiredParameters) {
  //       if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
  //         throw new Error("Missing required argument.");
  //       }
  //     }
  //   }

    // return method.apply(this, arguments);
}



export class Person {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  birthday: Date;
  gender: Number;

  @validate
  public setFirstname(@required name: string) {
    this.firstname = name;
  }

  public setFirstname2(name: string) {
    this.firstname = name;
  }
}



