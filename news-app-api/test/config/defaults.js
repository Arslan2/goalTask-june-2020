const _ = require("lodash");
const appConfig = require("../../config/config.json");

const defaultConfig = appConfig.development;
const environment = process.env.NODE_ENV || "development";
const environmentConfig = appConfig[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

const config = {};

config.dbDumpFile = `dumps/temp/${finalConfig.database}_data.sql`;
config.ROUTE_PREFIX = "/api";

module.exports = config;
