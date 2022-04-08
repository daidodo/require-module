# Require Module

[![npm](https://img.shields.io/npm/v/@dozerg/require-module.svg)](https://www.npmjs.com/package/@dozerg/require-module)
![Downloads](https://img.shields.io/npm/dm/@dozerg/require-module.svg)
[![Build Status](https://github.com/daidodo/require-module/actions/workflows/node.js.yml/badge.svg)](https://github.com/daidodo/require-module/actions)

Search and require a module that won't be webpack'ed.

# Usage

```sh
npm i require-module
```

# APIs

## `requireModule(moduleName: string, fromPath: string)`

Search and load a module from given path.

If not found, `undefined` will be returned.

```ts
import requireModule from '@dozerg/require-module';

const filePath = '/path/to/a/file.ts';

// Search and find Prettier for given source file.
const pt = requireModule('prettier', filePath);

if(pt === undefined) {
  console.log('Cannot find Prettier from given path.');
} else {
  // Resolve Prettier config for given source file.
  const config = await pt.resolveConfig(filePath);

  //...
}
```

When you webpack the above code, `prettier` and its dependencies will NOT be packed.

At runtime, the above code will try to `require('prettier')` from `filePath` and its parent directories, where `node_modules/prettier` can be found.

## `requireModule(moduleName: string, fromPath: string, defaultModule: any)`

Search and load a module from given path.

If not found, `defaultModule` will be returned.

```ts
import prettier from 'prettier';
import requireModule from '@dozerg/require-module';

const filePath = '/path/to/a/file.ts';

// Search and find Prettier for given source file.
// If not found, use 'prettier' instead.
const pt = requireModule('prettier', filePath, prettier);

// Resolve Prettier config for given source file.
const config = await pt.resolveConfig(filePath);

//...
```

When you webpack the above code, `prettier` and its dependencies WILL be packed.

At runtime, the above code will try to `require('prettier')` from `filePath` and its parent directories, where `node_modules/prettier` can be found.

If not found, the packed `prettier` will be used.

# License

MIT © Zhao DAI <daidodo@gmail.com>
