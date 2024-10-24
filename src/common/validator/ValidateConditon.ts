import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isNotEmpty
} from 'class-validator';

interface IConfig {
  condition: (any) => boolean;
  validate: ((value, record) => boolean)[];
}

export function ValidateConditon(
  config: IConfig,
  validationOptions?: ValidationOptions & { idKey?: string }
) {
  return function (object: Object, propertyName: string) {
    return registerDecorator({
      name: 'validateConditon',
      target: object.constructor,
      propertyName: propertyName,
      //   constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const { condition, validate = [] } = config;
          let result: boolean = true;
          const values = args.object as any;
          if (condition(values)) {
            for (let i = 0; i < validate.length; i++) {
              if (!validate[i](values[propertyName], values)) {
                result = false;
                break;
              }
            }
          }
          return result;
        }
      }
    });
  };
}
