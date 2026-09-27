import assert from 'node:assert/strict';
import test from 'node:test';

import { invitationData } from '../src/data/invitation.ts';

test('invitation data contains the required event details', () => {
  assert.equal(invitationData.eventTitle, 'தாய்மை விழா');
  assert.equal(invitationData.coupleEnglish, 'Rajgopal & Subiksha');
  assert.equal(invitationData.venueName, 'The Palm Grove');
  assert.equal(invitationData.venueCity, 'Chennai');
  assert.equal(invitationData.dateNumber, '22');
  assert.equal(invitationData.countdownTarget, '2026-06-22T10:00:00+05:30');
});
