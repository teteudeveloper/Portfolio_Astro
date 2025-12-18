import { useState, useEffect } from 'react';

interface Technology {
  name: string;
  icon: string;
  url: string;
}

const technologies: Technology[] = [
  {
    name: 'HTML',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
  },
  {
    name: 'CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
  },
  {
    name: 'Tailwind CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    url: 'https://tailwindcss.com'
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    url: 'https://www.typescriptlang.org'
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
  },
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    url: 'https://react.dev'
  },
  {
    name: 'Next.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    url: 'https://nextjs.org'
  },
  {
    name: 'Node.js',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png',
    url: 'https://nodejs.org'
  },
  {
    name: 'Astro',
    icon: 'https://images.seeklogo.com/logo-png/47/2/astro-icon-logo-png_seeklogo-477952.png',
    url: 'https://docs.astro.build'
  },
  {
    name: 'Java',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    url: 'https://www.oracle.com/java/'   
  },
  {
    name: 'Spring Boot',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
    url: 'https://spring.io/projects/spring-boot'
  },
  {
    name: 'PostgreSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    url: 'https://www.postgresql.org'
  },
  {
    name: 'MySQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    url: 'https://www.mysql.com'
  },
  {
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    url: 'https://git-scm.com'
  },
  {
    name: 'AWS',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1280px-Amazon_Web_Services_Logo.svg.png',
    url: 'https://aws.amazon.com'
  },
  {
    name: 'Docker',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    url: 'https://www.docker.com'
  }
];

export default function TechStack() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {technologies.map((tech, index) => (
        <a
          key={tech.name}
          href={tech.url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="group"
        >
          <div
            className="relative overflow-hidden rounded-xl p-6 h-full flex flex-col items-center justify-center transition-all duration-300 ease-out hover:scale-105"
            style={{
              backgroundColor: isDark ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 1)',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: isDark ? 'rgba(75, 85, 99, 1)' : 'rgba(229, 231, 235, 1)',
              boxShadow: hoveredIndex === index 
                ? isDark 
                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="relative flex flex-col items-center justify-center space-y-3">
              <div className="w-16 h-16 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={tech.icon} 
                  alt={tech.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 
                className="text-sm font-semibold text-center whitespace-nowrap"
                style={{ color: isDark ? '#ffffff' : '#111827' }}
              >
                {tech.name}
              </h3>
            </div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div 
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                style={{
                  background: isDark 
                    ? 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent)'
                    : 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent)'
                }}
              />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}