# Migrations & Seeds

Instruções para criacão/executação de migrations e seeds.

## Criando uma nova migration

```bash
$ npm run typeorm migration:generate -- -n MigrationName
```

## Executar migrations

```bash
$ npm run migrate
```
## Reverter última migration

```bash
$ npm run migrate-revert
```

Obs.: TypeORM não possui atualmente suporte para `seeds`, quando houver a necessidade de inserir dados, devemos utilizar `migrations`.
