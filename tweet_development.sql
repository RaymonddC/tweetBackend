-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2023 at 06:41 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tweet_development`
--

-- --------------------------------------------------------

--
-- Table structure for table `liketweets`
--

CREATE TABLE `liketweets` (
  `id` int(11) NOT NULL,
  `tweet_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230616085955-create-user.js'),
('20230618115009-create-tweet.js'),
('20230618132453-create-like-tweet.js');

-- --------------------------------------------------------

--
-- Table structure for table `tweets`
--

CREATE TABLE `tweets` (
  `id` int(11) NOT NULL,
  `media` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `viewed` int(11) DEFAULT NULL,
  `reply_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tweets`
--

INSERT INTO `tweets` (`id`, `media`, `caption`, `viewed`, `reply_id`, `user_id`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'Haloooo', 0, NULL, 1, '2023-06-19 16:15:09', '2023-06-19 16:19:30'),
(2, 'TIMG-1687192041364.png', 'first TWEET', 0, NULL, 4, '2023-06-19 16:27:21', '2023-06-19 16:27:21'),
(3, 'TIMG-1687192062643.png', 'wow', 0, 2, 4, '2023-06-19 16:27:42', '2023-06-19 16:27:42'),
(4, NULL, 'tes', 0, 1, 5, '2023-06-19 16:28:12', '2023-06-19 16:28:12'),
(5, NULL, 'test\r\n', 0, NULL, 5, '2023-06-19 16:28:50', '2023-06-19 16:28:50'),
(6, NULL, 'test', 0, NULL, 5, '2023-06-19 16:28:52', '2023-06-19 16:28:52'),
(7, NULL, 'test', 0, NULL, 5, '2023-06-19 16:28:53', '2023-06-19 16:28:53'),
(8, NULL, 'test', 0, NULL, 5, '2023-06-19 16:28:55', '2023-06-19 16:28:55'),
(9, NULL, 'test', 0, NULL, 5, '2023-06-19 16:28:57', '2023-06-19 16:28:57'),
(10, NULL, 'test1', 0, NULL, 5, '2023-06-19 16:28:59', '2023-06-19 16:29:03'),
(12, NULL, 'tests', 0, NULL, 5, '2023-06-19 16:29:20', '2023-06-19 16:29:20'),
(13, NULL, '1', 0, NULL, 5, '2023-06-19 16:29:22', '2023-06-19 16:29:22'),
(14, NULL, '2', 0, NULL, 5, '2023-06-19 16:29:23', '2023-06-19 16:29:23'),
(15, NULL, '3', 0, NULL, 5, '2023-06-19 16:29:24', '2023-06-19 16:29:24'),
(16, NULL, '4', 0, NULL, 5, '2023-06-19 16:30:04', '2023-06-19 16:30:04'),
(17, NULL, '5', 0, NULL, 5, '2023-06-19 16:30:06', '2023-06-19 16:30:06'),
(18, NULL, '6', 0, NULL, 5, '2023-06-19 16:30:07', '2023-06-19 16:30:07'),
(19, NULL, 'comment', 0, 18, 5, '2023-06-19 16:30:53', '2023-06-19 16:30:53'),
(20, NULL, 'test 6', 0, 18, 1, '2023-06-19 16:31:45', '2023-06-19 16:31:45'),
(21, NULL, 'cashierMekdi', 0, 18, 2, '2023-06-19 16:33:28', '2023-06-19 16:33:28'),
(22, 'TIMG-1687192493840.png', 'sudah verified 1', 0, NULL, 2, '2023-06-19 16:34:32', '2023-06-19 16:34:53'),
(23, NULL, '1', 0, 22, 2, '2023-06-19 16:35:13', '2023-06-19 16:35:13'),
(24, NULL, '2', 0, 22, 2, '2023-06-19 16:35:14', '2023-06-19 16:35:14'),
(25, NULL, '3', 0, 22, 2, '2023-06-19 16:35:15', '2023-06-19 16:35:15'),
(26, NULL, '4', 0, 22, 2, '2023-06-19 16:35:16', '2023-06-19 16:35:16'),
(27, NULL, '5', 0, 22, 2, '2023-06-19 16:35:19', '2023-06-19 16:35:19'),
(28, NULL, '6', 0, 22, 2, '2023-06-19 16:35:20', '2023-06-19 16:35:20'),
(29, NULL, '7', 0, 22, 2, '2023-06-19 16:35:22', '2023-06-19 16:35:22'),
(30, NULL, '8', 0, 22, 2, '2023-06-19 16:35:23', '2023-06-19 16:35:23'),
(31, NULL, '9', 0, 22, 2, '2023-06-19 16:35:25', '2023-06-19 16:35:25'),
(32, NULL, '10', 0, 22, 2, '2023-06-19 16:35:29', '2023-06-19 16:35:29'),
(33, NULL, '1', 0, 22, 2, '2023-06-19 16:35:31', '2023-06-19 16:35:31'),
(34, NULL, '2', 0, 22, 2, '2023-06-19 16:35:35', '2023-06-19 16:35:35'),
(35, NULL, '3', 0, 22, 2, '2023-06-19 16:35:37', '2023-06-19 16:35:37'),
(36, NULL, '4', 0, 22, 2, '2023-06-19 16:35:38', '2023-06-19 16:35:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT NULL,
  `official` tinyint(1) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `verified`, `official`, `fullname`, `bio`, `profilePicture`, `createdAt`, `updatedAt`) VALUES
(1, 'AdminMekdi', 'AdminMekdi@gmail.com', '$2b$10$iziX77RsgjftuB20gtBhdO0m3xPIBjL/Wx3ZjE1O5pJONLGyi//Jy', 1, NULL, 'Admin Mekdi', 'Halo saya mimin mekdi', NULL, '2023-06-19 16:05:59', '2023-06-19 16:05:59'),
(2, 'CashierMekdi', 'CashierMekdi@gmail.com', '$2b$10$WK1I0YRi9lEBDTvNCuTmV.62RlCEJ4wdP6Bhyojlg54jXNHL.CKsa', 1, NULL, 'Cashier Mekdi', 'Halo saya kerja di mekdi', NULL, '2023-06-19 16:05:59', '2023-06-19 16:33:14'),
(5, 'raymond', 'raymondchrisandy@gmail.com', '$2b$10$ddpG3xtetDItYQtyDDj3quQlfd3F.ueuOGizdcjXLwpzMA16zz2dC', 1, 0, NULL, NULL, NULL, '2023-06-19 16:26:01', '2023-06-19 16:26:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `liketweets`
--
ALTER TABLE `liketweets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `tweets`
--
ALTER TABLE `tweets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `liketweets`
--
ALTER TABLE `liketweets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tweets`
--
ALTER TABLE `tweets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
