import crypto from "crypto";

export const createCanonicalJson = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    return "[" + obj.map((item) => createCanonicalJson(item)).join(",") + "]";
  }

  const sortedKeys = Object.keys(obj).sort();
  const sortedPairs = sortedKeys.map((key) => {
    return JSON.stringify(key) + ":" + createCanonicalJson(obj[key]);
  });

  return "{" + sortedPairs.join(",") + "}";
};

export const createEvidenceHash = (data) => {
  const canonicalStr = createCanonicalJson(data);
  const hashHex = crypto.createHash("sha256").update(canonicalStr, "utf8").digest("hex");
  return "0x" + hashHex;
};

export const createAccountHash = (data) => {
  const accountIdentifiers = {
    username: (data.username || "").toLowerCase(),
    type: (data.type || "instagram").toLowerCase(),
    url: (data.url || "").toLowerCase()
  };
  const canonicalStr = createCanonicalJson(accountIdentifiers);
  const hashHex = crypto.createHash("sha256").update(canonicalStr, "utf8").digest("hex");
  return "0x" + hashHex;
};
