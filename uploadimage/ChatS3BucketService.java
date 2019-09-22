/*
 * Copyright (c) 2018.
 * CASHAA HOLDING OU
 * [2018] CASHAA HOLDING OU
 * All Rights Reserved.
 * NOTICE: All information contained herein is, and remains the property of CASHAA HOLDING OU and its suppliers, if any.
 * The intellectual and technical concepts contained herein are proprietary to CASHAA HOLDING OU and its suppliers
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless
 * prior written permission is obtained from CASHAA HOLDING OU.
 */

package com.cashaa.bank.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;

/**
 * S3 has a very simple structure – each bucket can store any number of objects
 * which can be accessed using either a SOAP interface or an REST-style API.
 *
 * To use AWS SDK, we’ll need a few things:
 *
 * 1 AWS Account: we need an Amazon Web Services account. If you still don’t
 * have any, go ahead and create an account 2 AWS Security Credentials: These
 * are our access keys that allow us to make programmatic calls to AWS API
 * actions. We can get these credentials in two ways, either by using AWS root
 * account credentials from access keys section of Security Credentials page or
 * by using IAM user credentials from IAM console Choosing AWS Region: We have
 * to select an AWS region(s) where we want to store our Amazon S3 data. Keep in
 * mind that S3 storage prices vary by region.
 */

@Service
public class ChatS3BucketService {
	private final Logger log = LoggerFactory.getLogger(ChatS3BucketService.class);

	private AmazonS3 s3client;

	@Value("${amazonProperties.endpointUrl}")
	private String endpointUrl;
	@Value("${amazonProperties.chatBucketName}")
	private String bucketName;
	@Value("${amazonProperties.accessKey}")
	private String accessKey;
	@Value("${amazonProperties.secretKey}")
	private String secretKey;

	@Value("${onfido.fileUploadPath}")
	private String fileUploadPath;

	@SuppressWarnings("deprecation")
	@PostConstruct
	private void initializeAmazon() {
		final AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
		s3client = new AmazonS3Client(credentials);
	}

	public String uploadTicketFile(final MultipartFile multipartFile, final String emailId, final String ticketNumber) {
		String fileUrl = "";

		try {
			final File file = this.convertMultiPartToFile(multipartFile);
			final String fileName = this.generateFileName(multipartFile);
			final String path = this.getMD5(emailId) + "/" + ticketNumber + "/" + fileName;
			fileUrl = bucketName + "/" + path;

			this.uploadFileTos3bucket(path, file);
			if (!file.delete()) {
				throw new Exception("Unable to delete file");
			}
		} catch (final Exception e) {
			log.error("Exception in uploadFile" + e);
		}
		return fileUrl;
	}

	private File convertMultiPartToFile(final MultipartFile file) throws IOException {
		final Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		final String filePath = fileUploadPath + timestamp.getTime() + "_CHAT_" + file.getOriginalFilename();
		final File convFile = new File(filePath);
		final FileOutputStream fos = new FileOutputStream(convFile);
		fos.write(file.getBytes());
		fos.close();
		return convFile;
	}

	private String generateFileName(final MultipartFile multiPart) {
		return UUID.randomUUID().toString() + "-" + multiPart.getOriginalFilename().replace(" ", "_");
	}

	private void uploadFileTos3bucket(final String fileName, final File file) {
		s3client.putObject(
				new PutObjectRequest(bucketName, fileName, file).withCannedAcl(CannedAccessControlList.PublicRead));
	}

	public String getMD5(final String input) {
		try {
			final MessageDigest md = MessageDigest.getInstance("MD5");
			final byte[] messageDigest = md.digest(input.getBytes());
			final BigInteger number = new BigInteger(1, messageDigest);
			String hashtext = number.toString(16);
			// Now we need to zero pad it if you actually want the full 32 chars.
			while (hashtext.length() < 32) {
				hashtext = "0" + hashtext;
			}
			return hashtext;
		} catch (final NoSuchAlgorithmException e) {
			log.error("Exception in MD5" + e);
			throw new RuntimeException(e);
		}
	}
}
