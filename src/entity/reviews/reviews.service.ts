import { baseApi } from '@shared/api/base.api';
import { CreateReviewDto } from './model/create-review.dto';
import { Review } from '@entity/users/model/user.interface';

class ReviewService {
  // Метод для создания отзыва
  static async createReview(dto: CreateReviewDto): Promise<Review> {
    const response = await baseApi.post(`reviews`, dto, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }

  // Метод для получения отзывов работника по его ID
  static async getWorkerReviews(workerId: string): Promise<Review[]> {
    const response = await baseApi.get(`reviews/worker/${workerId}`);
    return response.data;
  }
}

export default ReviewService;
