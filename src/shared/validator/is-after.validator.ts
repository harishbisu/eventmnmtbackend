import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isAfter', async: false })
export class IsAfter implements ValidatorConstraintInterface {
  validate(endTime: Date, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    const startTime = (args.object as any)[relatedPropertyName];

    if (!endTime || !startTime) {
      return false;
    }

    return new Date(endTime).getTime() > new Date(startTime).getTime();
  }

  defaultMessage(): string {
    return 'End time must be after start time';
  }
}
