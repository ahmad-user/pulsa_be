-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Waktu pembuatan: 03 Sep 2024 pada 13.31
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pulsa_be`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `banner_name` varchar(255) DEFAULT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `banner`
--

INSERT INTO `banner` (`id`, `banner_name`, `banner_image`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Banner 1', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-09-03 11:29:55', '2024-09-03 11:29:55'),
(2, 'Banner 2', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-09-03 11:30:14', '2024-09-03 11:30:14'),
(3, 'Banner 3', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-09-03 11:30:22', '2024-09-03 11:30:22'),
(4, 'Banner 4', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-09-03 11:30:31', '2024-09-03 11:30:31'),
(5, 'Banner 5', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-09-03 11:30:39', '2024-09-03 11:30:39'),
(6, 'Banner 6', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-09-03 11:30:46', '2024-09-03 11:30:46');

-- --------------------------------------------------------

--
-- Struktur dari tabel `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `service_code` varchar(255) DEFAULT NULL,
  `service_name` varchar(255) DEFAULT NULL,
  `service_icon` varchar(255) DEFAULT NULL,
  `service_tarif` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `service`
--

INSERT INTO `service` (`id`, `service_code`, `service_name`, `service_icon`, `service_tarif`, `createdAt`, `updatedAt`) VALUES
(1, 'PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000, '2024-09-03 11:15:26', '2024-09-03 11:15:26'),
(2, 'PLN', 'Listrik', 'https://nutech-integrasi.app/dummy.jpg', 10000, '2024-09-03 11:15:59', '2024-09-03 11:15:59'),
(3, 'PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000, '2024-09-03 11:16:21', '2024-09-03 11:16:21'),
(4, 'PULSA', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 40000, '2024-09-03 11:16:37', '2024-09-03 11:16:37'),
(5, 'PGN', 'PGN Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-09-03 11:16:52', '2024-09-03 11:16:52'),
(6, 'MUSIK', 'Musik Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-09-03 11:17:08', '2024-09-03 11:17:08'),
(7, 'TV', 'TV Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-09-03 11:17:18', '2024-09-03 11:17:18'),
(8, 'PAKET_DATA', 'Paket data', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-09-03 11:17:28', '2024-09-03 11:17:28'),
(9, 'VOUCHER_GAME', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 100000, '2024-09-03 11:17:40', '2024-09-03 11:17:40'),
(10, 'VOUCHER_MAKANAN', 'Voucher Makanan', 'https://nutech-integrasi.app/dummy.jpg', 100000, '2024-09-03 11:17:50', '2024-09-03 11:17:50'),
(11, 'QURBAN', 'Qurban', 'https://nutech-integrasi.app/dummy.jpg', NULL, '2024-09-03 11:18:01', '2024-09-03 11:18:01'),
(12, 'ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', NULL, '2024-09-03 11:18:12', '2024-09-03 11:18:12');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `invoice_number` varchar(255) DEFAULT NULL,
  `service_code` varchar(255) DEFAULT NULL,
  `service_name` varchar(255) DEFAULT NULL,
  `transaction_type` varchar(255) DEFAULT NULL,
  `total_amount` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `invoice_number`, `service_code`, `service_name`, `transaction_type`, `total_amount`, `createdAt`, `updatedAt`) VALUES
(1, 'INV17082023-001', 'PLN', 'Listrik', 'PAYMENT', 10000, '2024-09-03 11:20:38', '2024-09-03 11:20:38');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `top_up_amount` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `first_name`, `last_name`, `password`, `profile_image`, `top_up_amount`, `createdAt`, `updatedAt`) VALUES
(1, 'ahmad@gmail.com', 'Muhammad', 'Fadilah', '$2b$10$dpx/qTx90COrnAHTpzfVkObRyHVB3rIE0Y67gyMcbyf0GtUAdyWAS', 'profileImage-1725361716968-368549019.jpg', 10000, '2024-09-03 11:06:35', '2024-09-03 11:22:08');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
