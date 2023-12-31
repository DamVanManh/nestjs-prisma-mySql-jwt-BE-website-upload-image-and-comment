-- -------------------------------------------------------------
-- TablePlus 5.6.8(524)
--
-- https://tableplus.com/
--
-- Database: db_capstone_orm_buoi_10
-- Generation Time: 2023-12-31 11:31:34.0150
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `ngay_binh_luan` datetime DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(255) DEFAULT NULL,
  `duong_dan` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `luu_anh` (
  `ngay_luu` datetime DEFAULT NULL,
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  PRIMARY KEY (`nguoi_dung_id`,`hinh_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `ngay_binh_luan`, `noi_dung`, `nguoi_dung_id`, `hinh_id`) VALUES
(1, '2023-01-01 08:00:00', 'A nice photo!', 1, 1),
(2, '2023-01-02 10:30:00', 'Lovely picture!', 2, 2),
(3, '2023-01-03 12:45:00', 'Great shot!', 3, 3),
(4, '2023-01-04 15:15:00', 'Beautiful image!', 4, 4),
(5, '2023-01-05 18:30:00', 'Awesome photo!', 5, 5),
(7, '2023-01-07 22:00:00', 'Fantastic shot!', 2, 7),
(8, '2023-01-08 09:30:00', 'Stunning image!', 3, 8),
(9, '2023-01-09 11:45:00', 'Impressive photo!', 4, 9),
(11, '2023-01-01 08:00:00', 'A nice photo! haha', 5, 1),
(12, '2023-01-02 10:30:00', 'Lovely picture!', 7, 2),
(13, '2023-01-03 12:45:00', 'Great shot!', 3, 3),
(14, '2023-01-04 15:15:00', 'Beautiful image!', 6, 4),
(15, '2023-01-05 18:30:00', 'Awesome photo!', 4, 5),
(17, '2023-01-07 22:00:00', 'Fantastic shot!', 1, 7),
(18, '2023-01-08 09:30:00', 'Stunning image!', 3, 8),
(19, '2023-01-09 11:45:00', 'Impressive photo!', 5, 9),
(21, '2023-12-30 13:48:21', 'bình luận hay', 1, 1),
(22, '2023-12-30 13:49:04', 'bình luận hay', 1, 1),
(25, '2023-12-30 13:56:59', 'bình luận hay', 1, 1);

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(1, 'Hinh 1', 'https://i.imgur.com/4QhbRw1.png', 'Mo ta hinh 1', 1),
(2, 'Hinh 2', 'https://i.imgur.com/rKRtwHv.jpeg', 'Mo ta hinh 2', 2),
(3, 'Hinh 3', 'https://i.imgur.com/HkQr5nY.jpeg', 'Mo ta hinh 3', 3),
(4, 'Hinh 4', 'https://i.imgur.com/NhcCdzQ.jpeg', 'Mo ta hinh 4', 4),
(5, 'Hinh 5', 'https://i.imgur.com/fqSwMFB.jpeg', 'Mo ta hinh 5', 5),
(7, 'Hinh 7', 'https://i.imgur.com/vDZ48Ul.png', 'Mo ta hinh 7', 2),
(8, 'Hinh 8', 'https://i.imgur.com/FGHFPpm.png', 'Mo ta hinh 8', 3),
(9, 'Hinh 9', 'https://i.imgur.com/srPWPVS.jpeg', 'Mo ta hinh 9', 4),
(11, 'name', 'https://i.imgur.com/NhcCdzQ.jpeg', 'hình mới', 1);

INSERT INTO `luu_anh` (`ngay_luu`, `nguoi_dung_id`, `hinh_id`) VALUES
('2023-01-06 20:45:00', 1, 5),
('2023-01-07 22:00:00', 2, 4),
('2023-01-02 10:30:00', 2, 9),
('2023-12-31 04:12:22', 3, 1),
('2023-01-08 09:30:00', 3, 3),
('2023-01-03 12:45:00', 3, 8),
('2023-01-09 11:45:00', 4, 2),
('2023-01-04 15:15:00', 4, 7),
('2023-01-10 14:00:00', 5, 1);

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(1, 'user1@example.com', 'password1', 'User One', 25, 'https://i.pravatar.cc/300'),
(2, 'user2@example.com', 'password2', 'User Two', 30, 'https://i.pravatar.cc/300'),
(3, 'user3@example.com', 'pass', 'nguyen van a', 23, 'https://i.pravatar.cc/300'),
(4, 'user4@example.com', 'password4', 'User Four', 28, 'https://i.pravatar.cc/300'),
(5, 'user5@example.com', 'password5', 'User Five', 35, 'https://i.pravatar.cc/300'),
(6, 'user1aa@example.com', 'password1', 'dam van manh', 12, 'https://i.pravatar.cc/300'),
(7, 'user1aqa@example.com', 'password1', 'dam van manh', 13, 'https://i.pravatar.cc/300'),
(8, 'user1a@example.com', 'password1', 'dam van manh', 23, 'https://i.pravatar.cc/300'),
(9, 'user1asa@example.com', 'password1', 'dam van manh', 43, 'https://i.pravatar.cc/300'),
(10, 'dam@example.com', 'password1', 'dam van manh', 12, '');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;