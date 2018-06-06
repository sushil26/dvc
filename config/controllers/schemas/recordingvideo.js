var fs = require('fs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

//////////instantiate mongoose-gridfs/////////////////////////
var gridfs = require('mongoose-gridfs')({
    collection: 'attachments',
    model: 'Attachment'
});
var Attachment = gridfs.model
var AttachmentSchema = gridfs.schema;

///////////////////////////attach plugins/////////////////////
///////////////////////////ensure indexes/////////////////////
//////////register and export a model/////////////////////////
module.export = mongoose.model('Attachment', AttachmentSchema);


//////////Read from Local(insert)/////////////////////////
Attachment.write({
        filename: 'Conf00098989812',
        contentType: 'Media'
    },
    fs.createReadStream('/public/Recording/1_1_2.mpg'),
    function (error, savedAttachment) {

    });

////////// Read from the Database /////////////////////////
var stream = Attachment.readById(  'objectid' );
stream.on('error', fn);
stream.on('data', fn);
stream.on('close', fn);