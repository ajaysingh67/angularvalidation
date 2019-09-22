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



export const Configs = {
    url: getLink(),
    env: env,
    path: 'internal/'

};
