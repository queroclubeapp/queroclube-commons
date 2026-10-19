import { describe, expect, test } from '@jest/globals';
import DateUtil from './date-util';

describe("Test Date Util", () => {
    test("teste getCurrentTimestamp", async () => {
        const result = DateUtil.getCurrentTimestamp();
        console.log(result);
        expect(result).toBeDefined();
    });
});