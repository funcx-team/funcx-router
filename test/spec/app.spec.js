import * as router from "../..";

import { Buffer } from "buffer";
import stringify from "json-stable-stringify";

import AsyncLock from "async-lock";
const ayncLock = new AsyncLock();
const lock = key => {
  return new Promise(fulfilled => {
    ayncLock.acquire(key, done => {
      fulfilled(done);
    });
  });
};

const toData = (value: any) => {
  return value && Buffer.from(stringify(value)).toString("base64");
};

const getUrlPath = () => {
  return location.href.replace(/^https?:\/\/[^\/]+/, "");
};

const states = [
  {
    inputPath: "/",
    path: "/",
    localValue: { field: "xyz" },
    fullPath: "/?" + toData({ field: "xyz" }),
  },
  {
    inputPath: "/thing",
    path: "/thing",
    localValue: "pqr",
    fullPath: "/thing?" + toData("pqr"),
  },
  {
    inputPath: "/user",
    path: "/user",
    localValue: { options: { lang: "ja" } },
    fullPath: "/user?" + toData({ options: { lang: "ja" } }),
  },
];

const wait = n => {
  return new Promise(done => setTimeout(() => done(n), n));
};

const statesReversed = states.slice(0).reverse();

describe("HashStateHistory", () => {
  let done = null;
  let stateHistory = null;
  before(async () => {
    done = await lock();
    stateHistory = new router.HashStateHistory();
    stateHistory.updatePath("/dammy");
  });
  it("Reflect to location", () => {
    for (const state of states) {
      stateHistory.updatePath(state.inputPath, state.localValue);
      assert.strictEqual(location.hash, "#" + state.fullPath);
    }
  });
  it("back", async () => {
    for (const state of statesReversed) {
      assert.strictEqual(location.hash, "#" + state.fullPath);
      history.back();
      await wait(80);
    }
  });
  it("forward", async () => {
    for (const state of states) {
      history.forward();
      await wait(80);
      assert.strictEqual(location.hash, "#" + state.fullPath);
    }
  });
  after(() => {
    stateHistory.close();
    done(null);
  });
});

describe("PathStateHistory", () => {
  let done = null;
  let stateHistory = null;
  before(async () => {
    done = await lock();
    stateHistory = new router.PathStateHistory();
    stateHistory.updatePath("/dammy");
  });
  it("Reflect to location", () => {
    for (const state of states) {
      stateHistory.updatePath(state.inputPath, state.localValue);
      assert.strictEqual(getUrlPath(), state.fullPath);
    }
  });
  it("back", async () => {
    for (const state of statesReversed) {
      assert.strictEqual(getUrlPath(), state.fullPath);
      history.back();
      await wait(80);
    }
  });
  it("forward", async () => {
    for (const state of states) {
      history.forward();
      await wait(80);
      assert.strictEqual(getUrlPath(), state.fullPath);
    }
  });
  after(() => {
    stateHistory.close();
    done();
  });
});
