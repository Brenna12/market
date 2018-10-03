const express = require('express');
// const upload = require('./upload/upload');

require('dotenv').load();

const hashFile = require('hash-file');

const cors = require('cors');
const bodyParser = require('body-parser');
const server = express();

const pool = require('./db/database');

var crypto = require('crypto');

const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();
const containerName = 'market';

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/dest')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".rmx")
    }
});
const upload = multer({
    storage
});

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST']
};

server.use(bodyParser.json());
server.use(cors(corsOptions));

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

server.use(allowCrossDomain);


server.get('/scenarios', function (req, res, next) {

    getScenarios = (user_id) => new Promise((res, rej) => {

        // if you got a connection...
        pool.query('SELECT * FROM scenarios where user_id = ?', [user_id], (err, rows) => {

            if (err) {
                return rej('Couldnt get a connection:', err);
            }

            if (!rows.length) {
                return rej('None found!');
            }
            // for simplicity, just send the rows

            return res(rows);
            // CLOSE THE CONNECTION
        })
    });

    let user_id = req.query.user_id;


    let scenarios;

    getScenarios(user_id).then(result => {


            res.send(result);
        }),
        function (reason) {

            res.send(result);

        }


});


server.get('/scenarios/all', function (req, res, next) {

    getScenarios = () => new Promise((res, rej) => {

        // if you got a connection...
        pool.query('SELECT * FROM scenarios;', (err, rows) => {

            if (err) {
                return rej('Couldnt get a connection:', err);
            }

            if (!rows.length) {
                return rej('None found!');
            }
            // for simplicity, just send the rows

            return res(rows);
            // CLOSE THE CONNECTION
        })
    });

    let scenarios;

    getScenarios().then(result => {


            res.send(result);

        }),
        function (reason) {

            res.send(result);

        }


});

server.post('/upload', upload.single('scenario'), function (req, res, next) {

    let name = req.body.name;
    let desc = req.body.desc;
    let user_id = req.body.user_id;


    let hash = crypto.createHash('md5').update(req.file.filename).digest("hex");

    let sourceFilePath = req.file.destination + "/" + req.file.filename;

    let blobName = hash + "/" + req.file.filename;


    let link = blobName;

    const uploadToStorage = () => {
        return new Promise((resolve, reject) => {
            blobService.createBlockBlobFromLocalFile(containerName, blobName, sourceFilePath, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        message: `Upload of '${blobName}' complete`
                    });
                }
            });
        });
    };

    pool.query('INSERT INTO scenarios (user_id, name, link, description) VALUES (?, ?, ?, ?)', [user_id, name, link, desc], (err) => {

        if (err) {
            return err;
        }

        uploadToStorage().then(res => {
            console.log(res);
        });
        console.log("saved!");
        // CLOSE THE CONNECTION
    })


    res.json();

});


server.listen(3000, () => {
    console.log('Server started!');
});