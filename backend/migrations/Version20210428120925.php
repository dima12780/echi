<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210428120925 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE scores_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE scores (id INT NOT NULL, user_id INT NOT NULL, money INT DEFAULT NULL, number VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN scores.user_id IS \'(DC2Type:array)\'');
        $this->addSql('ALTER TABLE "user" ADD scores TEXT DEFAULT NULL');
        $this->addSql('COMMENT ON COLUMN "user".scores IS \'(DC2Type:array)\'');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE scores_id_seq CASCADE');
        $this->addSql('DROP TABLE scores');
        $this->addSql('ALTER TABLE "user" DROP scores');
    }
}
