import findUp from '@dozerg/find-up';

import requireModule from './';

describe('requireModule', () => {
  const moduleName = '@dozerg/find-up';
  const fromPath = __dirname;
  describe('Without default', () => {
    describe('Found module', () => {
      it('should return module', () => {
        const result = requireModule(moduleName, fromPath);
        expect(result).toBeDefined();
      });
    });
    describe('Not found module', () => {
      it('should return undefined', () => {
        const result = requireModule('unknown-module-name', fromPath);
        expect(result).toBeUndefined();
      });
    });
  });
  describe('With default', () => {
    describe('Found module', () => {
      it('should return module', () => {
        const result = requireModule(moduleName, fromPath, 123).default;
        expect(result).toBe(findUp);
      });
    });
    describe('Not found module', () => {
      it('should return default', () => {
        const result = requireModule('unknown-module-name', fromPath, 123);
        expect(result).toBe(123);
      });
    });
  });
});
