import { MigrationInterface, QueryRunner } from 'typeorm'

export class BaseSeed1556067302291 implements MigrationInterface {
  public async up (queryRunner: QueryRunner) {
    await queryRunner.query(`INSERT INTO \`business_type\` (\`id\`, \`name\`, \`slug\`, \`created_at\`, \`updated_at\`)
    VALUES
        (1,'Barbearia','barbearia','2019-04-23 22:17:52','2019-04-23 22:17:52'),
        (2,'Salão de Beleza','salao-de-beleza','2019-04-23 22:19:39','2019-04-23 22:19:39'),
        (3,'SPA','spa','2019-04-23 22:27:04','2019-04-23 22:27:04'),
        (4,'Clínica de Estética','clinica-de-estetica','2019-04-23 22:27:27','2019-04-23 22:27:27'),
        (5,'Maquiadora','maquiadora','2019-04-23 22:28:09','2019-04-23 22:28:09'),
        (6,'Espaço de Beleza','espaco-de-beleza','2019-04-23 22:29:05','2019-04-23 22:29:05'),
        (7,'Podologia','podologia','2019-04-23 22:30:04','2019-04-23 22:30:04'),
        (8,'Outros','outros','2019-04-23 22:30:44','2019-04-23 22:30:44');
        `)

    await queryRunner.query(`INSERT INTO \`cash_flow_category\` (\`id\`, \`name\`, \`created_at\`, \`updated_at\`)
    VALUES
        (1,'Vendas','2019-04-23 22:43:16','2019-04-23 22:43:16'),
        (2,'Recebimentos','2019-04-23 22:43:21','2019-04-23 22:43:21'),
        (3,'Suprimentos','2019-04-23 22:43:35','2019-04-23 22:43:35'),
        (4,'Retiradas','2019-04-23 22:43:45','2019-04-23 22:43:45'),
        (5,'Sangrias','2019-04-23 22:43:51','2019-04-23 22:43:51');
        `)

    await queryRunner.query(`INSERT INTO \`cash_flow_type\` (\`id\`, \`name\`, \`created_at\`, \`updated_at\`)
    VALUES
        (1,'Entrada','2019-04-23 22:42:36','2019-04-23 22:42:36'),
        (2,'Saída','2019-04-23 22:42:41','2019-04-23 22:42:41');
        `)

    await queryRunner.query(`INSERT INTO \`order_status\` (\`id\`, \`name\`, \`created_at\`, \`updated_at\`)
    VALUES
        (1,'Aberto','2019-04-23 22:48:34','2019-04-23 22:48:34'),
        (2,'Fechado','2019-04-23 22:49:40','2019-04-23 22:49:40'),
        (3,'Pendente','2019-04-23 22:49:44','2019-04-23 22:49:44');
        `)

    await queryRunner.query(`INSERT INTO \`payment\` (\`id\`, \`name\`, \`preset\`, \`created_at\`, \`updated_at\`, \`business_id\`)
    VALUES
        (1,'Cartão de crédito',1,'2019-04-23 22:47:02','2019-04-23 22:47:02',NULL),
        (2,'Cartão de débito',1,'2019-04-23 22:47:17','2019-04-23 22:47:17',NULL),
        (3,'Dinheiro',1,'2019-04-23 22:47:27','2019-04-23 22:47:27',NULL),
        (4,'Cheque',1,'2019-04-23 22:47:42','2019-04-23 22:47:42',NULL);
        `)

    await queryRunner.query(`INSERT INTO \`service_category\` (\`id\`, \`name\`, \`slug\`, \`preset\`, \`created_at\`, \`updated_at\`, \`business_id\`)
    VALUES
        (1,'Cabelo','cabelo',1,'2019-04-23 21:57:32','2019-04-23 21:57:32',NULL),
        (2,'Barba','barba',1,'2019-04-23 21:57:43','2019-04-23 21:57:43',NULL),
        (3,'Sobrancelhas e cílios','sobrancelhas-e-cilios',1,'2019-04-23 21:58:05','2019-04-23 21:58:05',NULL),
        (4,'Manicure e pedicure','manicure-e-pedicure',1,'2019-04-23 21:58:45','2019-04-23 21:58:45',NULL),
        (5,'Depilação','depilacao',1,'2019-04-23 22:01:37','2019-04-23 22:01:37',NULL),
        (6,'Maquiagem','maquiagem',1,'2019-04-23 22:05:09','2019-04-23 22:05:09',NULL),
        (7,'Massagem','massagem',1,'2019-04-23 22:05:36','2019-04-23 22:05:36',NULL),
        (8,'Estética','estetica',1,'2019-04-23 22:06:39','2019-04-23 22:06:39',NULL),
        (9,'SPA','spa',1,'2019-04-23 22:06:54','2019-04-23 22:06:54',NULL),
        (10,'Podologia','podologia',1,'2019-04-23 22:07:30','2019-04-23 22:07:30',NULL),
        (11,'Outros','outros',1,'2019-04-23 22:07:47','2019-04-23 22:07:47',NULL);
        `)

    await queryRunner.query(`INSERT INTO \`user_group\` (\`id\`, \`name\`, \`preset\`, \`created_at\`, \`updated_at\`, \`business_id\`)
    VALUES
        (1,'Administrador',1,'2019-04-23 22:39:55','2019-04-23 22:39:55',NULL),
        (2,'Financeiro',1,'2019-04-23 22:40:05','2019-04-23 22:40:05',NULL),
        (3,'Profissional com Agenda',1,'2019-04-23 22:40:18','2019-04-23 22:40:18',NULL),
        (4,'Caixa',1,'2019-04-23 22:40:32','2019-04-23 22:40:32',NULL),
        (5,'Convidado',1,'2019-04-23 22:40:53','2019-04-23 22:40:53',NULL);
        `)

    await queryRunner.query(`INSERT INTO \`schedule_status\` (\`id\`, \`name\`, \`created_at\`, \`updated_at\`)
    VALUES
        (1,'Aguardando confirmação','2019-04-23 23:14:44','2019-04-23 23:14:44'),
        (2,'Confirmado','2019-04-23 23:14:52','2019-04-23 23:14:52'),
        (3,'Cancelado pelo cliente','2019-04-23 23:15:17','2019-04-23 23:15:17'),
        (4,'Cancelado pelo estabelecimento','2019-04-23 23:15:25','2019-04-23 23:15:25');
    
    `)

    await queryRunner.query(`INSERT INTO \`plan\` (\`id\`, \`name\`, \`price\`, \`external_id\`, \`created_at\`, \`updated_at\`)
    VALUES
        (1,'Padrão',39.90,NULL,'2019-04-23 23:14:44','2019-04-23 23:14:44');
    
    `)
  }

  public async down () {
  }
}
