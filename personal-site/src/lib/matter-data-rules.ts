import matter from 'gray-matter';

export interface MatterData {
  [key: string]: any;
}

export type MatterDataRule = (matterData: MatterData) => void;

export const apply = (matterData: MatterData, ...rules: MatterDataRule[]) => rules.forEach(rule => rule(matterData));

export const defaultProperty = <T>(property: string, defaultValue: T) => (matterData: MatterData) => {
  if (!matterData.hasOwnProperty(property) || !matterData[property]) {
    matterData[property] = defaultValue
  }
}

export const defaultTitle = (defaultTitle: string | null) => defaultProperty("title", defaultTitle);
export const defaultTags = (defaultTags: string[]) => defaultProperty("tags", defaultTags);
export const defaultCategories = (defaultCategories: string[]) => defaultProperty("categories", defaultCategories);