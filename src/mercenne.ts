/*
 * PseudoRandom Number Generator based on the Mercenne Twister.
 *
 * This is a port of the C code found here:
 * https://en.wikipedia.org/wiki/Mersenne_Twister#C_code
 */

const n = 624;
const m = 397;
const w = 32;
const r = 31;
const UMASK = (0xffffffff << r) >>> 0;
const LMASK = (0xffffffff >>> (w - r)) >>> 0;
const a = 0x9908b0df;
const u = 11;
const s = 7;
const t = 15;
const l = 18;
const b = 0x9d2c5680;
const c = 0xefc60000;
const f = 1812433253;

export interface State {
    state_array: number[];
    state_index: number;
}

export const initializeState = (state: State, seed: number) => {
    state.state_array[0] = seed; // suggested initial seed = 19650218

    for (let i = 1; i < n; i++) {
        seed = (Math.imul(f, seed ^ (seed >>> (w - 2))) + i) >>> 0; // Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier.
        state.state_array[i] = seed;
    }

    state.state_index = 0;
};

export const randomUint32 = (state: State) => {
    /* Compared to the C version of this function we add >>> 0 each time
     * we manipulate a number. This is because the algorithm works with
     * 32 bits ints so we have to discard the bits above 32
     */

    // point to current state location
    // 0 <= state_index <= n-1 always
    let k = state.state_index;

    let j = k - (n - 1); // point to state n-1 iterations before
    if (j < 0) j += n; // modulo n circular indexing

    let x = (state.state_array[k] & UMASK) | (state.state_array[j] & LMASK);

    let xA = x >>> 1;
    if (x & 1) xA ^= a;

    j = k - (n - m); // point to state n-m iterations before
    if (j < 0) j += n; // modulo n circular indexing

    x = (state.state_array[j] ^ xA) >>> 0; // compute next value in the state
    state.state_array[k++] = x; // update new state value;

    if (k >= n) k = 0; // modulo n circular indexing
    state.state_index = k;

    let y = x ^ (x >>> u); // tempering
    y = y ^ ((y << s) & b);
    y = y ^ ((y << t) & c);
    const z = (y ^ (y >>> l)) >>> 0;

    return z;
};

export const random = (state: State) => {
    /*
     * Since we manipulate 32 bit integers we divide 2^32
     * to get a float in [0, 1[
     */
    return randomUint32(state) / 0x100000000;
};
