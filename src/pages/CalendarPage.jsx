import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { events, users } from '../data/dummy-data';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    attendees: [],
  });
  const [calendarEvents, setCalendarEvents] = useState([]);

  // Calendar helper functions
  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (viewMode === 'month') {
      const daysInMonth = getDaysInMonth(year, month);
      const firstDayOfMonth = getFirstDayOfMonth(year, month);
      const calendarDays = [];

      // Previous month days
      const prevMonthDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth;
      const prevMonthLastDay = getDaysInMonth(year, month - 1);
      for (let i = prevMonthDays - 1; i >= 0; i--) {
        calendarDays.push({
          date: new Date(year, month - 1, prevMonthLastDay - i),
          isCurrentMonth: false,
        });
      }

      // Current month days
      for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push({
          date: new Date(year, month, day),
          isCurrentMonth: true,
        });
      }

      // Next month days (to fill 6 weeks)
      const totalDays = calendarDays.length;
      const remainingDays = 42 - totalDays;
      for (let day = 1; day <= remainingDays; day++) {
        calendarDays.push({
          date: new Date(year, month + 1, day),
          isCurrentMonth: false,
        });
      }

      return calendarDays;
    }

    if (viewMode === 'week') {
      const startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - currentDate.getDay());
      const calendarDays = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        calendarDays.push({
          date,
          isCurrentMonth: date.getMonth() === currentDate.getMonth(),
        });
      }
      return calendarDays;
    }

    // Day view
    return [
      {
        date: new Date(currentDate),
        isCurrentMonth: true,
      },
    ];
  };

  useEffect(() => {
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return generateCalendarDays().some(
        (calDay) => eventDate.toDateString() === calDay.date.toDateString(),
      );
    });
    setCalendarEvents(filteredEvents);
  }, [currentDate, viewMode]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEventWithId = {
      ...newEvent,
      id: calendarEvents.length + 1,
      type: 'meeting',
    };

    setCalendarEvents([...calendarEvents, newEventWithId]);
    setShowAddEventModal(false);
    setNewEvent({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
      attendees: [],
    });
  };

  const toggleAttendee = (userId) => {
    setNewEvent((prev) => ({
      ...prev,
      attendees: prev.attendees.includes(userId)
        ? prev.attendees.filter((id) => id !== userId)
        : [...prev.attendees, userId],
    }));
  };

  const navigate = (direction) => {
    const newDate = new Date(currentDate);
    switch (viewMode) {
      case 'month':
        newDate.setMonth(newDate.getMonth() + direction);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + direction * 7);
        break;
      case 'day':
        newDate.setDate(newDate.getDate() + direction);
        break;
    }
    setCurrentDate(newDate);
  };

  const getHeaderText = () => {
    if (viewMode === 'month') {
      return currentDate.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });
    }
    if (viewMode === 'week') {
      const start = new Date(currentDate);
      start.setDate(currentDate.getDate() - currentDate.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    }
    return currentDate.toLocaleDateString();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">View and manage your schedule</p>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          onClick={() => setShowAddEventModal(true)}
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              className="p-1 rounded-full hover:bg-gray-100"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-medium">{getHeaderText()}</h2>
            <button
              className="p-1 rounded-full hover:bg-gray-100"
              onClick={() => navigate(1)}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2">
            {['month', 'week', 'day'].map((mode) => (
              <button
                key={mode}
                className={`px-3 py-1 text-sm border rounded-md ${
                  viewMode === mode
                    ? 'bg-blue-50 text-blue-600 border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setViewMode(mode)}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 border-b">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="p-2 text-center font-medium text-gray-600 border-r last:border-r-0"
            >
              {viewMode === 'day' ? 'All Day' : day}
            </div>
          ))}
        </div>

        <div
          className={`grid ${
            viewMode === 'day' ? 'grid-cols-1' : 'grid-cols-7'
          } auto-rows-fr`}
        >
          {generateCalendarDays().map((dayInfo, index) => {
            const date = dayInfo.date;
            const isToday = date.toDateString() === new Date().toDateString();
            const eventsForDay = calendarEvents.filter(
              (event) =>
                new Date(event.date).toDateString() === date.toDateString(),
            );

            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border-r border-b ${
                  !dayInfo.isCurrentMonth
                    ? 'bg-gray-50 text-gray-400'
                    : 'bg-white'
                } ${viewMode === 'day' ? 'col-span-7' : ''}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div
                    className={`w-7 h-7 flex items-center justify-center rounded-full ${
                      isToday ? 'bg-blue-600 text-white' : ''
                    }`}
                  >
                    {date.getDate()}
                  </div>
                  {eventsForDay.length > 0 && (
                    <button className="text-gray-400 hover:text-gray-600">
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="space-y-1 overflow-y-auto max-h-[80px]">
                  {eventsForDay.map((event) => (
                    <div
                      key={event.id}
                      className={`px-2 py-1 text-xs rounded truncate ${
                        event.type === 'meeting'
                          ? 'bg-blue-100 text-blue-800'
                          : event.type === 'presentation'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="font-medium">{event.startTime}</div>
                      <div className="truncate">{event.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-medium">Add New Event</h2>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowAddEventModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title*
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter event title"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date*
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={newEvent.startTime}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, startTime: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={newEvent.endTime}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, endTime: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                    placeholder="Enter event description"
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attendees
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {users.slice(0, 6).map((user) => (
                      <button
                        key={user.id}
                        type="button"
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                          newEvent.attendees.includes(user.id)
                            ? 'bg-blue-100 text-blue-800 border-blue-200 border'
                            : 'bg-gray-100 text-gray-800 border-gray-200 border hover:bg-gray-200'
                        }`}
                        onClick={() => toggleAttendee(user.id)}
                      >
                        <div
                          className={`w-5 h-5 rounded-full ${user.color} flex items-center justify-center text-white text-xs`}
                        >
                          {user.id}
                        </div>
                        <span>{user.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowAddEventModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
