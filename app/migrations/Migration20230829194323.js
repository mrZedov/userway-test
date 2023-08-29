'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230829194323 extends Migration {

  async up() {
    this.addSql('create table `shortlink` (`id` int unsigned not null auto_increment primary key, `fulllink` varchar(500) not null, `created` datetime not null) default character set utf8mb4 engine = InnoDB;');
  }

  async down() {
    this.addSql('drop table if exists `shortlink`;');
  }

}
exports.Migration20230829194323 = Migration20230829194323;
