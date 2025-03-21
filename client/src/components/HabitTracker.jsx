import React, { useState } from 'react';
import './HabitTracker.css';  

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  const handleAddHabit = () => {
    if (newHabit.trim()) {
      const newHabitObj = {
        id: Date.now(),
        name: newHabit,
        dateAdded: new Date().toLocaleDateString(),
        completed: false
      };
      setHabits([...habits, newHabitObj]);
      setNewHabit('');
    }
  };

  const toggleCompletion = (id) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
  };

  const handleDelete = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  return (
    <div className="habit-tracker">
      <h1>🔥 Habit Tracker</h1>

      {/* Input Field */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a new habit"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button onClick={handleAddHabit}>Add Habit</button>
      </div>

      {/* Display Habit Cards */}
      <div className="habit-container">
        {habits.length === 0 ? (
          <p className="text-muted">No habits added yet!</p>
        ) : (
          habits.map((habit) => (
            <div key={habit.id} className={`habit-card ${habit.completed ? 'completed' : ''}`}>
              <h5>{habit.name}</h5>   {/* ✅ Name renders properly */}
              <p>Added on: {habit.dateAdded}</p>
              
              <div className="btn-group">
                <button
                  className={`btn ${habit.completed ? 'btn-danger' : 'btn-primary'}`}
                  onClick={() => toggleCompletion(habit.id)}
                >
                  {habit.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(habit.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HabitTracker;
