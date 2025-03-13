const { BalancedBST } = require("../balanced-bst");
const fs = require("fs");

const testCases = JSON.parse(fs.readFileSync("../test-cases.json", "utf8"));

function measureTime(operation, tree, values) {
  const start = process.hrtime.bigint();
  values.forEach((value) => tree[operation](value));
  const end = process.hrtime.bigint();
  return Number(end - start) / 1e6;
}

const timeResults = [];

testCases.forEach((n) => {
  console.log(`\nTesting for n = ${n}`);
  const tree = new BalancedBST();
  const values = Array.from({ length: n }, (_, i) => i);

  const insertTime = measureTime("insert", tree, values);
  const findTime = measureTime("find", tree, values);
  const deleteTime = measureTime("delete", tree, values);

  timeResults.push({ n, insertTime, findTime, deleteTime });
});

fs.writeFileSync(
  "artifacts/time-complexity.json",
  JSON.stringify(timeResults, null, 2)
);
