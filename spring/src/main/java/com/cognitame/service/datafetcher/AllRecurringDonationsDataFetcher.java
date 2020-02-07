package com.cognitame.service.datafetcher;

import com.cognitame.model.RecurringDonation;
import com.cognitame.repository.RecurringDonationRepository;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AllRecurringDonationsDataFetcher implements DataFetcher<List<RecurringDonation>> {
	private RecurringDonationRepository recurringDonationRepository;
	
	@Autowired
	public AllRecurringDonationsDataFetcher(RecurringDonationRepository recurringDonationRepository) {
		this.recurringDonationRepository = recurringDonationRepository;
	}
	
	@Override
	public List<RecurringDonation> get(DataFetchingEnvironment dataFetchingEnvironment) {
		return recurringDonationRepository.findAll();
	}
}
