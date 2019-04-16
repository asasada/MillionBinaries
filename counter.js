//counts a number of substrings to string and
function countOccurrence(str, substr, counter) {
    for(let i = 0; i < substr.length; i++) {
        let reg = new RegExp(substr[i], 'g');
        counter[i] += (str.match(reg) || []).length;
    }
    return counter;
}
module.exports.countOccurrence = countOccurrence;