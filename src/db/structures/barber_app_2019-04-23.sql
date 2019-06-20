# ************************************************************
# Sequel Pro SQL dump
# Versão 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.25)
# Base de Dados: barber_app
# Tempo de Geração: 2019-04-24 02:19:30 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump da tabela schedule_status
# ------------------------------------------------------------

LOCK TABLES `schedule_status` WRITE;
/*!40000 ALTER TABLE `schedule_status` DISABLE KEYS */;

INSERT INTO `schedule_status` (`id`, `name`, `created_at`, `updated_at`)
VALUES
	(1,'Aguardando confirmação','2019-04-23 23:14:44','2019-04-23 23:14:44'),
	(2,'Confirmado','2019-04-23 23:14:52','2019-04-23 23:14:52'),
	(3,'Cancelado pelo cliente','2019-04-23 23:15:17','2019-04-23 23:15:17'),
	(4,'Cancelado pelo estabelecimento','2019-04-23 23:15:25','2019-04-23 23:15:25');

/*!40000 ALTER TABLE `schedule_status` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
