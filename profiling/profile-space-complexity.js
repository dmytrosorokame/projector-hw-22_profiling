const { BalancedBST } = require("../balanced-bst");
const fs = require("fs");
const path = require("path");

const testCases = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../test-cases.json"), "utf8")
);

function measureMemoryUsage(n) {
  const tree = new BalancedBST();
  for (let i = 0; i < n; i++) {
    tree.insert(i);
  }
  return process.memoryUsage().heapUsed / 1024 / 1024;
}

const memoryResults = testCases.map((n) => ({
  n,
  memory: measureMemoryUsage(n),
}));

fs.writeFileSync(
  path.join(__dirname, "../artifacts/memory-results.json"),
  JSON.stringify(memoryResults, null, 2)
);
