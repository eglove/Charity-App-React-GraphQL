package com.cognitame.service;

import com.cognitame.model.RecurringDonation;
import com.cognitame.repository.RecurringDonationRepository;
import com.cognitame.service.datafetcher.AllRecurringDonationsDataFetcher;
import com.cognitame.service.datafetcher.RecurringDonationDataFetcher;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.stream.Stream;

@Service
public class GraphQLService {
	private static Logger logger = LoggerFactory.getLogger(GraphQLService.class);
	private RecurringDonationRepository RecurringDonationRepository;
	private AllRecurringDonationsDataFetcher allRecurringDonationsDataFetcher;
	private RecurringDonationDataFetcher RecurringDonationDataFetcher;
	@Value("classpath:RecurringDonations.graphql")
	Resource resource;
	private GraphQL graphQL;
	
	@Autowired
	public GraphQLService(RecurringDonationRepository RecurringDonationRepository, AllRecurringDonationsDataFetcher allRecurringDonationsDataFetcher,
	                      RecurringDonationDataFetcher RecurringDonationDataFetcher) {
		this.RecurringDonationRepository = RecurringDonationRepository;
		this.allRecurringDonationsDataFetcher = allRecurringDonationsDataFetcher;
		this.RecurringDonationDataFetcher = RecurringDonationDataFetcher;
	}
	
	@PostConstruct
	private void loadSchema() throws IOException {
		logger.info("Entering loadSchema@GraphQLService");
		loadDataIntoHSQL();
		//Get the graphql file
		File file = resource.getFile();
		//Parse SchemaF
		TypeDefinitionRegistry typeDefinitionRegistry = new SchemaParser().parse(file);
		RuntimeWiring runtimeWiring = buildRuntimeWiring();
		GraphQLSchema graphQLSchema = new SchemaGenerator().makeExecutableSchema(typeDefinitionRegistry, runtimeWiring);
		graphQL = GraphQL.newGraphQL(graphQLSchema).build();
	}
	
	private void loadDataIntoHSQL() {
		Stream.of(
				new RecurringDonation("1", "123", "123", 40),
				new RecurringDonation("2", "124", "124", 30)
		).forEach(RecurringDonation -> {
			RecurringDonationRepository.save(RecurringDonation);
		});
	}
	
	private RuntimeWiring buildRuntimeWiring() {
		return RuntimeWiring.newRuntimeWiring()
				.type("Query", typeWiring -> typeWiring
						.dataFetcher("allRecurringDonations", allRecurringDonationsDataFetcher)
						.dataFetcher("RecurringDonation", RecurringDonationDataFetcher))
				.build();
	}
	
	public GraphQL getGraphQL() {
		return graphQL;
	}
}
