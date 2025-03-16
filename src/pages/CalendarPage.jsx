import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { events, users } from '../data/dummy-data';

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState('month'); // 'month', 'week', or 'day'
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate calendar days for month view (42 days)
  const getCalendarDays = () => {
    const calendarDays = [];
    const prevMonth = new Date(year, month - 1, 1);
    const prevMonthDays = getDaysInMonth(
      prevMonth.getFullYear(),
      prevMonth.getMonth(),
    );

    // Add days from previous month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarDays.push({
        day: prevMonthDays - i,
        month: month - 1,
        year: year,
        isCurrentMonth: false,
      });
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({
        day,
        month,
        year,
        isCurrentMonth: true,
      });
    }

    // Add days from next month
    const remainingDays = 42 - calendarDays.length;
    for (let day = 1; day <= remainingDays; day++) {
      calendarDays.push({
        day,
        month: month + 1,
        year: year,
        isCurrentMonth: false,
      });
    }

    return calendarDays;
  };

  // Get week days
  const getWeekDays = (date) => {
    const days = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      days.push({
        day: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        isCurrentMonth: currentDate.getMonth() === month,
      });
    }

    return days;
  };

  // Get day hours
  const getDayHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(`${i.toString().padStart(2, '0')}:00`);
    }
    return hours;
  };

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetailsModal(true);
  };

  // Navigation functions
  const navigate = (direction) => {
    if (view === 'month') {
      setCurrentMonth(new Date(year, month + direction, 1));
    } else if (view === 'week') {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + direction * 7);
      setSelectedDate(newDate);
    } else if (view === 'day') {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + direction);
      setSelectedDate(newDate);
    }
  };

  // Render calendar content based on view
  const renderCalendarContent = () => {
    if (view === 'month') {
      return (
        <div className="grid grid-cols-7 auto-rows-fr">
          {getCalendarDays().map((dateObj, index) => {
            const eventsForDay = calendarEvents.filter((event) => {
              const eventDate = new Date(event.date);
              return (
                eventDate.getDate() === dateObj.day &&
                eventDate.getMonth() === dateObj.month &&
                eventDate.getFullYear() === dateObj.year
              );
            });
            const isToday =
              new Date().toDateString() ===
              new Date(dateObj.year, dateObj.month, dateObj.day).toDateString();

            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border-r border-b last:border-r-0 ${
                  dateObj.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div
                    className={`w-7 h-7 flex items-center justify-center rounded-full ${
                      isToday ? 'bg-blue-600 text-white' : 'text-gray-700'
                    }`}
                  >
                    {dateObj.day}
                  </div>
                </div>
                <div className="space-y-1 overflow-y-auto max-h-[80px]">
                  {eventsForDay.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      className={`px-2 py-1 text-xs rounded truncate cursor-pointer hover:opacity-80 ${
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
      );
    } else if (view === 'week') {
      return (
        <div className="grid grid-cols-8 h-[600px]">
          <div className="border-r">
            <div className="h-12 border-b"></div>
            {getDayHours().map((hour) => (
              <div
                key={hour}
                className="h-20 border-b px-2 text-sm text-gray-500"
              >
                {hour}
              </div>
            ))}
          </div>
          {getWeekDays(selectedDate).map((dateObj, index) => (
            <div key={index} className="border-r">
              <div className="h-12 border-b p-2 text-center">
                <div className="text-sm font-medium">{dayNames[index]}</div>
                <div className="text-sm">{dateObj.day}</div>
              </div>
              {getDayHours().map((hour) => (
                <div key={hour} className="h-20 border-b"></div>
              ))}
            </div>
          ))}
        </div>
      );
    } else if (view === 'day') {
      return (
        <div className="grid grid-cols-2 h-[600px]">
          <div className="border-r">
            {getDayHours().map((hour) => (
              <div
                key={hour}
                className="h-20 border-b px-2 text-sm text-gray-500"
              >
                {hour}
              </div>
            ))}
          </div>
          <div>
            {getDayHours().map((hour) => (
              <div key={hour} className="h-20 border-b"></div>
            ))}
          </div>
        </div>
      );
    }
  };

  // Process events for the current month
  useEffect(() => {
    const currentMonthEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate >= new Date(year, month - 1, 1) &&
        eventDate <= new Date(year, month + 1, 0)
      );
    });
    setCalendarEvents(currentMonthEvents);
  }, [month, year]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEventWithId = {
      ...newEvent,
      id: calendarEvents.length + 1,
      type: 'meeting', // Default type
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
    if (newEvent.attendees.includes(userId)) {
      setNewEvent({
        ...newEvent,
        attendees: newEvent.attendees.filter((id) => id !== userId),
      });
    } else {
      setNewEvent({
        ...newEvent,
        attendees: [...newEvent.attendees, userId],
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">View and manage your schedule</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            onClick={() => setShowAddEventModal(true)}
          >
            <Plus className="w-5 h-5" />
            Add Event
          </button>
        </div>
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

            <h2 className="text-xl font-medium">
              {view === 'month'
                ? `${monthNames[month]} ${year}`
                : view === 'week'
                ? `Week of ${selectedDate.toLocaleDateString()}`
                : selectedDate.toLocaleDateString()}
            </h2>

            <button
              className="p-1 rounded-full hover:bg-gray-100"
              onClick={() => navigate(1)}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              className={`px-3 py-1 text-sm border rounded-md ${
                view === 'month'
                  ? 'bg-blue-50 text-blue-600 border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setView('month')}
            >
              Month
            </button>
            <button
              className={`px-3 py-1 text-sm border rounded-md ${
                view === 'week'
                  ? 'bg-blue-50 text-blue-600 border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setView('week')}
            >
              Week
            </button>
            <button
              className={`px-3 py-1 text-sm border rounded-md ${
                view === 'day'
                  ? 'bg-blue-50 text-blue-600 border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setView('day')}
            >
              Day
            </button>
          </div>
        </div>

        {renderCalendarContent()}
      </div>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
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

      {/* Event Details Modal */}
      {showEventDetailsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-medium">Event Details</h2>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowEventDetailsModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium">{selectedEvent.title}</h3>
                  <p className="text-gray-500">
                    {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-gray-700">
                    {selectedEvent.startTime} - {selectedEvent.endTime}
                  </p>
                </div>

                {selectedEvent.description && (
                  <div>
                    <h4 className="font-medium mb-1">Description</h4>
                    <p className="text-gray-700">{selectedEvent.description}</p>
                  </div>
                )}

                {selectedEvent.attendees?.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Attendees</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.attendees.map((userId) => {
                        const user = users.find((u) => u.id === userId);
                        return (
                          <div
                            key={userId}
                            className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full"
                          >
                            <div
                              className={`w-5 h-5 rounded-full ${user.color} flex items-center justify-center text-white text-xs`}
                            >
                              {userId}
                            </div>
                            <span>{user.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
