import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import FadingBorder from "./neon-border";
import 'react-day-picker/dist/style.css';

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function ScheduleMeeting() {
  const [isClient, setIsClient] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const timeSlots: TimeSlot[] = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: true },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Appointment booked successfully!');
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
    } catch (error) {
      alert('Failed to book appointment. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <CalendarIcon className="w-6 h-6 text-blue-400" />,
      title: "Flexible Scheduling",
      description: "Book meetings that work with your timezone and availability"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      title: "Instant Confirmation",
      description: "Receive immediate confirmation and calendar invites"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: "Team Availability",
      description: "See our entire team's availability in real-time"
    }
  ];

  const gradientStyle = {
    background: `radial-gradient(35% 25% at 50% 56.1%, rgba(80,176,250,0.1) 0%, rgba(64,140,199,0.1) 36.49%, rgb(10, 10, 10) 100%)`,
  };

  const calendarClassNames = {
    months: 'text-white',
    month: 'text-white',
    caption: 'text-white mb-4',
    caption_label: 'text-xl font-semibold',
    nav: 'space-x-1',
    nav_button: 'inline-flex items-center justify-center p-1 rounded-md border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600',
    nav_button_previous: 'absolute left-1',
    nav_button_next: 'absolute right-1',
    table: 'w-full border-collapse',
    head_row: 'flex font-medium text-gray-400',
    head_cell: 'w-9 font-normal text-sm m-0.5',
    row: 'flex w-full mt-2',
    cell: 'text-center text-sm relative p-0 m-0.5 rounded-md hover:bg-gray-800 focus-within:relative focus-within:z-20',
    day: 'h-9 w-9 p-0 font-normal',
    day_selected: 'bg-blue-500 text-white hover:bg-blue-600',
    day_today: 'text-blue-400 font-semibold',
    day_outside: 'text-gray-600',
    day_disabled: 'text-gray-600',
    day_hidden: 'invisible',
  };

  return (
    <section id="schedule" className="relative" style={gradientStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-[100px] md:leading-[120px] mb-4">
            <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
              Schedule a Session
            </span>
          </h2>

          <p className="text-gray-400 text-center text-lg mb-16">
            Book a time to discuss your project, explore AI solutions, or learn more about our services
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="gradient-border p-8 relative bg-[#0f0f0f]/50 rounded-xl overflow-hidden group-hover:bg-[#0f0f0f]/80 transition-all duration-500 h-full">
                <FadingBorder side="top" />
                <div className="relative z-10">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-medium bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative gradient-border p-8 bg-[#0f0f0f]/50 rounded-xl overflow-hidden"
        >
          <FadingBorder side="top" />
          <div className="relative z-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#0f0f0f] p-6 rounded-xl">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  classNames={calendarClassNames}
                  modifiers={{
                    disabled: [
                      { before: new Date() },
                      { dayOfWeek: [0, 6] }
                    ]
                  }}
                />
              </div>

              <div className="space-y-6">
                {selectedDate && (
                  <div>
                    <h3 className="text-white text-lg font-medium mb-4">Available Times</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                            selectedTime === slot.time
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                          disabled={!slot.available}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTime && (
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <button
                      onClick={handleBookAppointment}
                      disabled={loading}
                      className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Booking...' : 'Book Appointment'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
            }}
          />
        ))}
      </div>

      <div className="blue-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </section>
  );
}