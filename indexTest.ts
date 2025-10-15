import { PRNG } from './dist/simple-prng.cjs';

const p = new PRNG();

// p.initialize(234);

// for (let i = 0; i < 3; i++) {
//     console.log(p.random());
// }

p.initialize(19650218);

for (let i = 0; i < 3; i++) {
    console.log(p.randomInt());
    // console.log(p.random());
}
