const { check_user_table, make_result, make_error } = require("./db");
const HASH_ALGORITHM = 'sha256';

async function hash_stream(stream) {
    var crypto = require('crypto');
    var hash = crypto.createHash(HASH_ALGORITHM);
    hash.setEncoding('hex');
    return new Promise(function (resolve, reject) {
        stream.pipe(hash);
        stream.on('end', () => {
            hash.end();
            resolve(hash.read());
        });
        stream.on('error', function (err) {
            hash.end();
            reject(err);
        });
    });
}

var router = function (fastify, opts, done) {
    var authandusertable_only = { onRequest: [fastify.basicAuth, check_user_table] };

    // Get blob by :id
    fastify.get('/:blobid', authandusertable_only, async (request, reply) => {
        //request.params.blobid
        return make_result("");
    });

    // Post new blob by :id
    fastify.post('/', authandusertable_only, async (request, reply) => {
        return make_result("");
    });

    done();
};

module.exports = { router };