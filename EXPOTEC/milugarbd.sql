-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-11-2023 a las 04:07:49
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `milugarbd`
--
CREATE DATABASE IF NOT EXISTS `milugarbd` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `milugarbd`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquiler_garage`
--

CREATE TABLE `alquiler_garage` (
  `id_alquiler` int(11) NOT NULL,
  `id_detalle_usuario` int(11) NOT NULL,
  `hora_inicio` datetime NOT NULL,
  `hora_fin` datetime NOT NULL,
  `id_garage` int(11) NOT NULL,
  `id_tipo_pago` int(11) NOT NULL,
  `importe` int(11) NOT NULL,
  `id_parcela` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_propietario`
--

CREATE TABLE `detalle_propietario` (
  `id_propietario` int(11) NOT NULL,
  `id_garage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_usuario`
--

CREATE TABLE `detalle_usuario` (
  `id_detalle_usuario` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `patente` varchar(7) NOT NULL,
  `id_tipo_vehiculo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `garages`
--

CREATE TABLE `garages` (
  `id_garage` int(11) NOT NULL,
  `domicilio_garage` varchar(30) NOT NULL,
  `cod_postal` int(11) NOT NULL,
  `lat_garage` float NOT NULL,
  `long_garage` float NOT NULL,
  `id_tipo_servicio` int(11) NOT NULL,
  `desc_garage` varchar(11) NOT NULL,
  `puntuacion_garage` int(11) NOT NULL,
  `cant_parcelas_accesible` int(11) NOT NULL,
  `telefono_garage` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `garages`
--

INSERT INTO `garages` (`id_garage`, `domicilio_garage`, `cod_postal`, `lat_garage`, `long_garage`, `id_tipo_servicio`, `desc_garage`, `puntuacion_garage`, `cant_parcelas_accesible`, `telefono_garage`) VALUES
(1, 'Juan b Justo 4287', 7600, -38.0114, -57.5809, 1, 'El galpón', 3, 1, '2236541278');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidades`
--

CREATE TABLE `localidades` (
  `cod_postal` int(11) NOT NULL,
  `nombre_ciudad` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `localidades`
--

INSERT INTO `localidades` (`cod_postal`, `nombre_ciudad`) VALUES
(7600, 'Mar del Plata');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parcela`
--

CREATE TABLE `parcela` (
  `id_parcela` int(11) NOT NULL,
  `id_garage` int(11) NOT NULL,
  `numero_parcela` int(11) NOT NULL,
  `piso_parcela` int(11) NOT NULL,
  `ocupado` tinyint(1) NOT NULL,
  `es_accesible` tinyint(1) NOT NULL,
  `sensor_instalado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `parcela`
--

INSERT INTO `parcela` (`id_parcela`, `id_garage`, `numero_parcela`, `piso_parcela`, `ocupado`, `es_accesible`, `sensor_instalado`) VALUES
(1, 1, 23, 1, 0, 0, 0),
(2, 1, 24, 1, 0, 0, 0),
(3, 1, 25, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precios`
--

CREATE TABLE `precios` (
  `id_precio` int(11) NOT NULL,
  `id_garage` int(11) NOT NULL,
  `id_tipo_vehiculo` int(11) NOT NULL,
  `mediahora_precio` double NOT NULL,
  `hora_precio` double NOT NULL,
  `fraccion_precio` double NOT NULL,
  `12_horas_precio` double NOT NULL,
  `24_horas_precio` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `precios`
--

INSERT INTO `precios` (`id_precio`, `id_garage`, `id_tipo_vehiculo`, `mediahora_precio`, `hora_precio`, `fraccion_precio`, `12_horas_precio`, `24_horas_precio`) VALUES
(1, 1, 1, 400, 600, 300, 9000, 16000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propietarios`
--

CREATE TABLE `propietarios` (
  `id_propietario` int(11) NOT NULL,
  `nombre_propietario` varchar(30) NOT NULL,
  `apellido_propietario` varchar(30) DEFAULT NULL,
  `razon_social_propietario` varchar(60) NOT NULL,
  `email_propietario` varchar(60) NOT NULL,
  `contrasena_propietario` text NOT NULL,
  `celular_propietario` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resenas`
--

CREATE TABLE `resenas` (
  `id_resena` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_alquiler` int(11) NOT NULL,
  `fecha_hora_resena` datetime NOT NULL,
  `desc_resena` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id_tipo_servicio` int(11) NOT NULL,
  `desc_servicio` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id_tipo_servicio`, `desc_servicio`) VALUES
(1, 'Techado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_pago`
--

CREATE TABLE `tipo_pago` (
  `id_tipo_pago` int(11) NOT NULL,
  `desc_tipo_pago` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_vehiculo`
--

CREATE TABLE `tipo_vehiculo` (
  `id_tipo_vehiculo` int(11) NOT NULL,
  `desc_vehiculo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_vehiculo`
--

INSERT INTO `tipo_vehiculo` (`id_tipo_vehiculo`, `desc_vehiculo`) VALUES
(1, 'Auto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `email_usuario` varchar(60) NOT NULL,
  `contrasena_usuario` text NOT NULL,
  `fecha_inicio_cuenta` datetime NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `celular_usuario` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alquiler_garage`
--
ALTER TABLE `alquiler_garage`
  ADD PRIMARY KEY (`id_alquiler`,`id_detalle_usuario`),
  ADD KEY `fk_detalle_usuario_alquiler_garage` (`id_detalle_usuario`),
  ADD KEY `fk_id_garage_alquiler_garage` (`id_garage`),
  ADD KEY `fk_id_tipo_pago_alquiler_garage` (`id_tipo_pago`),
  ADD KEY `fk_id_parcela_alquiler_garage` (`id_parcela`);

--
-- Indices de la tabla `detalle_propietario`
--
ALTER TABLE `detalle_propietario`
  ADD PRIMARY KEY (`id_propietario`,`id_garage`),
  ADD KEY `fk_garage_detalle` (`id_garage`);

--
-- Indices de la tabla `detalle_usuario`
--
ALTER TABLE `detalle_usuario`
  ADD PRIMARY KEY (`id_detalle_usuario`,`id_usuario`),
  ADD UNIQUE KEY `patente` (`patente`),
  ADD KEY `fk_vehiculo_detalle` (`id_tipo_vehiculo`),
  ADD KEY `fk_usuario_detalle` (`id_usuario`);

--
-- Indices de la tabla `garages`
--
ALTER TABLE `garages`
  ADD PRIMARY KEY (`id_garage`),
  ADD KEY `fk_cod_postal_garages` (`cod_postal`),
  ADD KEY `fk_servicios_garages` (`id_tipo_servicio`);

--
-- Indices de la tabla `localidades`
--
ALTER TABLE `localidades`
  ADD PRIMARY KEY (`cod_postal`);

--
-- Indices de la tabla `parcela`
--
ALTER TABLE `parcela`
  ADD PRIMARY KEY (`id_parcela`,`id_garage`),
  ADD KEY `fk_garages_parcela` (`id_garage`);

--
-- Indices de la tabla `precios`
--
ALTER TABLE `precios`
  ADD PRIMARY KEY (`id_precio`),
  ADD KEY `fk_tipo_vehiculo_precios` (`id_tipo_vehiculo`),
  ADD KEY `fk_garages_precios` (`id_garage`);

--
-- Indices de la tabla `propietarios`
--
ALTER TABLE `propietarios`
  ADD PRIMARY KEY (`id_propietario`);

--
-- Indices de la tabla `resenas`
--
ALTER TABLE `resenas`
  ADD PRIMARY KEY (`id_resena`),
  ADD KEY `fk_usuario_resena` (`id_usuario`),
  ADD KEY `fk_alquiler_resenas` (`id_alquiler`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id_tipo_servicio`);

--
-- Indices de la tabla `tipo_pago`
--
ALTER TABLE `tipo_pago`
  ADD PRIMARY KEY (`id_tipo_pago`);

--
-- Indices de la tabla `tipo_vehiculo`
--
ALTER TABLE `tipo_vehiculo`
  ADD PRIMARY KEY (`id_tipo_vehiculo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alquiler_garage`
--
ALTER TABLE `alquiler_garage`
  MODIFY `id_alquiler` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_usuario`
--
ALTER TABLE `detalle_usuario`
  MODIFY `id_detalle_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `garages`
--
ALTER TABLE `garages`
  MODIFY `id_garage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `parcela`
--
ALTER TABLE `parcela`
  MODIFY `id_parcela` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `precios`
--
ALTER TABLE `precios`
  MODIFY `id_precio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `propietarios`
--
ALTER TABLE `propietarios`
  MODIFY `id_propietario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `resenas`
--
ALTER TABLE `resenas`
  MODIFY `id_resena` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id_tipo_servicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tipo_pago`
--
ALTER TABLE `tipo_pago`
  MODIFY `id_tipo_pago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_vehiculo`
--
ALTER TABLE `tipo_vehiculo`
  MODIFY `id_tipo_vehiculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alquiler_garage`
--
ALTER TABLE `alquiler_garage`
  ADD CONSTRAINT `fk_detalle_usuario_alquiler_garage` FOREIGN KEY (`id_detalle_usuario`) REFERENCES `detalle_usuario` (`id_detalle_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_garage_alquiler_garage` FOREIGN KEY (`id_garage`) REFERENCES `garages` (`id_garage`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_parcela_alquiler_garage` FOREIGN KEY (`id_parcela`) REFERENCES `parcela` (`id_parcela`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_tipo_pago_alquiler_garage` FOREIGN KEY (`id_tipo_pago`) REFERENCES `tipo_pago` (`id_tipo_pago`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_propietario`
--
ALTER TABLE `detalle_propietario`
  ADD CONSTRAINT `fk_garage_detalle` FOREIGN KEY (`id_garage`) REFERENCES `garages` (`id_garage`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_propietario_detalle` FOREIGN KEY (`id_propietario`) REFERENCES `propietarios` (`id_propietario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_usuario`
--
ALTER TABLE `detalle_usuario`
  ADD CONSTRAINT `fk_tipo_vehiculo_detalle_usuario` FOREIGN KEY (`id_tipo_vehiculo`) REFERENCES `tipo_vehiculo` (`id_tipo_vehiculo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_detalle` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `garages`
--
ALTER TABLE `garages`
  ADD CONSTRAINT `fk_cod_postal_garages` FOREIGN KEY (`cod_postal`) REFERENCES `localidades` (`cod_postal`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_servicios_garages` FOREIGN KEY (`id_tipo_servicio`) REFERENCES `servicios` (`id_tipo_servicio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `parcela`
--
ALTER TABLE `parcela`
  ADD CONSTRAINT `fk_garages_parcela` FOREIGN KEY (`id_garage`) REFERENCES `garages` (`id_garage`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `precios`
--
ALTER TABLE `precios`
  ADD CONSTRAINT `fk_garages_precios` FOREIGN KEY (`id_garage`) REFERENCES `garages` (`id_garage`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tipo_vehiculo_precios` FOREIGN KEY (`id_tipo_vehiculo`) REFERENCES `tipo_vehiculo` (`id_tipo_vehiculo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `resenas`
--
ALTER TABLE `resenas`
  ADD CONSTRAINT `fk_alquiler_resenas` FOREIGN KEY (`id_alquiler`) REFERENCES `alquiler_garage` (`id_alquiler`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_resenas` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
