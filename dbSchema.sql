
##################################################################################
##			      Stores bank names and codes                       ##
##################################################################################

CREATE TABLE `tb_banks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bank_code` varchar(20) DEFAULT NULL,
  `bank_name` varchar(200) DEFAULT NULL,
  `bank_image_url` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=latin1

##################################################################################
##	                Stores bank address and bank information		##
##################################################################################
CREATE TABLE `tb_bank_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bank_id` int(11) DEFAULT NULL,
  `ifsc` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `micr` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ifsc` (`ifsc`)
) ENGINE=InnoDB AUTO_INCREMENT=393292 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci




