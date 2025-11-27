function generateHashes() {
    const text = document.getElementById('input-text').value;

    if (!text) {
        document.getElementById('md5').value = '';
        document.getElementById('sha1').value = '';
        document.getElementById('sha256').value = '';
        document.getElementById('sha512').value = '';
        return;
    }

    document.getElementById('md5').value = CryptoJS.MD5(text).toString();
    document.getElementById('sha1').value = CryptoJS.SHA1(text).toString();
    document.getElementById('sha256').value = CryptoJS.SHA256(text).toString();
    document.getElementById('sha512').value = CryptoJS.SHA512(text).toString();
}

function copyHash(type) {
    const value = document.getElementById(type).value;
    if (!value) return;
    window.copyToClipboard(value);
}
