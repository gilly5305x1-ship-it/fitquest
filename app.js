/**
 * FitQuest - Game Engine & Application Logic
 */

// --- INITIAL STATE ---
const DEFAULT_STATE = {
  level: 1,
  xp: 0,
  gold: 0,
  hp: 100,
  streak: 0,
  lastActiveDate: null,
  boostEndTime: 0,
  workoutStats: {
    totalWorkouts: 0,
    totalCalories: 0,
    totalSpentGold: 0
  },
  dailyQuests: [],
  historyLogs: [],
  weeklyActivity: [
    { day: 'Mon', xp: 0, gold: 0 },
    { day: 'Tue', xp: 0, gold: 0 },
    { day: 'Wed', xp: 0, gold: 0 },
    { day: 'Thu', xp: 0, gold: 0 },
    { day: 'Fri', xp: 0, gold: 0 },
    { day: 'Sat', xp: 0, gold: 0 },
    { day: 'Sun', xp: 0, gold: 0 }
  ],
  questsGeneratedDate: null,
  soundEnabled: true,
  playerName: "Beni",
  weeklyProgram: {
    preset: 'hybrid',
    completedDays: {},
    claimedDays: {},
    lastWeekNum: null
  },
  calorieDeficit: {
    foodIntake: 0,
    activeBurned: 0,
    deficitClaimedDate: null,
    foodLogs: []
  },
  weightHistory: [
    { date: "2026-06-21", weight: 85.8 },
    { date: "2026-06-28", weight: 85.0 }
  ],
  monthlyActivity: [
    { date: "2026-06-04", xp: 30, gold: 20 },
    { date: "2026-06-05", xp: 45, gold: 25 },
    { date: "2026-06-06", xp: 15, gold: 10 },
    { date: "2026-06-07", xp: 20, gold: 15 },
    { date: "2026-06-08", xp: 50, gold: 30 },
    { date: "2026-06-09", xp: 40, gold: 25 },
    { date: "2026-06-10", xp: 0, gold: 0 },
    { date: "2026-06-11", xp: 35, gold: 20 },
    { date: "2026-06-12", xp: 60, gold: 40 },
    { date: "2026-06-13", xp: 15, gold: 10 },
    { date: "2026-06-14", xp: 20, gold: 15 },
    { date: "2026-06-15", xp: 55, gold: 35 },
    { date: "2026-06-16", xp: 40, gold: 25 },
    { date: "2026-06-17", xp: 0, gold: 0 },
    { date: "2026-06-18", xp: 45, gold: 30 },
    { date: "2026-06-19", xp: 50, gold: 35 },
    { date: "2026-06-20", xp: 25, gold: 15 },
    { date: "2026-06-21", xp: 20, gold: 15 },
    { date: "2026-06-22", xp: 60, gold: 40 },
    { date: "2026-06-23", xp: 35, gold: 20 },
    { date: "2026-06-24", xp: 0, gold: 0 },
    { date: "2026-06-25", xp: 40, gold: 25 },
    { date: "2026-06-26", xp: 55, gold: 35 },
    { date: "2026-06-27", xp: 20, gold: 15 },
    { date: "2026-06-28", xp: 20, gold: 15 },
    { date: "2026-06-29", xp: 65, gold: 45 },
    { date: "2026-06-30", xp: 40, gold: 30 },
    { date: "2026-07-01", xp: 0, gold: 0 },
    { date: "2026-07-02", xp: 45, gold: 30 }
  ]
};

let gameState = JSON.parse(JSON.stringify(DEFAULT_STATE));
let currentProgressView = 'week';

const PROGRAM_PRESETS = {
  hybrid: [
    { day: 'Mon', name: 'Deadlifts', type: 'workout', target: '25 mins', details: 'Weight Training' },
    { day: 'Tue', name: 'Cycling', type: 'workout', target: '20 mins', details: 'Cardio' },
    { day: 'Wed', name: 'Rest Day', type: 'rest', target: 'Recovery', details: 'Rest Day' },
    { day: 'Thu', name: 'Push-ups', type: 'workout', target: '15 mins', details: 'Body Weight' },
    { day: 'Fri', name: 'Burpees', type: 'workout', target: '12 mins', details: 'HIIT' },
    { day: 'Sat', name: 'Yoga', type: 'workout', target: '15 mins', details: 'Active Recovery' },
    { day: 'Sun', name: 'Rest Day', type: 'rest', target: 'Recovery', details: 'Rest Day' }
  ],
  balanced: [
    { day: 'Mon', name: 'Running', type: 'workout', target: '20 mins', details: 'Running' },
    { day: 'Tue', name: 'Squats', type: 'workout', target: '10 mins', details: 'Squats' },
    { day: 'Wed', name: 'Rest Day', type: 'rest', target: 'Recovery', details: 'Rest Day' },
    { day: 'Thu', name: 'Burpees', type: 'workout', target: '10 mins', details: 'Burpees' },
    { day: 'Fri', name: 'Push-ups', type: 'workout', target: '10 mins', details: 'Push-ups' },
    { day: 'Sat', name: 'Yoga', type: 'workout', target: '15 mins', details: 'Yoga' },
    { day: 'Sun', name: 'Rest Day', type: 'rest', target: 'Recovery', details: 'Rest Day' }
  ],
  strength: [
    { day: 'Mon', name: 'Push-ups', type: 'workout', target: '12 mins', details: 'Push-ups' },
    { day: 'Tue', name: 'Squats', type: 'workout', target: '12 mins', details: 'Squats' },
    { day: 'Wed', name: 'Rest Day', type: 'rest', target: 'Recovery', details: 'Rest Day' },
    { day: 'Thu', name: 'Pull-ups', type: 'workout', target: '10 mins', details: 'Pull-ups' },
    { day: 'Fri', name: 'Deadlifts', type: 'workout', target: '10 mins', details: 'Deadlifts' },
    { day: 'Sat', name: 'Stretching', type: 'workout', target: '15 mins', details: 'Stretching' },
    { day: 'Sun', name: 'Rest Day', type: 'rest', target: 'Recovery', details: 'Rest Day' }
  ],
  cardio: [
    { day: 'Mon', name: 'Running', type: 'workout', target: '25 mins', details: 'Running' },
    { day: 'Tue', name: 'Cycling', type: 'workout', target: '20 mins', details: 'Cycling' },
    { day: 'Wed', name: 'Rest Day', type: 'rest', target: 'Recovery', details: 'Rest Day' },
    { day: 'Thu', name: 'Jump Rope', type: 'workout', target: '12 mins', details: 'Jump Rope' },
    { day: 'Fri', name: 'Mountain Climbers', type: 'workout', target: '10 mins', details: 'Mountain Climbers' },
    { day: 'Sat', name: 'Yoga', type: 'workout', target: '20 mins', details: 'Yoga' },
    { day: 'Sun', name: 'Rest Day', type: 'rest', target: 'Recovery', details: 'Rest Day' }
  ]
};

// Preset constants
const RANKS = [
  "Level 1 Recruit", 
  "Novice Lifter", 
  "Cardio Squire", 
  "Fitness Adept", 
  "Iron Warrior", 
  "Core Champion", 
  "Apex Athlete", 
  "Grandmaster Vanguard"
];

const PREDEFINED_SHOP = {
  nutrition: [
    { id: 'smoothie', name: 'Green Smoothie', desc: 'Fresh spinach, kiwi, and apple. Heals 20 HP.', price: 25, hp: 20, boostMin: 0, boostPct: 0, type: 'nutrition', icon: '🥤' },
    { id: 'shake', name: 'Whey Protein Shake', desc: 'Double chocolate isolate. Heals 45 HP + 10% XP boost for 15 mins.', price: 50, hp: 45, boostMin: 15, boostPct: 10, type: 'nutrition', icon: '🥛' },
    { id: 'bowl', name: 'Açai Superfood Bowl', desc: 'Berries, quinoa, and chia seeds. Heals 80 HP + 20% XP boost for 30 mins.', price: 80, hp: 80, boostMin: 30, boostPct: 20, type: 'nutrition', icon: '🍧' }
  ],
  rewards: [
    { id: 'gaming', name: '1 Hour Gaming Session', desc: 'Claim a code to game guilt-free.', price: 120, type: 'reward', icon: '🎮' },
    { id: 'movie', name: 'Watch a Movie / Episode', desc: 'Watch your favorite show guilt-free.', price: 80, type: 'reward', icon: '🎬' },
    { id: 'pizza', name: 'Cheat Pizza Slice', desc: 'Earned slice of cheesy deliciousness.', price: 200, type: 'reward', icon: '🍕' },
    { id: 'sleepin', name: '30 Mins Sleep In', desc: 'Extra snooze time earned through sweat.', price: 60, type: 'reward', icon: '🛌' },
    { id: 'book', name: 'Purchase New Book/Novel', desc: 'Indulge in guilt-free reading time.', price: 300, type: 'reward', icon: '📚' }
  ]
};

const MOTIVATIONAL_QUOTES = [
  "No matter how slow you go, you are still lapping everyone on the couch.",
  "Your body can stand almost anything. It's your mind that you have to convince.",
  "The only bad workout is the one that didn't happen.",
  "Success isn't always about greatness. It's about consistency.",
  "Work hard in silence, let your success be your noise.",
  "Energy flows where attention goes. Focus on your strength today.",
  "Every drop of sweat is a token earned for your future self."
];

// --- WEB AUDIO ENGINE ---
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSound(type) {
  if (!gameState.soundEnabled) return;
  try {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'coin') {
      // High-pitched chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1320, now + 0.08); // Arpeggio
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'levelup') {
      // Fanfare
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const subOsc = audioCtx.createOscillator();
        const subGain = audioCtx.createGain();
        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(freq, now + idx * 0.1);
        subGain.gain.setValueAtTime(0.06, now + idx * 0.1);
        subGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 0.4);
        subOsc.connect(subGain);
        subGain.connect(audioCtx.destination);
        subOsc.start(now + idx * 0.1);
        subOsc.stop(now + idx * 0.1 + 0.45);
      });
    } else if (type === 'timer_tick') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'timer_complete') {
      // Victory alarm
      const duration = 0.6;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.linearRampToValueAtTime(880.00, now + 0.3); // A5
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.start(now);
      osc.stop(now + duration);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch (e) {
    console.warn("Sound playback error: ", e);
  }
}

// --- STATE PERSISTENCE ---
function saveToLocalStorage() {
  localStorage.setItem('fitquest_gamestate', JSON.stringify(gameState));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem('fitquest_gamestate');
  if (data) {
    try {
      const parsed = JSON.parse(data);
      // Merge with default state structure for backward compatibility
      gameState = Object.assign({}, DEFAULT_STATE, parsed);
      // Also deep merge stats, weeklyActivity, weeklyProgram, and calorieDeficit
      gameState.workoutStats = Object.assign({}, DEFAULT_STATE.workoutStats, parsed.workoutStats);
      gameState.weeklyProgram = Object.assign({}, DEFAULT_STATE.weeklyProgram, parsed.weeklyProgram);
      gameState.calorieDeficit = Object.assign({}, DEFAULT_STATE.calorieDeficit, parsed.calorieDeficit);
      if (parsed.weightHistory) gameState.weightHistory = parsed.weightHistory;
      if (parsed.weeklyActivity) gameState.weeklyActivity = parsed.weeklyActivity;
      if (parsed.monthlyActivity) gameState.monthlyActivity = parsed.monthlyActivity;
      
      if (gameState.playerName === "Aegis Athlete" || !gameState.playerName) {
        gameState.playerName = "Beni";
      }

      if (gameState.weeklyProgram.preset === 'balanced') {
        gameState.weeklyProgram.preset = 'hybrid';
      }

      // Check quest and program reset
      checkQuestReset();
      checkWeeklyProgramRollover();
      updateUI();
    } catch (e) {
      console.error("Failed to load local storage state, using defaults.", e);
      gameState = JSON.parse(JSON.stringify(DEFAULT_STATE));
      generateQuests();
    }
  } else {
    // Generate fresh quests
    generateQuests();
  }
}

// --- QUEST GENERATOR ---
function generateQuests() {
  const today = new Date().toDateString();
  gameState.questsGeneratedDate = today;

  gameState.dailyQuests = [
    {
      id: 'quest_workout',
      title: 'Fit and Active',
      desc: 'Complete at least 1 workout session.',
      target: 1,
      current: 0,
      rewardGold: 25,
      rewardXp: 35,
      completed: false,
      claimed: false,
      type: 'workout'
    },
    {
      id: 'quest_calories',
      title: 'Caloric Burner',
      desc: 'Burn a total of 150 kcal through exercise.',
      target: 150,
      current: 0,
      rewardGold: 40,
      rewardXp: 50,
      completed: false,
      claimed: false,
      type: 'calories'
    },
    {
      id: 'quest_spend',
      title: 'Healthy Choices',
      desc: 'Spend at least 40 Gold in the marketplace.',
      target: 40,
      current: 0,
      rewardGold: 30,
      rewardXp: 40,
      completed: false,
      claimed: false,
      type: 'spend'
    }
  ];
  saveToLocalStorage();
}

function checkQuestReset() {
  const today = new Date().toDateString();
  if (gameState.questsGeneratedDate !== today) {
    generateQuests();
    gameState.calorieDeficit.foodIntake = 0;
    gameState.calorieDeficit.activeBurned = 0;
    gameState.calorieDeficit.deficitClaimedDate = null;
    gameState.calorieDeficit.foodLogs = [];
    saveToLocalStorage();
  }
}

function updateQuestProgress(type, val) {
  checkQuestReset();
  gameState.dailyQuests.forEach(quest => {
    if (quest.type === type && !quest.completed) {
      quest.current = Math.min(quest.target, quest.current + val);
      if (quest.current >= quest.target) {
        quest.completed = true;
        addLog('quest_complete', quest.title, `Completed daily quest: "${quest.title}"`, `+${quest.rewardGold}g / +${quest.rewardXp}XP`, true, 'quest');
        playSound('levelup');
      }
    }
  });
  saveToLocalStorage();
}

// --- LEVEL UP ENGINE ---
function addXp(amount) {
  let xpMultiplier = 1.0;
  // Check active boost
  const now = Date.now();
  if (gameState.boostEndTime > now) {
    // 10% boost is active or custom percentage
    xpMultiplier += 0.1;
  }

  const gained = Math.round(amount * xpMultiplier);
  gameState.xp += gained;
  
  // Track today's XP in weeklyActivity
  trackWeeklyXP(gained);

  // Level Up loop
  const xpNeeded = getXpNeeded(gameState.level);
  if (gameState.xp >= xpNeeded) {
    gameState.xp -= xpNeeded;
    gameState.level += 1;
    gameState.hp = getMaxHp(gameState.level); // Heal to max
    triggerLevelUpModal();
  }

  saveToLocalStorage();
  return gained;
}

function addGold(amount) {
  gameState.gold += amount;
  // Track today's Gold in weeklyActivity
  trackWeeklyGold(amount);
  saveToLocalStorage();
}

function deductGold(amount) {
  if (gameState.gold >= amount) {
    gameState.gold -= amount;
    gameState.workoutStats.totalSpentGold += amount;
    updateQuestProgress('spend', amount);
    saveToLocalStorage();
    return true;
  }
  return false;
}

function getMaxHp(lvl) {
  return 100 + (lvl - 1) * 10;
}

function getXpNeeded(lvl) {
  return lvl * 100;
}

function getPlayerRank(lvl) {
  const index = Math.min(RANKS.length - 1, Math.floor((lvl - 1) / 2));
  return RANKS[index];
}

// Helper to record activity for the current day of the week
function trackWeeklyXP(amount) {
  const currentDayIndex = new Date().getDay();
  const daysMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = daysMap[currentDayIndex];
  
  const record = gameState.weeklyActivity.find(r => r.day === dayName);
  if (record) {
    record.xp += amount;
  }
  trackMonthlyXP(amount);
}

function trackWeeklyGold(amount) {
  const currentDayIndex = new Date().getDay();
  const daysMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = daysMap[currentDayIndex];
  
  const record = gameState.weeklyActivity.find(r => r.day === dayName);
  if (record) {
    record.gold += amount;
  }
  trackMonthlyGold(amount);
}

function trackMonthlyXP(amount) {
  if (!gameState.monthlyActivity) gameState.monthlyActivity = [];
  const todayStr = new Date().toISOString().split('T')[0];
  const record = gameState.monthlyActivity.find(r => r.date === todayStr);
  if (record) {
    record.xp += amount;
  } else {
    gameState.monthlyActivity.push({ date: todayStr, xp: amount, gold: 0 });
    if (gameState.monthlyActivity.length > 30) {
      gameState.monthlyActivity.shift();
    }
  }
}

function trackMonthlyGold(amount) {
  if (!gameState.monthlyActivity) gameState.monthlyActivity = [];
  const todayStr = new Date().toISOString().split('T')[0];
  const record = gameState.monthlyActivity.find(r => r.date === todayStr);
  if (record) {
    record.gold += amount;
  } else {
    gameState.monthlyActivity.push({ date: todayStr, xp: 0, gold: amount });
    if (gameState.monthlyActivity.length > 30) {
      gameState.monthlyActivity.shift();
    }
  }
}

// --- LOGGING ---
function addLog(type, name, msg, valText, isPositive, category) {
  const newLog = {
    id: 'log_' + Date.now() + Math.random().toString(36).substring(2, 6),
    type,
    name,
    msg,
    valText,
    date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }),
    isPositive,
    category // 'workout', 'shop', 'quest', 'level'
  };

  gameState.historyLogs.unshift(newLog);
  // Cap logs at 50 to prevent bloated localStorage
  if (gameState.historyLogs.length > 50) {
    gameState.historyLogs.pop();
  }
  saveToLocalStorage();
}

// --- ACTIVE TIMER CONTROLLER ---
let timerInterval = null;
let timerDuration = 60; // default 1 min
let timerTimeLeft = 60;
let timerActive = false;
let timerExercise = "";
let timerIntensity = "Medium";
let timerDoubleXp = true; // active timers earn double XP

// Quotes picker
let quoteInterval = null;

// --- CONFETTI CANVAS CONTROLLER ---
let confettiAnimationId = null;
let confettiParticles = [];

class ConfettiParticle {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.size = Math.random() * 8 + 6;
    this.color = `hsl(${Math.random() * 360}, 90%, 60%)`;
    this.speedY = Math.random() * 4 + 3;
    this.speedX = Math.random() * 2 - 1;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 10 - 5;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    if (this.y > this.canvas.height) {
      this.y = -20;
      this.x = Math.random() * this.canvas.width;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

function initConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  confettiParticles = [];
  for (let i = 0; i < 150; i++) {
    confettiParticles.push(new ConfettiParticle(canvas));
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach(p => {
      p.update();
      p.draw(ctx);
    });
    confettiAnimationId = requestAnimationFrame(loop);
  }

  loop();
}

function stopConfetti() {
  if (confettiAnimationId) {
    cancelAnimationFrame(confettiAnimationId);
    confettiAnimationId = null;
  }
}

// --- LIGHTWEIGHT CHART DRAWING ---
function drawAnalyticsChart() {
  const canvas = document.getElementById('analyticsChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Resize canvas internally to match CSS display
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  const padding = { top: 20, right: 15, bottom: 25, left: 35 };

  // Data
  const data = gameState.weeklyActivity;
  const maxVal = Math.max(...data.map(d => Math.max(d.xp, d.gold)), 50); // Min scale of 50

  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  if (currentProgressView === 'month') {
    const mData = gameState.monthlyActivity || [];
    if (mData.length === 0) {
      ctx.fillStyle = '#64748b';
      ctx.font = '11px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("No monthly logs yet", width / 2, height / 2);
      return;
    }

    const xps = mData.map(d => d.xp);
    const golds = mData.map(d => d.gold);
    const mMaxVal = Math.max(...xps, ...golds, 50);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const linesCount = 3;
    for (let i = 0; i <= linesCount; i++) {
      const y = padding.top + (graphHeight / linesCount) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '8px "Outfit", sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      const val = Math.round(mMaxVal - (mMaxVal / linesCount) * i);
      ctx.fillText(val, padding.left - 8, y);
    }

    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let xpPoints = [];
    mData.forEach((d, idx) => {
      const x = padding.left + (graphWidth / (mData.length - 1)) * idx;
      const y = padding.top + graphHeight - (d.xp / mMaxVal) * graphHeight;
      xpPoints.push({ x, y });
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let goldPoints = [];
    mData.forEach((d, idx) => {
      const x = padding.left + (graphWidth / (mData.length - 1)) * idx;
      const y = padding.top + graphHeight - (d.gold / mMaxVal) * graphHeight;
      goldPoints.push({ x, y });
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    const labelIndices = [0, Math.floor(mData.length / 2), mData.length - 1];
    labelIndices.forEach(idx => {
      if (idx < mData.length) {
        const d = mData[idx];
        const dateObj = new Date(d.date);
        const formatted = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
        const x = padding.left + (graphWidth / (mData.length - 1)) * idx;
        
        ctx.fillStyle = '#64748b';
        ctx.font = '8px "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(formatted, x, padding.top + graphHeight + 5);
      }
    });

    return;
  }

  // Draw Grid Lines (Horizontal)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  const linesCount = 3;
  for (let i = 0; i <= linesCount; i++) {
    const y = padding.top + (graphHeight / linesCount) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();

    // Value Labels
    ctx.fillStyle = '#64748b';
    ctx.font = '9px "Outfit", sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const val = Math.round(maxVal - (maxVal / linesCount) * i);
    ctx.fillText(val, padding.left - 8, y);
  }

  // Draw Bars
  const barSpacing = graphWidth / data.length;
  const barWidth = Math.max(6, barSpacing * 0.3);

  data.forEach((d, idx) => {
    const x = padding.left + barSpacing * idx + barSpacing / 2;

    // XP Bar (Indigo)
    const xpHeight = (d.xp / maxVal) * graphHeight;
    const xpY = padding.top + graphHeight - xpHeight;
    
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.roundRect(x - barWidth - 2, xpY, barWidth, xpHeight, [2, 2, 0, 0]);
    ctx.fill();

    // Gold Bar (Amber)
    const goldHeight = (d.gold / maxVal) * graphHeight;
    const goldY = padding.top + graphHeight - goldHeight;
    
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(x + 2, goldY, barWidth, goldHeight, [2, 2, 0, 0]);
    ctx.fill();

    // Day Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(d.day, x, padding.top + graphHeight + 6);
  });
}

// --- UI UPDATER ---
function updateUI() {
  // Stats
  document.getElementById('playerLevel').innerText = `LV ${gameState.level}`;
  document.getElementById('playerName').innerText = gameState.playerName || "Beni";
  document.getElementById('playerRank').innerText = getPlayerRank(gameState.level);
  
  // HP
  const maxHp = getMaxHp(gameState.level);
  document.getElementById('playerHpText').innerText = `${gameState.hp} / ${maxHp}`;
  document.getElementById('playerHpBar').style.width = `${Math.min(100, (gameState.hp / maxHp) * 100)}%`;

  // XP
  const xpNeeded = getXpNeeded(gameState.level);
  document.getElementById('playerXpText').innerText = `${gameState.xp} / ${xpNeeded}`;
  document.getElementById('playerXpBar').style.width = `${Math.min(100, (gameState.xp / xpNeeded) * 100)}%`;

  // Currencies
  document.getElementById('playerGold').innerText = gameState.gold;
  
  // Streaks (Calculate active streaks)
  updateStreakCounter();

  // Boost Indicator
  const now = Date.now();
  if (gameState.boostEndTime > now) {
    const minLeft = Math.round((gameState.boostEndTime - now) / 60000);
    document.getElementById('boostIndicator').style.display = 'flex';
    document.getElementById('boostText').innerText = `+10% XP Boost (${minLeft}m)`;
  } else {
    document.getElementById('boostIndicator').style.display = 'none';
  }

  // Quests rendering
  renderQuests();

  // Analytics Metrics
  document.getElementById('statsWorkouts').innerText = gameState.workoutStats.totalWorkouts;
  document.getElementById('statsCalories').innerText = `${gameState.workoutStats.totalCalories} kcal`;
  document.getElementById('statsSpent').innerText = `${gameState.workoutStats.totalSpentGold}g`;

  // Draw chart
  drawAnalyticsChart();

  // Render marketplace
  renderShop();

  // Render logs
  renderLogs();

  // Sync Weekly Program Preset selector
  const presetSelect = document.getElementById('programPresetSelect');
  if (presetSelect) {
    presetSelect.value = gameState.weeklyProgram.preset;
  }

  // Render Weekly Program
  renderWeeklyProgram();

  // Update Calorie Deficit UI
  updateCalorieDeficitUI();

  // Update Weight Tracker UI
  updateWeightTrackerUI();

  // Update Analytics Tab UI
  updateAnalyticsTabUI();
}

function updateStreakCounter() {
  const streakText = gameState.streak > 0 ? `${gameState.streak}d` : '0d';
  document.getElementById('playerStreak').innerText = streakText;
}

// Calculates and updates active streak
function calculateStreak() {
  const todayStr = new Date().toDateString();
  
  if (!gameState.lastActiveDate) {
    gameState.streak = 1;
    gameState.lastActiveDate = todayStr;
    saveToLocalStorage();
    return;
  }

  const lastDate = new Date(gameState.lastActiveDate);
  const todayDate = new Date(todayStr);
  const diffTime = Math.abs(todayDate - lastDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Consecutive day
    gameState.streak += 1;
    gameState.lastActiveDate = todayStr;
  } else if (diffDays > 1) {
    // Streak broken
    gameState.streak = 1;
    gameState.lastActiveDate = todayStr;
  }
  
  saveToLocalStorage();
}

function renderQuests() {
  const container = document.getElementById('questsList');
  container.innerHTML = "";

  gameState.dailyQuests.forEach(quest => {
    const isCompleted = quest.completed;
    const isClaimed = quest.claimed;
    
    const card = document.createElement('div');
    card.className = `quest-card ${isCompleted ? 'completed' : ''}`;
    
    let actionBtn = "";
    if (isCompleted && !isClaimed) {
      actionBtn = `<button class="claim-btn" onclick="claimQuestReward('${quest.id}')">Claim Rewards</button>`;
    } else if (isClaimed) {
      actionBtn = `<button class="claim-btn" disabled>Rewards Claimed</button>`;
    } else {
      // Progress percentage
      const pct = Math.round((quest.current / quest.target) * 100);
      actionBtn = `
        <div style="width:100%; display:flex; flex-direction:column; gap:0.25rem;">
          <div class="quest-progress-info">
            <span>Progress: ${pct}%</span>
            <span>${quest.current} / ${quest.target}</span>
          </div>
          <div class="stat-bar-track" style="height:0.5rem;">
            <div class="stat-bar-fill xp" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="quest-header">
        <span class="quest-title">${quest.title}</span>
        <span class="quest-status-badge ${isCompleted ? 'done' : 'pending'}">${isCompleted ? 'ready' : 'active'}</span>
      </div>
      <p class="quest-desc">${quest.desc}</p>
      
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem; gap:0.5rem; flex-wrap:wrap;">
        <div class="quest-reward">
          <div class="reward-item gold">🪙 +${quest.rewardGold}</div>
          <div class="reward-item xp">⭐ +${quest.rewardXp}</div>
        </div>
      </div>
      <div style="margin-top:0.5rem; width:100%;">
        ${actionBtn}
      </div>
    `;
    container.appendChild(card);
  });
}

function claimQuestReward(questId) {
  const quest = gameState.dailyQuests.find(q => q.id === questId);
  if (quest && quest.completed && !quest.claimed) {
    quest.claimed = true;
    addGold(quest.rewardGold);
    addXp(quest.rewardXp);
    playSound('coin');
    addLog('reward_claim', quest.title, `Claimed reward for daily quest: "${quest.title}"`, `+${quest.rewardGold}g / +${quest.rewardXp}XP`, true, 'quest');
    updateUI();
  }
}

let activeShopTab = 'nutrition';
function renderShop() {
  const container = document.getElementById('shopItemsGrid');
  container.innerHTML = "";

  const items = PREDEFINED_SHOP[activeShopTab];
  
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'shop-card';
    
    const isNutrition = item.type === 'nutrition';
    const btnLabel = isNutrition ? 'Eat / Drink' : 'Purchase Voucher';
    const iconClass = isNutrition ? 'nutrition' : '';
    
    // Check gold restriction
    const canBuy = gameState.gold >= item.price;

    card.innerHTML = `
      <div class="shop-icon-container ${iconClass}">
        <span class="shop-icon" style="font-size:1.75rem;">${item.icon}</span>
      </div>
      <div class="shop-info">
        <h3>${item.name}</h3>
        <p class="shop-desc">${item.desc}</p>
      </div>
      <div class="shop-footer">
        <div class="shop-price">🪙 ${item.price}g</div>
        <button class="buy-btn" ${canBuy ? '' : 'disabled'} onclick="buyShopItem('${item.id}', '${item.type}')">
          ${btnLabel}
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function buyShopItem(itemId, type) {
  const list = PREDEFINED_SHOP[type];
  const item = list.find(i => i.id === itemId);
  if (!item) return;

  if (deductGold(item.price)) {
    playSound('coin');
    
    if (type === 'nutrition') {
      // Nutrition boost mechanics
      const maxHp = getMaxHp(gameState.level);
      gameState.hp = Math.min(maxHp, gameState.hp + item.hp);
      
      let logValStr = `+${item.hp} HP`;

      if (item.boostMin > 0) {
        const now = Date.now();
        // Stack boost if already exists, otherwise set new
        if (gameState.boostEndTime > now) {
          gameState.boostEndTime += (item.boostMin * 60 * 1000);
        } else {
          gameState.boostEndTime = now + (item.boostMin * 60 * 1000);
        }
        logValStr += ` & XP Boost (${item.boostMin}m)`;
      }

      addLog('eat_food', item.name, `Consumed ${item.name} from shop`, logValStr, true, 'shop');
      updateUI();
    } else {
      // Leisure Reward voucher mechanics
      const voucherCode = generateVoucherCode(item.name);
      addLog('buy_reward', item.name, `Redeemed voucher for real-life reward: "${item.name}"`, `-${item.price}g`, false, 'shop');
      triggerVoucherModal(item.name, voucherCode);
      updateUI();
    }
  } else {
    playSound('error');
    alert("Insufficient Gold! Do more workouts to earn points.");
  }
}

function generateVoucherCode(name) {
  const cleanName = name.replace(/[^a-zA-Z]/g, "").substring(0, 4).toUpperCase();
  const randNum = Math.floor(1000 + Math.random() * 9000);
  return `${cleanName}-${randNum}`;
}

function renderLogs() {
  const container = document.getElementById('activityLogsList');
  container.innerHTML = "";

  if (gameState.historyLogs.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-muted);">No recorded activities yet. Start exercising to log stats!</div>`;
    return;
  }

  gameState.historyLogs.forEach(log => {
    const item = document.createElement('div');
    item.className = 'log-item';
    
    let icon = "📝";
    if (log.category === 'workout') icon = "💪";
    if (log.category === 'shop') icon = "🛒";
    if (log.category === 'quest') icon = "🏆";
    if (log.category === 'level') icon = "✨";

    const gainClass = log.isPositive ? 'plus' : 'minus';
    const gainSymbol = log.isPositive ? '+' : '';

    item.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.75rem;">
        <span style="font-size:1.5rem;">${icon}</span>
        <div class="log-meta">
          <span class="log-name">${log.msg}</span>
          <span class="log-date">${log.date}</span>
        </div>
      </div>
      <div class="log-reward-gain">
        <span class="log-gain ${gainClass}">${log.valText}</span>
      </div>
    `;
    container.appendChild(item);
  });
}

// --- LOG WORKOUT MODAL TRIGGERS ---
function openLogModal() {
  playSound('click');
  document.getElementById('logModal').classList.add('active');
  calculateLogPreview();
}

function closeLogModal() {
  playSound('click');
  document.getElementById('logModal').classList.remove('active');
}

function calculateLogPreview() {
  const select = document.getElementById('logExerciseSelect');
  const customGroup = document.getElementById('logCustomNameGroup');
  
  if (select.value === 'Custom') {
    customGroup.style.display = 'block';
  } else {
    customGroup.style.display = 'none';
  }

  const duration = parseInt(document.getElementById('logDuration').value) || 0;
  const intensity = document.getElementById('logIntensity').value;
  
  let calFactor = 8; // Medium
  let mult = 1.5;
  if (intensity === 'Easy') { calFactor = 5; mult = 1.0; }
  if (intensity === 'Hard') { calFactor = 12; mult = 2.2; }

  const cal = duration * calFactor;
  const gold = Math.round(duration * mult);
  const xp = Math.round(duration * mult * 1.5);

  document.getElementById('logEstKcal').innerText = `${cal} kcal`;
  document.getElementById('logEstGold').innerText = `+${gold}g`;
  document.getElementById('logEstXp').innerText = `+${xp} XP`;
}

function submitLoggedWorkout() {
  const select = document.getElementById('logExerciseSelect');
  let exName = select.value;
  if (exName === 'Custom') {
    exName = document.getElementById('logCustomName').value.trim() || 'Custom Workout';
  }

  const duration = parseInt(document.getElementById('logDuration').value) || 0;
  const intensity = document.getElementById('logIntensity').value;

  if (duration <= 0) {
    playSound('error');
    alert("Duration must be a positive number of minutes!");
    return;
  }

  let calFactor = 8;
  let mult = 1.5;
  if (intensity === 'Easy') { calFactor = 5; mult = 1.0; }
  if (intensity === 'Hard') { calFactor = 12; mult = 2.2; }

  const cal = duration * calFactor;
  const goldEarned = Math.round(duration * mult);
  const baseXp = Math.round(duration * mult * 1.5);

  // Update State
  addGold(goldEarned);
  const actualXp = addXp(baseXp);
  
  gameState.workoutStats.totalWorkouts += 1;
  gameState.workoutStats.totalCalories += cal;
  gameState.calorieDeficit.activeBurned += cal;

  // Streak calculations
  calculateStreak();

  // Quests check
  updateQuestProgress('workout', 1);
  updateQuestProgress('calories', cal);

  playSound('coin');
  addLog('log_workout', exName, `Logged workout: ${exName} (${duration} mins, ${intensity})`, `+${goldEarned}g / +${actualXp}XP`, true, 'workout');

  // Check Weekly Program matching task
  checkScheduledWorkoutCompletion(exName);

  closeLogModal();
  updateUI();
}

// --- ACTIVE TIMER IMPLEMENTATION ---
let timerTickCount = 0;
function startTimerSession() {
  initAudio();
  const select = document.getElementById('timerExerciseSelect');
  let exName = select.value;
  if (exName === 'Custom') {
    exName = document.getElementById('timerCustomName').value.trim() || 'Custom Exercise';
  }
  
  timerExercise = exName;
  timerIntensity = document.getElementById('timerIntensity').value;
  
  // Set duration
  const activeDurBtn = document.querySelector('.duration-btn.active');
  timerDuration = parseInt(activeDurBtn.dataset.duration) || 60;
  timerTimeLeft = timerDuration;
  timerActive = true;
  timerTickCount = 0;

  // Visuals transition
  document.getElementById('timerSetupView').style.display = 'none';
  document.getElementById('timerDisplayView').style.display = 'flex';
  
  document.getElementById('activeTimerTitle').innerText = `${timerExercise} Session`;
  updateTimerDisplay();

  // Random quote
  changeTimerQuote();

  playSound('click');

  // Start Interval
  timerInterval = setInterval(() => {
    if (timerActive) {
      timerTimeLeft -= 1;
      timerTickCount += 1;

      // Play tick sound on critical ticks
      if (timerTimeLeft <= 5 || timerTickCount % 5 === 0) {
        playSound('timer_tick');
      }

      // Quote change every 30 seconds
      if (timerTickCount % 30 === 0) {
        changeTimerQuote();
      }

      updateTimerDisplay();

      if (timerTimeLeft <= 0) {
        completeTimerSession();
      }
    }
  }, 1000);
}

function updateTimerDisplay() {
  const min = Math.floor(timerTimeLeft / 60);
  const sec = timerTimeLeft % 60;
  const timeStr = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  document.getElementById('timerDisplayVal').innerText = timeStr;

  // Ring offset calculation
  const ring = document.getElementById('timerRing');
  const circumference = 603; // matches CSS
  const progress = (timerDuration - timerTimeLeft) / timerDuration;
  const offset = circumference - progress * circumference;
  ring.style.strokeDashoffset = offset;
}

function changeTimerQuote() {
  const idx = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
  document.getElementById('timerMotivationQuote').innerText = `"${MOTIVATIONAL_QUOTES[idx]}"`;
}

function pauseTimerSession() {
  timerActive = false;
  document.getElementById('pauseTimerBtn').style.display = 'none';
  document.getElementById('resumeTimerBtn').style.display = 'inline-block';
  playSound('click');
}

function resumeTimerSession() {
  timerActive = true;
  document.getElementById('pauseTimerBtn').style.display = 'inline-block';
  document.getElementById('resumeTimerBtn').style.display = 'none';
  playSound('click');
}

function cancelTimerSession() {
  if (confirm("Are you sure you want to stop this workout session? Points accrued will be lost.")) {
    cleanupTimer();
    playSound('error');
  }
}

function cleanupTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerActive = false;
  document.getElementById('timerSetupView').style.display = 'block';
  document.getElementById('timerDisplayView').style.display = 'none';
  document.getElementById('pauseTimerBtn').style.display = 'inline-block';
  document.getElementById('resumeTimerBtn').style.display = 'none';
}

function completeTimerSession() {
  cleanupTimer();
  playSound('timer_complete');

  const durationMin = Math.round(timerDuration / 60) || 1;
  
  let calFactor = 8;
  let mult = 1.5;
  if (timerIntensity === 'Easy') { calFactor = 5; mult = 1.0; }
  if (timerIntensity === 'Hard') { calFactor = 12; mult = 2.2; }

  const cal = durationMin * calFactor;
  const goldEarned = Math.round(durationMin * mult);
  // Timer workouts earn DOUBLE base XP!
  const baseXp = Math.round(durationMin * mult * 1.5 * 2);

  addGold(goldEarned);
  const actualXp = addXp(baseXp);

  gameState.workoutStats.totalWorkouts += 1;
  gameState.workoutStats.totalCalories += cal;
  gameState.calorieDeficit.activeBurned += cal;

  calculateStreak();
  updateQuestProgress('workout', 1);
  updateQuestProgress('calories', cal);

  addLog('timer_workout', timerExercise, `Timer session completed: ${timerExercise} (${durationMin} mins, ${timerIntensity})`, `+${goldEarned}g / +${actualXp}XP`, true, 'workout');

  alert(`Congratulations! You completed your ${durationMin} minute ${timerExercise} session! You earned ${goldEarned} Gold and ${actualXp} XP (Includes Double XP timer reward!).`);
  
  // Check Weekly Program matching task
  checkScheduledWorkoutCompletion(timerExercise);

  updateUI();
}

// --- LEVEL UP CELEBRATION MODALS ---
function triggerLevelUpModal() {
  playSound('levelup');
  const modal = document.getElementById('levelupOverlay');
  modal.classList.add('active');
  document.getElementById('levelupName').innerText = `Ascended to Level ${gameState.level}`;
  
  // Custom badges/emoji for milestone levels
  let badge = "🏆";
  if (gameState.level >= 3) badge = "⚔️";
  if (gameState.level >= 5) badge = "🥋";
  if (gameState.level >= 7) badge = "👑";
  document.getElementById('levelupBadge').innerText = badge;

  addLog('level_up', `Level ${gameState.level}`, `Leveled up! Welcome to Level ${gameState.level}`, `Max HP Increased`, true, 'level');

  initConfetti();
}

function closeLevelUpModal() {
  playSound('click');
  document.getElementById('levelupOverlay').classList.remove('active');
  stopConfetti();
}

// --- VOUCHER MODAL ---
function triggerVoucherModal(itemName, code) {
  document.getElementById('voucherItemTitle').innerText = itemName;
  document.getElementById('voucherCodeVal').innerText = code;
  document.getElementById('voucherModal').classList.add('active');
}

function closeVoucherModal() {
  playSound('click');
  document.getElementById('voucherModal').classList.remove('active');
}

// --- GENERAL PAGE NAVIGATION ---
function initNavigation() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      playSound('click');
      
      // Remove active classes
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      // Add active
      btn.classList.add('active');
      const target = btn.dataset.tab;
      document.getElementById(`tab-${target}`).classList.add('active');

      if (target === 'analytics') {
        // Redraw charts to fit containers correctly
        setTimeout(() => {
          drawAnalyticsChart();
          drawWeightTrendChart();
        }, 50);
      }
    });
  });

  // Shop subtabs
  const shopTabs = document.querySelectorAll('.shop-tab-btn');
  shopTabs.forEach(sbtn => {
    sbtn.addEventListener('click', () => {
      playSound('click');
      shopTabs.forEach(st => st.classList.remove('active'));
      sbtn.classList.add('active');
      activeShopTab = sbtn.dataset.shopTab;
      renderShop();
    });
  });
}

// --- RESET ALL DATA ---
function clearAllGameData() {
  if (confirm("WARNING: This will permanently delete your character, history, gold, and exercise records. Are you absolutely sure?")) {
    localStorage.removeItem('fitquest_gamestate');
    gameState = JSON.parse(JSON.stringify(DEFAULT_STATE));
    generateQuests();
    updateUI();
    playSound('error');
    alert("Character reset complete. A new journey begins!");
  }
}

// --- SOUND TOGGLER ---
function initSoundToggle() {
  const toggleBtn = document.getElementById('soundToggle');
  const onIcon = document.getElementById('soundOnIcon');
  const offIcon = document.getElementById('soundOffIcon');

  toggleBtn.addEventListener('click', () => {
    gameState.soundEnabled = !gameState.soundEnabled;
    saveToLocalStorage();
    
    if (gameState.soundEnabled) {
      onIcon.style.display = 'block';
      offIcon.style.display = 'none';
      playSound('click');
    } else {
      onIcon.style.display = 'none';
      offIcon.style.display = 'block';
    }
  });

  // Sync initial sound icon UI
  if (gameState.soundEnabled) {
    onIcon.style.display = 'block';
    offIcon.style.display = 'none';
  } else {
    onIcon.style.display = 'none';
    offIcon.style.display = 'block';
  }
}

// --- BIND EVENT LISTENERS ---
function initEventListeners() {
  // Navigation & Tabs
  initNavigation();
  initSoundToggle();

  // Quick Log modal actions
  document.getElementById('openLogModalBtn').addEventListener('click', openLogModal);
  document.getElementById('closeLogModalBtn').addEventListener('click', closeLogModal);
  document.getElementById('cancelLogBtn').addEventListener('click', closeLogModal);
  document.getElementById('submitLogBtn').addEventListener('click', submitLoggedWorkout);
  
  // Exercise change in modal -> update estimates
  document.getElementById('logExerciseSelect').addEventListener('change', calculateLogPreview);
  document.getElementById('logDuration').addEventListener('input', calculateLogPreview);
  document.getElementById('logIntensity').addEventListener('change', calculateLogPreview);

  // Active Timer setup duration selectors
  const durBtns = document.querySelectorAll('.duration-btn');
  durBtns.forEach(dBtn => {
    dBtn.addEventListener('click', () => {
      playSound('click');
      durBtns.forEach(b => b.classList.remove('active'));
      dBtn.classList.add('active');
    });
  });

  // Timer Preview button on Dashboard -> switch to timer tab
  document.getElementById('goToTimerBtn').addEventListener('click', () => {
    const timerTabBtn = document.querySelector('.tab-btn[data-tab="timer"]');
    if (timerTabBtn) {
      timerTabBtn.click();
    }
  });

  // Dynamic preview name sync on selector change
  document.getElementById('timerExerciseSelect').addEventListener('change', (e) => {
    const customGroup = document.getElementById('timerCustomNameGroup');
    if (e.target.value === 'Custom') {
      customGroup.style.display = 'block';
    } else {
      customGroup.style.display = 'none';
    }
    updateUI();
  });

  // Active timer button controls
  document.getElementById('startTimerSessionBtn').addEventListener('click', startTimerSession);
  document.getElementById('pauseTimerBtn').addEventListener('click', pauseTimerSession);
  document.getElementById('resumeTimerBtn').addEventListener('click', resumeTimerSession);
  document.getElementById('quitTimerBtn').addEventListener('click', cancelTimerSession);

  // Close modals
  document.getElementById('closeLevelupBtn').addEventListener('click', closeLevelUpModal);
  document.getElementById('closeVoucherModalBtn').addEventListener('click', closeVoucherModal);
  document.getElementById('claimVoucherOkBtn').addEventListener('click', closeVoucherModal);
  
  // Clear Logs
  document.getElementById('clearLogsBtn').addEventListener('click', clearAllGameData);

  // Auto redraw chart on window resize
  window.addEventListener('resize', () => {
    if (document.getElementById('tab-analytics').classList.contains('active')) {
      drawAnalyticsChart();
      drawWeightTrendChart();
    }
  });

  // Weekly Program preset select change
  document.getElementById('programPresetSelect').addEventListener('change', (e) => {
    selectProgramPreset(e.target.value);
  });

  // Reset week program button
  document.getElementById('resetWeekBtn').addEventListener('click', () => {
    if (confirm("Reset completion states for the current week?")) {
      resetWeeklyProgram();
      playSound('click');
      updateUI();
      alert("Weekly program progress has been reset!");
    }
  });

  // Calorie Deficit bindings
  document.getElementById('openFoodModalBtn').addEventListener('click', openFoodModal);
  document.getElementById('closeFoodModalBtn').addEventListener('click', closeFoodModal);
  document.getElementById('cancelFoodBtn').addEventListener('click', closeFoodModal);
  document.getElementById('submitFoodBtn').addEventListener('click', submitLoggedFood);
  document.getElementById('claimDeficitBonusBtn').addEventListener('click', claimCalorieDeficitBonus);

  // Weight Tracker bindings
  document.getElementById('logWeightBtn').addEventListener('click', submitLoggedWeight);
  
  // Set default date picker to today
  const dateInput = document.getElementById('weightInputDate');
  if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  // Progress subnav view buttons
  document.getElementById('viewWeeklyChartBtn').addEventListener('click', () => {
    currentProgressView = 'week';
    document.getElementById('viewWeeklyChartBtn').classList.add('active');
    document.getElementById('viewMonthlyChartBtn').classList.remove('active');
    document.getElementById('progressChartTitle').innerText = "Weekly Progress";
    playSound('click');
    drawAnalyticsChart();
  });

  document.getElementById('viewMonthlyChartBtn').addEventListener('click', () => {
    currentProgressView = 'month';
    document.getElementById('viewWeeklyChartBtn').classList.remove('active');
    document.getElementById('viewMonthlyChartBtn').classList.add('active');
    document.getElementById('progressChartTitle').innerText = "Monthly Progress (30 Days)";
    playSound('click');
    drawAnalyticsChart();
  });
}

// Global scope bindings for inline HTML onclick calls
window.claimQuestReward = claimQuestReward;
window.buyShopItem = buyShopItem;
window.claimProgramBonus = claimProgramBonus;
window.claimRestBonus = claimRestBonus;
window.startScheduledWorkout = startScheduledWorkout;
window.claimCalorieDeficitBonus = claimCalorieDeficitBonus;

// --- CALORIE DEFICIT TRACKER CONTROLLER ---
const BMR_VAL = 1765;
const TDEE_VAL = 2427;
const DEFICIT_TARGET_VAL = 500;
const INTAKE_TARGET_VAL = 1927;

function openFoodModal() {
  playSound('click');
  document.getElementById('foodModal').classList.add('active');
  document.getElementById('foodNameInput').value = "";
  document.getElementById('foodCaloriesInput').value = "400";
}

function closeFoodModal() {
  playSound('click');
  document.getElementById('foodModal').classList.remove('active');
}

function submitLoggedFood() {
  const name = document.getElementById('foodNameInput').value.trim() || 'Meal / Snack';
  const kcal = parseInt(document.getElementById('foodCaloriesInput').value) || 0;

  if (kcal <= 0) {
    playSound('error');
    alert("Calories must be a positive number!");
    return;
  }

  gameState.calorieDeficit.foodIntake += kcal;
  gameState.calorieDeficit.foodLogs.push({ name, kcal, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
  
  playSound('coin');
  addLog('food_logged', name, `Logged real-life food: ${name} (${kcal} kcal)`, `+${kcal} kcal intake`, false, 'shop');

  closeFoodModal();
  updateUI();
}

function getLatestWeight() {
  if (gameState.weightHistory && gameState.weightHistory.length > 0) {
    const sorted = [...gameState.weightHistory].sort((a, b) => new Date(a.date) - new Date(b.date));
    return sorted[sorted.length - 1].weight;
  }
  return 85.0;
}

function getDynamicKcalLimits() {
  const weight = getLatestWeight();
  const lbm = weight * (1 - 0.24); // fat percentage is 24%
  const bmr = Math.round(370 + (21.6 * lbm));
  const tdee = Math.round(bmr * 1.375);
  const targetDeficit = 500;
  const targetIntake = tdee - targetDeficit;
  return { bmr, tdee, targetDeficit, targetIntake };
}

function updateCalorieDeficitUI() {
  const limits = getDynamicKcalLimits();
  const intake = gameState.calorieDeficit.foodIntake;
  const burned = gameState.calorieDeficit.activeBurned;

  const net = intake - limits.tdee - burned;
  const deficitAchieved = limits.tdee + burned - intake;

  const headerEl = document.getElementById('calDeficitHeaderLimits');
  if (headerEl) {
    headerEl.innerText = `BMR: ${limits.bmr} kcal | TDEE: ${limits.tdee} kcal`;
  }
  const tdeeBoxValEl = document.getElementById('calTdeeBoxVal');
  if (tdeeBoxValEl) {
    tdeeBoxValEl.innerText = `${limits.tdee} kcal`;
  }
  const tdeeBoxSubEl = document.getElementById('calTdeeBoxSub');
  if (tdeeBoxSubEl) {
    tdeeBoxSubEl.innerText = `BMR: ${limits.bmr} + Activity`;
  }
  const targetTextEl = document.getElementById('calDeficitTargetLabelText');
  if (targetTextEl) {
    targetTextEl.innerHTML = `Deficit Target: 500 kcal (Intake target: ${limits.targetIntake} kcal)`;
  }

  document.getElementById('calIntakeVal').innerText = `${intake} kcal`;
  document.getElementById('calBurnedVal').innerText = `${burned} kcal`;
  document.getElementById('calNetVal').innerText = `${net > 0 ? '+' : ''}${net} kcal`;
  
  const netBox = document.getElementById('calNetBox');
  const netStatus = document.getElementById('calNetStatus');
  const targetDeficit = limits.targetDeficit;
  
  if (deficitAchieved >= targetDeficit) {
    netBox.className = "calorie-math-box highlighted success";
    netStatus.innerText = "Target Deficit Met!";
    netStatus.style.color = "var(--accent-health)";
  } else {
    netBox.className = "calorie-math-box highlighted";
    netStatus.innerText = "Deficit Active";
    netStatus.style.color = "var(--accent-xp)";
  }

  const pct = Math.max(0, Math.min(100, (deficitAchieved / targetDeficit) * 100));
  document.getElementById('calDeficitProgressText').innerText = `${deficitAchieved} / ${targetDeficit} kcal`;
  document.getElementById('calDeficitProgressBar').style.width = `${pct}%`;

  const todayStr = new Date().toDateString();
  const alreadyClaimed = gameState.calorieDeficit.deficitClaimedDate === todayStr;
  const claimBtn = document.getElementById('claimDeficitBonusBtn');

  if (alreadyClaimed) {
    claimBtn.disabled = true;
    claimBtn.innerText = "Bonus Claimed";
  } else if (deficitAchieved >= targetDeficit) {
    claimBtn.disabled = false;
    claimBtn.innerText = "Claim Deficit Bonus";
  } else {
    claimBtn.disabled = true;
    claimBtn.innerText = "Deficit Target Not Met";
  }
}

function claimCalorieDeficitBonus() {
  const limits = getDynamicKcalLimits();
  const intake = gameState.calorieDeficit.foodIntake;
  const burned = gameState.calorieDeficit.activeBurned;
  const deficitAchieved = limits.tdee + burned - intake;

  if (deficitAchieved >= limits.targetDeficit) {
    const todayStr = new Date().toDateString();
    if (gameState.calorieDeficit.deficitClaimedDate !== todayStr) {
      gameState.calorieDeficit.deficitClaimedDate = todayStr;
      
      addGold(25);
      const xpGained = addXp(30);

      playSound('levelup');
      addLog('deficit_bonus', 'Deficit Bonus', `Claimed daily calorie deficit success bonus!`, `+25g / +${xpGained}XP`, true, 'quest');
      
      saveToLocalStorage();
      updateUI();
    }
  }
}

// --- WEEKLY TRAINING PROGRAM CONTROLLER ---
function getTodayDayName() {
  const dayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const map = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return map[dayIndex];
}

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function checkWeeklyProgramRollover() {
  const currentWeek = getWeekNumber(new Date());
  if (gameState.weeklyProgram.lastWeekNum !== currentWeek) {
    resetWeeklyProgram();
    gameState.weeklyProgram.lastWeekNum = currentWeek;
    saveToLocalStorage();
  }
}

function resetWeeklyProgram() {
  gameState.weeklyProgram.completedDays = {};
  gameState.weeklyProgram.claimedDays = {};
  saveToLocalStorage();
}

function checkScheduledWorkoutCompletion(exerciseName) {
  const todayName = getTodayDayName();
  const presetName = gameState.weeklyProgram.preset;
  const currentProgram = PROGRAM_PRESETS[presetName];
  const scheduledTask = currentProgram.find(t => t.day === todayName);

  if (scheduledTask && scheduledTask.type === 'workout') {
    if (exerciseName.toLowerCase().includes(scheduledTask.name.toLowerCase()) || 
        scheduledTask.name.toLowerCase().includes(exerciseName.toLowerCase())) {
      
      if (!gameState.weeklyProgram.completedDays[todayName]) {
        gameState.weeklyProgram.completedDays[todayName] = true;
        addLog('program_complete', scheduledTask.name, `Completed scheduled workout: "${scheduledTask.name}" for today!`, `Ready to claim bonus`, true, 'quest');
        playSound('levelup');
        saveToLocalStorage();
        updateUI();
      }
    }
  }
}

function selectProgramPreset(presetName) {
  if (PROGRAM_PRESETS[presetName]) {
    gameState.weeklyProgram.preset = presetName;
    saveToLocalStorage();
    playSound('click');
    updateUI();
  }
}

function claimProgramBonus(dayName) {
  if (gameState.weeklyProgram.completedDays[dayName] && !gameState.weeklyProgram.claimedDays[dayName]) {
    gameState.weeklyProgram.claimedDays[dayName] = true;
    
    addGold(20);
    const xpGained = addXp(30);
    
    playSound('coin');
    addLog('program_bonus', dayName, `Claimed Training Program bonus for ${dayName}`, `+20g / +${xpGained}XP`, true, 'quest');
    
    saveToLocalStorage();
    updateUI();
  }
}

function claimRestBonus(dayName) {
  const todayName = getTodayDayName();
  const currentProgram = PROGRAM_PRESETS[gameState.weeklyProgram.preset];
  const task = currentProgram.find(t => t.day === dayName);

  if (task && task.type === 'rest' && todayName === dayName && !gameState.weeklyProgram.claimedDays[dayName]) {
    gameState.weeklyProgram.claimedDays[dayName] = true;
    
    addGold(15);
    const xpGained = addXp(20);
    
    const maxHp = getMaxHp(gameState.level);
    gameState.hp = Math.min(maxHp, gameState.hp + 20);
    
    playSound('levelup');
    addLog('program_rest_bonus', dayName, `Claimed active rest & recovery reward for ${dayName}`, `+15g / +${xpGained}XP / +20 HP`, true, 'quest');
    
    saveToLocalStorage();
    updateUI();
  }
}

function startScheduledWorkout(exerciseName) {
  const select = document.getElementById('timerExerciseSelect');
  
  let found = false;
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].value.toLowerCase() === exerciseName.toLowerCase()) {
      select.selectedIndex = i;
      found = true;
      break;
    }
  }

  if (!found) {
    select.value = 'Custom';
    const customGroup = document.getElementById('timerCustomNameGroup');
    if (customGroup) customGroup.style.display = 'block';
    const customInput = document.getElementById('timerCustomName');
    if (customInput) customInput.value = exerciseName;
  } else {
    const customGroup = document.getElementById('timerCustomNameGroup');
    if (customGroup) customGroup.style.display = 'none';
  }

  const timerTabBtn = document.querySelector('.tab-btn[data-tab="timer"]');
  if (timerTabBtn) {
    timerTabBtn.click();
  }
}

function renderWeeklyProgram() {
  const container = document.getElementById('programGridContainer');
  if (!container) return;
  container.innerHTML = "";

  const presetName = gameState.weeklyProgram.preset;
  const program = PROGRAM_PRESETS[presetName];
  const todayName = getTodayDayName();

  program.forEach(task => {
    const isToday = task.day === todayName;
    const isWorkout = task.type === 'workout';
    const isCompleted = gameState.weeklyProgram.completedDays[task.day] || false;
    const isClaimed = gameState.weeklyProgram.claimedDays[task.day] || false;
    
    const card = document.createElement('div');
    let cardClass = 'program-day-card';
    if (isToday) cardClass += ' today';
    if (isCompleted && isWorkout) cardClass += ' completed';
    if (!isWorkout) cardClass += ' rest';
    card.className = cardClass;

    const badgeText = isWorkout ? 'Workout' : 'Active Rest';
    
    let statusText = "";
    let actionBtn = "";
    
    if (isWorkout) {
      if (isClaimed) {
        statusText = `<div class="program-day-status claimed">✓ Claimed</div>`;
      } else if (isCompleted) {
        statusText = `<div class="program-day-status ready">✓ Completed</div>`;
        actionBtn = `<button class="program-action-btn gold" onclick="claimProgramBonus('${task.day}')">Claim Bonus</button>`;
      } else {
        statusText = `<div class="program-day-status pending">Scheduled</div>`;
        if (isToday) {
          actionBtn = `<button class="program-action-btn" onclick="startScheduledWorkout('${task.name}')">Start Now</button>`;
        }
      }
    } else {
      if (isClaimed) {
        statusText = `<div class="program-day-status claimed">✓ Recovered</div>`;
      } else {
        statusText = `<div class="program-day-status pending">Rest & Recover</div>`;
        if (isToday) {
          actionBtn = `<button class="program-action-btn rest-btn" onclick="claimRestBonus('${task.day}')">Claim Rest Bonus</button>`;
        }
      }
    }

    const bonusRewards = isWorkout ? '🪙 +20g / ⭐ +30' : '🪙 +15g / ⭐ +20 / 💚 +20 HP';

    card.innerHTML = `
      <div class="program-day-badge">${badgeText}</div>
      <div class="program-day-name">${task.day}</div>
      <div class="program-day-target">${task.name} ${isWorkout ? `(${task.target})` : ''}</div>
      <div class="program-day-bonus" title="Program Reward Bonus">${bonusRewards}</div>
      ${statusText}
      ${actionBtn}
    `;
    container.appendChild(card);
  });
}

// --- WEIGHT TRACKING CONTROLLER ---
function updateWeightTrackerUI() {
  const listContainer = document.getElementById('weightLogsList');
  if (!listContainer) return;
  listContainer.innerHTML = "";

  const history = [...gameState.weightHistory].sort((a, b) => new Date(a.date) - new Date(b.date));
  const recentLogs = [...history].reverse().slice(0, 5);
  
  if (recentLogs.length === 0) {
    listContainer.innerHTML = `<div style="text-align:center; color:var(--text-muted); font-size:0.75rem; padding:0.5rem 0;">No logs yet</div>`;
  } else {
    recentLogs.forEach(entry => {
      const dateObj = new Date(entry.date);
      const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
      
      const item = document.createElement('div');
      item.style.display = "flex";
      item.style.justifyContent = "space-between";
      item.style.borderBottom = "1px solid rgba(255, 255, 255, 0.03)";
      item.style.padding = "0.2rem 0";
      item.innerHTML = `
        <span style="color:var(--text-secondary);">${formattedDate}</span>
        <span style="font-weight:700; color:var(--text-primary);">${entry.weight.toFixed(1)} kg</span>
      `;
      listContainer.appendChild(item);
    });
  }

  drawWeightTrendChart();

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'short' });
  const todayDateStr = today.toISOString().split('T')[0];
  const hasLoggedToday = history.some(e => e.date === todayDateStr);
  const alertEl = document.getElementById('weightWeeklyAlert');

  if (alertEl) {
    if (dayName === "Sun" && !hasLoggedToday) {
      alertEl.style.display = "inline";
    } else {
      alertEl.style.display = "none";
    }
  }
}

function submitLoggedWeight() {
  const valEl = document.getElementById('weightInputVal');
  const dateEl = document.getElementById('weightInputDate');
  
  const weight = parseFloat(valEl.value);
  const date = dateEl.value;

  if (isNaN(weight) || weight < 30 || weight > 250) {
    playSound('error');
    alert("Please enter a valid weight between 30 and 250 kg!");
    return;
  }

  if (!date) {
    playSound('error');
    alert("Please select a valid date!");
    return;
  }

  const existingIdx = gameState.weightHistory.findIndex(entry => entry.date === date);
  if (existingIdx !== -1) {
    gameState.weightHistory[existingIdx].weight = weight;
  } else {
    gameState.weightHistory.push({ date, weight });
  }

  gameState.weightHistory.sort((a, b) => new Date(a.date) - new Date(b.date));

  const isSunday = new Date(date).getUTCDay() === 0;
  if (isSunday) {
    addGold(15);
    const xpGained = addXp(20);
    playSound('levelup');
    addLog('weight_logged', 'Weight Logged', `Logged Sunday weight: ${weight.toFixed(1)} kg`, `+15g / +${xpGained}XP`, true, 'quest');
  } else {
    playSound('coin');
    addLog('weight_logged', 'Weight Logged', `Logged weight: ${weight.toFixed(1)} kg on ${date}`, `Success`, false, 'quest');
  }

  valEl.value = "";
  saveToLocalStorage();
  updateUI();
}

function drawWeightTrendChart() {
  const canvas = document.getElementById('weightTrendChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  const padding = { top: 15, right: 15, bottom: 20, left: 35 };

  const history = [...gameState.weightHistory].sort((a, b) => new Date(a.date) - new Date(b.date));
  if (history.length < 2) {
    ctx.fillStyle = '#64748b';
    ctx.font = '10px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("Log weight on multiple days to view trend", width / 2, height / 2);
    return;
  }

  const weights = history.map(h => h.weight);
  const minW = Math.min(...weights) - 0.5;
  const maxW = Math.max(...weights) + 0.5;
  const wRange = maxW - minW || 2;

  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  const linesCount = 2;
  for (let i = 0; i <= linesCount; i++) {
    const y = padding.top + (graphHeight / linesCount) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = '8px "Outfit", sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const val = minW + (wRange / linesCount) * (linesCount - i);
    ctx.fillText(val.toFixed(1) + ' kg', padding.left - 5, y);
  }

  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  ctx.shadowColor = 'rgba(168, 85, 247, 0.4)';
  ctx.shadowBlur = 8;

  ctx.beginPath();
  const points = [];
  history.forEach((entry, idx) => {
    const x = padding.left + (graphWidth / (history.length - 1)) * idx;
    const y = padding.top + graphHeight - ((entry.weight - minW) / wRange) * graphHeight;
    points.push({ x, y, weight: entry.weight, date: entry.date });
    if (idx === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();

  ctx.shadowBlur = 0;

  ctx.beginPath();
  ctx.moveTo(points[0].x, padding.top + graphHeight);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, padding.top + graphHeight);
  ctx.closePath();
  
  const fillGrad = ctx.createLinearGradient(0, padding.top, 0, padding.top + graphHeight);
  fillGrad.addColorStop(0, 'rgba(168, 85, 247, 0.15)');
  fillGrad.addColorStop(1, 'rgba(168, 85, 247, 0.0)');
  ctx.fillStyle = fillGrad;
  ctx.fill();

  points.forEach((p, idx) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#1e1b4b';
    ctx.fill();
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.stroke();

    if (idx === 0 || idx === points.length - 1 || (points.length > 2 && idx === Math.floor(points.length / 2))) {
      const dateObj = new Date(p.date);
      const formatted = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
      ctx.fillStyle = '#64748b';
      ctx.font = '8px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(formatted, p.x, padding.top + graphHeight + 5);
    }
  });
}

function updateAnalyticsTabUI() {
  const goldValEl = document.getElementById('analyticsGoldVal');
  const xpValEl = document.getElementById('analyticsXpVal');
  const rankValEl = document.getElementById('analyticsRankVal');
  const rateValEl = document.getElementById('successionRateVal');
  const streakTextEl = document.getElementById('successionStreakText');

  if (goldValEl) goldValEl.innerText = `${gameState.gold}g`;
  if (xpValEl) xpValEl.innerText = `${gameState.xp} XP`;
  if (rankValEl) rankValEl.innerText = getPlayerRank(gameState.level);

  // Succession Rate = Active daily streak
  if (rateValEl) {
    rateValEl.innerText = `${gameState.streak} days`;
  }

  // Compliance percentage in weekly program
  if (streakTextEl) {
    const presetName = gameState.weeklyProgram.preset;
    const program = PROGRAM_PRESETS[presetName] || [];
    const workoutDays = program.filter(t => t.type === 'workout');
    const completedCount = program.filter(t => t.type === 'workout' && gameState.weeklyProgram.completedDays[t.day]).length;
    const compliancePct = workoutDays.length > 0 ? Math.round((completedCount / workoutDays.length) * 100) : 0;
    
    streakTextEl.innerText = `Compliance: ${compliancePct}% (${completedCount}/${workoutDays.length} workouts this week)`;
  }
}

// --- INITIALIZE APP ---
window.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage();
  initEventListeners();
});
