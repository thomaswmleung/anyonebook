/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
    return list.filter(f)[0]
  }

  /**
   * Deep copy the given object considering circular structure.
   * This function caches all nested objects and its copies.
   * If it detects circular structure, use cached copy to avoid infinite loop.
   *
   * @param {*} obj
   * @param {Array<Object>} cache
   * @return {*}
   */
  export function deepCopy (obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
      return obj
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj)
    if (hit) {
      return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
      original: obj,
      copy
    })

    Object.keys(obj).forEach(key => {
      copy[key] = deepCopy(obj[key], cache)
    })

    return copy
  }

  /**
   * forEach for object
   */
  export function forEachValue (obj, fn) {
    Object.keys(obj).forEach(key => fn(obj[key], key))
  }

  export function isObject (obj) {
    return obj !== null && typeof obj === 'object'
  }

  export function isPromise (val) {
    return val && typeof val.then === 'function'
  }

  export function assert (condition, msg) {
    if (!condition) throw new Error(`[vuex] ${msg}`)
  }

  export function checkImageExists({imageUrl, callBack}) {
      var imageData = new Image();
      imageData.onload = function() {
        callBack(true);
      };
      imageData.onerror = function() {
        callBack(false);
      };
      imageData.src = imageUrl;
  }

  export function createUUID(){
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}
