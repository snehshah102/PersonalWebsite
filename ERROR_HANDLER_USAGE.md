# Error Handler Usage Guide

This comprehensive error handling system provides modal popups for HTTP status codes (200, 300s, 400s, 500s).

## Features

- ✅ Automatic handling of all common HTTP status codes
- ✅ Beautiful modal popups with color-coded status types
- ✅ Customizable messages
- ✅ Works with Fetch API, Axios, and custom error handling
- ✅ Automatic error catching for unhandled promise rejections

## Quick Start

### Basic Usage - Show Status Modal

```javascript
// Show success modal (200)
ErrorHandler.showStatusModal(200);

// Show error modal (400)
ErrorHandler.showStatusModal(400);

// Show server error (500)
ErrorHandler.showStatusModal(500);

// Show with custom message
ErrorHandler.showStatusModal(404, 'The page you are looking for does not exist.');
```

### Using with Fetch API

```javascript
// Option 1: Use the wrapper function
ErrorHandler.fetchWithErrorHandling('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'John' })
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch(error => {
  console.error('Error:', error);
});

// Option 2: Manual handling
fetch('/api/users')
  .then(ErrorHandler.handleResponse)
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(ErrorHandler.handleError);
```

### Using with Axios

```javascript
import axios from 'axios';

axios.get('/api/users')
  .then(response => {
    // Success - show success modal
    ErrorHandler.showStatusModal(response.status);
    return response.data;
  })
  .catch(error => {
    // Error - automatically handled
    ErrorHandler.handleError(error);
  });
```

### Custom Status Configuration

```javascript
// Show custom modal
ErrorHandler.showStatusModal({
  title: 'Custom Title',
  message: 'This is a custom message',
  type: 'info', // 'success', 'error', or 'info'
  icon: 'info-circle'
});
```

## Supported Status Codes

### 2xx Success (Green)
- 200: Success
- 201: Created
- 202: Accepted
- 204: No Content

### 3xx Redirection (Blue)
- 300: Multiple Choices
- 301: Moved Permanently
- 302: Found
- 304: Not Modified
- 307: Temporary Redirect
- 308: Permanent Redirect

### 4xx Client Errors (Red)
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 405: Method Not Allowed
- 408: Request Timeout
- 409: Conflict
- 422: Unprocessable Entity
- 429: Too Many Requests

### 5xx Server Errors (Red)
- 500: Internal Server Error
- 501: Not Implemented
- 502: Bad Gateway
- 503: Service Unavailable
- 504: Gateway Timeout

## Testing

You can test any status code in the browser console:

```javascript
// Test different status codes
ErrorHandler.testStatusModal(200);  // Success
ErrorHandler.testStatusModal(400);  // Bad Request
ErrorHandler.testStatusModal(404);  // Not Found
ErrorHandler.testStatusModal(500);  // Server Error
ErrorHandler.testStatusModal(301);  // Redirect
```

## Example: Form Submission

```javascript
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  
  try {
    const response = await ErrorHandler.fetchWithErrorHandling('/api/contact', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    // Form submitted successfully - modal already shown
    e.target.reset();
  } catch (error) {
    // Error modal already shown by ErrorHandler
    console.error('Form submission failed:', error);
  }
});
```

## API Reference

### `ErrorHandler.showStatusModal(statusCodeOrConfig, customMessage)`
Shows a modal with the appropriate status message.

**Parameters:**
- `statusCodeOrConfig` (number|Object): HTTP status code or configuration object
- `customMessage` (string, optional): Custom message to override default

### `ErrorHandler.handleResponse(response)`
Handles a Fetch API response and shows appropriate modal.

**Parameters:**
- `response` (Response): Fetch API response object

**Returns:** Promise

### `ErrorHandler.handleError(error)`
Handles errors and shows appropriate modal.

**Parameters:**
- `error` (Error): Error object (can have `response` property for HTTP errors)

### `ErrorHandler.fetchWithErrorHandling(url, options)`
Wrapper for fetch() with automatic error handling.

**Parameters:**
- `url` (string): Request URL
- `options` (Object, optional): Fetch options

**Returns:** Promise

### `ErrorHandler.getStatusConfig(statusCode)`
Gets the configuration for a status code.

**Parameters:**
- `statusCode` (number): HTTP status code

**Returns:** Object with title, message, type, and icon

