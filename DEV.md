# TODO

Things I want to review before considering the library ready to be officially published:

Features:

- [x] Rename `rotate` by `rotateBy`~
- [x] Add `rotateToward(vec, maxAngle)`~
- [x] Add `.resize` equivalent to `normalize() + multiplyScalar()`
- [x] Maybe add `fromPolar` https://github.com/maxkueng/victor/issues/26`~
- [x] Maybe `isPerpendicular`, `isParallel` https://github.com/maxkueng/victor/pull/42~
- [x] Implement `limitX` and `limitY` and use them in `limit`.~
- [x] Implement `.clamp(max: number, min?: number)`: Always apply `mag = Math.max(mag, max)` and if `min` is defined `mag = Math.min(mag, min)` (handle special case for `mag === 0`. `max` and `min` must always be positive. Also implement `.clampX` and `.clampY`.~
- [x] Add a method equivalent to `clampX(10).clampY(10)` (which is different from `.clamp(10)`) and rename `.clamp` to `.clampMag`
- [x] Maybe integrate the code from [this issue](https://github.com/maxkueng/victor/issues/30). After testing I realized the proposed function computes the angle between the vector created between the 2 input vectors and the x axis. The name proposed in the issue needs to change. **Won't do I would make more sense to use `vec1.subtract(v2).angle()`.**
- [x] Add `.slope`
- [x] Add a `.reflect` method inspired by `p5.Vector.reflect`
- [x] Add a `.random` static method generating a random unit vector.
- [x] For `.mix` methods explain if `mixFactor` of `0` sets the value to the current vector or to the new vector (see doc of `p5.Vector.lerp` for example)
- [x] Get rid of `.length` and `.lengthSq` to have a consistent naming `.mag` and `.magSq`
- [x] Add `.isCloseTo(other: Vector, epsilon=1e-6)` because `.isEqual()` might not always to do the trick with floating point errors
- [x] Add `.manhattanDistance(other: Vector)` and `distanceChebyshev(vec: Vector)`

Tooling:

- [x] Rework categories (split angle and rotation)~
- [x] Create a dedicated section for dev workflow documentation.
- [x] Use spellcheck to avoid typos in code and docs.
- [x] Create interactive example of the different methods to make it easier to understand the behavior of each method.
- [x] Look into UMD to allow import from `<script>` without `type="module"`
- [x] Docs: Add instructions to let the user add a new method to the `Vector` class while making TypeScript happy.

Features:

- [ ] Add `Number.isFinite()` validations on the main methods arguments. **Note** Before adding it everywhere we should benchmark the impact on performances: Using TypeScript should avoid most of the issues, if the impact on performances is noticeable we might not want to add it.
- [ ] Maybe add `.wrapX(0, 100)` method to have the x property going back to `100` if it's lower than `0` and vice versa? **Note** We might want to keep it outside of this package because I'm not sure what would be the proper generic way to handle the situation where the vector is far from the bounds. For example with `.wrapX(0, 10)` if `x == -1` then `x` should be wrapped to `9` but what should be done for `x == -11`? Do we clamp `x` to `0` or do we "double wrap" it to `9`?

Dev tasks:

- [ ] `p5` jsdoc uses `@chainable`, check if it's a real tag and maybe use it anyway?
- [ ] Look into how changelogs are generated and decide if I want to do something with commit names.
- [ ] Generate minified files in the build
- [ ] Add an `epsilon` property to `Vector` to improve computations stability?
- [ ] Find a way to validate docs (make sure all required tags are used, maybe make sure the documented method is used in the `@example` tag)
- [ ] In the README add a word about immutability https://github.com/maxkueng/victor/issues/18
    - [ ] Think of an approach for a `VectorOps` collection of methods which would operate on immutable vectors. After reading [this blog post](https://blog.tojicode.com/2012/04/if-i-built-physics-engine.html) I experimented with creating `type IVector = Float32Array` and methods like `add = (v1: IVector, v2: IVector, res: IVector)` but I realized accessing a `TypedArray` member like `res[0] = v1[0] + v2[0];` is much slower than `this.x = this.x + other.x`. So for now this is on hold, I'll rethink about that later on.

# Dev tooling

- **When cloning the repo `ln -s "$(pwd)/tools/pre-commit" .git/hooks/pre-commit` to enable local formatting and linting on commit.**
- We are using node's (24+) built-in support of TypeScript so we don't have a `tsconfig.json` file.
- When migrating from Victor.js, we replaced the usage of `jest` and `chai` of Victor with nodeJS built-in test runner and assertions.
- For testing we are using node's [built-in test runner](https://nodejs.org/api/test.html) and its assertions system. The assertion system is a bit poor and we might want to use [chai](https://www.npmjs.com/package/chai) assertions if testing becomes too tedious in the future.

Dev workflow:

```shell
npm install      # We use only dev-dependencies

npmr build:watch # Watches both the typescript transpilation and the building of the docs from the TSdoc comments

npmr serve:doc   # Serve the generated doc website locally
```

## Linting

In addition to common eslint configuration for TypeScript we use [cspell-eslint-plugin](https://github.com/streetsidesoftware/cspell/tree/main/packages/cspell-eslint-plugin) to check for English errors. See [`eslint.config.mjs`](./eslint-config.mjs) for configuration (also to add words to ignore).

# Bundling

We bundle the package as a [UMD module](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-plugin-d-ts.html) so that it can be used both in nodeJS and in browsers.

To do so we use `rollup` and `@rollup/plugin-typescript` the `npmr run build` and `npm run build:watch` take care of building the package, the types and the doc.

# Publishing

The GitHub CI handle the publication of the [package to npm](https://www.npmjs.com/package/simple-vector) and the deployment of the GitHub Pages for the docs website. See [`.github/workflows/publish-npm.yml`](.github/workflows/publish-npm.yml).

- Updating the `version` field in `package.json` triggers the publishing of a new version and its documentation.
- The docs can be updated without publishing a new version of the package running [`.github/workflows/publish-docs-only.yml`](.github/workflows/publish-docs-only.yml), [here on GitHub](https://github.com/statox/simple-vector.ts/actions/workflows/publish-docs-only.yml)
