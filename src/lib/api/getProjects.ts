import { client } from "@/lib/microcmsClient";

// microCMSのProject型定義
export type Project = {
  id: string;
  title: string;
  thumbnail: { url: string; height?: number; width?: number };
  summary: string;
  category: string;
  date: string;
  tech?: string[];
  content?: string;
  isPublished: boolean;
  github?: string;
  url?: string;
  priority?: number;
};

/**
 * 優先度が高い順にすべてのプロジェクトを取得する関数
 */
export const getProjects = async (): Promise<Project[]> => {
  const allProjects: Project[] = [];
  let offset = 0;
  let hasNext = true;

  while (hasNext) {
    const { contents, totalCount } = await client.getList<Project>({
      endpoint: "portfolio_projects",
      queries: {
        limit: 100,
        offset,
        orders: "-priority",
      },
    });

    allProjects.push(...contents);
    offset += 500;
    hasNext = offset < totalCount;
  }

  // priorityが設定されていないプロジェクトを優先度0として扱う
  allProjects.forEach((project) => {
    if (project.priority === undefined) {
      project.priority = 0; // デフォルトの優先度を0に設定
    }
  });
  // 優先度でソート
  allProjects.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  
  return allProjects;
};
