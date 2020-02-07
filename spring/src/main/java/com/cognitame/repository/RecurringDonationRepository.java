package com.cognitame.repository;

import com.cognitame.model.RecurringDonation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecurringDonationRepository extends JpaRepository<RecurringDonation, String> {
}
