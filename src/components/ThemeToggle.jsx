const ThemeToggle = ({ darkMode, setDarkMode }) => {
    return (
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        aria-label="Toggle dark mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    );
  };
  
  export default ThemeToggle;