/**
 * A PRNG library built as a modern ECMAScript module without dependencies.
 *
 * Check out [the documentation](https://statox.github.io/simple-prng.ts/)
 *
 * @module SimplePRNG
 */

import { initializeState, random, randomUint32, type State } from './mercenne.ts';

/**
 * A simple Pseudo Random Number Generator class
 */
export class PRNG {
    #initialized: boolean;
    #state: State;

    /**
     * A simple Pseudo Random Number Generator class
     *
     * @example
     * const rng = new PRNG();
     */
    constructor() {
        this.#state = { state_array: [], state_index: 0 };
        this.#initialized = false;
    }

    /**
     * Initialize the PRNG with a seed. Reset the sequence if
     * called with the same seed.
     *
     * @example
     * const rng = new PRNG();
     * rng.initialize(19650218);
     *
     * assert.equal(
     *    [rng.random(), rng.random(), rng.random(),]
     *    [0.5414691786281765, 0.11225925898179412, 0.9725827916990966]
     * )
     *
     * // Initialize again with the same seed resets the sequence
     * rng.initialize(19650218);
     *
     * assert.equal(
     *    [rng.random(), rng.random(), rng.random(),]
     *    [0.5414691786281765, 0.11225925898179412, 0.9725827916990966]
     *
     * @param {Number} seed Value of the seed (Positive integer)
     * )
     */
    initialize(seed: number) {
        initializeState(this.#state, seed);
        this.#initialized = true;
    }

    /**
     * Returns a random 32 bit positive integer.
     * We might want to remove that in the future
     *
     * @throws {Error} Error if PRNG was not initialized before calling this method
     * @example
     * const rng = new PRNG();
     * rng.initialize(19650218);
     *
     * assert.equal(rng.randomInt(), 2325592414)
     */
    randomInt() {
        if (!this.#initialized) {
            throw new Error('State not initialized');
        }

        return randomUint32(this.#state);
    }

    /**
     * Returns a random float in range 0 <=x < 1.
     *
     * TODO: The original Mercenne code returns 32 bits precision, in JS we have 53 bits
     * of precision, that might mess up our results.
     * I need to check if the conversion is done properly
     *
     *
     * @throws {Error} Error if PRNG was not initialized before calling this method
     * @example
     * const rng = new PRNG();
     * rng.initialize(19650218);
     *
     * assert.equal(rng.random(), 0.5414691786281765)
     */
    random() {
        if (!this.#initialized) {
            throw new Error('State not initialized');
        }
        return random(this.#state);
    }
}
