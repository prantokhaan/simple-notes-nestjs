import { registerDecorator, ValidationOptions } from "class-validator";
import { isReadingTimeFiveConstraint } from "../validator/reading-time.validator";

export function IsReadingTimeFive(
    validation?: ValidationOptions
) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validation,
            validator: isReadingTimeFiveConstraint
        })
    }
}