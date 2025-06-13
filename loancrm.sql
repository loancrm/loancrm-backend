-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2025 at 09:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loancrm`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `accountId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `businessName` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `emailId` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `lastStatus` varchar(255) DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `accountId`, `name`, `businessName`, `mobile`, `emailId`, `password`, `status`, `lastStatus`, `createdOn`, `updatedOn`, `createdBy`, `updatedBy`) VALUES
(1, 8271360, 'kalyonnii', 'Fintalk', '7331129435', 'mudhiiguubbakalyonnii@gmail.com', 'kalyonnii', '1', '1', '2025-06-13 07:38:49', '2025-06-13 07:38:49', 'kalyonnii', 'kalyonnii');

-- --------------------------------------------------------

--
-- Table structure for table `bankers`
--

CREATE TABLE `bankers` (
  `id` int(100) NOT NULL,
  `accountId` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `branchDetails` longtext DEFAULT NULL,
  `imageFiles` longtext DEFAULT NULL,
  `bankerInternalStatus` varchar(100) DEFAULT NULL,
  `lastBankerInternalStatus` varchar(100) DEFAULT NULL,
  `createdBy` varchar(500) DEFAULT NULL,
  `lastUpdatedBy` varchar(100) DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastUpdatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `bankerId` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `callbacks`
--

CREATE TABLE `callbacks` (
  `id` int(11) NOT NULL,
  `accountId` int(11) NOT NULL,
  `callBackId` varchar(1000) DEFAULT NULL,
  `loanType` varchar(500) DEFAULT NULL,
  `employmentStatus` varchar(500) DEFAULT NULL,
  `businessName` varchar(1000) DEFAULT NULL,
  `phone` varchar(1000) DEFAULT NULL,
  `date` varchar(1000) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `referenceNo` varchar(500) DEFAULT NULL,
  `createdBy` varchar(1000) DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastUpdatedBy` varchar(1000) DEFAULT NULL,
  `lastUpdatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `callbackInternalStatus` varchar(100) DEFAULT NULL,
  `lastCallbackInternalStatus` varchar(100) DEFAULT NULL,
  `sourcedBy` varchar(1000) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dscr_values`
--

CREATE TABLE `dscr_values` (
  `id` int(11) NOT NULL,
  `accountId` int(11) NOT NULL,
  `leadId` varchar(200) DEFAULT NULL,
  `turnoverAy1` varchar(500) DEFAULT NULL,
  `turnoverAy2` varchar(500) DEFAULT NULL,
  `purchasesAy1` varchar(500) DEFAULT NULL,
  `purchasesAy2` varchar(500) DEFAULT NULL,
  `profitaftertaxAy1` varchar(500) DEFAULT NULL,
  `profitaftertaxAy2` varchar(500) DEFAULT NULL,
  `depreciationAy1` varchar(500) DEFAULT NULL,
  `depreciationAy2` varchar(500) DEFAULT NULL,
  `odCcInterestAy1` varchar(500) DEFAULT NULL,
  `partnerRemuAy1` varchar(500) DEFAULT NULL,
  `partnerRemuAy2` varchar(500) DEFAULT NULL,
  `partnerInterestAy1` varchar(500) DEFAULT NULL,
  `partnerInterestAy2` varchar(500) DEFAULT NULL,
  `directorsRemuAy1` varchar(500) DEFAULT NULL,
  `directorsRemuAy2` varchar(500) DEFAULT NULL,
  `monthsAy1` varchar(500) DEFAULT NULL,
  `proposedEmi` varchar(500) DEFAULT NULL,
  `resultFirstYear` varchar(500) DEFAULT NULL,
  `totalEmi` varchar(500) DEFAULT NULL,
  `sundryDebtorsAy1` varchar(500) DEFAULT NULL,
  `sundryDebtorsAy2` varchar(500) DEFAULT NULL,
  `sundryCreditorsAy1` varchar(500) DEFAULT NULL,
  `sundryCreditorsAy2` varchar(500) DEFAULT NULL,
  `creditor_daysFirstYear` varchar(500) DEFAULT NULL,
  `debtor_daysFirstYear` varchar(500) DEFAULT NULL,
  `gstTurnover` varchar(500) DEFAULT NULL,
  `margin` varchar(100) DEFAULT NULL,
  `months` varchar(100) DEFAULT NULL,
  `gstValue` varchar(100) DEFAULT NULL,
  `bankingTurnover` int(100) DEFAULT NULL,
  `btoMargin` int(100) DEFAULT NULL,
  `btoMonths` int(100) DEFAULT NULL,
  `btoValue` int(100) DEFAULT NULL,
  `creditSummary` varchar(100) DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdBy` varchar(100) DEFAULT NULL,
  `lastUpdatedBy` varchar(500) DEFAULT NULL,
  `lastUpdatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ipaddresses`
--

CREATE TABLE `ipaddresses` (
  `id` int(11) NOT NULL,
  `accountId` int(11) NOT NULL,
  `ipAddressId` varchar(1000) DEFAULT NULL,
  `ipAddressName` varchar(500) DEFAULT NULL,
  `ipAddress` varchar(500) DEFAULT NULL,
  `createdBy` varchar(500) DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastUpdatedBy` varchar(500) DEFAULT NULL,
  `lastUpdatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leaddocuments`
--

CREATE TABLE `leaddocuments` (
  `id` int(11) NOT NULL,
  `accountId` int(11) NOT NULL,
  `leadId` varchar(200) DEFAULT NULL,
  `applicantName` varchar(100) DEFAULT NULL,
  `applicantPhoto` longtext DEFAULT NULL,
  `pan` varchar(100) DEFAULT NULL,
  `aadhaar` varchar(100) DEFAULT NULL,
  `aadharCard` longtext DEFAULT NULL,
  `voterId` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`voterId`)),
  `kycOtherDocuments` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`kycOtherDocuments`)),
  `coApplicantName` varchar(100) DEFAULT NULL,
  `applicantRelation` text DEFAULT NULL,
  `coApplicantPhoto` varchar(500) DEFAULT NULL,
  `coApplicantPan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`coApplicantPan`)),
  `coApplicantAadhaar` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`coApplicantAadhaar`)),
  `coApplicantVoterId` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`coApplicantVoterId`)),
  `coApplicantOtherDocuments` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`coApplicantOtherDocuments`)),
  `email` varchar(100) DEFAULT NULL,
  `cibilScore` int(11) DEFAULT NULL,
  `cibilReport` varchar(500) DEFAULT NULL,
  `coApplicantCibil` longtext DEFAULT NULL,
  `bankStatements` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`bankStatements`)),
  `gstCertificate` longtext DEFAULT NULL,
  `labourTradeLicense` longtext DEFAULT NULL,
  `vatTinTot` longtext DEFAULT NULL,
  `msmeUdyamCertificate` longtext DEFAULT NULL,
  `currentAccountStatements` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`currentAccountStatements`)),
  `odAccountStatements` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`odAccountStatements`)),
  `financialReturns` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`financialReturns`)),
  `gstDetails` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gstDetails`)),
  `existingLoans` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`existingLoans`)),
  `residenceProof` longtext DEFAULT NULL,
  `otherDocuments` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`otherDocuments`)),
  `lastUpdatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `lastUpdatedBy` varchar(100) DEFAULT NULL,
  `panCard` longtext DEFAULT NULL,
  `firmPanCard` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `firmRegistrationCertificate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `partnershipDeed` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `firmGstCertificate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `firmmsmeUdyamCertificate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `partner1Name` varchar(100) DEFAULT NULL,
  `partner1Pan` varchar(100) DEFAULT NULL,
  `partner1Aadhar` varchar(100) DEFAULT NULL,
  `partner1Mobile` int(10) DEFAULT NULL,
  `partner1PanCard` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `partner1AadharCard` longtext DEFAULT NULL,
  `partner1Photo` longtext DEFAULT NULL,
  `partner1VoterId` longtext DEFAULT NULL,
  `partner1OtherDocuments` longtext DEFAULT NULL,
  `partner2Name` text DEFAULT NULL,
  `partner2Pan` varchar(100) DEFAULT NULL,
  `partner2Aadhar` varchar(100) DEFAULT NULL,
  `partner2Mobile` int(10) DEFAULT NULL,
  `partner2PanCard` longtext DEFAULT NULL,
  `partner2AadharCard` longtext DEFAULT NULL,
  `partner2Photo` longtext DEFAULT NULL,
  `partner2VoterId` longtext DEFAULT NULL,
  `partner2OtherDocuments` longtext DEFAULT NULL,
  `partner1Cibil` longtext DEFAULT NULL,
  `partner2Cibil` longtext DEFAULT NULL,
  `companyPan` longtext DEFAULT NULL,
  `incorporationCertificate` longtext DEFAULT NULL,
  `moaandaoa` longtext DEFAULT NULL,
  `companyGst` longtext DEFAULT NULL,
  `companyMSMEUdyamCertificate` longtext DEFAULT NULL,
  `shareHoldingPattern` longtext DEFAULT NULL,
  `Director1Name` text DEFAULT NULL,
  `Director1Pan` varchar(100) DEFAULT NULL,
  `director1Aadhar` varchar(100) DEFAULT NULL,
  `director1Mobile` int(10) DEFAULT NULL,
  `director1PanCard` longtext DEFAULT NULL,
  `director1AadharCard` longtext DEFAULT NULL,
  `director1Photo` longtext DEFAULT NULL,
  `director1VoterId` longtext DEFAULT NULL,
  `director1OtherDocuments` longtext DEFAULT NULL,
  `director2Name` text DEFAULT NULL,
  `director2Pan` varchar(100) DEFAULT NULL,
  `director2Aadhar` varchar(100) DEFAULT NULL,
  `director2Mobile` int(10) DEFAULT NULL,
  `director2PanCard` longtext DEFAULT NULL,
  `director2AadharCard` longtext DEFAULT NULL,
  `director2Photo` longtext DEFAULT NULL,
  `director2VoterId` longtext DEFAULT NULL,
  `director2OtherDocuments` longtext DEFAULT NULL,
  `director1Cibil` longtext DEFAULT NULL,
  `director2Cibil` longtext DEFAULT NULL,
  `partnerKycs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `directorsKycs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `partnerCibil` longtext DEFAULT NULL,
  `directorCibil` longtext DEFAULT NULL,
  `createdBy` varchar(500) DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` varchar(20) NOT NULL,
  `accountId` int(11) NOT NULL,
  `leadId` varchar(1000) NOT NULL,
  `businessName` text DEFAULT NULL,
  `businessEmail` varchar(100) DEFAULT NULL,
  `contactPerson` varchar(100) DEFAULT NULL,
  `primaryPhone` varchar(20) DEFAULT NULL,
  `secondaryPhone` varchar(20) DEFAULT NULL,
  `addressLine1` text DEFAULT NULL,
  `addressLine2` text DEFAULT NULL,
  `city` text DEFAULT NULL,
  `state` text DEFAULT NULL,
  `pincode` text DEFAULT NULL,
  `leadSource` varchar(100) DEFAULT NULL,
  `sourcedBy` varchar(100) DEFAULT NULL,
  `businessEntity` varchar(100) DEFAULT NULL,
  `businessTurnover` varchar(100) DEFAULT NULL,
  `natureOfBusiness` varchar(100) DEFAULT NULL,
  `product` varchar(100) DEFAULT NULL,
  `businessOperatingSince` varchar(100) DEFAULT NULL,
  `hadOwnHouse` varchar(100) DEFAULT NULL,
  `loanRequirement` varchar(100) DEFAULT NULL,
  `odRequirement` varchar(100) DEFAULT NULL,
  `existingLoanDetails` varchar(500) DEFAULT NULL,
  `calledFrom` varchar(500) DEFAULT NULL,
  `audioFiles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `leadInternalStatus` varchar(100) DEFAULT NULL,
  `lastLeadInternalStatus` varchar(100) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `sanctionedAmount` int(255) DEFAULT NULL,
  `disbursedAmount` int(255) DEFAULT NULL,
  `approvalDate` varchar(500) DEFAULT NULL,
  `disbursalDate` varchar(500) DEFAULT NULL,
  `loginDate` varchar(500) DEFAULT NULL,
  `referenceNo` varchar(500) DEFAULT NULL,
  `createdBy` varchar(100) DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastUpdatedBy` varchar(200) DEFAULT NULL,
  `lastUpdatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leadsources`
--

CREATE TABLE `leadsources` (
  `id` int(11) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leadsources`
--

INSERT INTO `leadsources` (`id`, `name`, `createdOn`) VALUES
(1, 'Tele Sales', '2024-02-25 12:08:54'),
(2, 'Direct Sales', '2024-02-25 12:08:54'),
(3, 'Operational', '2024-04-27 04:41:46'),
(5, 'Credit Ops', '2024-04-27 04:42:40'),
(6, 'Associate', '2024-04-27 04:43:21');

-- --------------------------------------------------------

--
-- Table structure for table `leadstatus`
--

CREATE TABLE `leadstatus` (
  `id` int(11) NOT NULL,
  `status` varchar(1000) NOT NULL,
  `displayName` varchar(1000) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leadstatus`
--

INSERT INTO `leadstatus` (`id`, `status`, `displayName`, `createdOn`) VALUES
(1, 'new', 'New Leads', '2024-02-13 12:27:36'),
(2, 'archived', 'Archived', '2024-02-13 12:27:36'),
(3, 'files', 'Files', '2024-02-13 12:28:00'),
(4, 'cniFiles', 'CNI Files', '2024-02-13 12:28:00'),
(5, 'creditEvaluation', 'Credit Evaluation', '2024-02-13 12:28:29'),
(16, 'followups', 'Follow Ups', '2024-09-24 07:57:45'),
(11, 'readyForLogin', 'Logins', '2024-07-23 09:58:49'),
(10, 'inHouseRejects', 'In House Rejects', '2024-07-23 10:01:32');

-- --------------------------------------------------------

--
-- Table structure for table `loanleads`
--

CREATE TABLE `loanleads` (
  `id` int(11) NOT NULL,
  `accountId` int(11) NOT NULL,
  `leadId` varchar(100) NOT NULL,
  `loanType` varchar(500) DEFAULT NULL,
  `employmentStatus` varchar(500) DEFAULT NULL,
  `businessName` varchar(500) DEFAULT NULL,
  `businessEntity` varchar(100) DEFAULT NULL,
  `businessVintage` varchar(100) DEFAULT NULL,
  `natureofBusiness` varchar(100) DEFAULT NULL,
  `product` varchar(100) DEFAULT NULL,
  `businessTurnover` varchar(100) DEFAULT NULL,
  `contactPerson` varchar(500) DEFAULT NULL,
  `designation` varchar(500) DEFAULT NULL,
  `salary` varchar(500) DEFAULT NULL,
  `companyName` varchar(500) DEFAULT NULL,
  `jobExperience` varchar(500) DEFAULT NULL,
  `primaryPhone` varchar(100) DEFAULT NULL,
  `secondaryPhone` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `addressLine1` text DEFAULT NULL,
  `addressLine2` text DEFAULT NULL,
  `city` text DEFAULT NULL,
  `state` text DEFAULT NULL,
  `pincode` text DEFAULT NULL,
  `companyAddress` text DEFAULT NULL,
  `loanRequirement` varchar(100) DEFAULT NULL,
  `propertyType` varchar(500) DEFAULT NULL,
  `propertyValue` varchar(500) DEFAULT NULL,
  `propertyLocation` varchar(500) DEFAULT NULL,
  `hadOwnHouse` varchar(100) DEFAULT NULL,
  `existingLoanDetails` varchar(500) DEFAULT NULL,
  `calledFrom` varchar(500) DEFAULT NULL,
  `referenceNo` varchar(255) DEFAULT NULL,
  `aadharNumber` varchar(500) DEFAULT NULL,
  `panNumber` varchar(500) DEFAULT NULL,
  `aadharCard` longtext DEFAULT NULL,
  `panCard` longtext DEFAULT NULL,
  `photo` longtext DEFAULT NULL,
  `voterId` longtext DEFAULT NULL,
  `coApplicantName` varchar(500) DEFAULT NULL,
  `coApplicantRelation` varchar(500) DEFAULT NULL,
  `coApplicantPancard` longtext DEFAULT NULL,
  `coApplicantAadharcard` longtext DEFAULT NULL,
  `coApplicantPhoto` longtext DEFAULT NULL,
  `coApplicantVoterId` longtext DEFAULT NULL,
  `gstCertificate` longtext DEFAULT NULL,
  `companyId` longtext DEFAULT NULL,
  `cibilScore` varchar(500) DEFAULT NULL,
  `cibilReport` longtext DEFAULT NULL,
  `residenceProof` longtext DEFAULT NULL,
  `otherDocuments` longtext DEFAULT NULL,
  `existingLoans` longtext DEFAULT NULL,
  `financialReturns` longtext DEFAULT NULL,
  `paySlips` longtext DEFAULT NULL,
  `bankStatements` longtext DEFAULT NULL,
  `saleAgreement` longtext DEFAULT NULL,
  `saleDeed` longtext DEFAULT NULL,
  `gstDetails` longtext DEFAULT NULL,
  `sourcedBy` varchar(100) DEFAULT NULL,
  `sourcedByName` varchar(500) DEFAULT NULL,
  `leadSource` varchar(100) DEFAULT NULL,
  `leadInternalStatus` varchar(100) DEFAULT NULL,
  `lastLeadInternalStatus` varchar(100) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `createdBy` varchar(100) DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastUpdatedBy` varchar(500) DEFAULT NULL,
  `lastUpdatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `logins`
--

CREATE TABLE `logins` (
  `id` int(11) NOT NULL,
  `accountId` int(11) NOT NULL,
  `leadId` varchar(100) NOT NULL,
  `businessName` text DEFAULT NULL,
  `program` varchar(100) DEFAULT NULL,
  `bankName` varchar(100) DEFAULT NULL,
  `bankId` varchar(100) DEFAULT NULL,
  `fipStatus` varchar(100) DEFAULT NULL,
  `fipRemarks` varchar(500) DEFAULT NULL,
  `lan` varchar(500) DEFAULT NULL,
  `sanctionedAmount` varchar(500) DEFAULT NULL,
  `disbursedAmount` varchar(500) DEFAULT NULL,
  `roi` varchar(100) DEFAULT NULL,
  `tenure` varchar(100) DEFAULT NULL,
  `processCode` varchar(500) DEFAULT NULL,
  `productType` varchar(500) DEFAULT NULL,
  `productTypeName` varchar(500) DEFAULT NULL,
  `approvalDate` varchar(500) DEFAULT NULL,
  `disbursalDate` varchar(500) DEFAULT NULL,
  `loginDate` varchar(500) DEFAULT NULL,
  `approvedStatus` varchar(500) DEFAULT NULL,
  `approvedRemarks` varchar(500) DEFAULT NULL,
  `payoutValue` varchar(500) DEFAULT NULL,
  `revenueValue` varchar(500) DEFAULT NULL,
  `sanctionedLetter` longtext DEFAULT NULL,
  `repaymentSchedule` longtext DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdBy` varchar(100) DEFAULT NULL,
  `lastUpdatedBy` varchar(500) DEFAULT NULL,
  `lastUpdatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(20) NOT NULL,
  `accountId` int(11) NOT NULL,
  `reportId` varchar(1000) NOT NULL,
  `reportType` varchar(100) DEFAULT NULL,
  `reportUrl` longtext DEFAULT NULL,
  `createdBy` varchar(500) DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userrole`
--

CREATE TABLE `userrole` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `userType` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userrole`
--

INSERT INTO `userrole` (`id`, `name`, `designation`, `userType`) VALUES
(1, 'Super Admin', 'Super Admin', '1'),
(2, 'Admin', 'Admin', '2'),
(3, 'Tele Sales', 'Tele Sales', '3'),
(4, 'Operational Team', 'Operational Team', '4'),
(5, 'HR Admin', 'HR Admin', '5');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `accountId` int(11) NOT NULL,
  `userId` varchar(100) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `userType` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `joiningDate` varchar(500) DEFAULT NULL,
  `userInternalStatus` varchar(100) DEFAULT NULL,
  `lastUserInternalStatus` varchar(100) DEFAULT NULL,
  `userImage` longtext DEFAULT NULL,
  `addedOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(100) NOT NULL DEFAULT 'Active',
  `password` varchar(1000) DEFAULT NULL,
  `rbac` varchar(10000) NOT NULL DEFAULT 'leads,callbacks',
  `token` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `accountId`, `userId`, `name`, `userType`, `email`, `phone`, `joiningDate`, `userInternalStatus`, `lastUserInternalStatus`, `userImage`, `addedOn`, `status`, `password`, `rbac`, `token`) VALUES
(1, 8271360, 'U-4970621', 'kalyonnii', '1', 'mudhiiguubbakalyonnii@gmail.com', '7331129435', 'null', '1', '1', '[]', '2025-06-13 07:38:50', 'Active', '$2b$12$y0BSjTj7QOMl6FYsbZ98ae8WycKqSDh74LYxwoGWd6AeyWbX9gd2.', 'leads,callbacks,files,partial,team,credit,bankers,logins,approvals,disbursals,rejects,reports,filesinprocess,followups,ipAddress', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJhY2NvdW50SWQiOjgyNzEzNjAsInVzZXJJZCI6IlUtNDk3MDYyMSIsIm5hbWUiOiJrYWx5b25uaWkiLCJ1c2VyVHlwZSI6IjEiLCJlbWFpbCI6Im11ZGhpaWd1dWJiYWthbHlvbm5paUBnbWFpbC5jb20iLCJwaG9uZSI6IjczMzExMjk0MzUiLCJqb2luaW5nRGF0ZSI6Im51bGwiLCJ1c2VySW50ZXJuYWxTdGF0dXMiOiIxIiwibGFzdFVzZXJJbnRlcm5hbFN0YXR1cyI6IjEiLCJ1c2VySW1hZ2UiOiJbXSIsImFkZGVkT24iOiIyMDI1LTA2LTEzVDA3OjM4OjUwLjAwMFoiLCJzdGF0dXMiOiJBY3RpdmUiLCJwYXNzd29yZCI6IiQyYiQxMiR5MEJTalRqN1FPTWw2RllzYlo5OGFlOFd5Y0txU0RoNzRMWXh3b0dXZDZBZXlXYlg5Z2QyLiIsInJiYWMiOiJsZWFkcyxjYWxsYmFja3MsZmlsZXMscGFydGlhbCx0ZWFtLGNyZWRpdCxiYW5rZXJzLGxvZ2lucyxhcHByb3ZhbHMsZGlzYnVyc2FscyxyZWplY3RzLHJlcG9ydHMsZmlsZXNpbnByb2Nlc3MsZm9sbG93dXBzLGlwQWRkcmVzcyJ9LCJpYXQiOjE3NDk4MDExODQsImV4cCI6MTc0OTgzNzE4NH0.jfw5SdEcbe-5ysNNuJGc4acWGbSACu_EfNlf4qKqrEE');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bankers`
--
ALTER TABLE `bankers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `callbacks`
--
ALTER TABLE `callbacks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dscr_values`
--
ALTER TABLE `dscr_values`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ipaddresses`
--
ALTER TABLE `ipaddresses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leaddocuments`
--
ALTER TABLE `leaddocuments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leadsources`
--
ALTER TABLE `leadsources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leadstatus`
--
ALTER TABLE `leadstatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loanleads`
--
ALTER TABLE `loanleads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userrole`
--
ALTER TABLE `userrole`
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
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bankers`
--
ALTER TABLE `bankers`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `callbacks`
--
ALTER TABLE `callbacks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dscr_values`
--
ALTER TABLE `dscr_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ipaddresses`
--
ALTER TABLE `ipaddresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leaddocuments`
--
ALTER TABLE `leaddocuments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leadsources`
--
ALTER TABLE `leadsources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `leadstatus`
--
ALTER TABLE `leadstatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `loanleads`
--
ALTER TABLE `loanleads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `logins`
--
ALTER TABLE `logins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userrole`
--
ALTER TABLE `userrole`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
