export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="text-4xl sm:text-6xl mb-4">ℹ️</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">About This Application</h1>
        <p className="text-gray-600 text-sm sm:text-base">Learn more about our platform and features</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">🚀 Our Mission</h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            We're dedicated to providing a seamless and intuitive dashboard experience 
            that helps you manage your data and workflows efficiently.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">⚡ Key Features</h2>
          <ul className="text-gray-600 text-sm sm:text-base space-y-2">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">•</span>
              User Management System
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">•</span>
              Responsive Design
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">•</span>
              Secure Authentication
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">•</span>
              Real-time Data Updates
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">🛠️ Technology Stack</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span className="text-gray-700">React</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
              <span className="text-gray-700">TypeScript</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
              <span className="text-gray-700">Tailwind CSS</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              <span className="text-gray-700">Wouter</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">📞 Contact Info</h2>
          <div className="space-y-2 text-sm sm:text-base">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> support@example.com
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Phone:</span> +1 (555) 123-4567
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Address:</span> 123 Tech Street, Digital City
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">💡 Need Help?</h2>
        <p className="text-blue-100 mb-4 text-sm sm:text-base">
          Our support team is here to assist you with any questions or issues.
        </p>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200 text-sm sm:text-base">
          Contact Support
        </button>
      </div>
    </div>
  );
}