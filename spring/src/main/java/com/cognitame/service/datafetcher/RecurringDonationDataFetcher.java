package com.cognitame.service.datafetcher;

import com.cognitame.model.RecurringDonation;
import com.cognitame.repository.RecurringDonationRepository;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RecurringDonationDataFetcher implements DataFetcher<RecurringDonation> {
	private RecurringDonationRepository recurringDonationRepository;
	
	@Autowired
	public RecurringDonationDataFetcher(RecurringDonationRepository recurringDonationRepository) {
		this.recurringDonationRepository = recurringDonationRepository;
	}
	
	@Override
	public RecurringDonation get(DataFetchingEnvironment dataFetchingEnvironment) {
		String isn = dataFetchingEnvironment.getArgument("id");
		return recurringDonationRepository.findById(isn).orElse(null);
	}
}
