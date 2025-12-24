let currentSession = null;

module.exports = {
  startSession: (data) => {
    currentSession = data;
  },

  getSession: () => {
    return currentSession;
  },

  updateSession: (data) => {
    if (currentSession) {
      currentSession = {
        ...currentSession,
        ...data,
      };
    }
  },

  endSession: () => {
    currentSession = null;
  },
};
