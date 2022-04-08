import log4js from 'log4js';

import findUp from '@dozerg/find-up';

export default function requireModule(moduleName: string, fromPath: string, defaultModule?: any) {
  const log = logger('require-module.requireModule');
  const userModule = requireUserModule(moduleName, fromPath);
  if (userModule !== undefined) return userModule;
  log.warn('Cannot find', moduleName, 'from path:', fromPath, 'and use default provided');
  return defaultModule;
}

declare const __webpack_require__: typeof require;
declare const __non_webpack_require__: typeof require;
const req = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require;

function requireUserModule(moduleName: string, fromPath: string) {
  const log = logger('require-module.requireUserModule');
  const [modulePath] = findUp.sync(`node_modules/${moduleName}`, {
    cwd: fromPath,
    stopAtLimit: 1,
    type: 'directory',
  });
  if (!modulePath) return undefined;
  log.debug('Found', moduleName, 'in', modulePath);
  return req(modulePath);
}

function logger(category?: string) {
  return log4js.getLogger(category);
}
