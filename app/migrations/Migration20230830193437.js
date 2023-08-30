'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230830193437 extends Migration {

  async up() {
    this.addSql('create table `prefix` (`id` int unsigned not null auto_increment primary key, `prefix` varchar(255) not null, `created` datetime not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `shortlink` (`id` int unsigned not null auto_increment primary key, `fulllink` varchar(500) not null, `prefix_id` int unsigned not null, `created` datetime not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `shortlink` add index `shortlink_prefix_id_index`(`prefix_id`);');

    this.addSql('alter table `shortlink` add constraint `shortlink_prefix_id_foreign` foreign key (`prefix_id`) references `prefix` (`id`) on update cascade;');
  }

  async down() {
    this.addSql('alter table `shortlink` drop foreign key `shortlink_prefix_id_foreign`;');

    this.addSql('drop table if exists `prefix`;');

    this.addSql('drop table if exists `shortlink`;');
  }

}
exports.Migration20230830193437 = Migration20230830193437;
