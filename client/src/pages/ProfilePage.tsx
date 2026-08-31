import { useEffect, useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
  role?: string;
  bio?: string;
  joinedDate?: string;
}

function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/users/profile/sampleUserId')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }
        return res.json();
      })
      .then((data: UserProfile) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.error('Profile fetch error:', err);
        setError('Failed to load profile data.');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '30px', borderBottom: '2px solid #eaeaea', paddingBottom: '15px' }}>
        <h1 style={{ margin: 0, color: '#1a202c', fontSize: '28px' }}>User Profile</h1>
        <p style={{ margin: '5px 0 0 0', color: '#718096' }}>View and manage your account details</p>
      </header>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#4a5568', fontSize: '18px' }}>
          Loading profile...
        </div>
      )}

      {error && (
        <div style={{ padding: '15px', backgroundColor: '#fed7d7', color: '#c53030', borderRadius: '8px', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {!loading && !error && profile && (
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px', backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#3182ce', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>
              {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '22px', color: '#2d3748' }}>{profile.name}</h2>
              <p style={{ margin: '4px 0 0 0', color: '#718096', fontSize: '14px' }}>{profile.email}</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #edf2f7', paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {profile.role && (
              <div>
                <strong style={{ color: '#4a5568' }}>Role: </strong>
                <span style={{ color: '#718096' }}>{profile.role}</span>
              </div>
            )}
            {profile.bio && (
              <div>
                <strong style={{ color: '#4a5568' }}>Bio: </strong>
                <span style={{ color: '#718096' }}>{profile.bio}</span>
              </div>
            )}
            {profile.joinedDate && (
              <div>
                <strong style={{ color: '#4a5568' }}>Joined: </strong>
                <span style={{ color: '#718096' }}>{profile.joinedDate}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;