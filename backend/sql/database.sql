-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 06 nov. 2023 à 10:00
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET foreign_key_checks = 0;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `imm`
--

-- --------------------------------------------------------

--
-- Structure de la table `aliment`
--

DROP TABLE IF EXISTS `aliment`;
CREATE TABLE IF NOT EXISTS `aliment` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CAT_ID` int NOT NULL,
  `NOM` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_APPARTIENT` (`CAT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `aliment`
--

INSERT INTO `aliment` (`ID`, `CAT_ID`, `NOM`) VALUES
(5, 9, 'Coca'),
(6, 3, 'Oeuf'),
(8, 7, 'Riz'),
(10, 8, 'Bonbon'),
(11, 4, 'Lait'),
(12, 4, 'Fromage'),
(13, 3, 'Boeuf'),
(14, 3, 'Morue'),
(21, 5, 'Test'),
(22, 6, 'test1247'),
(23, 8, 'Test457'),
(25, 5, 'testall'),
(28, 4, 'azddazdadza'),
(29, 4, 'zezefzf'),
(31, 5, 'test'),
(32, 3, 'zzezez'),
(47, 7, 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM'),
(48, 7, 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM'),
(49, 7, 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM'),
(50, 7, 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM');

-- --------------------------------------------------------

--
-- Structure de la table `categorie_aliment`
--

DROP TABLE IF EXISTS `categorie_aliment`;
CREATE TABLE IF NOT EXISTS `categorie_aliment` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NOM` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='un aliment apportient à une catégorie, qui pourra être utili';

--
-- Déchargement des données de la table `categorie_aliment`
--

INSERT INTO `categorie_aliment` (`ID`, `NOM`) VALUES
(3, 'Viandes - Poissons - Oeufs'),
(4, 'Produits laitiers'),
(5, 'Matières grasses'),
(6, 'Légumes et fruits'),
(7, 'Céréales et dérivés - légumineuses'),
(8, 'Sucres et produits sucrés'),
(9, 'Boissons');

-- --------------------------------------------------------

--
-- Structure de la table `contient`
--

DROP TABLE IF EXISTS `contient`;
CREATE TABLE IF NOT EXISTS `contient` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NUT_ID` int NOT NULL,
  `ALI_ID` int NOT NULL,
  `QUANTITE` float NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_CONTIENT` (`NUT_ID`),
  KEY `FK_CONTIENT2` (`ALI_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contient`
--

INSERT INTO `contient` (`ID`, `NUT_ID`, `ALI_ID`, `QUANTITE`) VALUES
(1, 1, 21, 12),
(2, 2, 21, 12),
(3, 4, 21, 12),
(4, 6, 21, 12),
(5, 7, 21, 12),
(6, 1, 22, 12),
(7, 2, 22, 12),
(8, 4, 22, 12),
(9, 7, 22, 12),
(10, 4, 23, 50),
(11, 7, 23, 50),
(14, 1, 25, 1),
(15, 2, 25, 1),
(16, 3, 25, 1),
(17, 4, 25, 1),
(18, 6, 25, 1),
(19, 7, 25, 1),
(27, 1, 28, 1),
(28, 7, 28, 2),
(29, 1, 29, 12),
(30, 3, 29, 12),
(37, 1, 31, 12),
(38, 3, 31, 12),
(39, 1, 32, 12),
(40, 5, 32, 12),
(75, 1, 47, 44444),
(76, 2, 47, 44444),
(77, 3, 47, 99999),
(78, 4, 47, 44444),
(79, 5, 47, 44444),
(80, 6, 47, 44444),
(81, 7, 47, 44444),
(82, 1, 48, 99999),
(83, 2, 48, 99999),
(84, 3, 48, 99999),
(85, 4, 48, 99999),
(86, 5, 48, 44444),
(87, 6, 48, 99999),
(88, 7, 48, 44444),
(89, 1, 49, 44444),
(90, 2, 49, 44444),
(91, 3, 49, 44444),
(92, 4, 49, 44444),
(93, 5, 49, 44444),
(94, 6, 49, 44444),
(95, 7, 49, 44444),
(96, 1, 50, 44444),
(97, 2, 50, 44444),
(98, 3, 50, 44444),
(99, 4, 50, 44444),
(100, 5, 50, 44444),
(101, 6, 50, 44444),
(102, 7, 50, 44444),
(111, 1, 6, 5),
(112, 6, 6, 1),
(113, 7, 6, 3),
(117, 1, 10, 2),
(118, 3, 10, 3),
(119, 5, 10, 2),
(120, 7, 10, 3),
(121, 6, 10, 12);

-- --------------------------------------------------------

--
-- Structure de la table `entree`
--

DROP TABLE IF EXISTS `entree`;
CREATE TABLE IF NOT EXISTS `entree` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `UTI_ID` int NOT NULL,
  `ALI_ID` int NOT NULL,
  `QUANTITE` decimal(10,0) NOT NULL,
  `DATE` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_COMPORTE` (`ALI_ID`),
  KEY `FK_CREE` (`UTI_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='L''utilisateur doit pouvoir rentrer les aliments consommés e';

--
-- Déchargement des données de la table `entree`
--

INSERT INTO `entree` (`ID`, `UTI_ID`, `ALI_ID`, `QUANTITE`, `DATE`) VALUES
(5, 59, 5, '30', '2023-11-02 17:24:00'),
(7, 59, 14, '12', '2023-11-01 18:26:00'),
(8, 59, 5, '2', '2023-10-31 16:41:00'),
(9, 59, 32, '1', '2023-11-02 16:41:00'),
(10, 59, 5, '12', '2023-11-02 18:58:00'),
(11, 59, 12, '45', '2023-11-02 17:21:00'),
(12, 59, 12, '12', '2023-11-01 15:21:00'),
(13, 59, 8, '12', '2023-10-31 14:28:00'),
(14, 59, 8, '12', '2023-11-02 16:38:00'),
(15, 59, 21, '100', '2023-10-01 01:37:00'),
(16, 59, 10, '12', '2023-11-02 18:22:00'),
(17, 59, 48, '3', '2023-11-02 18:25:00'),
(18, 59, 48, '29', '2023-11-02 18:25:00'),
(19, 59, 13, '54', '2023-11-01 16:37:00'),
(20, 59, 11, '25', '2023-10-31 16:37:00'),
(21, 59, 48, '40', '2023-11-01 20:37:00'),
(25, 59, 8, '12', '2023-11-03 20:59:00'),
(26, 59, 28, '12', '2023-10-31 21:22:00'),
(27, 59, 12, '26', '2023-10-31 17:41:00'),
(28, 59, 21, '26', '2023-11-04 17:41:00'),
(29, 59, 6, '12', '2023-11-05 22:31:00');

-- --------------------------------------------------------

--
-- Structure de la table `nutriment`
--

DROP TABLE IF EXISTS `nutriment`;
CREATE TABLE IF NOT EXISTS `nutriment` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NOM` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='un aliment contient différents nutriment';

--
-- Déchargement des données de la table `nutriment`
--

INSERT INTO `nutriment` (`ID`, `NOM`) VALUES
(1, 'Energie'),
(2, 'Gras'),
(3, 'Sucres'),
(4, 'Fibres'),
(5, 'Protéines'),
(6, 'Sel'),
(7, 'Fer');

-- --------------------------------------------------------

--
-- Structure de la table `pratique_sportive`
--

DROP TABLE IF EXISTS `pratique_sportive`;
CREATE TABLE IF NOT EXISTS `pratique_sportive` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NOM` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='calcul du besoin énergétique journalier de l''utilisateur en';

--
-- Déchargement des données de la table `pratique_sportive`
--

INSERT INTO `pratique_sportive` (`ID`, `NOM`) VALUES
(1, 'Sédentaire'),
(2, 'Actif'),
(3, 'Très actif'),
(4, 'Extrêmement actif');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `PRA_ID` int NOT NULL,
  `NOM_UTILISATEUR` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `EMAIL` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `PASSWORD` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `SEXE` int NOT NULL,
  `AGE` int NOT NULL,
  `POIDS` decimal(10,0) NOT NULL,
  `TAILLE` decimal(10,0) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `EMAIL_IX` (`EMAIL`),
  KEY `FK_PRATIQUE` (`PRA_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='l''utilisateur doit pouvoir se connecter à l''application af';

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`ID`, `PRA_ID`, `NOM_UTILISATEUR`, `EMAIL`, `PASSWORD`, `SEXE`, `AGE`, `POIDS`, `TAILLE`) VALUES
(59, 2, 'Gabriel', 'ivanes.gabriel@gmail.com', 'Test123', 0, 20, '68', '179');


SET foreign_key_checks = 1;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `aliment`
--
ALTER TABLE `aliment`
  ADD CONSTRAINT `FK_APPARTIENT` FOREIGN KEY (`CAT_ID`) REFERENCES `categorie_aliment` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `contient`
--
ALTER TABLE `contient`
  ADD CONSTRAINT `FK_CONTIENT` FOREIGN KEY (`NUT_ID`) REFERENCES `nutriment` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `FK_CONTIENT2` FOREIGN KEY (`ALI_ID`) REFERENCES `aliment` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `entree`
--
ALTER TABLE `entree`
  ADD CONSTRAINT `FK_COMPORTE` FOREIGN KEY (`ALI_ID`) REFERENCES `aliment` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `FK_CREE` FOREIGN KEY (`UTI_ID`) REFERENCES `utilisateur` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `FK_PRATIQUE` FOREIGN KEY (`PRA_ID`) REFERENCES `pratique_sportive` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

