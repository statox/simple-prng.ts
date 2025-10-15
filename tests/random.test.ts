import { describe, it } from 'node:test';
import { PRNG } from '../src/PRNG.ts';
import assert from 'node:assert';
import { assertCloseTo } from './helpers.ts';

const cases = [
    // Test cases generated with C implementation
    {
        seed: 6189847717610214,
        values: [
            0.209363, 0.015664, 0.139718, 0.652842, 0.602946, 0.059095, 0.745626, 0.984679,
            0.473657, 0.537861
        ]
    },
    {
        seed: 1506262094470999,
        values: [
            0.450878, 0.178563, 0.625511, 0.122845, 0.839393, 0.38739, 0.895263, 0.730268, 0.877426,
            0.96314
        ]
    }
];

describe('random', () => {
    it('Throws when trying to generate a number without initialization', function () {
        const rng = new PRNG();
        assert.throws(() => rng.random(), new Error('State not initialized'));
    });

    it('Returns deterministic values in range [0, 1[', function () {
        const rng = new PRNG();
        for (const { seed, values } of cases) {
            rng.initialize(seed);
            const actual = Array.from({ length: values.length }).map(() => rng.random());

            for (let i = 0; i < values.length; i++) {
                assertCloseTo(
                    actual[i],
                    values[i],
                    0.001,
                    `Expected  ${actual[i]} to be close to ${values[i]}. Complete arrays: Expected: ${values} - Actual ${actual}`
                );
            }
        }
    });
});
