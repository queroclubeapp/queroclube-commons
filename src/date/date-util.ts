import moment from 'moment';

export default class DateUtil {
    static timeDifference(checkDate: Date): number {
        const dif = (new Date().getTime() - checkDate.getTime());
        return Math.round((dif / 1000) / 60);
    }

    static dateDiffInDays(a: Date, b: Date): number {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    static getCurrentTimestamp(): string {
        return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    }

    static formatTimestampToSystemTimezone(utcTimestamp: string): string | undefined {
        if (utcTimestamp) {
            return moment(utcTimestamp).format('YYYY-MM-DD HH:mm:ss');
        }
        return undefined;
    }

    static formatTimestampToSystemTimezoneAndFormat(utcTimestamp: string, format: string): string | undefined {
        if (utcTimestamp) {
            return moment(utcTimestamp).format(format);
        }
        return undefined;
    }

    static getParsedSqlDate(date: string): Date {
        const [datePart, timePart] = String(date).split(' ');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hour, minute, second] = timePart.split(':').map(Number);
        return new Date(year, month - 1, day, hour, minute, second);
    }

    static getCountdownToSqlDate(endDate: string): string {
        const jsEndDate = DateUtil.getParsedSqlDate(endDate);
        return DateUtil.getCountdownToDate(jsEndDate);
    }

    static getCountdownToDate(endDate: Date): string {
        const countDownDate = endDate.getTime();
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            return "Finalizado";
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    static addDaysToSqlDate(date: string, days: number): Date {
        const result = DateUtil.getParsedSqlDate(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    static addDaysToDate(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
    }

    static addStringDaysToDate(date: Date, daysToAdd: string) {
        const days: number = parseInt(daysToAdd.match(/\d+/)[0]);
        return DateUtil.addDaysToDate(date, days);
    }
}