'use client';

import { Check, Globe, Search } from 'lucide-react';
import { useState } from 'react';

// Sample language data
const languages = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese (Simplified)', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
];

export default function LanguageSettingsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [timeFormat, setTimeFormat] = useState('12h');
  const [searchQuery, setSearchQuery] = useState('');
  const [autoDetect, setAutoDetect] = useState(false);

  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Language & Region</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Customize language preferences and regional formats
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium">Language Preferences</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Choose your preferred language for the interface
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="auto-detect" className="font-medium">
                Auto-detect language
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="auto-detect"
                  name="auto-detect"
                  checked={autoDetect}
                  onChange={() => setAutoDetect(!autoDetect)}
                  className="sr-only"
                />
                <div
                  className={`block w-10 h-6 rounded-full ${
                    autoDetect ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                    autoDetect ? 'transform translate-x-4' : ''
                  }`}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Automatically detect language based on your browser settings
            </p>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search languages..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="h-[300px] overflow-y-auto pr-1 space-y-1">
              {filteredLanguages.map((language) => (
                <div
                  key={language.code}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    id={`lang-${language.code}`}
                    name="language"
                    value={language.code}
                    checked={selectedLanguage === language.code}
                    onChange={() => setSelectedLanguage(language.code)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`lang-${language.code}`}
                    className="flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <span className="mr-2 text-lg">{language.flag}</span>
                      <span>{language.name}</span>
                    </div>
                    {selectedLanguage === language.code && (
                      <Check className="h-4 w-4 text-blue-500" />
                    )}
                  </label>
                </div>
              ))}

              {filteredLanguages.length === 0 && (
                <div className="text-center py-8">
                  <Globe className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    No languages found matching your search
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium">Regional Settings</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure date, time, and number formats
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="date-format" className="block font-medium">
                Date Format
              </label>
              <select
                id="date-format"
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY (UK, EU)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                <option value="YYYY/MM/DD">YYYY/MM/DD (JP, CN)</option>
              </select>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Example:{' '}
                {dateFormat
                  .replace('MM', '03')
                  .replace('DD', '15')
                  .replace('YYYY', '2023')}
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="time-format" className="block font-medium">
                Time Format
              </label>
              <select
                id="time-format"
                value={timeFormat}
                onChange={(e) => setTimeFormat(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="12h">12-hour (AM/PM)</option>
                <option value="24h">24-hour</option>
              </select>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Example: {timeFormat === '12h' ? '3:30 PM' : '15:30'}
              </p>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          <div className="space-y-2">
            <label htmlFor="first-day" className="block font-medium">
              First Day of Week
            </label>
            <select
              id="first-day"
              defaultValue="sunday"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="saturday">Saturday</option>
            </select>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          <div className="space-y-2">
            <label htmlFor="timezone" className="block font-medium">
              Time Zone
            </label>
            <select
              id="timezone"
              defaultValue="auto"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="auto">Auto-detect</option>
              <option value="utc">UTC (Coordinated Universal Time)</option>
              <option value="est">EST (Eastern Standard Time)</option>
              <option value="cst">CST (Central Standard Time)</option>
              <option value="pst">PST (Pacific Standard Time)</option>
              <option value="gmt">GMT (Greenwich Mean Time)</option>
              <option value="cet">CET (Central European Time)</option>
            </select>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current time zone will be used for all dates and times
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
          Reset to Defaults
        </button>
        <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save Changes
        </button>
      </div>
    </div>
  );
}
