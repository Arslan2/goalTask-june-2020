const { execSync } = require("child_process");
const _ = require("lodash");
const path = require("path");
const Umzug = require("umzug");
const fs = require("fs");

const Sequelize = require("sequelize");
const { sequelize } = require("../../models");

const appConfig = require("../../config/config.json");

const defaultConfig = appConfig.development;
const environment = process.env.NODE_ENV || "development";
const environmentConfig = appConfig[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

const dbDumpFilePath = `dumps/temp/${finalConfig.database}.sql`;
const dbDumpFile = `${path.join(__dirname, "../")}${dbDumpFilePath}`;
const migrationsPath = `${path.join(__dirname, "../../migrations")}`;

const umzug = new Umzug({
  storage: "sequelize",
  storageOptions: { sequelize },
  migrations: {
    path: migrationsPath,
    params: [sequelize.getQueryInterface(), Sequelize]
  }
});

const setupDatabase = () => {
  const dumpPath = path.join(__dirname, "../");
  const dumpReadPath = `${dumpPath}dumps/seed.sql`;
  const dumpWritePath = `${dumpPath}dumps/temp/${finalConfig.database}.sql`;
  let content = fs.readFileSync(dumpReadPath, "utf8");
  content = content.replace(/{{DATABASE_NAME}}/g, finalConfig.database);
  fs.writeFileSync(dumpWritePath, content, "utf8");
  execSync(
    `sh ${__dirname}/DbSetup.sh ${dumpPath}dumps/temp/${
      finalConfig.database
    }.sql ${finalConfig.username} ${finalConfig.password} ${finalConfig.host}`
  );
};

const dumpDatabase = () => {
  fs.writeFileSync(dbDumpFile, "", "utf8");
  execSync(
    `sh ${__dirname}/DbDump.sh ${finalConfig.host} ${finalConfig.username} ${
      finalConfig.password
    } ${finalConfig.database} ${dbDumpFile}`
  );
};

const restoreDatabase = () => {
  if (fs.existsSync(dbDumpFile)) {
    execSync(
      `sh ${__dirname}/DbSetup.sh ${dbDumpFile} ${finalConfig.username} ${
        finalConfig.password
      } ${finalConfig.host} ${finalConfig.database}`
    );
  }
};

before(async () => {
  try {
    const checkDbExist = await sequelize.query(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${
        finalConfig.database
      }'`,
      { type: sequelize.QueryTypes.SELECT }
    );

    if (checkDbExist.length) {
      const pendingMigrations = await umzug.pending();
      if (pendingMigrations.length) {
        await umzug.up();
        dumpDatabase();
      } else if (!fs.existsSync(dbDumpFile)) {
        dumpDatabase();
      }
    }
  } catch (error) {
    setupDatabase();
    await umzug.up();
    dumpDatabase();
  }
});

afterEach(async () => {
  const tablesToTruncate = [];
  if (finalConfig.database.includes("test")) {
    const tables = await sequelize.query(
      `SELECT table_name FROM information_schema.tables where table_schema = '${
        finalConfig.database
      }'`,
      { type: sequelize.QueryTypes.SELECT }
    );
    tables.forEach(table => {
      tablesToTruncate.push(
        `TRUNCATE TABLE \`${table.TABLE_NAME || table.table_name}\`;\n`
      );
    });
    const truncateQuery = `SET FOREIGN_KEY_CHECKS = 0;\n${tablesToTruncate.join(
      " "
    )} SET FOREIGN_KEY_CHECKS = 1;\n`;
    await sequelize.query(truncateQuery, null, { raw: true });
    restoreDatabase();
  }
});
