import './SummaryCard.css';

const SummaryCard = ({ title, value, icon: Icon, color = 'accent', trend }) => {
  const colorClass = `card-${color}`;

  return (
    <div className={`summary-card ${colorClass}`}>
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          {Icon && (
            <div className="card-icon">
              <Icon size={24} />
            </div>
          )}
        </div>
        <div className="card-value">{value}</div>
        {trend && (
          <div className={`card-trend ${trend.type}`}>
            {trend.value}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
