package com.msppyropark.repository;

import com.msppyropark.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    Optional<OrderEntity> findByOrderReference(String orderReference);
    List<OrderEntity> findByCustomerPhone(String phone);
    List<OrderEntity> findAllByOrderByCreatedAtDesc();
}
