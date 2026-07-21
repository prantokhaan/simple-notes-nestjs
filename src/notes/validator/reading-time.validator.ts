import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({
    name: 'isReadingTimeFive'
})
export class isReadingTimeFiveConstraint implements ValidatorConstraintInterface {
    validate(value: number, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        return value%5==0;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Reading time must be a multiple of 5';
    }
}