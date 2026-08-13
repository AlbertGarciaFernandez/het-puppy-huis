import assert from "node:assert/strict";
import test from "node:test";

import { getEventsByStatus } from "../src/data/event-status";

test("classifies July 25 and August 1 as past events", () => {
  const pastEvents = getEventsByStatus(
    [
      { date: "July 25, 2026", status: "past" },
      { date: "August 1, 2026", status: "past" },
      { date: "August 29, 2026", status: "upcoming" },
    ],
    "past",
  ).map((event) => event.date);

  assert.deepEqual(pastEvents, ["July 25, 2026", "August 1, 2026"]);
});

test("classifies Pups at Superflirt as an upcoming event", () => {
  const upcomingTitles = getEventsByStatus(
    [
      { title: "Het Puppy Huis & Puppy Hunter Mansion World Pride Edition", status: "past" },
      { title: "Puppy Hunter Mansion at Headrush x Damage", status: "past" },
      { title: "Pups at Superflirt", status: "upcoming" },
    ],
    "upcoming",
  ).map((event) => event.title);

  assert.ok(upcomingTitles.includes("Pups at Superflirt"));
});

test("keeps upcoming events in their configured order", () => {
  const upcomingTitles = getEventsByStatus(
    [
      { title: "Pups at Superflirt", status: "upcoming" },
      { title: "Puppy Hunter Mansion: Edition", status: "upcoming" },
      { title: "Puppy Hunter Mansion at Headrush x Damage", status: "past" },
    ],
    "upcoming",
  ).map((event) => event.title);

  assert.deepEqual(upcomingTitles, ["Pups at Superflirt", "Puppy Hunter Mansion: Edition"]);
});
