import { describe, expect, it } from 'vitest';

describe('formatDate', () => {
  it('formats iso date as day and month in russian', () => {
    expect(formatDate('2026-09-21T12:00:00.000Z')).toBe('21 сентября');
  });

  it('returns empty string for invalid date', () => {
    expect(formatDate('not a date')).toBe('');
  });
});
