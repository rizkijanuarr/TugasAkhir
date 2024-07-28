class AppRoutes {
  static const baseURL = 'https://81aa-120-188-73-236.ngrok-free.app/api';

  // AUTH
  static String login = '$baseURL/login';
  static String register = '$baseURL/register';
  static String logout = '$baseURL/logout';

  // PENGADUAN
  static const basePENGADUAN = '$baseURL/pengaduan';
  static String categories = '$basePENGADUAN/categories';
  static String status = '$basePENGADUAN/status';
}
