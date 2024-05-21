export enum TOKEN_TYPE {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  EMAIL_VERIFY_TOKEN = 'email_verify_token',
  FORGOT_PASSWORD_TOKEN = 'forgot_password_token'
}
export enum POST_TYPE {
  // Cần bán
  SELL = 'sell',
  // Cần cho thuê
  RENT = 'rent'
}
export enum BUYING_STATUS {
  //Đang mở bán
  OPEN = 'open',
  // Sắp mở bán
  UPCOMING = 'upcoming',
  // Đã bán
  SOLD = 'sold',
  // Đang cập nhật
  UPDATING = 'updating'
}
export enum POST_STATUS {
  // Đang chờ xác nhận
  PENDING = 'pending',
  // Đã xác nhận
  CONFIRMED = 'confirmed',
  // Đã từ chối
  REJECTED = 'rejected',
  // Đã ẩn
  HIDDEN = 'hidden',
  // Đã bị gỡ
  REMOVED = 'removed',
  // Đã hết hạn
  EXPIRED = 'expired'
}
export enum FURNITURE_STATUS {
  // Mới
  NEW = 'new',
  // Cũ
  OLD = 'old',
  // Đã qua sử dụng
  USED = 'used'
}
