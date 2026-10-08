import React from 'react';
import { getStatusConfig } from '../utils/statusConfig';

export const StatusBadge = ({ status, size = 'md', showIcon = true, pulse = false }) => {
  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'status-badge-sm',
    md: 'status-badge-md',
    lg: 'status-badge-lg'
  };

  const isCritical = ['MISSING', 'LOCATED'].includes(config.key);
  const shouldPulse = pulse || isCritical;

  return (
    <span
      className={`status-badge ${config.badgeClass} ${sizeClasses[size] || sizeClasses.md}`}
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
        borderColor: config.borderColor
      }}
      title={config.description}
    >
      {shouldPulse && <span className="status-pulse-dot" style={{ backgroundColor: config.color }} />}
      {showIcon && IconComponent && (
        <IconComponent className="status-badge-icon" size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} />
      )}
      <span className="status-badge-text">{config.label}</span>
    </span>
  );
};

