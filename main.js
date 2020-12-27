function main() {
  var doc = document.getElementById('txt');
  var encodedTxt = location.hash;
  if (encodedTxt.length != 0) {
    encodedTxt = encodedTxt.slice(1);
    doc.innerText = decode(encodedTxt);
  }
  doc.focus();
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
    .innerText;
}

function showLink() {
  prompt('Copy Link', location.href.split('#')[0] + '#' + encode(getCurr()));
}