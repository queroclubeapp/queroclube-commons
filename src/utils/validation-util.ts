export default class ValidationUtil {
    static emailIsValid(emailAddress: string): boolean {
        const sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
        const sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
        const sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
        const sQuotedPair = '\\x5c[\\x00-\\x7f]';
        const sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
        const sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
        const sDomain_ref = sAtom;
        const sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
        const sWord = '(' + sAtom + '|' + sQuotedString + ')';
        const sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
        const sLocalPart = sWord + '(\\x2e' + sWord + ')*';
        const sAddrSpec = sLocalPart + '\\x40' + sDomain;
        const sValidEmail = '^' + sAddrSpec + '$';

        const reValidEmail = new RegExp(sValidEmail);

        return reValidEmail.test(emailAddress);
    }

    static urlIsValid(url: string): boolean {
        const validUrl = new RegExp(/^https?:\/\/[^\s$.?#].[^\s]*$/i);
        return validUrl.test(url);
    }

    static phoneIsValid(phone: string): boolean {
        const validPhone = new RegExp(/^\d{11}$/);
        return validPhone.test(phone);
    }

    static phoneIsValidE164(phone: string): boolean {
        // Esta expressão regular verifica o padrão E.164
        // Começa com +, seguido por 1 a 14 dígitos
        const validPhoneE164 = new RegExp(/^\+[1-9]\d{1,14}$/);
        return validPhoneE164.test(phone);
    }

    static cpfIsValid(strCPF: string): boolean {
        let Soma: number;
        let Resto: number;
        Soma = 0;
        if (strCPF === "00000000000") return false;

        for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(strCPF.substring(9, 10), 10)) return false;

        Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(strCPF.substring(10, 11), 10)) return false;

        return true;
    }

    static isDecimal(value: string): boolean {
        const validDecimal = new RegExp(/^[0-9]\d{0,9}(\.\d{1,3})?%?$/);
        return validDecimal.test(value);
    }
}
