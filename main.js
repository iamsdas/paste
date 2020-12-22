function main() {
  var encodedTxt = location.hash;
  if (encodedTxt.length != 0) {
    encodedTxt = encodedTxt.slice(1);
    document.getElementById('txt')
      .value = decode(encodedTxt);
  }
}

function encode(input) {
  return btoa(encodeURIComponent(ULZSS.encode(input))
    .replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
}

function decode(input) {
  return ULZSS.decode(decodeURIComponent(Array.prototype.map.call(atob(input),
      function (c) {
        return '%' + ('00' + c.charCodeAt(0)
            .toString(16))
          .slice(-2);
      })
    .join('')));
}

function getCurr() {
  return document.getElementById('txt')
    .value;
}

function showLink() {
  alert(location + '#' + encode(getCurr()));
}