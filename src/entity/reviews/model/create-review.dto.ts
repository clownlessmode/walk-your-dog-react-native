export interface CreateReviewDto {
  content: string;
  workerId: string;
  author: string;
  parentId?: string;
}
