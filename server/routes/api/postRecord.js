const PostRecord = require('../../models/PostRecord');
var ObjectId = require('mongoose').Types.ObjectId;

var sanitize = require('mongo-sanitize');

var multer = require('multer')
var upload = multer({dest: 'uploads/'})

var mv = require('mv')

module.exports = (app) => {
    app.get('/api/postRecords', (req, res, next) => {
        PostRecord.find()
        .exec()
        .then((postRecord) => res.json(postRecord))
        .catch((err) => next(err));
    });

    app.post('/api/postRecords/:type/:name/:address/:city/:state/:zip/:title/:lat/:lng/reportIssue', upload.single('file'), function (req, res, next) {
        var postRecord = new PostRecord();

        let imageFile = req.file;

        postRecord.location_name = sanitize(req.params.name)
        postRecord.address = sanitize(req.params.address)
        postRecord.type = sanitize(req.params.type)
        postRecord.city = sanitize(req.params.city)
        postRecord.state = sanitize(req.params.state)
        postRecord.zip = sanitize(req.params.zip)
        postRecord.post_title = sanitize(req.params.title)
        postRecord.image_src = `/assets/thumbs/${imageFile.filename}.jpg`
        postRecord.location_lat = sanitize(req.params.lat)
        postRecord.location_lng = sanitize(req.params.lng)
        postRecord.status = 'Unverified'
        postRecord.post_id = (Math.floor(Math.random() * 10000000)).toString()


        mv(imageFile.path, `../client/public/assets/thumbs/${imageFile.filename}.jpg`, function(err) {
            if (err) {
                console.log(err)
            }
        })

        postRecord.save()
        .then(() => res.json(postRecord))
        .catch((err) => next(err));
    });

    app.post('/api/postRecords/:objId/:status/changeStatus', (req, res, next) => {
        PostRecord.updateOne(
            {"post_id": req.params.objId},
            {"status":req.params.status},
            {upsert:true}, function(err, doc) {
                if (err) console.log(err);

            }
        )
    })


     app.get('/api/postRecords/:keyword/SearchAnything', (req, res, next) => {
        PostRecord.find( {"$text" : {"$search": sanitize(req.params.keyword)}})
        .exec()
        .then((postRecord) => res.json(postRecord))
        .catch((err) => next(err));
    });

    app.get('/api/postRecords/:keyword/locSearch', (req, res, next) => {
        PostRecord.find( {"$text" : {"$search": sanitize(req.params.keyword)}} )
        .exec()
        .then((postRecord) => res.json(postRecord))
        .catch((err) => next(err));
    });

    app.get('/api/postRecords/:keyword/:category/catLocSearch', (req, res, next) => {
        PostRecord.find( {"$text" : {"$search": sanitize(req.params.keyword)}, "type": sanitize(req.params.category)} )
        .exec()
        .then((postRecord) => res.json(postRecord))
        .catch((err) => next(err));
    });

    app.get('/api/postRecords/:category/catSearch', (req, res, next) => {
        PostRecord.find( {"type": sanitize(req.params.category)} )
        .exec()
        .then((postRecord) => res.json(postRecord))
        .catch((err) => next(err));
    });

    app.get('/api/postRecords/allResults', (req, res, next) => {
        PostRecord.find()
        .exec()
        .then((postRecord) => res.json(postRecord))
        .catch((err) => next(err));
    });

};
