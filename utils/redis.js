const log = require("./logger");
const {redisClient} = require("../config/redis");
require('dotenv').config();

 

var ACCESSTOKEN = "TOKEN"


 
exports.setToken = async function (new_token, req, res) {

    if (typeof req.headers['authorization'] == "undefined") {

        log.info(req.headers, "Token Not found IN Headers " + res.uid, __FILE, __LINE, 5);

        return false;

    }

    key = TOKEN_KEY + req.headers['authorization'].replace(/[^a-z0-9]/gi, '')

    const reply = await SET_ASYNC(key, new_token, {'EX': process.env.token_expire});

 

    if (reply) {

        log.info("Reply\n", reply)

        log.info(reply, "Redis Status of Key Set for Refresh Token  "+key);

    } else {

        return false;

    }

    return;

}

 

exports.setLoginDetails = async function (data, key) {

    try {

        var key = `${ACCESSTOKEN}_${key}`;

 

       const reply = await redisClient.set(key, JSON.stringify(data), {EX: process.env.token_expire});

        if (reply) {

            log.info(`SetLoginDetails >> Reply >>, ${reply}`)

            log.info(`setLoginDetails >> Redis Status of Key Set for Login Details >> ${key}`);

        } else {

            return false;

        }

        return;

    } catch (error) {

        log.error(error);

        if(error.response !== undefined) {

            error.statusCode = error.response.status;

            error.status = error.response.status;

            error.stack = error.response.data;

        }

        throw error;

    }

}

 

exports.getLoginDetails = async function (key) {

    try {

 

        var key = `${ACCESSTOKEN}_${key}`;

        //var redis_reply = await GET_ASYNC(key)

        let response = await redisClient.get(key);

        if (response) {

            log.info(`GetLoginDetails >> Reply >> ${response}`)

            log.info(`GetLoginDetails >> Redis Status of Key Set for Login Details >> ${key}`);

            response = JSON.parse(response);

            return response;

        } else {

            return false;

        }

        return;

    } catch (error) {

        log.error(error);

        if(error.response !== undefined) {

            error.statusCode = error.response.status;

            error.status = error.response.status;

            error.stack = error.response.data;

        }

        throw error;

    }

}