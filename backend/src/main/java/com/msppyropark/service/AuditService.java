package com.msppyropark.service;

import com.msppyropark.entity.AuditLogEntity;
import com.msppyropark.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    @Transactional
    public void logAction(String action, String entityName, Long entityId, String details) {
        AuditLogEntity log = AuditLogEntity.builder()
                .action(action)
                .entityName(entityName)
                .entityId(entityId)
                .actor("SHOWROOM_ADMIN")
                .details(details)
                .build();
        auditLogRepository.save(log);
    }

    @Transactional(readOnly = true)
    public List<AuditLogEntity> getRecentLogs() {
        return auditLogRepository.findAllByOrderByCreatedAtDesc();
    }
}
