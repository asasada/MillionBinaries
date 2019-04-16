function makeHTML(sequences, sums) {
    let str = '<html>' +
        '<head>' +
        '<title>Title!</title>' +
        '<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">' +
        addStyle() +
        '</head>' +
        '<body>' +
        '<h3 align="center">Incoming of one numeral in a million binary numbers</h3>' +
        makeTable(sequences.ones, sums.sumOfOnes) + '<br>'+
        '<h3 align="center">Incoming of two numbers</h3>' +
        makeTable(sequences.twos, sums.sumOfTwos) + '<br>'+
        '<h3 align="center">Incoming of three numbers</h3>' +
        makeTable(sequences.threes, sums.sumOfThrees) + '<br>'+
        '</body></html>';
    return str;
}
module.exports.makeHTML = makeHTML;

function makeTable (seq, sum) {
    let str = '<table align="center" border="solid 2px black">';
    for (let i = 0; i < seq.length; i++) {
        str += "<tr><td><strong>" + seq[i] + "</strong>:    </td><td>" + sum[i].toFixed(2) + "%</td></tr>"
    }
    str += "</table>";
    return str;
}

function addStyle() {
return str = '<style>'+
    'body {font-family: Roboto;}' +
    'h3   {}' +
    'table {border-collapse: collapse;' +
    'background-color: lightgoldenrodyellow}' +
    'table, tr, td {border: 1px dashed saddlebrown;' +
    'padding: 3px 15px}' +
'</style>'

}