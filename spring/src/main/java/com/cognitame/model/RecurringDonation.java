package com.cognitame.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table
@Entity
public class RecurringDonation {
	@Id
	private String id;
	private String userId;
	private String favoriteId;
	private float donationAmount;
	
	public RecurringDonation() {
	}
	
	public RecurringDonation(String id, String userId, String favoriteId, float donationAmount) {
		this.id = id;
		this.userId = userId;
		this.favoriteId = favoriteId;
		this.donationAmount = donationAmount;
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getUserId() {
		return userId;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getFavoriteId() {
		return favoriteId;
	}
	
	public void setFavoriteId(String favoriteId) {
		this.favoriteId = favoriteId;
	}
	
	public float getDonationAmount() {
		return donationAmount;
	}
	
	public void setDonationAmount(float donationAmount) {
		this.donationAmount = donationAmount;
	}
}
