package com.cognitame.controller;

import com.cognitame.service.GraphQLService;
import graphql.ExecutionResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/rest/recurringdonations")
@RestController
public class RecurringDonationController {
	private static Logger logger = LoggerFactory.getLogger(RecurringDonationController.class);
	private GraphQLService graphQLService;
	
	@Autowired
	public RecurringDonationController(GraphQLService graphQLService) {
		this.graphQLService = graphQLService;
	}
	
	@PostMapping
	public ResponseEntity<Object> getAllRecurringDonations(@RequestBody String query) {
		logger.info("Entering getAllRecurringDonations@RecurringDonationController");
		ExecutionResult execute = graphQLService.getGraphQL().execute(query);
		return new ResponseEntity<>(execute, HttpStatus.OK);
	}
}
