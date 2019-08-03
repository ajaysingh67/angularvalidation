'use strict';
let env: String;

/*
 change below line accordingly
*/

// env =  'prod';
//  env =  'qa';
  env =  'local';
 // env =  'dev';
 // env =  'uat';

function getLink() {
    if (env === 'local') {
        return 'http://localhost:9090/';
    } else if (env === 'prod') {
        return 'https://cashaa.com/';
    } else if (env === 'qa') {
        return 'https://qa-bank.cashaa.com/';
    } else if (env === 'dev') {
        return 'https://dev-bank.cashaa.com/';
    } else if (env === 'uat') {
        return 'https://uat.cashaa.com/';
    } else {
        return 'http://localhost:9090/';
    }
}

export const Configs = {
    url: getLink(),
    env: env,
    path: 'internal/'

};
