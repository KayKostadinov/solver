import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, PRODUCTION, TEST } from './constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provider: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        default:
          config = databaseConfig.development;
      }

      const sequelize = new Sequelize(config);
      sequelize.addModels([]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
