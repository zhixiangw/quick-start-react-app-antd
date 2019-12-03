import APIError from './APIError';
import RequestError from './RequestError';
import { canUseWindow } from '../DOMUtils';

export function isAPIError(error) {
  return error instanceof APIError;
}

export function isRequestError(error) {
  return error instanceof RequestError;
}

function ErrorHandler() {}

// 异常处理
if (canUseWindow) {
  global.onerror = (message, url, line, col, error) => ErrorHandler(error);
  global.onrejectionhandled = event => ErrorHandler(event.reason);
  global.onunhandledrejection = event => ErrorHandler(event.reason);
}

export { APIError, RequestError };
export default ErrorHandler;
