'use client';

import { Check, Monitor, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export default function AppearanceSettingsPage() {
  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState(16);
  const [density, setDensity] = useState('default');
  const [animations, setAnimations] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [accentColor, setAccentColor] = useState('blue');
  const [activeTab, setActiveTab] = useState('theme');

  const colors = [
    { name: 'Blue', value: 'blue', bg: 'bg-blue-500' },
    { name: 'Purple', value: 'purple', bg: 'bg-purple-500' },
    { name: 'Green', value: 'green', bg: 'bg-green-500' },
    { name: 'Red', value: 'red', bg: 'bg-red-500' },
    { name: 'Orange', value: 'orange', bg: 'bg-orange-500' },
    { name: 'Pink', value: 'pink', bg: 'bg-pink-500' },
  ];

  const handleResetDefaults = () => {
    setTheme('system');
    setFontSize(16);
    setDensity('default');
    setAnimations(true);
    setSidebarCollapsed(false);
    setAccentColor('blue');
  };

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appearance</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Customize how TaskFlow looks and feels
        </p>
      </div>

      <div>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('theme')}
              className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'theme'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Theme
            </button>
            <button
              onClick={() => setActiveTab('layout')}
              className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'layout'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Layout
            </button>
            <button
              onClick={() => setActiveTab('accessibility')}
              className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'accessibility'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Accessibility
            </button>
          </nav>
        </div>

        <div className="mt-4">
          {activeTab === 'theme' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium">Theme</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Choose your preferred theme mode
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <label
                    className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      theme === 'light'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      checked={theme === 'light'}
                      onChange={() => setTheme('light')}
                      className="sr-only"
                    />
                    <Sun className="mb-3 h-6 w-6" />
                    <span>Light</span>
                  </label>

                  <label
                    className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      theme === 'dark'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      checked={theme === 'dark'}
                      onChange={() => setTheme('dark')}
                      className="sr-only"
                    />
                    <Moon className="mb-3 h-6 w-6" />
                    <span>Dark</span>
                  </label>

                  <label
                    className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      theme === 'system'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="theme"
                      value="system"
                      checked={theme === 'system'}
                      onChange={() => setTheme('system')}
                      className="sr-only"
                    />
                    <Monitor className="mb-3 h-6 w-6" />
                    <span>System</span>
                  </label>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Accent Color</h3>
                    <div className="grid grid-cols-6 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color.value}
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            color.bg
                          } ${
                            accentColor === color.value
                              ? 'ring-2 ring-offset-2 ring-blue-500'
                              : ''
                          }`}
                          onClick={() => setAccentColor(color.value)}
                          aria-label={`Select ${color.name} accent color`}
                        >
                          {accentColor === color.value && (
                            <Check className="h-4 w-4 text-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium">Layout Preferences</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Customize the layout of the application
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="sidebar-collapsed" className="font-medium">
                      Collapsed Sidebar
                    </label>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        id="sidebar-collapsed"
                        name="sidebar-collapsed"
                        checked={sidebarCollapsed}
                        onChange={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="sr-only"
                      />
                      <div
                        className={`block w-10 h-6 rounded-full ${
                          sidebarCollapsed
                            ? 'bg-blue-500'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      ></div>
                      <div
                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                          sidebarCollapsed ? 'transform translate-x-4' : ''
                        }`}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Show only icons in the sidebar to save space
                  </p>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div className="space-y-2">
                  <label htmlFor="density-select" className="block font-medium">
                    Interface Density
                  </label>
                  <select
                    id="density-select"
                    value={density}
                    onChange={(e) => setDensity(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="compact">Compact</option>
                    <option value="default">Default</option>
                    <option value="comfortable">Comfortable</option>
                  </select>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Adjust the spacing between elements
                  </p>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="animations-toggle" className="font-medium">
                      Interface Animations
                    </label>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        id="animations-toggle"
                        name="animations-toggle"
                        checked={animations}
                        onChange={() => setAnimations(!animations)}
                        className="sr-only"
                      />
                      <div
                        className={`block w-10 h-6 rounded-full ${
                          animations
                            ? 'bg-blue-500'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      ></div>
                      <div
                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                          animations ? 'transform translate-x-4' : ''
                        }`}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enable or disable animations throughout the interface
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'accessibility' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium">Accessibility Settings</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Adjust settings to improve accessibility
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="font-size" className="font-medium">
                        Font Size
                      </label>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {fontSize}px
                      </span>
                    </div>
                    <input
                      type="range"
                      id="font-size"
                      min="12"
                      max="24"
                      step="1"
                      value={fontSize}
                      onChange={(e) =>
                        setFontSize(Number.parseInt(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Adjust the base font size for all text
                    </p>
                  </div>

                  <hr className="border-gray-200 dark:border-gray-700" />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="reduced-motion" className="font-medium">
                        Reduce Motion
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          id="reduced-motion"
                          name="reduced-motion"
                          className="sr-only"
                        />
                        <div className="block w-10 h-6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Minimize animations for users sensitive to motion
                    </p>
                  </div>

                  <hr className="border-gray-200 dark:border-gray-700" />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="high-contrast" className="font-medium">
                        High Contrast Mode
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          id="high-contrast"
                          name="high-contrast"
                          className="sr-only"
                        />
                        <div className="block w-10 h-6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Increase contrast for better visibility
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={handleResetDefaults}
        >
          Reset to Defaults
        </button>
        <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save Changes
        </button>
      </div>
    </div>
  );
}
