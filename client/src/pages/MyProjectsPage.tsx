import { useEffect, useState } from 'react';
import { getProjects, type Project } from '../services/projectService';

function MyProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProjects()
      .then((data: Project[]) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.error('Failed to load projects:', err);
        setError('Failed to fetch projects from server.');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '30px', borderBottom: '2px solid #eaeaea', paddingBottom: '15px' }}>
        <h1 style={{ margin: 0, color: '#1a202c', fontSize: '28px' }}>My Projects</h1>
        <p style={{ margin: '5px 0 0 0', color: '#718096' }}>Manage and view your ongoing projects</p>
      </header>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#4a5568', fontSize: '18px' }}>
          Loading projects...
        </div>
      )}

      {error && (
        <div style={{ padding: '15px', backgroundColor: '#fed7d7', color: '#c53030', borderRadius: '8px', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#718096', fontSize: '16px' }}>
          No projects found in your database.
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {projects.map((project: Project) => (
            <div 
              key={project.id} 
              style={{ 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px', 
                padding: '20px', 
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <h2 style={{ margin: '0 0 10px 0', fontSize: '20px', color: '#2d3748' }}>{project.name}</h2>
              <p style={{ margin: '0 0 15px 0', color: '#718096', fontSize: '14px', lineHeight: '1.5' }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #edf2f7', paddingTop: '10px' }}>
                <span style={{ 
                  backgroundColor: project.status === 'Completed' ? '#c6f6d5' : '#feebc8', 
                  color: project.status === 'Completed' ? '#22543d' : '#744210', 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  fontSize: '12px', 
                  fontWeight: 'bold' 
                }}>
                  {project.status}
                </span>
                <span style={{ fontSize: '12px', color: '#a0aec0' }}>
                  Members: {project.members ? project.members.length : 0}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProjectsPage;