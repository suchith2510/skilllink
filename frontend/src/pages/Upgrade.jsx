import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Upgrade() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const plans = {
    monthly: {
      name: 'Monthly Premium',
      price: 9.99,
      features: [
        'Unlimited skill listings',
        'Direct connections with users',
        'Priority support',
        'Advanced search filters',
        'Skill verification badge'
      ]
    },
    yearly: {
      name: 'Yearly Premium',
      price: 99.99,
      features: [
        'All Monthly Premium features',
        'Save 17% compared to monthly',
        'Exclusive premium community access',
        'Early access to new features',
        'Priority skill matching'
      ]
    }
  };

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/subscription/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: selectedPlan }),
      });

      const data = await response.json();
      if (response.ok) {
        // In a real application, you would handle payment processing here
        // For now, we'll just simulate a successful subscription
        alert('Subscription successful! Welcome to Premium!');
        navigate('/skill-swap');
      } else {
        setError(data.error || 'Failed to process subscription');
      }
    } catch (err) {
      setError('Error connecting to the server: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: '3rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
      minHeight: '100vh',
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        color: '#A855F7',
        textAlign: 'center',
        marginBottom: '2rem',
        fontWeight: 'bold',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
      }}>
        Upgrade to Premium
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem',
      }}>
        {Object.entries(plans).map(([key, plan]) => (
          <div
            key={key}
            style={{
              padding: '2rem',
              background: selectedPlan === key ? 'rgba(168, 85, 247, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              border: `2px solid ${selectedPlan === key ? '#A855F7' : 'rgba(255, 255, 255, 0.1)'}`,
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onClick={() => setSelectedPlan(key)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h2 style={{
              fontSize: '1.8rem',
              color: '#E2E8F0',
              marginBottom: '1rem',
              textAlign: 'center',
            }}>
              {plan.name}
            </h2>
            <div style={{
              fontSize: '2.5rem',
              color: '#A855F7',
              textAlign: 'center',
              marginBottom: '1.5rem',
              fontWeight: 'bold',
            }}>
              ${plan.price}
              <span style={{
                fontSize: '1rem',
                color: '#A0AEC0',
                marginLeft: '0.5rem',
              }}>
                /{key === 'monthly' ? 'month' : 'year'}
              </span>
            </div>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              marginBottom: '2rem',
            }}>
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  style={{
                    color: '#E2E8F0',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ color: '#A855F7' }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSubscribe();
              }}
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem',
                background: selectedPlan === key
                  ? 'linear-gradient(90deg, #A855F7 0%, #7C3AED 100%)'
                  : 'rgba(168, 85, 247, 0.2)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'transform 0.3s ease',
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {loading ? 'Processing...' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>

      {error && (
        <div style={{
          padding: '1rem',
          background: 'rgba(248, 113, 113, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(248, 113, 113, 0.2)',
          color: '#F87171',
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          {error}
        </div>
      )}

      <div style={{
        textAlign: 'center',
        color: '#A0AEC0',
        fontSize: '0.9rem',
        lineHeight: '1.6',
      }}>
        <p>All plans include a 7-day free trial. Cancel anytime.</p>
        <p>Need help? Contact our support team at support@skilllink.com</p>
      </div>
    </div>
  );
}

export default Upgrade; 