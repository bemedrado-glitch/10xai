-- 003 — Tasks
-- Run in Supabase SQL Editor against ytmanuajkffzoegkmqeb after 001 + 002.
-- Idempotent — uses CREATE TABLE IF NOT EXISTS / DROP POLICY IF EXISTS.

CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'general',
  status TEXT NOT NULL DEFAULT 'open',
  due_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_tasks_lead_id ON tasks(lead_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status_due ON tasks(status, due_at);
CREATE INDEX IF NOT EXISTS idx_tasks_created ON tasks(created_at DESC);

-- Auto-update updated_at on every UPDATE
CREATE OR REPLACE FUNCTION tasks_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_tasks_updated_at ON tasks;
CREATE TRIGGER trg_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION tasks_set_updated_at();

-- RLS — same pattern as the other tables
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users full access on tasks" ON tasks;
CREATE POLICY "Authenticated users full access on tasks"
  ON tasks FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Verification:
-- SELECT count(*) FROM tasks;
-- INSERT INTO tasks (title, type) VALUES ('test task', 'general');
-- DELETE FROM tasks WHERE title = 'test task';
