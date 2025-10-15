import assert from 'node:assert';

export const assertCloseTo = (
    actual: number,
    expected: number,
    margin: number = 0.000002,
    message?: string
) => {
    const isInMargin = actual >= expected - margin && actual <= expected + margin;
    const failureMessage = message || `Expected ${actual} to be close to ${expected}`;
    assert.strictEqual(isInMargin, true, failureMessage);
};
