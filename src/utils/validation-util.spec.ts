import { describe, expect, test } from '@jest/globals';
import ValidationUtil from './validation-util';

describe("Test Validation Util", () => {
    test("teste emailIsValid", async () => {
        const email = 'jefferon.comp@gmail.com';
        expect(ValidationUtil.emailIsValid(email)).toBeTruthy();
    });
});