import { client } from "@/lib/microcmsClient";

// microCMSのImage型定義
export type Image = {
  id: string;
  image: { url: string; height?: number; width?: number };
  summary?: string;
  priority?: number;
};

/**
 * 優先度が高い順にすべての画像を取得する関数
 */
export const getImages = async (): Promise<Image[]> => {
  const allImages: Image[] = [];
  let offset = 0;
  let hasNext = true;

  while (hasNext) {
    const { contents, totalCount } = await client.getList<Image>({
      endpoint: "portfolio_images",
      queries: {
        limit: 100,
        offset,
        orders: "-priority",
      },
    });

    allImages.push(...contents);
    offset += 100;
    hasNext = offset < totalCount;
  }

  return allImages;
};
