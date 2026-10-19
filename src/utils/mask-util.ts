import StringMask from "string-mask";

const phoneFormatterThirteenDigits = new StringMask('+00 (00) 00000-0000');
const phoneFormatterTwelveDigits = new StringMask('+00 (00) 0000-0000');
const phoneFormatterElevenDigits = new StringMask('(00) 00000-0000');
const phoneFormatterTenDigits = new StringMask('(00) 0000-0000');
const phoneFormatterNineDigits = new StringMask('(0) 0000-0000');
const phoneFormatterDefault = new StringMask('0000-0000');

const currencyFormatterDefault = new StringMask('#.##0,00', { reverse: true });

export class MaskUtil {
    static removeNonNumericCharacters(stringValue: string): string {
        if (stringValue) {
            return stringValue.replace(/[^0-9]/g, '');
        }
        return '';
    }

    static maskWithPhoneFormatter(phone: string): string {
        if (!phone) {
            return '';
        }

        phone = this.removeNonNumericCharacters(phone);

        switch (phone.length) {
            case 13:
                return phoneFormatterThirteenDigits.apply(phone);
            case 12:
                return phoneFormatterTwelveDigits.apply(phone);
            case 11:
                return phoneFormatterElevenDigits.apply(phone);
            case 10:
                return phoneFormatterTenDigits.apply(phone);
            case 9:
                return phoneFormatterNineDigits.apply(phone);
            default:
                return phoneFormatterDefault.apply(phone);
        }
    }

    static maskWithCurrencyFormat(value: number | string): string {
        return currencyFormatterDefault.apply(value);
    }
}
