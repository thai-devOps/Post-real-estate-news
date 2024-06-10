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
  UPDATING = 'updating',
  // Đang nhận đặt chỗ
  BOOKING = 'booking'
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
export enum DIRECTION {
  // Đông
  EAST = 'east',
  // Tây
  WEST = 'west',
  // Nam
  SOUTH = 'south',
  // Bắc
  NORTH = 'north',
  // Đông Bắc
  EAST_NORTH = 'east_north',
  // Tây Bắc
  WEST_NORTH = 'west_north',
  // Đông Nam
  EAST_SOUTH = 'east_south',
  // Tây Nam
  WEST_SOUTH = 'west_south'
}
export enum INTERACTION_TYPE {
  REPORT = 'REPORT',
  REPLY = 'REPLY'
}
export enum REPORT_TYPE {
  POST = 'POST',
  COMMENT = 'COMMENT',
  NEWS = 'NEWS',
  USER = 'USER',
  PROJECT = 'PROJECT'
}
export enum REPORT_STATUS {
  RESOLVED = 'RESOLVED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED'
}
export enum UNIT {
  // m2
  SQUARE_METER = 'm2',
  // m
  METER = 'm',
  // km
  KILOMETER = 'km',
  // ha
  HECTARE = 'ha'
}
export enum UNIT_TRADING_PRICE {
  // tỷ / căn
  BILLION_PER_UNIT = 'tỷ/căn',
  // triệu / m2
  MILLION_PER_SQUARE_METER = 'triệu/m2',
  // triệu/tháng
  MILLION_PER_MONTH = 'triệu/tháng',
  // triệu/m2/tháng
  MILLION_PER_SQUARE_METER_PER_MONTH = 'triệu/m2/tháng'
}
export enum DISCOUNT_TYPE {
  // %
  PERCENT = '%',
  // đ
  MONEY = 'đ'
  //
}
export enum UNIT_PRICE {
  // VND
  VND = 'VND',
  // USD
  USD = 'USD'
}
export enum VIP_PACKAGE_STATUS {
  // Đang hoạt động
  ACTIVE = 'active',
  // Không hoạt động
  INACTIVE = 'inactive',
  // Đang cập nhật
  UPDATING = 'updating'
  // Đã hết hạn
}
export enum PAYMENT_METHOD {
  PAYPAL = 'paypal',
  VNPAY = 'vnpay',
  MOMO = 'momo'
}
export enum PAYMENT_STATUS {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed'
}
export enum VIP_STATUS {
  //Còn hiệu lực
  ACTIVE = 'active',
  // Sắp hết hạn
  EXPIRING = 'expiring',
  // Đã hết hạn
  EXPIRED = 'expired'
}
export enum VIP_PACKAGE_DURATION {
  // 1 ngày
  ONE_DAY = '1 day',
  // 1 tuần
  ONE_WEEK = '1 week',
  // 1 tháng
  ONE_MONTH = '1 month',
  // 12 tháng
  ONE_YEAR = '1 year'
}
