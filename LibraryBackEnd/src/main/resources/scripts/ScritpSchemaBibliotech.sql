-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bibliotech
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bibliotech
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bibliotech` DEFAULT CHARACTER SET utf8mb3 ;
USE `bibliotech` ;

-- -----------------------------------------------------
-- Table `bibliotech`.`admins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bibliotech`.`admins` (
  `id_admin` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_admin`),
  UNIQUE INDEX `UK_47bvqemyk6vlm0w7crc3opdd4` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bibliotech`.`authors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bibliotech`.`authors` (
  `id_author` BIGINT NOT NULL AUTO_INCREMENT,
  `last_name` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_author`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bibliotech`.`books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bibliotech`.`books` (
  `id_book` BIGINT NOT NULL AUTO_INCREMENT,
  `genre` ENUM('THRILLER', 'FANTASY', 'ADVENTURE', 'ACTION') NOT NULL,
  `isbn` VARCHAR(255) NOT NULL,
  `quantity` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `id_author` BIGINT NOT NULL,
  PRIMARY KEY (`id_book`),
  UNIQUE INDEX `UK_kibbepcitr0a3cpk3rfr7nihn` (`isbn` ASC) VISIBLE,
  INDEX `FK4ih38omjrl63dv9509hddgyia` (`id_author` ASC) VISIBLE,
  CONSTRAINT `FK4ih38omjrl63dv9509hddgyia`
    FOREIGN KEY (`id_author`)
    REFERENCES `bibliotech`.`authors` (`id_author`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bibliotech`.`editorials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bibliotech`.`editorials` (
  `id_editorial` BIGINT NOT NULL AUTO_INCREMENT,
  `established_date` DATE NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_editorial`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bibliotech`.`linked_editorials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bibliotech`.`linked_editorials` (
  `id_book` BIGINT NOT NULL,
  `id_editorial` BIGINT NOT NULL,
  INDEX `FKpilgd9n390y6jm6ulcekexawq` (`id_editorial` ASC) VISIBLE,
  INDEX `FKjloo9942v4wpn1o2f9fawhxbi` (`id_book` ASC) VISIBLE,
  CONSTRAINT `FKjloo9942v4wpn1o2f9fawhxbi`
    FOREIGN KEY (`id_book`)
    REFERENCES `bibliotech`.`books` (`id_book`),
  CONSTRAINT `FKpilgd9n390y6jm6ulcekexawq`
    FOREIGN KEY (`id_editorial`)
    REFERENCES `bibliotech`.`editorials` (`id_editorial`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bibliotech`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bibliotech`.`users` (
  `id_user` BIGINT NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(255) NULL DEFAULT NULL,
  `complement` VARCHAR(255) NULL DEFAULT NULL,
  `number` VARCHAR(255) NULL DEFAULT NULL,
  `street` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `identification_number` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `phone_number` BIGINT NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `UK_6dotkott2kjsp8vw4d0m25fb7` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bibliotech`.`loans`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bibliotech`.`loans` (
  `id_loan` BIGINT NOT NULL AUTO_INCREMENT,
  `loan_date` DATE NOT NULL,
  `return_expected_date` DATE NOT NULL,
  `id_admin` BIGINT NOT NULL,
  `id_book` BIGINT NOT NULL,
  `id_user` BIGINT NOT NULL,
  PRIMARY KEY (`id_loan`),
  INDEX `FKcxgytie1bwo7oux0fyppk34j6` (`id_admin` ASC) VISIBLE,
  INDEX `FKqrp5c14gin0n34hsdxd4u4w2t` (`id_book` ASC) VISIBLE,
  INDEX `FK52fkly2f4qlm5skxfkk2dr8f7` (`id_user` ASC) VISIBLE,
  CONSTRAINT `FK52fkly2f4qlm5skxfkk2dr8f7`
    FOREIGN KEY (`id_user`)
    REFERENCES `bibliotech`.`users` (`id_user`),
  CONSTRAINT `FKcxgytie1bwo7oux0fyppk34j6`
    FOREIGN KEY (`id_admin`)
    REFERENCES `bibliotech`.`admins` (`id_admin`),
  CONSTRAINT `FKqrp5c14gin0n34hsdxd4u4w2t`
    FOREIGN KEY (`id_book`)
    REFERENCES `bibliotech`.`books` (`id_book`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bibliotech`.`returns`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bibliotech`.`returns` (
  `id_return` BIGINT NOT NULL AUTO_INCREMENT,
  `return_date` DATE NULL DEFAULT NULL,
  `return_expected_date` DATE NOT NULL,
  `status` BIT(1) NOT NULL,
  `id_loan` BIGINT NOT NULL,
  PRIMARY KEY (`id_return`),
  UNIQUE INDEX `UK_ie67tbk1b46h3dbead7j2p1d2` (`id_loan` ASC) VISIBLE,
  CONSTRAINT `FK4rmep7l3s0d263xibykut14eg`
    FOREIGN KEY (`id_loan`)
    REFERENCES `bibliotech`.`loans` (`id_loan`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bibliotech`.`pendings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bibliotech`.`pendings` (
  `id_pending` BIGINT NOT NULL AUTO_INCREMENT,
  `local_pending_date` DATE NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  `id_book_return` BIGINT NOT NULL,
  PRIMARY KEY (`id_pending`),
  UNIQUE INDEX `UK_ibs9u7xe7fiv9mgcsprh7k4rv` (`id_book_return` ASC) VISIBLE,
  CONSTRAINT `FKc1g4s3vbfrdkjk87wuk4aiikr`
    FOREIGN KEY (`id_book_return`)
    REFERENCES `bibliotech`.`returns` (`id_return`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
