export const UtileService = {
    formatValidationErrors: (errors: Record<string, string[]>) => {
      return Object.entries(errors).map(([field, messages]) => {
        return `${field}: ${messages.join(', ')}`;
      }).join('\n');
    },
  
    displayErrors: (errorMessage: string) => {
      alert(`Error: ${errorMessage}`);
    },
  };
  