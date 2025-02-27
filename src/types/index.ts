export interface HotItem {
  title: string;
  url: string;
  hot?: string | number;
  index?: number;
}

export interface HotList {
  platform: string;
  title: string;
  name: string;
  icon: string;
  items: HotItem[];
  updateTime: string;
}

export interface Platform {
  id: string;
  name: string;
  title: string;
  icon: string;
  api: string;
}