import { describe, expect, test } from '@jest/globals';
import { MaskUtil } from './mask-util';

describe("Test Mask Util", () => {
    test("teste maskWithPhoneFormatter", async () => {
        const phone1 = '+5511987654321';
        expect(MaskUtil.maskWithPhoneFormatter(phone1)).toBe('+55 (11) 98765-4321');
    });
});