document.addEventListener('DOMContentLoaded', () => {
  let doc = document.getElementById('txt');
  let encodedTxt = location.hash;
  doc.contentEditable = true;
  doc.spellcheck = false;
  doc.focus();
  if (encodedTxt.length != 0) {
    encodedTxt = encodedTxt.slice(1);
    doc.innerText = decode(encodedTxt);
  }
  document.querySelector("button").onclick = showLink;
});

function encode(input) {
  return btoa(encodeURIComponent(ULZSS.encode(input))
    .replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
}

function decode(input) {
  return ULZSS.decode(decodeURIComponent(Array.prototype.map.call(atob(input),
      function(c) {
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