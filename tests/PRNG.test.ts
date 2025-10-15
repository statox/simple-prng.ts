import { describe, it } from 'node:test';
import { PRNG } from '../src/PRNG.ts';
import assert from 'node:assert';

const cases = [
    // Test cases generated with C implementation
    {
        seed: 2909092485464459,
        values: [
            3646633228, 3472786173, 16559518, 2851332525, 876985443, 137270662, 2978580511,
            2126318781, 1353984743, 1148937992
        ]
    },
    {
        seed: 137691234554790,
        values: [
            1243037372, 1150819542, 1575941011, 23097408, 3360150514, 302093785, 2739525684,
            413535302, 2163454473, 3612583221
        ]
    },
    {
        seed: 1820440557172770,
        values: [
            744679412, 2222353470, 2889162124, 2850487062, 2356958122, 2765916119, 1690949013,
            3421388773, 1074612167, 4006389129
        ]
    },
    {
        seed: 8126317394952360,
        values: [
            1731721038, 4091640331, 980413826, 3583896170, 2732771352, 757245771, 3000920885,
            2218008420, 2414681298, 864666064
        ]
    },
    {
        seed: 4314130030113321,
        values: [
            3856620967, 2841079296, 1956377512, 290052923, 2370774989, 2992307919, 2455911569,
            1178475947, 2479209119, 2538860380
        ]
    }
];

describe('PRNG', () => {
    it('Throws when trying to generate a number without initialization', function () {
        const rng = new PRNG();
        assert.throws(() => rng.randomInt(), new Error('State not initialized'));
    });

    it('Returns deterministic values', function () {
        const rng = new PRNG();
        for (const { seed, values } of cases) {
            rng.initialize(seed);
            const actual = Array.from({ length: values.length }).map(() => rng.randomInt());
            assert.deepEqual(actual, values);
        }
    });

    it('Restart sequence on initialize()', function () {
        const rng = new PRNG();
        for (const { seed, values } of cases) {
            rng.initialize(seed);
            Array.from({ length: values.length }).map(() => rng.randomInt());
            rng.initialize(Math.floor(seed / 2));
            rng.initialize(seed);
            const actual = Array.from({ length: values.length }).map(() => rng.randomInt());
            assert.deepEqual(actual, values);
        }
    });
});
