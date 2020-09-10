const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3055;

//middleware
app.use(bodyParser.json())

//frontend
app.use(express.static(__dirname + "/../client/dist"));

//word transform function
function repeatedWordTransform(str) {
    let upperCount = {};
    let occurrenceRecord = new Map();
    let res = '';
    for (let char of str) {
        if (char.toLowerCase() !== char) {
            upperCount[char.toLowerCase()] = upperCount[char.toLowerCase()] + 1 || 1;
        }
        let lowerChar = char.toLowerCase();
        //use map to remain the original order
        occurrenceRecord.set(lowerChar, occurrenceRecord.get(lowerChar) + 1 || 1)
    }

    let repeat ='';
    for (let [ele, val] of occurrenceRecord) {
        if (val == 1) {
            res += upperCount[ele] ? ele.toUpperCase() : ele;
        } else {
            let upTimes = upperCount[ele] || 0;
            repeat += ele.toUpperCase().repeat(upTimes) + ele.repeat(val - upTimes);
        }
    }
    return res + repeat;
}

//post route
app.use("/post", (req, res) => {
    let text = req.body.text;
    let newText = repeatedWordTransform(text)
    res.json(newText);
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });