var express = require('express')
// var cors = require('cors')
var app = express()

var whitelist = ["http://localhost:3000", "http://localhost:5000"];
var corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
// app.use(cors(corsOptions));

app.get('/abc', (req, res) => {
    console.log(req);
    return res.status(200).json({
        status: 'pass',
        msg: 'Hello World'
    });
});



app.listen(5000, '127.0.0.1', () => {
    console.log('Running on http://localhost.com:5000')
})