/*==============================================================*/
/* Nom de SGBD :  MySQL 5.0                                     */
/* Date de création :  27/10/2023 11:27:32                      */
/*==============================================================*/


drop table if exists ALIMENT;

drop table if exists CATEGORIE_ALIMENT;

drop table if exists CONTIENT;

drop table if exists ENTREE;

drop table if exists NUTRIMENT;

drop table if exists PRATIQUE_SPORTIVE;

drop index EMAIL_IX on UTILISATEUR;

drop table if exists UTILISATEUR;

/*==============================================================*/
/* Table : ALIMENT                                              */
/*==============================================================*/
create table ALIMENT
(
   ID                   int not null auto_increment,
   CAT_ID               int not null,
   NOM                  varchar(50) not null,
   primary key (ID)
);

/*==============================================================*/
/* Table : CATEGORIE_ALIMENT                                    */
/*==============================================================*/
create table CATEGORIE_ALIMENT
(
   ID                   int not null auto_increment,
   NOM                  varchar(50) not null,
   primary key (ID)
);

alter table CATEGORIE_ALIMENT comment 'un aliment apportient à une catégorie, qui pourra être utili';

/*==============================================================*/
/* Table : CONTIENT                                             */
/*==============================================================*/
create table CONTIENT
(
   ID                   int not null auto_increment,
   NUT_ID               int not null,
   ALI_ID               int not null,
   QUANTITE             float not null,
   primary key (ID)
);

/*==============================================================*/
/* Table : ENTREE                                               */
/*==============================================================*/
create table ENTREE
(
   ID                   int not null auto_increment,
   UTI_ID               int not null,
   ALI_ID               int not null,
   QUANTITE             decimal not null,
   DATE                 date not null,
   primary key (ID)
);

alter table ENTREE comment 'L''utilisateur doit pouvoir rentrer les aliments consommés e';

/*==============================================================*/
/* Table : NUTRIMENT                                            */
/*==============================================================*/
create table NUTRIMENT
(
   ID                   int not null auto_increment,
   NOM                  varchar(50) not null,
   primary key (ID)
);

alter table NUTRIMENT comment 'un aliment contient différents nutriment';

/*==============================================================*/
/* Table : PRATIQUE_SPORTIVE                                    */
/*==============================================================*/
create table PRATIQUE_SPORTIVE
(
   ID                   int not null auto_increment,
   NOM                  varchar(50) not null,
   primary key (ID)
);

alter table PRATIQUE_SPORTIVE comment 'calcul du besoin énergétique journalier de l''utilisateur en';

/*==============================================================*/
/* Table : UTILISATEUR                                          */
/*==============================================================*/
create table UTILISATEUR
(
   ID                   int not null auto_increment,
   PRA_ID               int not null,
   NOM_UTILISATEUR      varchar(50) not null,
   EMAIL                varchar(50) not null,
   PASSWORD             varchar(50) not null,
   SEXE                 bool not null,
   AGE                  int not null,
   POIDS                decimal not null,
   TAILLE               decimal not null,
   primary key (ID)
);

alter table UTILISATEUR comment 'l''utilisateur doit pouvoir se connecter à l''application af';

/*==============================================================*/
/* Index : EMAIL_IX                                             */
/*==============================================================*/
create unique index EMAIL_IX on UTILISATEUR
(
   EMAIL
);

alter table ALIMENT add constraint FK_APPARTIENT foreign key (CAT_ID)
      references CATEGORIE_ALIMENT (ID) on delete restrict on update restrict;

alter table CONTIENT add constraint FK_CONTIENT foreign key (NUT_ID)
      references NUTRIMENT (ID) on delete restrict on update restrict;

alter table CONTIENT add constraint FK_CONTIENT2 foreign key (ALI_ID)
      references ALIMENT (ID) on delete restrict on update restrict;

alter table ENTREE add constraint FK_COMPORTE foreign key (ALI_ID)
      references ALIMENT (ID) on delete restrict on update restrict;

alter table ENTREE add constraint FK_CREE foreign key (UTI_ID)
      references UTILISATEUR (ID) on delete restrict on update restrict;

alter table UTILISATEUR add constraint FK_PRATIQUE foreign key (PRA_ID)
      references PRATIQUE_SPORTIVE (ID) on delete restrict on update restrict;