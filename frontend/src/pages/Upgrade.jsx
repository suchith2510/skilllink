import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import API_ENDPOINTS from '../config.js';

function Upgrade() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Premium',
      price: '$9.99',
      period: 'month',
      features: [
        'Access to all tutorials',
        'SkillSwap marketplace',
        'Interview preparation tools',
        'Resume analyzer',
        'Priority support'
      ],
      popular: false
    },
    {
      id: 'yearly',
      name: 'Yearly Premium',
      price: '$99.99',
      period: 'year',
      features: [
        'Everything in Monthly',
        '2 months free',
        'Exclusive content',
        'Advanced analytics',
        'Early access to new features'
      ],
      popular: true
    }
  ];

  const handleUpgrade = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/upgrade' } });
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.SUBSCRIPTION.UPGRADE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          plan: selectedPlan
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Upgrade successful! Welcome to Premium!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError(data.error || 'Upgrade failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
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
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              padding: '2rem',
              background: selectedPlan === plan.id ? 'rgba(168, 85, 247, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              border: `2px solid ${selectedPlan === plan.id ? '#A855F7' : 'rgba(255, 255, 255, 0.1)'}`,
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onClick={() => setSelectedPlan(plan.id)}
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
              {plan.price}
              <span style={{
                fontSize: '1rem',
                color: '#A0AEC0',
                marginLeft: '0.5rem',
              }}>
                /{plan.period}
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
                handleUpgrade();
              }}
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem',
                background: selectedPlan === plan.id
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

      {success && (
        <div style={{
          padding: '1rem',
          background: 'rgba(107, 114, 128, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(107, 114, 128, 0.2)',
          color: '#6B7280',
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          {success}
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