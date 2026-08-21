import RevealFade from './RevealFade';
import CountUp from './CountUp';

const STATS = [
  { prefix: null, to: 7.1, decimals: 1, unit: 'GW', label: 'de capacidade total' },
  { prefix: '+', to: 160, decimals: 0, unit: 'MW', label: 'operacionais ou vendidos' },
  { prefix: null, to: 100, decimals: 0, unit: '%', label: 'de energia renovável' },
  { prefix: '+', to: 12, decimals: 0, unit: 'BI', label: 'já investidos', currency: 'R$' },
  { prefix: '+', to: 12, decimals: 0, unit: 'M', label: 'de m² de propriedades\nna América Latina' },
];

export default function StatsBar() {
  return (
    <section className="stats-bar-section">
      <div className="container">
        <div className="stats-card">
          {STATS.map((stat, i) => (
            <RevealFade as="div" className="stat-item" key={i}>
              <p className="big-number">
                {stat.prefix}
                {stat.currency && <span className="unit">{stat.currency}</span>}
                <CountUp to={stat.to} decimals={stat.decimals} />
                <span className="unit">{stat.unit}</span>
              </p>
              <p className="stat-label">
                {stat.label.split('\n').map((line, i) => (
                  <span key={i}>{i > 0 && <br />}{line}</span>
                ))}
              </p>
            </RevealFade>
          ))}
        </div>
      </div>
    </section>
  );
}
