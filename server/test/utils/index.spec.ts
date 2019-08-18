import * as utils from '../../src/utils';

describe('Utility Methods', () => {
  test('adds 1 + 2 to equal 3.', () => {
    expect(utils.sum(1, 2)).toBe(3);
  });

  describe('Generate Hashed Password', () => {
    test('Returns empty string if empty string is passed to hashed method.', () => {
      expect(utils.generateHash('')).toBe('');
    });
    test('Returns a value when the hashed method is ran.', () => {
      expect(utils.generateHash('test')).toBeDefined();
    });
  });
  describe('Validate Password', () => {
    const hashedPassTest1 = utils.generateHash('test1');
    const hashedPassTest2 = utils.generateHash('test2');
    test("Hashed password matches password of value: 'test1' will return true.", () => {
      expect(utils.validPassword('test1', hashedPassTest1)).toBeTruthy();
    });
    test("Password of value 'test1' will return false for hashed value of 'test2'.", () => {
      expect(utils.validPassword('test1', hashedPassTest2)).toBeFalsy();
    });
    test("Invalid password of 'test2' will fail for hashed value of 'test'.", () => {
      expect(utils.validPassword('test2', hashedPassTest1)).toBeFalsy();
    });
  });

  describe('Random Value Generators', () => {
    test('rand() returns a value when called.', () => {
      expect(utils.rand()).toBeDefined();
    });
    test('generateToken() returns a value when called.', () => {
      expect(utils.generateToken()).toBeDefined();
    });
    test('generateRoomCode() returns a value when called.', () => {
      expect(utils.generateRoomCode()).toBeDefined();
    });
  });

  describe('Express Error', () => {
    test('Is of type Error', () => {
      const bracketteError = new utils.BracketteError('Not Found', 404);
      expect(bracketteError).toBeInstanceOf(Error);
    });
    test("Default 'httpStatusCode' value contains 500 error and value in 'message' property.", () => {
      const bracketteError = new utils.BracketteError('Not Found');
      expect(bracketteError.httpStatusCode).toEqual(500);
      expect(bracketteError.message).toBeDefined();
    });
    test("Custom 'status' value contains whatever value was passed as well for the 'message' property.", () => {
      const bracketteError = new utils.BracketteError('Not Found!', 404);
      expect(bracketteError.httpStatusCode).toEqual(404);
      expect(bracketteError.message).toEqual('Not Found!');
    });
  });
});
