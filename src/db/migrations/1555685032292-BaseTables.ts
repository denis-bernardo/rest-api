import { MigrationInterface, QueryRunner } from 'typeorm'

export class BaseTables1555685032292 implements MigrationInterface {
  public async up (queryRunner: QueryRunner) {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`business_type\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(100) NOT NULL,
  \`slug\` VARCHAR(150) NOT NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`slug_UNIQUE\` (\`slug\` ASC))
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`address\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`street\` VARCHAR(150) NULL,
  \`number\` VARCHAR(10) NULL,
  \`neighborhood\` VARCHAR(100) NULL,
  \`complement\` VARCHAR(100) NULL,
  \`city\` VARCHAR(100) NULL,
  \`state\` VARCHAR(2) NULL,
  \`country\` VARCHAR(100) NULL,
  \`zip_code\` VARCHAR(8) NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`))
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`plan\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(100) NOT NULL,
  \`price\` DECIMAL(10,2) NOT NULL,
  \`external_id\` VARCHAR(45) NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`))
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`business\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`name\` VARCHAR(255) NOT NULL,
  \`company_name\` VARCHAR(255) NULL,
  \`phone_number\` VARCHAR(11) NULL,
  \`landline_number\` VARCHAR(11) NULL,
  \`email\` VARCHAR(100) NULL,
  \`image\` VARCHAR(255) NULL,
  \`ie\` VARCHAR(45) NULL,
  \`description\` TEXT NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`deactivated_at\` DATETIME NULL,
  \`business_type_id\` INT UNSIGNED NOT NULL,
  \`address_id\` INT(11) UNSIGNED NOT NULL,
  \`plan_id\` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_business_business_type1_idx\` (\`business_type_id\` ASC),
  INDEX \`fk_business_address1_idx\` (\`address_id\` ASC),
  INDEX \`fk_business_plan1_idx\` (\`plan_id\` ASC),
  CONSTRAINT \`fk_business_business_type1\`
    FOREIGN KEY (\`business_type_id\`)
    REFERENCES \`business_type\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_business_address1\`
    FOREIGN KEY (\`address_id\`)
    REFERENCES \`address\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_business_plan1\`
    FOREIGN KEY (\`plan_id\`)
    REFERENCES \`plan\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`business_info\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`accept_credit_card\` TINYINT(1) NULL,
  \`accept_debit_card\` TINYINT(1) NULL,
  \`has_parking\` TINYINT(1) NULL,
  \`has_wifi\` TINYINT(1) NULL,
  \`accessbility\` TINYINT(1) NULL,
  \`support_children\` TINYINT(1) NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`business_id\` VARCHAR(36) NOT NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_business_info_business1_idx\` (\`business_id\` ASC),
  CONSTRAINT \`fk_business_info_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`business_social\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`website\` VARCHAR(255) NULL,
  \`instagram\` VARCHAR(255) NULL,
  \`facebook\` VARCHAR(255) NULL,
  \`twitter\` VARCHAR(255) NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`business_id\` VARCHAR(36) NOT NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_business_social_business1_idx\` (\`business_id\` ASC),
  CONSTRAINT \`fk_business_social_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`business_hours\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`week_day\` INT(1) NOT NULL,
  \`open\` TIME NULL,
  \`closed\` TIME NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`business_id\` VARCHAR(36) NOT NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_business_hours_business1_idx\` (\`business_id\` ASC),
  CONSTRAINT \`fk_business_hours_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`user_group\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(100) NOT NULL,
  \`preset\` TINYINT(1) NULL DEFAULT 0,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`business_id\` VARCHAR(36) NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_user_group_business1_idx\` (\`business_id\` ASC),
  CONSTRAINT \`fk_user_group_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`user\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`cognito_user_sub\` VARCHAR(100) NOT NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`user_group_id\` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`cognito_user_sub_UNIQUE\` (\`cognito_user_sub\` ASC),
  INDEX \`fk_user_user_group1_idx\` (\`user_group_id\` ASC),
  CONSTRAINT \`fk_user_user_group1\`
    FOREIGN KEY (\`user_group_id\`)
    REFERENCES \`user_group\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`user_resource\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(100) NOT NULL,
  \`uri\` VARCHAR(100) NOT NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`))
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`user_group_has_user_resource\` (
  \`user_group_id\` INT(11) UNSIGNED NOT NULL,
  \`user_resource_id\` INT(11) UNSIGNED NOT NULL,
  \`read\` TINYINT(1) NULL,
  \`write\` TINYINT(1) NULL,
  PRIMARY KEY (\`user_group_id\`, \`user_resource_id\`),
  INDEX \`fk_user_group_has_user_resource1_user_resource1_idx\` (\`user_resource_id\` ASC),
  INDEX \`fk_user_group_has_user_resource1_user_group1_idx\` (\`user_group_id\` ASC),
  CONSTRAINT \`fk_user_group_has_user_resource1_user_group1\`
    FOREIGN KEY (\`user_group_id\`)
    REFERENCES \`user_group\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_user_group_has_user_resource1_user_resource1\`
    FOREIGN KEY (\`user_resource_id\`)
    REFERENCES \`user_resource\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`business_has_user\` (
  \`business_id\` VARCHAR(36) NOT NULL,
  \`user_id\` VARCHAR(36) NOT NULL,
  \`active\` TINYINT(1) NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`business_id\`, \`user_id\`),
  INDEX \`fk_business_has_user1_user1_idx\` (\`user_id\` ASC),
  INDEX \`fk_business_has_user1_business1_idx\` (\`business_id\` ASC),
  CONSTRAINT \`fk_business_has_user1_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_business_has_user1_user1\`
    FOREIGN KEY (\`user_id\`)
    REFERENCES \`user\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`professional\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`name\` VARCHAR(100) NOT NULL,
  \`nickname\` VARCHAR(45) NULL,
  \`gender\` VARCHAR(1) NULL,
  \`birth_date\` DATE NULL,
  \`document\` VARCHAR(11) NULL,
  \`phone_number\` VARCHAR(11) NULL,
  \`landline_number\` VARCHAR(11) NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`user_id\` VARCHAR(36) NOT NULL,
  \`business_id\` VARCHAR(36) NOT NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_professional_user1_idx\` (\`user_id\` ASC),
  INDEX \`fk_professional_business1_idx\` (\`business_id\` ASC),
  CONSTRAINT \`fk_professional_user1\`
    FOREIGN KEY (\`user_id\`)
    REFERENCES \`user\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_professional_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`professional_hours\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`week_day\` INT(1) NOT NULL,
  \`start_at\` TIME NOT NULL,
  \`end_at\` TIME NOT NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`professional_id\` VARCHAR(36) NOT NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_professional_hours_professional1_idx\` (\`professional_id\` ASC),
  CONSTRAINT \`fk_professional_hours_professional1\`
    FOREIGN KEY (\`professional_id\`)
    REFERENCES \`professional\` (\`id\`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`service_category\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(100) NOT NULL,
  \`slug\` VARCHAR(150) NOT NULL,
  \`preset\` TINYINT(1) NULL DEFAULT 0,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`business_id\` VARCHAR(36) NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_service_category_business1_idx\` (\`business_id\` ASC),
  CONSTRAINT \`fk_service_category_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`service\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`name\` VARCHAR(100) NOT NULL,
  \`preset\` TINYINT(1) NULL DEFAULT 0,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`service_category_id\` INT(11) UNSIGNED NOT NULL,
  \`business_id\` VARCHAR(36) NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_service_service_category1_idx\` (\`service_category_id\` ASC),
  INDEX \`fk_service_business1_idx\` (\`business_id\` ASC),
  CONSTRAINT \`fk_service_service_category1\`
    FOREIGN KEY (\`service_category_id\`)
    REFERENCES \`service_category\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_service_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`professional_has_service\` (
  \`professional_id\` VARCHAR(36) NOT NULL,
  \`service_id\` VARCHAR(36) NOT NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`professional_id\`, \`service_id\`),
  INDEX \`fk_professional_has_service_service1_idx\` (\`service_id\` ASC),
  INDEX \`fk_professional_has_service_professional1_idx\` (\`professional_id\` ASC),
  CONSTRAINT \`fk_professional_has_service_professional1\`
    FOREIGN KEY (\`professional_id\`)
    REFERENCES \`professional\` (\`id\`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_professional_has_service_service1\`
    FOREIGN KEY (\`service_id\`)
    REFERENCES \`service\` (\`id\`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`customer\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`name\` VARCHAR(100) NOT NULL,
  \`phone_number\` VARCHAR(11) NULL,
  \`birth_date\` DATE NULL,
  \`gender\` VARCHAR(1) NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`address_id\` INT(11) UNSIGNED NULL,
  \`user_id\` VARCHAR(36) NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_customer_address1_idx\` (\`address_id\` ASC),
  INDEX \`fk_customer_user1_idx\` (\`user_id\` ASC),
  CONSTRAINT \`fk_customer_address1\`
    FOREIGN KEY (\`address_id\`)
    REFERENCES \`address\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_customer_user1\`
    FOREIGN KEY (\`user_id\`)
    REFERENCES \`user\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`business_has_customer\` (
  \`business_id\` VARCHAR(36) NOT NULL,
  \`customer_id\` VARCHAR(36) NOT NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`business_id\`, \`customer_id\`),
  INDEX \`fk_business_has_customer_customer1_idx\` (\`customer_id\` ASC),
  INDEX \`fk_business_has_customer_business1_idx\` (\`business_id\` ASC),
  CONSTRAINT \`fk_business_has_customer_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_business_has_customer_customer1\`
    FOREIGN KEY (\`customer_id\`)
    REFERENCES \`customer\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`product_brand\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(45) NOT NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`business_id\` VARCHAR(36) NOT NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_product_brand_business1_idx\` (\`business_id\` ASC),
  CONSTRAINT \`fk_product_brand_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`product_category\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(45) NOT NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`business_id\` VARCHAR(36) NOT NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_product_category_business1_idx\` (\`business_id\` ASC),
  CONSTRAINT \`fk_product_category_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`product\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(100) NOT NULL,
  \`description\` VARCHAR(255) NULL,
  \`price\` DECIMAL(10,2) NOT NULL,
  \`image\` VARCHAR(255) NULL,
  \`quantity\` INT(11) NOT NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`product_category_id\` INT(11) UNSIGNED NOT NULL,
  \`product_brand_id\` INT(11) UNSIGNED NOT NULL,
  \`business_id\` VARCHAR(36) NOT NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_product_product_brand1_idx\` (\`product_brand_id\` ASC),
  INDEX \`fk_product_product_category1_idx\` (\`product_category_id\` ASC),
  INDEX \`fk_product_business1_idx\` (\`business_id\` ASC),
  CONSTRAINT \`fk_product_product_brand1\`
    FOREIGN KEY (\`product_brand_id\`)
    REFERENCES \`product_brand\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_product_product_category1\`
    FOREIGN KEY (\`product_category_id\`)
    REFERENCES \`product_category\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_product_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`order_status\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(45) NOT NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`))
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`payment\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(100) NOT NULL,
  \`preset\` TINYINT(1) NULL DEFAULT 0,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`business_id\` VARCHAR(36) NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_payment_business1_idx\` (\`business_id\` ASC),
  UNIQUE INDEX \`id_UNIQUE\` (\`id\` ASC),
  CONSTRAINT \`fk_payment_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`order\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`note\` VARCHAR(255) NULL,
  \`amount\` DECIMAL(10,2) NOT NULL,
  \`amount_received\` DECIMAL(10,2) NULL,
  \`paid_at\` DATETIME NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`order_status_id\` INT(11) UNSIGNED NOT NULL,
  \`payment_id\` INT(11) UNSIGNED NULL,
  \`professional_id\` VARCHAR(36) NULL,
  \`business_id\` VARCHAR(36) NOT NULL,
  \`customer_id\` VARCHAR(36) NULL,
  \`cashier_id\` VARCHAR(36) NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_order_order_status1_idx\` (\`order_status_id\` ASC),
  INDEX \`fk_order_payment1_idx\` (\`payment_id\` ASC),
  INDEX \`fk_order_professional1_idx\` (\`professional_id\` ASC),
  INDEX \`fk_order_business1_idx\` (\`business_id\` ASC),
  INDEX \`fk_order_customer1_idx\` (\`customer_id\` ASC),
  INDEX \`fk_order_professional2_idx\` (\`cashier_id\` ASC),
  CONSTRAINT \`fk_order_order_status1\`
    FOREIGN KEY (\`order_status_id\`)
    REFERENCES \`order_status\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_order_payment1\`
    FOREIGN KEY (\`payment_id\`)
    REFERENCES \`payment\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_order_professional1\`
    FOREIGN KEY (\`professional_id\`)
    REFERENCES \`professional\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_order_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_order_customer1\`
    FOREIGN KEY (\`customer_id\`)
    REFERENCES \`customer\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_order_professional2\`
    FOREIGN KEY (\`cashier_id\`)
    REFERENCES \`professional\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`order_item\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(150) NOT NULL,
  \`quantity\` INT(10) NOT NULL,
  \`price\` DECIMAL(10,2) NOT NULL,
  \`discount\` DECIMAL(10,2) NULL,
  \`is_tip\` TINYINT(1) NULL DEFAULT 0,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`order_id\` INT(11) UNSIGNED NOT NULL,
  \`product_id\` INT(11) UNSIGNED NULL,
  \`service_id\` VARCHAR(36) NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_order_item_order1_idx\` (\`order_id\` ASC),
  INDEX \`fk_order_item_product1_idx\` (\`product_id\` ASC),
  INDEX \`fk_order_item_service1_idx\` (\`service_id\` ASC),
  CONSTRAINT \`fk_order_item_order1\`
    FOREIGN KEY (\`order_id\`)
    REFERENCES \`order\` (\`id\`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_order_item_product1\`
    FOREIGN KEY (\`product_id\`)
    REFERENCES \`product\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_order_item_service1\`
    FOREIGN KEY (\`service_id\`)
    REFERENCES \`service\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`register\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`opened_at\` DATETIME NOT NULL,
  \`closed_at\` DATETIME NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`user_id\` VARCHAR(36) NOT NULL,
  \`business_id\` VARCHAR(36) NOT NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_register_user1_idx\` (\`user_id\` ASC),
  INDEX \`fk_register_business1_idx\` (\`business_id\` ASC),
  CONSTRAINT \`fk_register_user1\`
    FOREIGN KEY (\`user_id\`)
    REFERENCES \`user\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_register_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`cash_flow_type\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(45) NOT NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`))
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`cash_flow_category\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(100) NOT NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`))
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`cash_flow\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`value\` DECIMAL(10,2) NOT NULL,
  \`description\` VARCHAR(150) NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`cash_flow_type_id\` INT(11) UNSIGNED NOT NULL,
  \`cash_flow_category_id\` INT(11) UNSIGNED NOT NULL,
  \`payment_id\` INT(11) UNSIGNED NULL,
  \`register_id\` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_cash_flow_cash_flow_type1_idx\` (\`cash_flow_type_id\` ASC),
  INDEX \`fk_cash_flow_cash_flow_category1_idx\` (\`cash_flow_category_id\` ASC),
  INDEX \`fk_cash_flow_payment1_idx\` (\`payment_id\` ASC),
  INDEX \`fk_cash_flow_register1_idx\` (\`register_id\` ASC),
  CONSTRAINT \`fk_cash_flow_cash_flow_type1\`
    FOREIGN KEY (\`cash_flow_type_id\`)
    REFERENCES \`cash_flow_type\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_cash_flow_cash_flow_category1\`
    FOREIGN KEY (\`cash_flow_category_id\`)
    REFERENCES \`cash_flow_category\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_cash_flow_payment1\`
    FOREIGN KEY (\`payment_id\`)
    REFERENCES \`payment\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_cash_flow_register1\`
    FOREIGN KEY (\`register_id\`)
    REFERENCES \`register\` (\`id\`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`schedule_status\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(45) NOT NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`))
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`schedule\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`scheduled_to\` DATE NOT NULL,
  \`week_day\` INT(1) NOT NULL,
  \`start_at\` TIME NOT NULL,
  \`end_at\` TIME NOT NULL,
  \`note\` VARCHAR(255) NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`confirmed_at\` DATETIME NULL,
  \`professional_id\` VARCHAR(36) NOT NULL,
  \`customer_id\` VARCHAR(36) NOT NULL,
  \`business_id\` VARCHAR(36) NOT NULL,
  \`schedule_status_id\` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_schedule_professional1_idx\` (\`professional_id\` ASC),
  INDEX \`fk_schedule_customer1_idx\` (\`customer_id\` ASC),
  INDEX \`fk_schedule_business1_idx\` (\`business_id\` ASC),
  INDEX \`fk_schedule_schedule_status1_idx\` (\`schedule_status_id\` ASC),
  CONSTRAINT \`fk_schedule_professional1\`
    FOREIGN KEY (\`professional_id\`)
    REFERENCES \`professional\` (\`id\`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_schedule_customer1\`
    FOREIGN KEY (\`customer_id\`)
    REFERENCES \`customer\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_schedule_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_schedule_schedule_status1\`
    FOREIGN KEY (\`schedule_status_id\`)
    REFERENCES \`schedule_status\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`schedule_has_service\` (
  \`schedule_id\` VARCHAR(36) NOT NULL,
  \`service_id\` VARCHAR(36) NOT NULL,
  \`duration\` INT NULL,
  PRIMARY KEY (\`schedule_id\`, \`service_id\`),
  INDEX \`fk_schedule_has_service_service1_idx\` (\`service_id\` ASC),
  INDEX \`fk_schedule_has_service_schedule1_idx\` (\`schedule_id\` ASC),
  CONSTRAINT \`fk_schedule_has_service_schedule1\`
    FOREIGN KEY (\`schedule_id\`)
    REFERENCES \`schedule\` (\`id\`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_schedule_has_service_service1\`
    FOREIGN KEY (\`service_id\`)
    REFERENCES \`service\` (\`id\`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`service_detail\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`price\` DECIMAL(10,2) NOT NULL,
  \`duration\` INT NOT NULL,
  \`scheduling\` TINYINT(1) NULL DEFAULT 1,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`service_id\` VARCHAR(36) NOT NULL,
  \`business_id\` VARCHAR(36) NOT NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_service_detail_service1_idx\` (\`service_id\` ASC),
  INDEX \`fk_service_detail_business1_idx\` (\`business_id\` ASC),
  CONSTRAINT \`fk_service_detail_service1\`
    FOREIGN KEY (\`service_id\`)
    REFERENCES \`service\` (\`id\`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_service_detail_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`payment_detail\` (
  \`id\` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`tax\` DECIMAL(10,2) NULL,
  \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  \`payment_id\` INT(11) UNSIGNED NOT NULL,
  \`business_id\` VARCHAR(36) NOT NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`fk_payment_detail_payment1_idx\` (\`payment_id\` ASC),
  INDEX \`fk_payment_detail_business1_idx\` (\`business_id\` ASC),
  CONSTRAINT \`fk_payment_detail_payment1\`
    FOREIGN KEY (\`payment_id\`)
    REFERENCES \`payment\` (\`id\`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_payment_detail_business1\`
    FOREIGN KEY (\`business_id\`)
    REFERENCES \`business\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;`)
  }

  public async down () {}
}
