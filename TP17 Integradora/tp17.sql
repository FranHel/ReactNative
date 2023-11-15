-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-11-2023 a las 00:04:14
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tp17`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE `jugadores` (
  `Nombre` varchar(50) DEFAULT NULL,
  `POS` varchar(2) DEFAULT NULL,
  `Edad` int(11) DEFAULT NULL,
  `Estatura` decimal(4,2) DEFAULT NULL,
  `Peso` int(11) DEFAULT NULL,
  `Nacionalidad` varchar(50) DEFAULT NULL,
  `Ap` int(11) DEFAULT NULL,
  `SUB` int(11) DEFAULT NULL,
  `ATA` int(11) DEFAULT NULL,
  `GA` int(11) DEFAULT NULL,
  `ASI` int(11) DEFAULT NULL,
  `FC` int(11) DEFAULT NULL,
  `FS` int(11) DEFAULT NULL,
  `TA` int(11) DEFAULT NULL,
  `TR` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `jugadores`
--

INSERT INTO `jugadores` (`Nombre`, `POS`, `Edad`, `Estatura`, `Peso`, `Nacionalidad`, `Ap`, `SUB`, `ATA`, `GA`, `ASI`, `FC`, `FS`, `TA`, `TR`) VALUES
('Fábio1', 'G', 43, 1.88, 86, 'Brasil', 28, 0, 84, 34, 0, 0, 2, 3, 0),
('Marlon4', 'D', 28, 1.83, 78, 'Brasil', 13, 2, 0, 0, 4, 1, 16, 1, 5),
('Marcelo12', 'D', 35, 1.73, 72, 'Brasil', 15, 1, 1, 1, 25, 8, 5, 24, 3),
('Nino33', 'D', 26, 1.88, 82, 'Brasil', 21, 0, 2, 0, 12, 4, 22, 22, 4),
('John Kennedy9', 'A', 21, 1.73, 71, 'Brasil', 20, 11, 4, 1, 35, 16, 19, 24, 8),
('Keno11', 'A', 34, 1.78, 72, 'Brasil', 19, 4, 2, 4, 37, 15, 15, 23, 5),
('Germán Cano14', 'A', 35, 1.78, 81, 'Argentina', 26, 2, 7, 1, 55, 22, 23, 10, 6);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
