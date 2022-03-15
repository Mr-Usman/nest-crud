import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const configObject: TypeOrmModuleOptions = {
  username: 'postgres',
  type: 'postgres',
  host: 'localhost',
  password: 'root',
  database: 'test',
  port: 5432,
  migrationsRun: true,
  logging: true,
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
};
