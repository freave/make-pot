import { walkDirectories } from "../../src/helpers/walkDirectories";
import { relative } from "node:path";

test('walk single directories', async () => {
  const directory = ['test/test-files'];
  const expected = [
    "blade.blade.php",
    "nested/blade-nested-multiline.blade.php",
    "php.php"
  ];

  let result = await walkDirectories(directory);
  result = result.map((path) => relative('test/test-files', path));

  expect(result).toEqual(expected);
});

test('non existent directory', async () => {
  const directory = ['test/non-existent'];
  const expected: [] = [];

  let result = await walkDirectories(directory);

  expect(result).toEqual(expected);
});
