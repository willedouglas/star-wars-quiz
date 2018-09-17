module.exports = {
	moduleFileExtensions: ['js', 'jsx', 'json'],
	transform: {
		'.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
		'^.+\\.(js|jsx)?$': 'babel-jest'
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	setupFiles: ['<rootDir>/src/setupTests.js']
};