/** Persistent or in-memory backend for tracking cooldown timestamps. */
export interface CooldownStorage {
  /**
   * Returns the timestamp (ms since epoch) of the last invocation for the given key,
   * or `null` if no record exists or the record has expired.
   */
  get(key: string): Promise<number | null>;

  /**
   * Stores the invocation timestamp for the given key.
   * The record must expire automatically after `ttl` milliseconds.
   */
  set(key: string, timestamp: number, ttl: number): Promise<void>;
}
