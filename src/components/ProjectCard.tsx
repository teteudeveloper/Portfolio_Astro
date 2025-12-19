import { useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

interface Technology {
  name: string;
  icon: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  github: string;
  technologies: Technology[];
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const { isDark } = useDarkMode();

  return (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full relative"
      aria-label={`Open ${project.title} repository`}
    >
      <div
        className="
          h-full rounded-lg overflow-hidden
          transition-all duration-300 ease-out
          group-hover:scale-[1.02]
          group-hover:shadow-2xl
          relative
        "
        style={{
          backgroundColor: isDark
            ? 'rgba(31, 41, 55, 0.5)'
            : 'rgba(255, 255, 255, 1)',
          border: `1px solid ${
            isDark ? 'rgba(55, 65, 81, 1)' : 'rgba(229, 231, 235, 1)'
          }`
        }}
      >
        <div className="relative w-full h-56 overflow-hidden">
          {!imageError ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col h-full">
          <h3 className="text-2xl font-bold mb-3">
            {project.title}
          </h3>

          <p className="text-sm opacity-75 mb-4 leading-relaxed">
            {project.description}
          </p>

          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-wide opacity-60 mb-2">
              Technologies Used
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium"
                  style={{
                    backgroundColor: isDark
                      ? 'rgba(55, 65, 81, 0.6)'
                      : 'rgba(243, 244, 246, 1)'
                  }}
                >
                  <img
                    src={tech.icon}
                    alt=""
                    className="w-4 h-4"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="
            absolute bottom-4 right-4
            opacity-70 group-hover:opacity-100
            transition-opacity
          "
        >
          <svg
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.376.202 2.393.1 2.646.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.921.678 1.856 0 1.339-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}
