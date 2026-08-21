const db = new Map();

export const saveInvestigation = (scanId, data) => {
  db.set(scanId, JSON.parse(JSON.stringify(data)));
  return true;
};

export const getInvestigation = (scanId) => {
  const data = db.get(scanId);
  if (!data) return null;
  return JSON.parse(JSON.stringify(data));
};
