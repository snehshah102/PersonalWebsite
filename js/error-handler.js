/**
 * Comprehensive Error Handler with Modal Popups
 * Handles HTTP status codes: 200, 300s, 400s, 500s
 */

(function() {
  'use strict';

  // Status code messages mapping
  const STATUS_MESSAGES = {
    // 2xx Success
    200: {
      title: 'Success',
      message: 'Request completed successfully!',
      type: 'success',
      icon: 'check-circle'
    },
    201: {
      title: 'Created',
      message: 'Resource created successfully!',
      type: 'success',
      icon: 'check-circle'
    },
    202: {
      title: 'Accepted',
      message: 'Request accepted for processing!',
      type: 'success',
      icon: 'check-circle'
    },
    204: {
      title: 'No Content',
      message: 'Request completed successfully with no content to return.',
      type: 'success',
      icon: 'check-circle'
    },
    
    // 3xx Redirection
    300: {
      title: 'Multiple Choices',
      message: 'Multiple options available for the request.',
      type: 'info',
      icon: 'info-circle'
    },
    301: {
      title: 'Moved Permanently',
      message: 'The resource has been moved permanently.',
      type: 'info',
      icon: 'info-circle'
    },
    302: {
      title: 'Found',
      message: 'The resource has been temporarily moved.',
      type: 'info',
      icon: 'info-circle'
    },
    304: {
      title: 'Not Modified',
      message: 'Resource has not been modified since last request.',
      type: 'info',
      icon: 'info-circle'
    },
    307: {
      title: 'Temporary Redirect',
      message: 'The resource has been temporarily redirected.',
      type: 'info',
      icon: 'info-circle'
    },
    308: {
      title: 'Permanent Redirect',
      message: 'The resource has been permanently redirected.',
      type: 'info',
      icon: 'info-circle'
    },
    
    // 4xx Client Errors
    400: {
      title: 'Bad Request',
      message: 'The request was invalid or malformed. Please check your input and try again.',
      type: 'error',
      icon: 'exclamation-triangle'
    },
    401: {
      title: 'Unauthorized',
      message: 'You are not authorized to access this resource. Please log in and try again.',
      type: 'error',
      icon: 'lock'
    },
    403: {
      title: 'Forbidden',
      message: 'You do not have permission to access this resource.',
      type: 'error',
      icon: 'ban'
    },
    404: {
      title: 'Not Found',
      message: 'The requested resource could not be found. Please check the URL and try again.',
      type: 'error',
      icon: 'search'
    },
    405: {
      title: 'Method Not Allowed',
      message: 'The request method is not allowed for this resource.',
      type: 'error',
      icon: 'times-circle'
    },
    408: {
      title: 'Request Timeout',
      message: 'The request took too long to process. Please try again.',
      type: 'error',
      icon: 'clock'
    },
    409: {
      title: 'Conflict',
      message: 'The request conflicts with the current state of the resource.',
      type: 'error',
      icon: 'exclamation-circle'
    },
    422: {
      title: 'Unprocessable Entity',
      message: 'The request was well-formed but contains semantic errors. Please check your input.',
      type: 'error',
      icon: 'times-circle'
    },
    429: {
      title: 'Too Many Requests',
      message: 'You have made too many requests. Please wait a moment and try again.',
      type: 'error',
      icon: 'hourglass-half'
    },
    
    // 5xx Server Errors
    500: {
      title: 'Internal Server Error',
      message: 'An internal server error occurred. Please try again later or contact support if the problem persists.',
      type: 'error',
      icon: 'server'
    },
    501: {
      title: 'Not Implemented',
      message: 'The server does not support the functionality required to fulfill the request.',
      type: 'error',
      icon: 'times-circle'
    },
    502: {
      title: 'Bad Gateway',
      message: 'The server received an invalid response from an upstream server. Please try again later.',
      type: 'error',
      icon: 'network-wired'
    },
    503: {
      title: 'Service Unavailable',
      message: 'The service is temporarily unavailable. Please try again later.',
      type: 'error',
      icon: 'exclamation-triangle'
    },
    504: {
      title: 'Gateway Timeout',
      message: 'The server did not receive a timely response from an upstream server. Please try again.',
      type: 'error',
      icon: 'clock'
    }
  };

  // Default messages for unknown status codes
  const DEFAULT_MESSAGES = {
    success: {
      title: 'Success',
      message: 'Operation completed successfully!',
      type: 'success',
      icon: 'check-circle'
    },
    info: {
      title: 'Information',
      message: 'Please review the information provided.',
      type: 'info',
      icon: 'info-circle'
    },
    error: {
      title: 'Error',
      message: 'An error occurred. Please try again.',
      type: 'error',
      icon: 'exclamation-triangle'
    }
  };

  /**
   * Get status message configuration
   * @param {number} statusCode - HTTP status code
   * @returns {Object} Status message configuration
   */
  function getStatusConfig(statusCode) {
    if (STATUS_MESSAGES[statusCode]) {
      return STATUS_MESSAGES[statusCode];
    }
    
    // Determine type based on status code range
    if (statusCode >= 200 && statusCode < 300) {
      return DEFAULT_MESSAGES.success;
    } else if (statusCode >= 300 && statusCode < 400) {
      return DEFAULT_MESSAGES.info;
    } else if (statusCode >= 400) {
      return DEFAULT_MESSAGES.error;
    }
    
    return DEFAULT_MESSAGES.error;
  }

  /**
   * Get CSS class for modal based on status type
   * @param {string} type - Status type (success, error, info)
   * @returns {string} CSS class name
   */
  function getModalClass(type) {
    const classes = {
      success: 'modal-success',
      error: 'modal-error',
      info: 'modal-info'
    };
    return classes[type] || 'modal-info';
  }

  /**
   * Get icon HTML for Font Awesome
   * @param {string} iconName - Icon name
   * @param {string} type - Status type
   * @returns {string} HTML string
   */
  function getIconHTML(iconName, type) {
    const iconClass = type === 'success' ? 'fas' : 
                     type === 'error' ? 'fas' : 'fas';
    return `<i class="${iconClass} fa-${iconName}"></i>`;
  }

  /**
   * Show status modal
   * @param {number|Object} statusCodeOrConfig - HTTP status code or configuration object
   * @param {string} customMessage - Optional custom message to override default
   */
  function showStatusModal(statusCodeOrConfig, customMessage) {
    let config;
    
    // Handle both status code (number) and config object
    if (typeof statusCodeOrConfig === 'number') {
      config = getStatusConfig(statusCodeOrConfig);
      if (customMessage) {
        config.message = customMessage;
      }
    } else {
      // Assume it's a config object
      config = statusCodeOrConfig;
    }

    const modal = $('#statusModal');
    const modalHeader = $('#statusModalHeader');
    const modalLabel = $('#statusModalLabel');
    const modalBody = $('#statusModalBody');
    const modalMessage = $('#statusModalMessage');

    // Remove existing type classes
    modalHeader.removeClass('modal-success modal-error modal-info');
    
    // Add appropriate class based on type
    const modalClass = getModalClass(config.type);
    modalHeader.addClass(modalClass);

    // Set title with icon
    modalLabel.html(`${getIconHTML(config.icon, config.type)} ${config.title}`);

    // Set message
    modalMessage.html(config.message);

    // Show modal
    modal.modal('show');
  }

  /**
   * Handle fetch/axios response with error handling
   * @param {Response} response - Fetch API response object
   * @returns {Promise} Promise that resolves or shows error modal
   */
  function handleResponse(response) {
    const statusCode = response.status;
    
    if (statusCode >= 200 && statusCode < 300) {
      // Success - show success modal
      showStatusModal(statusCode);
      return Promise.resolve(response);
    } else {
      // Error - show error modal
      return response.json().then(data => {
        const errorMessage = data.message || data.error || getStatusConfig(statusCode).message;
        showStatusModal(statusCode, errorMessage);
        return Promise.reject(new Error(errorMessage));
      }).catch(() => {
        // If JSON parsing fails, use default message
        showStatusModal(statusCode);
        return Promise.reject(new Error(getStatusConfig(statusCode).message));
      });
    }
  }

  /**
   * Handle fetch/axios error
   * @param {Error} error - Error object
   */
  function handleError(error) {
    console.error('Request error:', error);
    
    // Network error or other fetch errors
    if (!error.response) {
      showStatusModal({
        title: 'Network Error',
        message: 'Unable to connect to the server. Please check your internet connection and try again.',
        type: 'error',
        icon: 'wifi'
      });
    } else {
      // HTTP error with response
      const statusCode = error.response.status || 500;
      const errorMessage = error.response.data?.message || 
                          error.response.data?.error || 
                          getStatusConfig(statusCode).message;
      showStatusModal(statusCode, errorMessage);
    }
  }

  /**
   * Wrapper for fetch with automatic error handling
   * @param {string} url - Request URL
   * @param {Object} options - Fetch options
   * @returns {Promise} Promise with error handling
   */
  function fetchWithErrorHandling(url, options = {}) {
    return fetch(url, options)
      .then(handleResponse)
      .catch(handleError);
  }

  /**
   * Test function to demonstrate error handling
   * @param {number} statusCode - Status code to test
   */
  function testStatusModal(statusCode) {
    showStatusModal(statusCode);
  }

  // Expose functions globally
  window.ErrorHandler = {
    showStatusModal: showStatusModal,
    handleResponse: handleResponse,
    handleError: handleError,
    fetchWithErrorHandling: fetchWithErrorHandling,
    testStatusModal: testStatusModal,
    getStatusConfig: getStatusConfig
  };

  // Auto-handle unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    if (event.reason && event.reason.response) {
      handleError(event.reason);
    }
  });

})();

