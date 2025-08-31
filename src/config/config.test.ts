import { describe, expect, it } from "vitest";
import { BLOCK_SIZE } from "./config";

describe('Check Configs', () => {
    describe('Block and Cell Config', () => {
        it('should have correct BLOCK_SIZE' , () => {
            expect(BLOCK_SIZE).toBe(50);
            expect(typeof BLOCK_SIZE).toBe('number')
        })
    })
})