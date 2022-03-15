module.exports = {
  username: 'postgres',
  type: 'postgres',
  host: 'localhost',
  password: 'root',
  database: 'test',
  port: 5432,
  synchronize: false,
  migrations: ['dist/migrations/*{.ts,.js}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  seeds: ['dist/**/*.seed{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
