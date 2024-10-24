import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isNotEmpty
} from 'class-validator';

export function IsNotEmptyOnSave(validationOptions?: ValidationOptions & { idKey?: string }) {
  return function (object: Object, propertyName: string) {
    return registerDecorator({
      name: 'isNotEmptyOnSave',
      target: object.constructor,
      propertyName: propertyName,
      //   constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const values = args.object as any;
          if (values['id']) {
            return true;
          }

          return isNotEmpty(values[args.property]);
        }
      }
    });
  };
}
