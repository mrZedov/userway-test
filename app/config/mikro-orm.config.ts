import { MySqlDriver } from '@mikro-orm/mysql';

const config = {
  driver: MySqlDriver,
  dbName: process.env.MYSQL_DB,
  driverOptions: {
    connection: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DB,
      password: process.env.MYSQL_PASSWORD,
    },
  },
  debug: process.env.MIKRO_ORM_DEBUG && +process.env.MIKRO_ORM_DEBUG,
  entities: ['./dist/**/*.entity.js', './node_modules/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts', './node_modules/**/*.entity.ts'],
  discovery: { warnWhenNoEntities: false },
  autoLoadEntities: true,
  migrations: {
    tableName: 'migrations', // name of database table with log of executed transactions
    path: './migrations', // path to the folder with migrations
    glob: '!(*.d).{js,ts}', // regex pattern for the migration files
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    emit: 'js', // migration generation mode
    snapshot: false,
  },
  allowGlobalContext: true,
  validateRequired: false,
};

export default config;
