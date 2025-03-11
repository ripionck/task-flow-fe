import {
  addDays,
  addMonths,
  eachDayOfInterval,
  format,
  getDay,
  isSameDay,
  isSameMonth,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import PageHeader from './PageHeader';

const events = [
  { id: 1, title: 'Website Design Review', date: '2024-10-03', type: 'Design' },
  { id: 2, title: 'API Integration', date: '2024-11-05', type: 'Development' },
  { id: 3, title: 'Team Meeting', date: '2024-12-08', type: 'Meeting' },
  { id: 4, title: 'Product Demo', date: '2025-01-08', type: 'Demo' },
  { id: 5, title: 'Deadline: Homepage', date: '2025-02-12', type: 'Deadline' },
];

const upcomingDeadlines = [
  {
    id: 1,
    title: 'Website Design Review',
    datetime: 'Today at 2:00 PM',
    tag: 'Design',
  },
  {
    id: 2,
    title: 'API Integration Deadline',
    datetime: 'Tomorrow at 11:00 AM',
    tag: 'Development',
  },
];

const getEventStyle = (type) => {
  const styles = {
    Design: 'bg-blue-100 text-blue-700',
    Development: 'bg-purple-100 text-purple-700',
    Meeting: 'bg-yellow-100 text-yellow-700',
    Demo: 'bg-green-100 text-green-700',
    Deadline: 'bg-red-100 text-red-700',
  };
  return styles[type] || 'bg-gray-100 text-gray-700';
};

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleToday = () => setCurrentMonth(new Date());

  // Generate calendar grid dates
  const monthStart = startOfMonth(currentMonth);
  const startDate = subDays(monthStart, getDay(monthStart));
  const endDate = addDays(startDate, 41); // 6 weeks
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div>
      <PageHeader title="Calendar" subtitle="Task deadlines and schedules" />
      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-4">
              <button
                onClick={handleToday}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Today
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePreviousMonth}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <span className="font-medium">
                  {format(currentMonth, 'MMMM yyyy')}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="grid grid-cols-7 border-b border-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="py-2 text-center text-sm font-medium text-gray-600"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {daysInMonth.map((date, i) => {
              const isCurrentMonth = isSameMonth(date, currentMonth);
              const isToday = isSameDay(date, new Date());
              const dayEvents = events.filter(
                (event) => event.date === format(date, 'yyyy-MM-dd'),
              );

              return (
                <div
                  key={i}
                  className={`min-h-[100px] p-2 border-b border-r border-gray-200 ${
                    !isCurrentMonth ? 'bg-gray-50' : ''
                  } ${isToday ? 'bg-blue-50' : ''}`}
                >
                  <div className="font-medium text-sm mb-1">
                    {format(date, 'd')}
                  </div>
                  {dayEvents.length > 0 && (
                    <div className="space-y-1">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded ${getEventStyle(
                            event.type,
                          )}`}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Upcoming Deadlines</h3>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200"
              >
                <div>
                  <h4 className="font-medium">{deadline.title}</h4>
                  <p className="text-sm text-gray-600">{deadline.datetime}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getEventStyle(
                    deadline.tag,
                  )}`}
                >
                  {deadline.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
