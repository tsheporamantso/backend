import NodeCache from "node-cache";

// stdTTL = default time-to-live in seconds before a cache entry expires
// checkperiod = how often node-cache checks for expired entries
const cache = new NodeCache({ stdTTL: 60, checkperiod: 70 });

export default cache;
