-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 10 nov. 2023 à 15:57
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
  `NOM` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ISLIQUIDE` tinyint NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `nom_aliment_unique` (`NOM`),
  KEY `FK_APPARTIENT` (`CAT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `aliment`
--

INSERT INTO `aliment` (`ID`, `CAT_ID`, `NOM`, `ISLIQUIDE`) VALUES
(54, 18, 'Evian', 1),
(55, 19, 'Orangina', 1),
(56, 16, 'Spaghetti', 0),
(57, 16, 'Coquillettes', 0),
(58, 21, 'Camembert', 0),
(59, 14, 'Poire', 0),
(60, 14, 'Tomates', 0),
(61, 22, 'Yoplait', 0),
(62, 16, 'Riz', 0),
(63, 20, 'Lait entier', 1),
(64, 20, 'Lait 1/2 écrémé', 1),
(65, 20, 'Lait écrémé', 1),
(66, 15, 'Carottes', 1),
(67, 17, 'Flageolets', 0),
(68, 17, 'Haricots verts', 0),
(69, 17, 'Lentilles vertes', 0),
(70, 17, 'Petits pois', 0),
(72, 5, 'Beurre', 0),
(73, 5, 'Crème', 0),
(74, 12, 'Oeufs', 0),
(75, 11, 'Hareng', 0),
(76, 11, 'Truite', 0),
(77, 11, 'Saumon fumé', 0),
(78, 19, 'Limonade', 1),
(79, 8, 'Caramel', 1),
(80, 10, 'Saucisse', 0),
(81, 10, 'Tofu', 0),
(82, 10, 'Steak', 0),
(83, 10, 'Pâtée de campagne', 0),
(84, 10, 'Jambon blanc', 0),
(85, 13, 'Pilons de poulet', 0),
(86, 13, 'Cuisse de poulet', 0),
(87, 13, 'Filet de canard', 0),
(88, 13, 'Escalope de dinde', 0),
(89, 13, 'Sauté de dinde', 0),
(90, 5, 'Huile de tournesol', 1),
(91, 5, 'Huile de colza', 1),
(92, 21, 'Roquefort', 0),
(93, 22, 'Skyr', 0),
(94, 21, 'Bleu', 0),
(95, 21, 'Emmental râpé', 0),
(96, 21, 'Chèvre frais', 0),
(97, 20, 'Milk Shake au chocolat', 1),
(98, 21, 'Fromage blanc nature', 0),
(99, 22, 'Activia', 0),
(100, 15, 'Mache', 0),
(101, 15, 'Cornichons', 0),
(102, 15, 'Carottes râpées', 0),
(103, 15, 'Boîte de maïs', 0),
(104, 17, 'Haricots rouges', 0);

-- --------------------------------------------------------

--
-- Structure de la table `categorie_aliment`
--

DROP TABLE IF EXISTS `categorie_aliment`;
CREATE TABLE IF NOT EXISTS `categorie_aliment` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NOM` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `nom_categorie_unique` (`NOM`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='un aliment apportient à une catégorie, qui pourra être utili';

--
-- Déchargement des données de la table `categorie_aliment`
--

INSERT INTO `categorie_aliment` (`ID`, `NOM`) VALUES
(16, 'Céréales'),
(18, 'Eau'),
(21, 'Fromages'),
(14, 'Fruits'),
(20, 'Lait'),
(15, 'Légumes'),
(17, 'Légumineuses'),
(5, 'Matières grasses'),
(12, 'Oeufs'),
(11, 'Poissons'),
(19, 'Soda'),
(8, 'Sucres et produits sucrés'),
(10, 'Viandes hors volailles'),
(13, 'Volailles'),
(22, 'Yahourts');

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
) ENGINE=InnoDB AUTO_INCREMENT=366 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contient`
--

INSERT INTO `contient` (`ID`, `NUT_ID`, `ALI_ID`, `QUANTITE`) VALUES
(122, 6, 54, 0.001),
(123, 1, 55, 41),
(124, 5, 55, 0.1),
(125, 3, 55, 10.2),
(126, 1, 56, 345),
(127, 4, 56, 4),
(128, 2, 56, 1.5),
(129, 5, 56, 11.1),
(130, 3, 56, 1.5),
(131, 1, 57, 361),
(132, 4, 57, 3.6),
(133, 2, 57, 2),
(134, 5, 57, 12),
(135, 3, 57, 3.7),
(136, 1, 58, 274),
(137, 2, 58, 21.3),
(138, 5, 58, 19.6),
(139, 6, 58, 1.38),
(140, 3, 58, 0.5),
(141, 1, 59, 57),
(142, 4, 59, 2.9),
(143, 5, 59, 0.49),
(144, 1, 60, 21),
(145, 4, 60, 1.9),
(146, 5, 60, 1.1),
(147, 3, 60, 3.2),
(148, 1, 61, 90),
(149, 2, 61, 2.3),
(150, 5, 61, 3.3),
(151, 6, 61, 0.13),
(152, 3, 61, 11.9),
(153, 1, 62, 157),
(154, 4, 62, 0.8),
(155, 2, 62, 0.3),
(156, 5, 62, 2.9),
(157, 3, 62, 0.2),
(158, 1, 63, 65),
(159, 2, 63, 3.6),
(160, 5, 63, 3.3),
(161, 6, 63, 0.1),
(162, 3, 63, 4.8),
(163, 1, 64, 1),
(164, 2, 64, 3.8),
(165, 5, 64, 7.8),
(166, 6, 64, 0.2),
(167, 3, 64, 12),
(168, 1, 65, 33),
(169, 5, 65, 3.2),
(170, 6, 65, 0.11),
(171, 3, 65, 4.8),
(172, 1, 66, 40),
(173, 4, 66, 2.7),
(174, 5, 66, 0.63),
(175, 1, 67, 137),
(176, 4, 67, 11),
(177, 2, 67, 0.6),
(178, 5, 67, 9),
(179, 6, 67, 0.23),
(180, 3, 67, 1.5),
(181, 1, 68, 36),
(182, 4, 68, 3.3),
(183, 5, 68, 1.8),
(184, 3, 68, 1.2),
(185, 1, 69, 304),
(186, 4, 69, 23),
(187, 2, 69, 1.8),
(188, 5, 69, 25),
(189, 6, 69, 0.13),
(190, 3, 69, 2),
(191, 1, 70, 82),
(192, 4, 70, 5.8),
(193, 2, 70, 0.8),
(194, 5, 70, 5.1),
(195, 6, 70, 0.45),
(196, 3, 70, 2.6),
(199, 1, 72, 744),
(200, 2, 72, 82),
(201, 5, 72, 0.7),
(202, 6, 72, 0.05),
(203, 3, 72, 0.8),
(204, 1, 73, 1202),
(205, 2, 73, 30),
(206, 5, 73, 2.3),
(207, 6, 73, 0.08),
(208, 3, 73, 3.1),
(209, 1, 74, 140),
(210, 4, 74, 0.5),
(211, 2, 74, 9.8),
(212, 5, 74, 13),
(213, 6, 74, 0.3),
(214, 3, 74, 0.5),
(215, 1, 75, 200),
(216, 2, 75, 11.6),
(217, 5, 75, 17.1),
(218, 6, 75, 3.9),
(219, 3, 75, 0.3),
(220, 1, 76, 155),
(221, 2, 76, 7.3),
(222, 5, 76, 22),
(223, 6, 76, 3),
(224, 3, 76, 0.5),
(225, 1, 77, 177),
(226, 2, 77, 9.31),
(227, 5, 77, 23),
(228, 6, 77, 2.8),
(229, 1, 78, 18),
(230, 3, 78, 4.2),
(231, 1, 79, 418),
(232, 2, 79, 12.5),
(233, 5, 79, 4.3),
(234, 6, 79, 1.08),
(235, 3, 79, 47.4),
(236, 1, 80, 241),
(237, 2, 80, 19),
(238, 5, 80, 17),
(239, 6, 80, 1.5),
(240, 3, 80, 0.5),
(241, 1, 81, 112),
(242, 2, 81, 6.5),
(243, 5, 81, 12),
(244, 6, 81, 0.03),
(245, 3, 81, 0.5),
(246, 1, 82, 197),
(247, 2, 82, 13),
(248, 5, 82, 19),
(249, 6, 82, 0.19),
(250, 3, 82, 0.5),
(251, 1, 83, 348),
(252, 7, 83, 1.3),
(253, 4, 83, 12),
(254, 2, 83, 32),
(255, 5, 83, 12),
(256, 6, 83, 0.9),
(257, 3, 83, 1),
(258, 1, 84, 106),
(259, 2, 84, 2.7),
(260, 5, 84, 20),
(261, 6, 84, 1.9),
(262, 3, 84, 0.5),
(263, 1, 85, 140),
(264, 2, 85, 7.3),
(265, 5, 85, 19),
(266, 6, 85, 0.3),
(267, 3, 85, 0.5),
(268, 1, 86, 200),
(269, 2, 86, 14),
(270, 5, 86, 17),
(271, 6, 86, 0.21),
(272, 1, 87, 201),
(273, 4, 87, 1),
(274, 2, 87, 11.8),
(275, 5, 87, 18.6),
(276, 6, 87, 0.2),
(277, 3, 87, 0.1),
(278, 1, 88, 114),
(279, 4, 88, 0.4),
(280, 2, 88, 1.3),
(281, 5, 88, 25),
(282, 6, 88, 0.1),
(283, 3, 88, 0.4),
(284, 1, 89, 107),
(285, 2, 89, 3.3),
(286, 5, 89, 20),
(287, 6, 89, 0.2),
(288, 1, 90, 828),
(289, 2, 90, 92),
(290, 1, 91, 900),
(291, 4, 91, 0.5),
(292, 2, 91, 100),
(293, 5, 91, 0.5),
(294, 6, 91, 0.01),
(295, 3, 91, 0.5),
(296, 1, 92, 368),
(297, 2, 92, 32),
(298, 5, 92, 19),
(299, 6, 92, 3.5),
(300, 1, 93, 77),
(301, 2, 93, 2.5),
(302, 5, 93, 9.2),
(303, 6, 93, 0.14),
(304, 3, 93, 3),
(305, 1, 94, 359),
(306, 2, 94, 31),
(307, 5, 94, 19),
(308, 6, 94, 1.2),
(309, 3, 94, 0.5),
(310, 1, 95, 373),
(311, 2, 95, 29),
(312, 5, 95, 27),
(313, 6, 95, 0.83),
(314, 3, 95, 0.5),
(315, 1, 96, 196),
(316, 2, 96, 15.5),
(317, 5, 96, 11),
(318, 6, 96, 1),
(319, 3, 96, 2),
(320, 1, 97, 214),
(321, 2, 97, 5.7),
(322, 5, 97, 8),
(323, 6, 97, 0.2),
(324, 3, 97, 23.5),
(325, 1, 98, 80),
(326, 4, 98, 0.5),
(327, 2, 98, 3.3),
(328, 5, 98, 6.9),
(329, 6, 98, 0.11),
(330, 3, 98, 5.6),
(331, 1, 99, 41),
(332, 2, 99, 0.1),
(333, 5, 99, 4.3),
(334, 6, 99, 0.16),
(335, 3, 99, 5.8),
(336, 1, 100, 27),
(337, 4, 100, 2),
(338, 2, 100, 0.5),
(339, 5, 100, 2.2),
(340, 6, 100, 0.1),
(341, 3, 100, 0.6),
(342, 1, 101, 13),
(343, 4, 101, 0.5),
(344, 2, 101, 0.1),
(345, 5, 101, 0.6),
(346, 6, 101, 2.3),
(347, 3, 101, 0.7),
(348, 1, 102, 79),
(349, 4, 102, 2.8),
(350, 2, 102, 0.4),
(351, 5, 102, 1.1),
(352, 6, 102, 0.88),
(353, 3, 102, 5),
(354, 1, 103, 80),
(355, 4, 103, 3.8),
(356, 2, 103, 0.5),
(357, 5, 103, 2.9),
(358, 6, 103, 0.4),
(359, 3, 103, 5.2),
(360, 1, 104, 96),
(361, 2, 104, 0.1),
(362, 6, 104, 0.53),
(363, 3, 104, 0.5),
(364, 4, 104, 6.5),
(365, 5, 104, 7.2);

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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='L''utilisateur doit pouvoir rentrer les aliments consommés e';

--
-- Déchargement des données de la table `entree`
--

INSERT INTO `entree` (`ID`, `UTI_ID`, `ALI_ID`, `QUANTITE`, `DATE`) VALUES
(30, 61, 56, '200', '2023-01-01 12:49:00'),
(31, 61, 70, '170', '2023-01-02 12:52:00'),
(32, 60, 62, '5', '2023-01-01 08:00:00'),
(33, 60, 86, '100', '2023-01-01 08:00:00'),
(34, 60, 86, '500', '2023-01-05 08:00:00'),
(35, 60, 59, '100', '2023-11-08 08:00:00'),
(36, 60, 56, '200', '2023-11-08 12:00:00'),
(37, 60, 86, '200', '2023-11-08 20:00:00'),
(38, 60, 99, '100', '2023-11-09 08:00:00'),
(39, 60, 100, '300', '2023-11-09 12:00:00'),
(40, 60, 56, '150', '2023-11-09 20:00:00'),
(41, 60, 61, '100', '2023-11-10 08:00:00'),
(42, 60, 87, '120', '2023-11-10 12:00:00'),
(43, 60, 57, '120', '2023-11-10 16:00:00'),
(44, 60, 96, '20', '2023-11-10 12:00:00'),
(45, 60, 66, '50', '2023-11-10 12:30:00'),
(46, 60, 54, '2000', '2023-11-10 08:00:00'),
(47, 60, 59, '100', '2023-11-10 15:00:00'),
(48, 60, 54, '2000', '2023-01-15 12:00:00'),
(49, 60, 82, '150', '2023-01-15 12:00:00'),
(50, 60, 58, '50', '2023-01-15 12:00:00'),
(51, 60, 98, '60', '2023-02-10 12:00:00'),
(52, 60, 70, '150', '2023-02-10 08:00:00'),
(53, 60, 54, '1000', '2023-02-10 12:00:00'),
(54, 60, 65, '100', '2023-02-10 08:00:00'),
(55, 60, 68, '300', '2023-02-28 12:00:00'),
(56, 60, 54, '950', '2023-02-28 12:00:00'),
(57, 60, 84, '100', '2023-03-15 12:00:00'),
(58, 60, 97, '150', '2023-03-15 12:00:00'),
(59, 60, 67, '60', '2023-03-15 12:00:00'),
(60, 60, 55, '1000', '2023-04-15 12:00:00'),
(61, 60, 56, '200', '2023-04-15 12:00:00'),
(62, 60, 92, '150', '2023-04-15 12:00:00'),
(63, 60, 77, '100', '2023-04-15 12:00:00'),
(64, 60, 75, '150', '2023-05-15 12:00:00'),
(65, 60, 63, '120', '2023-05-15 12:00:00'),
(66, 60, 60, '120', '2023-05-15 12:00:00'),
(67, 60, 55, '80', '2023-05-15 12:00:00'),
(68, 60, 87, '150', '2023-06-15 12:00:00'),
(69, 60, 54, '1500', '2023-06-15 12:00:00'),
(70, 60, 100, '300', '2023-06-15 12:00:00'),
(71, 60, 95, '120', '2023-07-15 12:00:00'),
(72, 60, 57, '300', '2023-07-15 12:00:00'),
(73, 60, 65, '500', '2023-07-15 12:00:00'),
(74, 60, 78, '1600', '2023-08-15 12:00:00'),
(75, 60, 56, '300', '2023-08-15 12:00:00'),
(76, 60, 80, '150', '2023-08-15 12:00:00'),
(77, 60, 61, '120', '2023-08-15 12:00:00'),
(78, 60, 60, '500', '2023-09-15 12:00:00'),
(79, 60, 74, '200', '2023-09-15 12:00:00'),
(80, 60, 85, '20', '2023-09-15 12:00:00'),
(81, 60, 101, '100', '2023-10-15 12:00:00'),
(82, 60, 83, '100', '2023-10-15 12:00:00'),
(83, 60, 55, '900', '2023-10-15 12:00:00'),
(84, 60, 83, '50', '2023-01-15 12:00:00'),
(85, 60, 83, '300', '2023-02-15 12:00:00'),
(86, 60, 83, '125', '2023-05-15 12:00:00'),
(87, 60, 83, '156', '2023-08-15 12:00:00'),
(88, 60, 82, '200', '2023-10-15 12:00:00'),
(89, 61, 59, '150', '2023-11-08 12:00:00'),
(90, 61, 56, '300', '2023-11-08 12:00:00'),
(91, 61, 58, '150', '2023-11-08 12:00:00'),
(92, 61, 79, '100', '2023-11-08 12:00:00'),
(93, 61, 54, '2000', '2023-11-09 12:00:00'),
(94, 61, 57, '500', '2023-11-09 12:00:00'),
(95, 61, 59, '300', '2023-11-09 12:00:00'),
(96, 61, 88, '300', '2023-11-10 12:00:00'),
(97, 61, 102, '150', '2023-11-10 12:00:00'),
(98, 61, 54, '1750', '2023-11-10 12:00:00'),
(99, 61, 58, '100', '2023-11-10 12:00:00'),
(100, 61, 61, '50', '2023-11-10 12:00:00'),
(101, 61, 56, '100', '2023-01-15 12:00:00'),
(102, 61, 56, '150', '2023-02-15 12:00:00'),
(103, 61, 56, '80', '2023-03-15 12:00:00'),
(104, 61, 56, '300', '2023-04-15 12:00:00'),
(105, 61, 56, '123', '2023-05-15 12:00:00'),
(106, 61, 56, '145', '2023-07-15 12:00:00'),
(107, 61, 57, '120', '2023-08-15 12:00:00'),
(108, 61, 57, '124', '2023-09-15 12:00:00'),
(109, 61, 57, '145', '2023-10-15 12:00:00'),
(110, 61, 55, '500', '2023-01-15 12:00:00'),
(111, 61, 55, '650', '2023-02-15 12:00:00'),
(112, 61, 54, '1500', '2023-03-15 12:00:00'),
(113, 61, 78, '1460', '2023-05-15 12:00:00'),
(114, 61, 79, '150', '2023-09-15 12:00:00'),
(115, 61, 93, '300', '2023-10-15 12:00:00'),
(116, 61, 68, '160', '2023-01-03 12:59:00'),
(117, 61, 81, '120', '2023-08-19 13:02:00'),
(118, 61, 96, '30', '2023-01-06 19:07:00'),
(119, 61, 85, '80', '2023-01-08 20:08:00'),
(120, 61, 87, '73', '2023-01-19 16:05:00'),
(121, 61, 62, '140', '2023-01-12 16:05:00'),
(122, 61, 57, '150', '2023-01-10 16:06:00'),
(123, 61, 69, '190', '2023-01-14 16:06:00'),
(124, 61, 67, '195', '2023-01-21 20:08:00'),
(125, 61, 77, '90', '2023-01-23 13:09:00');

-- --------------------------------------------------------

--
-- Structure de la table `nutriment`
--

DROP TABLE IF EXISTS `nutriment`;
CREATE TABLE IF NOT EXISTS `nutriment` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NOM` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `nom_nutriment_unique` (`NOM`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='un aliment contient différents nutriment';

--
-- Déchargement des données de la table `nutriment`
--

INSERT INTO `nutriment` (`ID`, `NOM`) VALUES
(1, 'Energie'),
(7, 'Fer'),
(4, 'Fibres'),
(2, 'Gras'),
(5, 'Protéines'),
(6, 'Sel'),
(3, 'Sucres');

-- --------------------------------------------------------

--
-- Structure de la table `pratique_sportive`
--

DROP TABLE IF EXISTS `pratique_sportive`;
CREATE TABLE IF NOT EXISTS `pratique_sportive` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NOM` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
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
  `NOM_UTILISATEUR` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `EMAIL` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PASSWORD` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `SEXE` int NOT NULL,
  `AGE` int NOT NULL,
  `POIDS` decimal(10,0) NOT NULL,
  `TAILLE` decimal(10,0) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `EMAIL_IX` (`EMAIL`),
  KEY `FK_PRATIQUE` (`PRA_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='l''utilisateur doit pouvoir se connecter à l''application af';

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`ID`, `PRA_ID`, `NOM_UTILISATEUR`, `EMAIL`, `PASSWORD`, `SEXE`, `AGE`, `POIDS`, `TAILLE`) VALUES
(60, 3, 'John Doe', 'john.doe@gmail.com', 'JohnDoe123!', 0, 23, '80', '176'),
(61, 2, 'Jane Doe', 'jane.doe@gmail.com', 'JaneDoe123!', 1, 46, '68', '163');

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
