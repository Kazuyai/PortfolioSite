import { GetStaticProps } from "next";
import React, { useState } from "react";
import styles from "@/styles/pages/projects.module.scss";
import Link from "next/link";
import { getProjects, Project } from "@/lib/api/getProjects";
import AutoSizeImage from "@/components/common/AutoSizeImage";

type Props = {
  projects: Project[];
};

const Index = ({ projects }: Props) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.mainVisual}>
        <AutoSizeImage src="/images/PC.png" alt="" />
        <h2>Projects</h2>
      </div>

      <div className={styles.cards}>
        {projects.map((project) => (
          <div
            key={project.id}
            className={styles.card}
            onClick={() => setSelectedProject(project)}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderImg}>
                <img src={project.thumbnail.url} alt={project.title} />
              </div>
              <div className={styles.cardHeaderContent}>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className={styles.tech}>
                  {project.tech?.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.category}>{project.category}</div>
              <div className={styles.date}>
                {new Date(project.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className={styles.popup} onClick={() => setSelectedProject(null)}>
          <div
            className={styles.popupExplain}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.popupExplainInner}>
              <div className={styles.popupExplainHeader}>
                <h3 className={styles.title}>{selectedProject.title}</h3>
                <div className={styles.category}>
                  <span>{selectedProject.category}</span>
                </div>
                <div className={styles.tech}>
                  {selectedProject.tech?.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                {selectedProject.url && (
                  <div className={styles.link}>
                    <Link
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      公開ページへ
                    </Link>
                  </div>
                )}
                <div className={styles.date}>
                  {new Date(selectedProject.date).toLocaleDateString()}
                </div>
                <div className={styles.imgContainer}>
                  <img
                    src={selectedProject.thumbnail.url}
                    alt={selectedProject.title}
                  />
                </div>
              </div>
              <div
                className={styles.popupExplainBody}
                dangerouslySetInnerHTML={{
                  __html: selectedProject.content || "No description available",
                }}
              />
            </div>
          </div>
          <div
            className={styles.popupClose}
            onClick={() => setSelectedProject(null)}
          >
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projects = await getProjects();
  return {
    props: { projects },
  };
};

export default Index;
