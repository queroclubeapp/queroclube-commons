import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsTimestampConstraint implements ValidatorConstraintInterface {
    validate(timestamp: number, args: ValidationArguments) {
        const date = new Date(timestamp);
        return date.getTime() === timestamp;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Timestamp is invalid!';
    }
}
