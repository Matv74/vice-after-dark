import assert from "node:assert/strict";
import test from "node:test";
import { remainingReleaseSeconds, resolveReleaseWindow } from "../src/components/sites/vice-signal/config.ts";

const knownRegions = [
  ["PL", "Europe/Warsaw", "cet", "2026-11-18T23:00:00Z"],
  ["UA", "Europe/Kyiv", "eet", "2026-11-18T22:00:00Z"],
  ["GB", "Europe/London", "gmt", "2026-11-19T00:00:00Z"],
  ["US New York", "America/New_York", "na_east", "2026-11-19T05:00:00Z"],
  ["US Los Angeles", "America/Los_Angeles", "na_east", "2026-11-19T05:00:00Z"],
  ["JP", "Asia/Tokyo", "jp_kr", "2026-11-18T15:00:00Z"],
  ["AU", "Australia/Sydney", "au", "2026-11-18T13:00:00Z"],
];

for (const [country, zone, id, utc] of knownRegions) {
  test(country, () => {
    const release = resolveReleaseWindow(null, undefined, zone);
    assert.equal(release.window?.id, id);
    assert.equal(release.unlockAt, Date.parse(utc));
    assert.equal(release.approximate, false);
    assert.equal(remainingReleaseSeconds(release.unlockAt, release.unlockAt - 1001), 2);
    assert.equal(remainingReleaseSeconds(release.unlockAt, release.unlockAt - 1), 1);
    assert.equal(remainingReleaseSeconds(release.unlockAt, release.unlockAt), 0);
    assert.equal(remainingReleaseSeconds(release.unlockAt, release.unlockAt + 1000), 0);
  });
}

test("unknown zone falls back to local midnight, with manual and country overrides", () => {
  const fallback = resolveReleaseWindow("obsolete", "XX", "Etc/UTC");
  assert.deepEqual(fallback, { window: null, approximate: true, unlockAt: new Date(2026, 10, 19).getTime() });
  assert.equal(resolveReleaseWindow(null, "pl", "Asia/Tokyo").window?.id, "cet");
  assert.equal(resolveReleaseWindow("au", "PL", "Asia/Tokyo").window?.id, "au");
});
