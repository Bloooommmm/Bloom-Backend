import assert from "node:assert/strict";
import test from "node:test";
import { listResponse, singleResponse } from "../src/utils/index.js";

test("API response helpers use the shared response envelope", () => {
  assert.deepEqual(singleResponse({ id: "1" }), { success: true, data: { id: "1" } });
  assert.deepEqual(listResponse([{ id: "1" }]), {
    success: true,
    data: [{ id: "1" }],
    meta: { total: 1 },
  });
});
